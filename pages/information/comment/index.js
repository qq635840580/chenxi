// pages/information/comment/index.js
var Util = require("../../../utils/util.js");
var Api = require("../../../config/api.js");
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    page: 1
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
   * 默认查询
   */
  fetchData: function(pageNo) {
    const data = {page: pageNo ? pageNo : 1};
    Util.request(Api.MessageComment, data).then(res => {
      that.setData({
        list: pageNo && pageNo > 1 ? [...this.data.list, ...res.data] : res.data
      })
    });
  },

  /**
   * 点击跳转到个人主页
   */
  gotoHomePage: function (e) {
    const uid = e.currentTarget.dataset.uid;
    wx.navigateTo({
      url: `../../homePage/index?uid=${uid}`,
    })
  },

  /**
   * 点击跳转动态详情
   */
  gotoDetails: function (e) {
    const detailId = e.currentTarget.dataset.detailid;
    wx.navigateTo({
      url: `../../find/findDetails/index?id=${detailId}`,
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