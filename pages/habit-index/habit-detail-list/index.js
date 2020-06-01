// pages/habit-index/habit-detail-list/index.js
var Util = require("../../../utils/util.js");
var Api = require("../../../config/api.js");
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    total_user: 0,
    total_clock: 0,
    habitName: null,
    isShow: false,
    isDel: false,
    clock_id: null,
    checkboxData: [],
    isReport: true,
    is_clock: 0,
    is_join: 0,
    isReturn: false,//是否可以去请求数据，默认可以请求，当触发完图片预览为false，不允许再请求
    isClock: false,//是否点击打卡，是否请求徽章
    badgeShow: false,
    badgeList: [],//获得徽章列表
    userInfo: {},
    isCanvas: false,
    canvasImg: ''
  },
})

Component({
  properties: {
    habit_id: {
      type: Number,
    }
  },
  lifetimes: {
    attached: function () {
      // // 在组件实例进入页面节点树时执行
      this.fetchData();
      this.setData({
        checkboxData: [
          { name: '0', value: '色情低俗' },
          { name: '1', value: '不友善行为', },
          { name: '2', value: '涉政敏感' },
          { name: '3', value: '广告推销' },
          { name: '4', value: '违法犯罪' },
          { name: '5', value: '侵权盗用' },
        ],
      })
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
    // 组件首次渲染完毕
    ready: function () {

    },
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {
      this.fetchData();
      this.badgeListFunc();
    },
    hide: function () { },
    resize: function () { },
  },
  methods: {
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function (e) {
    },
    /**
     * 初始化页面值
     */
    fetchData: function (pageNo) {
      if (this.data.isReturn) {
        this.setData({ isReturn: false });
        return
      }
      const data = { habit_id: this.data.habit_id, page: pageNo ? pageNo : 1 };
      Util.request(Api.HabitDynamicList, data).then(res => {
        this.setData({
          list: pageNo && pageNo > 1 ? [...this.data.list, ...res.data.list] : res.data.list,
          total_user: res.data.total_user,
          total_clock: res.data.total_clock,
          habitName: res.data.name,
          is_clock: res.data.is_clock,
          is_join: res.data.is_join,
        });
        wx.hideLoading();
      });
    },

    /**
     * 点赞
     */
    support: function (e) {
      const data = { clock_record_id: e.target.dataset.id, type: 1, };
      let list = this.data.list;
      let isPraise = e.target.dataset.is_praise;
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
        list: list
      });
      if (isPraise) {
        Util.request(Api.CancelSupport, data);
      } else {
        Util.request(Api.SupportSave, data);
        this.setData({ isClock: true });
        this.badgeListFunc();
      }
    },

    clickMessage: function (e) {
      console.log(e)
    },

    //点击评论跳转至详情页面
    saveIsInput: function (e) {
      const id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: `../../common/dynamic-detail/index?id=${id}&type=1`,
      });
      this.setData({ isReturn: true });
    },

    //评论触发的方法
    messageSubmit: function (e) {
      const data = {
        clock_record_id: e.currentTarget.dataset.id,
        content: e.detail.value,
        parent_id: e.currentTarget.dataset.contentid ? e.currentTarget.dataset.contentid : undefined,
      };
      Util.request(Api.CommenteSave, data).then(res => {
        this.setData({
          isInput: false,
          contentId: null,
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
     * 跳转排行榜
     */
    gotoRanking: function () {
      const habit_id = this.data.habit_id;
      const name = this.data.habitName;
      wx.navigateTo({
        url: `../habit-ranking/index?habit_id=${habit_id}&name=${name}`,
      });
      this.setData({ isReturn: true });
    },

    /**
     * 跳转成员
     */
    gotoPerson: function () {
      const habit_id = this.data.habit_id;
      wx.navigateTo({
        url: '../habit-person/index?habit_id=' + habit_id,
      });
      this.setData({ isReturn: true });
    },

    /**
     * 跳转设置
     */
    gotoInstall: function () {
      const habit_id = this.data.habit_id;
      wx.navigateTo({
        url: '../habit-install/index?habit_id=' + habit_id,
      });
      this.setData({ isReturn: true });
    },

    /**
     * 点击邀请好友
     */
    openPerson: function () {

    },

    /**
     * 点击打卡
     */
    gotoClock: function () {
      this.setData({ isClock: true });
      const habit_id = this.data.habit_id;
      wx.navigateTo({
        url: '../habit-clock/index?habit_id=' + habit_id,
      });
    },
    /**
     * 跳转到动态的详情
     */
    gotoClockInDetails: function (e) {
      const id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: `../../common/dynamic-detail/index?id=${id}&type=1`,
      });
      this.setData({ isReturn: true });
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
        urls: newImgList, // 需要预览的图片http链接列表
        complete: (e) => {
          console.log(e)
        }
      })
    },
    /**
     * 点击跳转个人主页
     */
    gotoHomePage: function (e) {
      const uid = e.currentTarget.dataset.uid;
      wx.navigateTo({
        url: `../../common/home-page/index?uid=${uid}`,
      });
      this.setData({ isReturn: true });
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
                duration: 2500,
              });
            });
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    /**
     * 点击举报确认
     */
    checkboxChange: function (e) {
      this.setData({
        reportContent: e.detail.value
      });
      console.log('checkbox发生change事件，携带value值为：', e.detail.value)
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
            duration: 2500,
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
     * 获得徽章列表
     */
    badgeListFunc: function () {
      if (this.data.isClock) {
        Util.request(Api.BadgeGet).then(res => {
          // const list = [
          //   { badge: {image: 'http://qiniu.chenxixiguan.cn/uploads/20200105/FlRp1nCvDzMm69rSdvwPqDz4MJsW.png',name: '敖德萨所',need_count:11, get_time:'2019-11-11' }
          //   },
          //   { badge: {image: 'http://qiniu.chenxixiguan.cn/uploads/20200105/FgDXjdz675Phdqq64ZnnVlIi8kUS.png',name: '大萨达大Ⅱ',need_count:22, get_time:'2019-11-11' }
          //   }
          // ];
          // this.setData({ 
          //   badgeList: list.length > 0 ? [list[list.length-1]] : [],
          //   badgeShow: list.length > 0 ? true : false,
          //   userInfo: {
          //     nickname: '请加我大萨达',
          //     avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqwibibF5iccD6rYWZ0W7b6TrwCColwAwfFRkJgV3YBrMhpWtnxB9XglbSkt1hOxJhwnDUiaIwwTmjJdw/132'
          //   }
          // })
          this.setData({
            badgeList: res.data.list.length > 0 ? [res.data.list[res.data.list.length - 1]] : [],
            badgeShow: res.data.list.length > 0 ? true : false,
            userInfo: res.data.userInfo,
            isClock: false
          })
        });
      }
    },

    /**
     * 徽章
     */
    closeBadgeShow: function () {
      this.setData({ badgeShow: false });
    },


    /**
     * 生成canvas图片
     */
    canvasContext: function () {
      wx.showLoading({
        title: '图片生成中',
        mask: true
      });
      const thiss = this;
      return new Promise((res, rej) => {
        const { badgeList, userInfo } = this.data;
        wx.getImageInfo({
          src: 'https://chenxixiguan.cn/uploads/20200106/7d9c9aa06446dae50c30db202012bea3.png',
          success: (backRes) => {
            wx.getImageInfo({
              src: badgeList[0].badge.image,
              success: (badgeRes) => {
                wx.getImageInfo({
                  src: userInfo.avatarUrl,
                  success: (avatarRes) => {
                    console.log(this)
                    const ctx = wx.createCanvasContext('dialog-fenxiang', this);
                    //背景图
                    ctx.drawImage(backRes.path, 0, 0, 480, 830);
                    ctx.drawImage(badgeRes.path, 165, 230, 150, 170);
                    ctx.save(); // 先保存状态 已便于画完圆再用
                    ctx.beginPath(); //开始绘制
                    ctx.arc(60, 50, 30, 0, Math.PI * 2, false);
                    ctx.clip();//画了圆 再剪切  原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内
                    ctx.drawImage(avatarRes.path, 29, 20, 60, 60);
                    ctx.restore(); //恢复之前保存的绘图上下文 恢复之前保存的绘图上下午即状态 可以继续绘制
                    ctx.setFillStyle('#ffffff');
                    ctx.font = '20px sans-serif';
                    ctx.fillText(userInfo.nickname, 120, 55);
                    ctx.font = '30px sans-serif';
                    ctx.fillText(badgeList[0].badge.name, 170, 550);
                    ctx.font = '18px sans-serif';
                    ctx.fillText(`累计打卡${badgeList[0].badge.need_count}次`, 182, 590);
                    ctx.fillText(`${badgeList[0].badge.get_time}获得`, 175, 620);
                    ctx.draw(true, function () {
                      wx.canvasToTempFilePath({
                        canvasId: 'dialog-fenxiang',
                        success: (tempRes) => {
                          thiss.setData({
                            canvasImg: tempRes.tempFilePath,
                            badgeShow: false,
                            isCanvas: true,
                          }, () => {
                            wx.hideLoading();
                          });
                        },
                        fail: function (e) {
                          console.log(e)
                          console.log('生成图片失败')
                          wx.hideLoading();
                        }
                      }, thiss);
                    });
                  }
                })
              },
            });
          }
        });
      }).catch(e => {
        wx.hideLoading();
        console.log(e);
      });
    },

    /**
     * 关闭canvas绘图
     */
    closeCanvas: function () {
      this.setData({ isCanvas: false });
    },

  },
  // ...
})