// pages/user/habit/index.js
var Util = require("../../../utils/util.js");
var Api = require("../../../config/api.js");
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_id: null,
    list: [],
    page: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    this.setData({ user_id: options.uid });
    const data = { user_id: options.uid, page: 1 };
    this.fetchData(data);
  },

  /**
   * 查询数据
   */
  fetchData:function(data) {
    wx.showLoading({ title: '加载中' });
    Util.request(Api.HabitMyList, data).then(res => {
      that.setData({
        list: data.page && data.page > 1 ? [...this.data.list, ...res.data] : res.data
      });
      wx.hideLoading();
    });
  },

  /**
   * 点击跳转习惯列表
   */
  gotoHabitDetails: function(e) {
    const habit_id = e.currentTarget.dataset.habit_id;
    wx.navigateTo({
      url: `../../details/detailsNav/index?habit_id=${habit_id}`
    })
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
    let page = ++this.data.page;
    const data = { user_id: this.data.user_id, page };
    this.fetchData(data);
    this.setData({ page });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})