// pages/details/detailsNav/index.js
var Util = require("../../../utils/util.js");
var Api = require("../../../config/api.js");
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabflag: 1,
    habit_id: null,
    is_join: false,
    img: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      habit_id: options.habit_id
    })
    const data = { habit_id: options.habit_id};
    Util.request(Api.HabitDynamicList, data).then(res => {
      this.setData({
        is_join: res.data.is_join,
        img: res.data.icon,
      })
    });
  },

  saveNav: function (e) {
    const { tabflag } = e.currentTarget.dataset;
    this.setData({
      tabflag
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