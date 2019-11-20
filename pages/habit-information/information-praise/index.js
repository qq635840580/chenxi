// pages/habit-information/information-praise/index.js
var Util = require("../../../utils/util.js");
var Api = require("../../../config/api.js");
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {}
    ],
    page: 1,
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
   * 默认查询数据
   */
  fetchData: function (pageNo) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    const data = { page: pageNo ? pageNo : 1 };
    Util.request(Api.MessagePraise, data).then(res => {
      that.setData({
        list: pageNo && pageNo > 1 ? [...this.data.list, ...res.data] : res.data
      })
      wx.hideLoading()
    });
  },

  /**
   * 点击跳转到个人主页
   */
  gotoHomePage: function (e) {
    const uid = e.currentTarget.dataset.uid;
    wx.navigateTo({
      url: `../../common/home-page/index?uid=${uid}`,
    })
  },

  /**
   * 点击跳转动态详情
   */
  gotoDetails: function (e) {
    const { detailid, type } = e.currentTarget.dataset;
    if (type == 1 || type == 2 || type == 3 || type == 4) {
      wx.navigateTo({
        url: `../../common/dynamic-detail/index?id=${detailid}`,
      })
    }
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