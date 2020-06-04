// pages/habit-my/my-badge/index.js
var Util = require("../../../utils/util.js");
var Api = require("../../../config/api.js");
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    common: [],
    cumulativeData: [],//累计打卡列表
    continuityData: [],//连续打卡列表
    communityData: [],//社区打卡列表
    dataInfo: {},
    isCanvas: false,
    userInfo: {},
    canvasImg: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
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
    this.fetchData();
  },


  /**
   * 查询
   */
  fetchData: function () {
    wx.showLoading({
      title: '加载中',
    })
    Util.request(Api.BadgeList, { type: 0 }).then(res => {
      this.setData({
        common: res.data,
        cumulativeData: res.data.cumulative.list.slice(0, 3),
        continuityData: res.data.continuity.list.slice(0, 3),
        communityData: res.data.community.list.slice(0, 3),
        userInfo: res.data.user_info
      })
    });
    wx.hideLoading();
  },

  /**
   * 累计打卡
   */
  gotoCumBadgeList: function (e) {
    const { type } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `../my-badge-list/index?type=${type}`
    });
  },

  /**
   * 去往徽章列表
   */
  gotoBadgeList: function () {
    wx.navigateTo({
      url: '../my-badge-list/index'
    });
  },

  /**
   * 点击已获得的徽章
   */
  viewImage: function (e) {
    const { datainfo } = e.currentTarget.dataset;
    console.log(datainfo)
    if (datainfo.is_had) {
      this.setData({ dataInfo: datainfo, isShow: true });
    }
  },

  /**
   * 关闭弹出层
   */
  closeShow: function () {
    this.setData({ isShow: false });
  },

  /**
   * 生成canvas图片
   */
  canvasContext: function () {
    wx.showLoading({
      title: '图片生成中',
      mask: true
    });
    return new Promise((res, rej) => {
      const { dataInfo, userInfo } = this.data;
      const img = dataInfo.image.indexOf('https') == -1 ? dataInfo.image.replace(/^http/, "https") : dataInfo.image;
      console.log(img)
      // console.log(dataInfo.image.replace(/^http/,"https"))
      wx.getImageInfo({
        src: 'https://chenxixiguan.cn/uploads/20200106/7d9c9aa06446dae50c30db202012bea3.png',
        success: (backRes) => {
          wx.getImageInfo({
            src: img,
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
                  ctx.fillText(dataInfo.name, 170, 550);
                  ctx.font = '18px sans-serif';
                  ctx.fillText(`累计打卡${dataInfo.need_count}次`, 190, 590);
                  ctx.fillText(`${dataInfo.get_time} 获得`, 170, 620);
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
  closeCanvas: function () {
    this.setData({ isCanvas: false });
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