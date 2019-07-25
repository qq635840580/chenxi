// pages/find/choiceHabit/index.js
var Util = require("../../../utils/util.js");
var Api = require("../../../config/api.js");
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchData();
  },

  /**
   * 数据查询
   */
  fetchData: function(data) {
    Util.request(Api.FindHabit).then(res => {
      this.setData({
        list: res.data
      })
    });
  },

  /**
   * 跳转到习惯列表
   */
  gotoHabitDetails: function(e) {
    const habit_id = e.currentTarget.dataset.habit_id;
    wx.navigateTo({
      url: `../../details/detailsNav/index?habit_id=${habit_id}`
    })
  },

  /**
   * 加入
   */
  joinClick: function (e) {
    const data = { habit_id: e.currentTarget.dataset.habit_id };
    Util.request(Api.HabitJoin, data).then(res => {
      this.fetchData();
    });
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