// pages/habit-information/information-system/index.js
var Util = require("../../../utils/util.js");
var Api = require("../../../config/api.js");
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: null,
    util: Util,
    page: 1,//分页
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
    this.fetchData();
  },

  /**
   * 获取当前页面数据
   */
  fetchData: function (pageNo) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    const data = { page: pageNo ? pageNo : 1 };
    Util.request(Api.MessageSystem, data).then(res => {
      that.setData({
        list: pageNo && pageNo > 1 ? [...this.data.list, ...res.data] : res.data
      })
      wx.hideLoading()
    });
  },

  /**
   * 点击系统消息跳转
   */
  gotoDetails: function(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
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
    let page = ++this.data.page;
    this.fetchData(page);
    this.setData({ page });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})