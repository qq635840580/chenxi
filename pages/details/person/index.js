// pages/details/person/index.js
var Util = require("../../../utils/util.js");
var Api = require("../../../config/api.js");
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    total_user: 0,
    habit_id: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const data = { habit_id: options.habit_id};
    this.setData({
      habit_id: options.habit_id
    })
    this.fetchData(data)
  },

  /**
   * 查询数据
   */
  fetchData: function(data) {
    Util.request(Api.HabitPerson, data).then(res => {
      this.setData({
        list: res.data.list,
        total_user: res.data.total_user,
      })
    });
  },

  /**
   * 点击关注
   */
  attentClick: function(e) {
    // console.log(`触发`)
    const data = { follow_id: e.currentTarget.dataset.uid, };
    Util.request(Api.FollowSave, data).then(res => {
      const datas = {habit_id: this.data.habit_id}
      this.fetchData(datas)
    });
  },

  /**
   * 去往个人主页
   */
  gotoHomePage: function (e) {
    const uid = e.currentTarget.dataset.uid;
    wx.navigateTo({
      url: `../../homePage/index?uid=${uid}`,
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