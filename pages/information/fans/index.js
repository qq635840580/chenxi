// pages/information/fans/index.js
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
    that = this
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    Util.request(Api.MessageFans).then(res => {
      that.setData({
        list: res.data
      })
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
        duration: 2500,
      })
      that.onShow()
    });
  },
  /**
   * 点击跳转到个人主页
   */
  gotoHomePage: function(e) {
    const uid = e.currentTarget.dataset.uid;
    wx.navigateTo({
      url: `../../homePage/index?uid=${uid}`,
    })
  },
})