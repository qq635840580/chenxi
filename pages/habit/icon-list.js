// pages/habit/icon-list.js
var Util = require("../../utils/util.js");
var Api = require("../../config/api.js");
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',//从上个页面到过来的习惯名称
    iconList: [],//图标列表
    iconid: null,//存储当前点击icon的id
    url: null,//存储icon的url
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      name: options.name
    })
    this.getHabitIcon();
  },

  /**
   * 获取图标
   */
  getHabitIcon: function () {
    Util.request(Api.GetHabitIcon).then(res => {
      this.setData({
        iconList: res.data
      });
    });
  },

  /**
   * 当前点击锁定id渲染样式
   */
  currentClick:function(e) {
    this.setData({
      iconid: e.currentTarget.dataset.id,
      url: e.currentTarget.dataset.url,
    })
  },

  /**
   * 点击确认
   */
  gotoCreate:function(e) {
    wx.navigateTo({
      url: `./create?iconid=${this.data.iconid}&url=${this.data.url}&name=${this.data.name}`,
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