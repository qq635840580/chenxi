// pages/common/habit-list/index.js
// pages/user/habit/index.js
var Util = require("../../../utils/util.js");
var Api = require("../../../config/api.js");
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    const data = { user_id: options.uid };
    this.fetchData(data);
  },

  /**
   * 查询数据
   */
  fetchData:function(data) {
    Util.request(Api.HabitMyList, data).then(res => {
      that.setData({
        list: res.data
      })
    });
  },

  /**
   * 点击跳转习惯列表
   */
  gotoHabitDetails: function(e) {
    const habit_id = e.currentTarget.dataset.habit_id;
    wx.navigateTo({
      url: `/pages/habit-index/habit-detail-nav/index?habit_id=${habit_id}`
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})