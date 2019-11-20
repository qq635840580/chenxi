// pages/habit-information/information-fans/index.js
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
   * 页面默认查询
   */
  fetchData: function (pageNo) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    const data = { page: pageNo ? pageNo : 1 };
    Util.request(Api.MessageFans, data).then(res => {
      that.setData({
        list: pageNo && pageNo > 1 ? [...this.data.list, ...res.data] : res.data
      })
      wx.hideLoading()
    });
  },

  /**
   * 关注
   */
  followSave: function (e) {
    console.log(e)
    Util.request(Api.FollowSave, {
      follow_id: e.currentTarget.dataset.id
    }).then(res => {
      wx.showToast({
        title: '关注成功',
        icon: 'success',
      })
      setTimeout(() => {
        wx.hideToast();
        that.onShow()
      }, 1500)
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let page = ++this.data.page;
    this.fetchData(page);
    this.setData({ page });
  },

})