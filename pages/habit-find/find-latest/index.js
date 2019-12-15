// pages/habit-find/habit-latest/index.js
var Util = require("../../../utils/util.js");
var Api = require("../../../config/api.js");
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latestList: [],
    focusId: null,
    contentId: null,
    isShow: false,
    isDel: false,
    clock_id: null,
    checkboxData: [],
    isReport: true,
    reportContent: null,
    isReturn: false,//是否可以去请求数据，默认可以请求，当触发完图片预览为false，不允许再请求
  },
})


Component({
  lifetimes: {
    attached: function () {
      this.setData({
        checkboxData: [
          { name: '0', value: '色情低俗' },
          { name: '1', value: '不友善行为', },
          { name: '2', value: '涉政敏感' },
          { name: '3', value: '广告推销' },
          { name: '4', value: '违法犯罪' },
          { name: '5', value: '侵权盗用' },
          // { name: '6', value: '其他' },
        ],
      });
      this.fetchData();
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {
      this.fetchData();
    },
    hide: function () { },
    resize: function () { },
  },
  methods: {
    /**
     * 获取页面数据
     */
    fetchData: function (data) {
      if(this.data.isReturn) {
        this.setData({ isReturn: false });
        return
      }
      wx.showLoading({
        title: '加载中',
      })
      console.log(data)
      Util.request(Api.FindLatest, data).then(res => {
        if (data && data.page > 1) {
          this.setData({
            latestList: [...this.data.latestList, ...res.data],
          })
          wx.hideLoading()
          return;
        }
        this.setData({
          latestList: res.data
        })
        wx.hideLoading()
      });
    },
    /**
     * 点赞
     */
    support: function (e) {
      const data = { clock_record_id: e.target.dataset.id, type: 1, };
      wx.getStorage({
        key: 'uid',
        success: (res) => {
          let list = this.data.latestList;
          let isPraise = e.target.dataset.praise;
          let id = e.target.dataset.id;
          list.forEach(item => {
            if (item.id == id) {
              if (isPraise) {
                item.support_count = item.support_count - 1;
                item.is_praise = 0;
              } else {
                item.support_count = item.support_count + 1;
                item.is_praise = 1;
              }
            }
          });
          this.setData({
            latestList: list
          })
          if (isPraise) {
            Util.request(Api.CancelSupport, data);
          } else {
            Util.request(Api.SupportSave, data);
          }
        },
        fail: function (e) {
          wx.showModal({
            content: '当前未登录，登录后即可享受小程序全部功能',
            success(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/login/index'
                });
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      });
    },
    clickMessage: function (e) {
      console.log(e)
    },
    //点击评论 input聚焦
    saveIsInput: function (e) {
      //每次先暂存点击评论的id，方便提交的时候获取到
      this.setData({
        isInput: true,
        focusId: e.currentTarget.dataset.id,
      })
      console.log(e)
    },
    //评论触发的方法
    messageSubmit: function (e) {
      console.log(e)
      const data = {
        clock_record_id: e.currentTarget.dataset.id,
        content: e.detail.value,
        parent_id: e.currentTarget.dataset.contentid ? e.currentTarget.dataset.contentid : undefined,
      };
      Util.request(Api.CommenteSave, data).then(res => {
        this.setData({
          isInput: false,
        })
        this.fetchData()
      });
    },
    /**
     * 点击评论的评论
     */
    clickContent: function (e) {
      console.log(e.currentTarget.dataset)
      this.setData({
        focusId: e.currentTarget.dataset.clockid,
        contentId: e.currentTarget.dataset.contentid,
        isInput: true,
      })
    },
    /**
     * 失去焦点
     */
    blurHandler: function (e) {
      this.setData({
        isInput: false,
      })
    },
    /**
     * 关注
     */
    followHandler: function (e) {
      let { uid: follow_id } = e.currentTarget.dataset
      const data = { follow_id };
      wx.getStorage({
        key: 'uid',
        success: (res) => {
          Util.request(Api.FollowSave, data).then(res => {
            wx.showToast({
              title: '关注成功',
              icon: 'success',
            });
            setTimeout(() => {
              wx.hideToast();
              let { latestList } = this.data;
              latestList.forEach(item => {
                if (item.uid == follow_id) {
                  item.user.is_attention = 1;
                }
              });
              this.setData({
                latestList,
              })
            }, 500)
          });
        },
        fail: function (e) {
          wx.showModal({
            content: '当前未登录，登录后即可享受小程序全部功能',
            success(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/login/index'
                });
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      });
    },
    /**
     * 去往个人首页
     */
    gotoHomePage: function (e) {
      wx.getStorage({
        key: 'uid',
        success: (res) => {
          const uid = e.currentTarget.dataset.uid;
          wx.navigateTo({
            url: `../../common/home-page/index?uid=${uid}`,
          });
          this.setData({ isReturn: true });
        },
        fail: function (e) {
          wx.showModal({
            content: '当前未登录，登录后即可享受小程序全部功能',
            success(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/login/index'
                });
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      });
    },
    /**
    * 点击图片 查看全屏图片
    */
    viewImage: function (e) {
      this.setData({ isReturn: true });
      const cueerntImg = e.currentTarget.dataset.imgcurrent;
      let imgList = e.currentTarget.dataset.imglist;
      let newImgList = [];
      imgList.forEach(item => {
        newImgList.push(item.path)
      })
      wx.previewImage({
        current: cueerntImg, // 当前显示图片的http链接
        urls: newImgList // 需要预览的图片http链接列表
      })
    },
    /**
     * 点击更多 存储起来当前点击的id 赋值给删除按钮
     */
    clickMore: function (e) {
      let that = this;
      wx.getStorage({
        key: 'uid',
        success: (res) => {
          const is_attention = e.currentTarget.dataset.is_attention;
          const clock_id = e.currentTarget.dataset.clock_id;
          that.setData({
            isShow: true,
            isDel: is_attention == 4 ? true : false,
            clock_id: clock_id,
          });
        },
        fail: function (e) {
          wx.showModal({
            content: '当前未登录，登录后即可享受小程序全部功能',
            success(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/login/index'
                });
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      });
    },
    /**
     * 弹出层点击取消
     */
    cancelClick: function (e) {
      this.setData({
        isShow: false,
      })
    },
    /**
     * 点击删除
     */
    delClick: function (e) {
      this.setData({
        isShow: false,
      })
      let that = this;
      wx.showModal({
        content: '确认要删除这条动态？',
        confirmText: '删除',
        confirmColor: '#F65C5C',
        success(res) {
          if (res.confirm) {
            const data = { clock_record_id: e.currentTarget.dataset.clock_id };
            Util.request(Api.DeleteDetails, data).then(res => {
              that.fetchData();
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 1500,
              });
            });
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    /**
     * 点击举报checkbox
     */
    checkboxChange: function (e) {
      this.setData({
        reportContent: e.detail.value
      });
    },
    /**
     * 关闭举报窗口
     */
    closeReport: function (e) {
      this.setData({
        isReport: false,
      })
    },
    /**
     * 点击举报
     */
    reportClick: function (e) {
      this.setData({
        isShow: false,
        isReport: true,
      })
    },
    /**
     * 点击确认举报
     */
    enterReport: function (e) {
      if (this.data.reportContent) {
        const data = {
          clock_record_id: e.currentTarget.dataset.clock_id,
          type: this.data.reportContent.join(','),
        };
        let that = this;
        Util.request(Api.TipofDetails, data).then(res => {
          that.fetchData();
          this.setData({
            isReport: false,
          })
          wx.showToast({
            title: '举报成功',
            icon: 'success',
            duration: 1500,
          });
        });
      } else {
        wx.showToast({
          title: '请勾选举报选项',
          icon: 'none',
          duration: 1000,
        });
      }
    },
    /**
     * 跳转到动态的详情
     */
    gotoFindDetails: function (e) {
      const id = e.currentTarget.dataset.id;
      wx.getStorage({
        key: 'uid',
        success: function (res) {
          wx.navigateTo({
            url: `../../common/dynamic-detail/index?id=${id}&type=2`,
          });
          this.setData({ isReturn: true });
        },
        fail: function (e) {
          wx.showModal({
            content: '当前未登录，登录后即可享受小程序全部功能',
            success(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/login/index'
                });
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      });
    },

    /**
     * 跳转到习惯列表
     */
    gotoHabitDetails: function (e) {
      const habit_id = e.currentTarget.dataset.habit_id;
      wx.getStorage({
        key: 'uid',
        success: function (res) {
          wx.navigateTo({
            url: `../../habit-index/habit-detail-nav/index?habit_id=${habit_id}`
          });
          this.setData({ isReturn: true });
        },
        fail: function (e) {
          wx.showModal({
            content: '当前未登录，登录后即可享受小程序全部功能',
            success(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/login/index'
                });
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      });
    },
  },
})