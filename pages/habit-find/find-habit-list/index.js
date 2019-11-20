// pages/habit-find/find-habit-list/index.js
var Util = require("../../../utils/util.js");
var Api = require("../../../config/api.js");
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [

    ],
    page: 1
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
  fetchData: function (data) {
    Util.request(Api.FindHabit).then(res => {
      this.setData({
        list: res.data
      })
    });
  },

  /**
   * 跳转到习惯列表
   */
  gotoHabitDetails: function (e) {
    const habit_id = e.currentTarget.dataset.habit_id;
    wx.navigateTo({
      url: `../../habit-index/habit-detail-nav/index?habit_id=${habit_id}`
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

  onReachBottom: function () {
    wx.showLoading({
      title: '加载中',
    })
    let data = {
      page: this.data.page + 1
    }
    Util.request(Api.FindHabit, data).then(res => {
      let list = this.data.list
      if (Array.isArray(res.data) && res.data.length) {
        list = [...list, ...res.data]
        this.setData({
          list,
          page: data.page
        })
      }
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})