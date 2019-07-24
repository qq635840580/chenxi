// pages/user/index.js
var Util = require("../../utils/util.js");
var Api = require("../../config/api.js");
var that
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    isShow: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo
    //   })
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.navigateTo({
    //     url: '/pages/login/index',
    //   })
    // }
    Util.request(Api.MainPage).then(res => {
      that.setData({
        userInfo: res.data
      })
    });
  },

  /**
   * 点击关联小程序
   */
  associatedClick: function(e) {
    this.setData({
      isShow: true,
    })
  },

  /**
   * 点击复制 关闭dialog并且复制appid
   */
  copyAppId: function(e) {
    let that = this;
    wx.setClipboardData({
      data: e.currentTarget.dataset.appid,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            that.setData({
              isShow: false,
            });
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
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