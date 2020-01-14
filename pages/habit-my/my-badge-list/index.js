// pages/habit-my/my-badge-list/index.js
var Util = require("../../../utils/util.js");
var Api = require("../../../config/api.js");
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    isShow: false,
    detailData: {},
    isCanvas: false,
    canvasImg: '',
    userInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    //本页面接收各种类型的徽章 定义好 显示对应标题和内容
    this.fetchData(options.type)
    if(options.type == 1) {
      wx.setNavigationBarTitle({
        title: '累计打卡徽章'
      });
    }else if(options.type == 2) {
      wx.setNavigationBarTitle({
        title: '连续打卡徽章'
      });
    }else if(options.type == 3) {
      wx.setNavigationBarTitle({
        title: '社区徽章'
      });
    }
  },

  /**
   * 查询数据
   */
  fetchData: function(type) {
    Util.request(Api.BadgeList, { type }).then(res => {
      this.setData({
        list: res.data.list,
        userInfo: res.data.user_info
      })
    });
  },

  /**
   * 点击图片
   */
  viewBadge: function(e) {
    const { flag } = e.currentTarget.dataset;
    if(flag) {
      this.setData({ detailData: e.currentTarget.dataset, isShow: true });
    }
  },

  /**
   * 关闭弹出层
   */
  closeShow: function() {
    console.log(1)
    this.setData({ isShow: false }); 
  },

  /**
   * 生成canvas图片
   */
  canvasContext: function() {
    wx.showLoading({
      title: '图片生成中',
      mask: true
    });
    return new Promise((res, rej) => {
      const { detailData, userInfo } = this.data;
      wx.getImageInfo({
        src: 'https://chenxixiguan.cn/uploads/20200106/7d9c9aa06446dae50c30db202012bea3.png',
        success: (backRes) => {
          wx.getImageInfo({
            src: detailData.image,
            success: (badgeRes) => {
              wx.getImageInfo({
                src: userInfo.avatarUrl,
                success: (avatarRes) => {
                  const ctx = wx.createCanvasContext('dialog-fenxiang');
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
                  ctx.fillText(detailData.name, 170, 550);
                  ctx.font = '18px sans-serif';
                  ctx.fillText(`累计打卡${detailData.num}次`, 190, 590);
                  ctx.fillText(detailData.date, 170, 620);
                  ctx.draw(true, function () {
                    wx.canvasToTempFilePath({
                      canvasId: 'dialog-fenxiang',
                      success: (tempRes) => {
                        that.setData({
                          canvasImg: tempRes.tempFilePath,
                          isShow: false,
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
  closeCanvas: function() {
    this.setData({ isCanvas: false });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})