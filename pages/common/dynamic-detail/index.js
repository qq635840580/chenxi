// pages/common/dynamic-detail/index.js
var Util = require("../../../utils/util.js");
var Api = require("../../../config/api.js");
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: null, //页面详细信息
    id: null, //页面id
    isShow: false,  //是否展示遮罩层（删除、举报）
    isDel: false, //是否点击删除
    clock_id: null, //
    checkboxData: [ //举报详细信息
      { name: '0', value: '色情低俗' },
      { name: '1', value: '不友善行为', },
      { name: '2', value: '涉政敏感' },
      { name: '3', value: '广告推销' },
      { name: '4', value: '违法犯罪' },
      { name: '5', value: '侵权盗用' },
      // { name: '6', value: '其他' },
    ],
    isReport: false,  //举报层是否展示
    reportContent: null,  //举报复选框值内容
    isShare: false, //是否点击分享层
    msgVal: null, //存储评论框值
    contentId: null,  //存储顶层父级的id
    commentId: null, //存储点击这条评论的id
    canvasImg: null, //绘制图片存储的地方
    nickname: null,//回复
    habitShow: false, //灰色的习惯条是否展示 1为不展示2为展示
    parentId: null,//父级id
    contentId: null,//评论id
  },
  onShareAppMessage: function(e) {
    const {
      id,
      continuity_days
    } = this.data.detail;
    const { name } = this.data.detail.habits;
    if (id) {
      return {
        path: `/pages/common/dynamic-detail/index?id=${id}&type=2`,
        title: "TA在培养【" + name + "】习惯已经坚持" + continuity_days + "天"
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    that = this;
    const data = { clock_record_id: options.id, }
    this.setData({
      id: options.id,
      habitShow: options.type
    });
    this.fetchData(data);
  },

  /**
   * 请求方法
   */
  fetchData: function (data) {
    wx.showLoading({
      title: '加载中',
    });
    Util.request(Api.ListDetails, data).then(res => {
      this.setData({
        detail: res.data[0],
      });
      wx.hideLoading();
    });
  },

  /**
   * 点赞
   */
  support: function (e) {
    wx.getStorage({
      key: 'uid',
      success: (res) => {
        const data = { clock_record_id: this.data.id, type: 1, };
        let detail = this.data.detail;
        if (detail.is_praise) {
          detail.support_count = detail.support_count - 1;
          detail.is_praise = 0;
          Util.request(Api.CancelSupport, data);
        } else {
          detail.support_count = detail.support_count + 1;
          detail.is_praise = 1;
          Util.request(Api.SupportSave, data);
        }
        this.setData({ detail: detail });
      },
      fail: (e) => {
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

  //点击评论框  使input聚焦
  saveIsInput: function (e) {
    wx.getStorage({
      key: 'uid',
      success: (res) => {
        //每次先暂存点击评论的id，方便提交的时候获取到
        this.setData({
          isInput: true,
          nickname: e.currentTarget.dataset.nickname,
          contentId: e.currentTarget.dataset.contentid ? e.currentTarget.dataset.contentid : null,
          parentId: e.currentTarget.dataset.parentid ? e.currentTarget.dataset.parentid : null
        });
      },
      fail: (e) => {
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


  //评论触发的方法
  messageSubmit: function (e) {
    const { id, contentId, parentId } = this.data;
    const datas = { clock_record_id: this.data.id };
    const data = {
      clock_record_id: id,
      content: e.detail.value,
      parent_id: parentId ? parentId : undefined,
      comment_id: contentId? contentId: undefined,
    };
    Util.request(Api.CommenteSave, data).then(res => {
      this.setData({
        isInput: false,
        contentId: null,
        parentId: null,
      })
      this.fetchData(datas)
    });
  },

  /**
  * 增加发表按钮评论
  */
 publicHandler: function (e) {
  const { id, contentId, parentId } = this.data;
  const datas = { clock_record_id: id };
  const data = {
    clock_record_id: id,
    content: this.data.msgVal,
    parent_id: parentId ? parentId : undefined,
    comment_id: contentId? contentId: undefined,
  };
  Util.request(Api.CommenteSave, data).then(res => {
    this.setData({
      isInput: false,
      contentId: null,
      parentId: null,
    })
    this.fetchData(datas)
  });
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
   * input框输入值的存储
   */
  saveInputVal: function (e) {
    this.setData({
      msgVal: e.detail.value
    })
  },

  /**
   * 关注
   */
  followHandler: function (e) {
    wx.getStorage({
      key: 'uid',
      success: (res) => {
        const data = { follow_id: e.currentTarget.dataset.uid, };
        const datas = { clock_record_id: this.data.id };
        Util.request(Api.FollowSave, data).then(res => {
          wx.showToast({
            title: '关注成功',
            icon: 'success',
          });
          setTimeout(() => {
            wx.hideToast();
            this.fetchData(datas);
          }, 1500)
        });
      },
      fail: (e) => {
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
          url: `../home-page/index?uid=${uid}`,
        });
      },
      fail: (e) => {
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
   * 点击灰条跳转至习惯列表
   */
  gotoHabitDetails:function (e) {
    wx.getStorage({
      key: 'uid',
      success: (res) => {
        const habit_id = e.currentTarget.dataset.habit_id;
        wx.navigateTo({
          url: `/pages/habit-index/habit-detail-nav/index?habit_id=${habit_id}`,
        });
      },
      fail: (e) => {
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
    wx.getStorage({
      key: 'uid',
      success: (res) => {
        const is_attention = e.currentTarget.dataset.is_attention;
        const clock_id = e.currentTarget.dataset.clock_id;
        this.setData({
          isShow: true,
          isDel: is_attention == 4 ? true : false,
          clock_id: clock_id,
        });
      },
      fail: (e) => {
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
            wx.showToast({
              title: '删除成功',
              icon: 'success',
            });
            setTimeout(() => {
              wx.hideToast();
              wx.navigateBack({
                delta: 1,
              });
            }, 1500)
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
      const datas = { clock_record_id: this.data.id, };
      let that = this;
      Util.request(Api.TipofDetails, data).then(res => {
        that.fetchData(datas);
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
   * 点击空白处  input关闭
   */
  closeInput: function (e) {
    console.log(e)
    this.setData({
      isInput: false
    })
  },

  /**
   * 点击分享
   */
  clickShare: function (e) {
    this.setData({
      isShare: true,
    })
  },

  /**
   * 点击分享的取消
   */
  cancelClickShare: function (e) {
    this.setData({
      isShare: false,
    })
  },

  /**
   * 点击分享中图标 需要关闭dialog
   */
  clickShareBtn: function (e) {
    this.setData({
      isShare: false,
    })
  },

  // 分享朋友圈
  fenxiang: function () {
    Util.request(Api.RandWord).then(res => {
      wx.showLoading({
        title: '图片生成中',
        mask: true
      });
      this.CanvasContext(res.data.content)
    })
  },

  /**
   * 绘图过程
   */
  CanvasContext: function (content) {
    return new Promise((response, rej) => {
      const { detail } = this.data;
      wx.getImageInfo({
        src: 'https://chenxixiguan.cn/uploads/20191031/9d82f6398c89962416a974a316a52100.png',
        success: ({ path }) => {
          wx.getImageInfo({
            src: 'https://chenxixiguan.cn/uploads/20191031/349d332aabab86d709f638531786d61a.png',
            success: (back) => {
              Util.request(Api.getImg).then(res => {
                wx.getImageInfo({
                  src: res.data.back_image,
                  success: (res) => {
                    wx.getImageInfo({
                      src: detail.user.avatarUrl,
                      success: (avatar) => {
                        const ctx = wx.createCanvasContext('dialog-fenxiang');
                        if (res.path) {
                          ctx.drawImage(res.path, 0, 10, 480, 290)
                        }
                        ctx.drawImage(path, 0, 0, 480, 800);
                        ctx.drawImage(back.path, 60, 250, 50, 20);
                        ctx.save(); // 先保存状态 已便于画完圆再用
                        ctx.beginPath(); //开始绘制
                        //先画个圆
                        ctx.arc(375, 180, 40, 0, Math.PI * 2, false);
                        ctx.clip();//画了圆 再剪切  原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内
                        ctx.drawImage(avatar.path, 335, 140, 80, 80);
                        // 推进去图片
                        ctx.restore(); //恢复之前保存的绘图上下文 恢复之前保存的绘图上下午即状态 可以继续绘制
                        ctx.setFillStyle('#ffffff');
                        ctx.setFontSize(50);
                        ctx.setTextAlign('left');
                        ctx.fillText('第' + detail.continuity_days + '天', 60, 100);
                        ctx.setFontSize(34);
                        ctx.font = 'normal bold 34px sans-serif'
                        ctx.setTextAlign('left');
                        ctx.fillText(`${detail.habits.name}`, 60, 170);
                        ctx.font = '26px sans-serif';
                        ctx.fillText(detail.date + ' ', 60, 210);
                        ctx.setTextAlign('center');
                        ctx.font = '22px sans-serif';
                        ctx.fillText(detail.user.nickname, 365, 270);
                        ctx.setTextAlign('left');
                        ctx.setFillStyle('#666');
                        ctx.font = 'normal normal normal 22px sans-serif'
                        // ctx.fillText(detail.content,45,300)
                        if (content) {
                          let chr = content.split("");
                          let temp = "";
                          let row = [];
                          for (let a = 0; a < chr.length; a++) {
                            if (ctx.measureText(temp).width < 360) {
                              temp += chr[a];
                            } else {
                              a--;
                              row.push(temp);
                              temp = "";
                            }
                          }
                          row.push(temp);
                          if (row.length > 5) {
                            var rowCut = row.slice(0, 2);
                            var rowPart = rowCut[1];
                            var test = "";
                            var empty = [];
                            for (var a = 0; a < rowPart.length; a++) {
                              if (ctx.measureText(test).width < 360) {
                                test += rowPart[a];
                              }
                              else {
                                break;
                              }
                            }
                            empty.push(test);
                            var group = empty[0] + "..."
                            rowCut.splice(1, 1, group);
                            row = rowCut;
                          }
                          for (var b = 0; b < row.length; b++) {
                            ctx.fillText(row[b], 60, 350 + b * 30, 360);
                          }
                        }
                        ctx.font = 'normal bold 26px sans-serif';
                        ctx.setTextAlign('center')
                        ctx.setFontSize(26);
                        ctx.setFillStyle('#333')
                        ctx.fillText(detail.join_days + '天', 480 / 6 + 15, 520)
                        ctx.fillText(detail.total_clock + '天', 480 / 2, 520)
                        ctx.fillText(detail.rate, 480 / 6 * 5 - 15, 520);
                        ctx.font = 'normal 200 18px sans-serif';
                        ctx.setFillStyle('#999')
                        ctx.setTextAlign('center')
                        ctx.setFontSize(16);
                        ctx.fillText('已加入', 480 / 6 + 15, 560)
                        ctx.fillText('累积打卡', 480 / 2, 560)
                        ctx.fillText('打卡率', 480 / 6 * 5 - 15, 560)
                        ctx.setLineWidth(2)
                        ctx.setStrokeStyle('#e5e5e5')
                        ctx.moveTo(480 / 3 + 10, 500);
                        ctx.lineTo(480 / 3 + 10, 560)
                        ctx.moveTo(480 / 3 * 2 - 10, 500);
                        ctx.lineTo(480 / 3 * 2 - 10, 560);
                        ctx.stroke()
                        ctx.draw(true, function () {
                          wx.canvasToTempFilePath({
                            canvasId: 'dialog-fenxiang',
                            success: (tempRes) => {
                              that.setData({
                                canvasImg: tempRes.tempFilePath,
                                isShare: false,
                                isCanvas: true,
                              }, () => {
                                wx.hideLoading();
                              });

                            },
                            fail: function (e) {
                              console.log(e)
                              wx.hideLoading();
                            }
                          });
                        });
                      }
                    })
                  },
                  fail: e => {
                    console.log(e)
                  }
                })
              })
            }
          })
        },
        fail: rej
      })
    }).catch(e => {
      console.log(e)
    })
  },

  /**
   * 关闭绘图
   */
  closeCanvas: function () {
    this.setData({
      isCanvas: false
    })
  },

})
