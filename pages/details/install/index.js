// pages/details/install/index.js
var Util = require("../../../utils/util.js");
var Api = require("../../../config/api.js");
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time:'00:00',
    habit_id: null,
    dataAll: {},
    remindFlag: false,
    publicFlag: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    const data = { habit_id: options.habit_id };
    Util.request(Api.HabitSettingSearch, data).then(res => {
      let newData = res.data;
      newData.is_public = Boolean(newData.is_public);
      newData.is_remind = Boolean(newData.is_remind);
      this.setData({
        dataAll: res.data,
        habit_id: options.habit_id,
        time: res.data.remind_time,
        remindFlag: res.data.is_remind==1 ? true : false,
        publicFlag: res.data.is_public==1? true : false,
      });
    });
  },

  /**
   * 提醒时间change发生的变化
   */
  bindDateChange: function (e) {
    console.log(e)
    this.setData({ time: e.detail.value})
  },

  /**
   * 提醒滑块的变化
   */
  isRemind: function(e) {
    this.setData({
      remindFlag: e.detail.value
    })
  },

  /**
   * 公开滑块的变动
   */
  isPublic: function (e) {
    this.setData({
      publicFlag: e.detail.value
    })
  },

  /**
   * 修改设置
   */
  update: function(e) {
    let data = { 
      habit_id: this.data.habit_id, 
      is_remind: this.data.remindFlag? 1: 0,
      is_public: this.data.publicFlag? 1: 0,
      remind_time: this.data.remindFlag? this.data.time: undefined,
      formid: e.detail.formId
    };
    Util.request(Api.HabitSetting, data).then(res => {
      wx.navigateBack({
        delta: 1,
      });
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