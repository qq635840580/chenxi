// pages/homePage/index.js
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    const data = {user_id: options.uid,}
    this.fetchData(data);
  },

  /**
   * 访问数据
   */
  fetchData:function(data) {
    Util.request(Api.MainPage, data).then(res => {
      this.setData({
        userInfo: res.data,
      })
    });
  },

  /**
   * 点击进入动态详情
   */
  gotoFindDetails:function(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../find/findDetails/index?id=${id}`,
    })
  },

  /**
   * 跳转到习惯列表
   */
  gotoHabitDetails: function (e) {
    const habit_id = e.currentTarget.dataset.habit_id;
    wx.navigateTo({
      url: `../details/detailsNav/index?habit_id=${habit_id}`
    })
  },

  /**
   * 点击返回按钮
   */
  goBack: function(e) {
    wx.navigateBack({
      delta: 1,
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