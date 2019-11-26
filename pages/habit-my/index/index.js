// pages/habit-my/index/index.js
var Util = require("../../../utils/util.js");
var Api = require("../../../config/api.js");
var that
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    isShow: false,
    logFlag: false,//登录状态
  },
  onTabItemTap: function () {
    app.getTotalCount();
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
    wx.getStorage({
      key: 'uid',
      success: function (res) {
        that.setData({
          logFlag: true,
        });
        const data = { user_id: res.data };
        that.fetchData(data);
      },
    })
  },

  /**
   * 默认查询
   */
  fetchData: function (data) {
    Util.request(Api.MainPage, data).then(res => {
      that.setData({
        userInfo: res.data
      })
    });
  },

  /**
   * 去往个人首页
   */
  gotoHomePage: function (e) {
    const uid = e.currentTarget.dataset.uid;
    wx.navigateTo({
      url: `../../common/home-page/index`,
    })
  },

  /**
   * 点击关联小程序
   */
  associatedClick: function (e) {
    wx.hideTabBar({})
    this.setData({
      isShow: true,
    })
  },

  /**
   * 关闭关联小程序
   */
  closeShow: function (e) {
    this.setData({
      isShow: false,
    })
    wx.showTabBar({})
  },

  /**
   * 点击复制 关闭dialog并且复制appid
   */
  copyAppId: function (e) {
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
              title: '复制成功',
              duration: 1500,
            })
          }
        })
      }
    })
  },

  /**
   * 跳转至登录页
   */
  gotoLogin: function (e) {
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
