// pages/information/index.js
var Util = require("../../utils/util.js");
var Api = require("../../config/api.js");
var that, App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logFlag: false,//是否登录标识
  },
  onTabItemTap: function () {
    App.getTotalCount();
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
    wx.showLoading({
      title: '加载中',
      mask:true
    });
    App.getTotalCount();
    wx.getStorage({
      key: 'uid',
      success: function (res) {
        that.setData({
          logFlag: true,
        })
        Util.request(Api.MessageIndex).then(res => {
          that.setData(res.data)
          wx.hideLoading();
        });
      },
      fail: function() {
        wx.hideLoading();
      },
    });
  },

  /**
   * 点击登录 跳转
   */
  clickLogin: function(e) {
    wx.navigateTo({
      url: '/pages/login/index'
    });
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
