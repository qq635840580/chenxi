// pages/habit-index/habit-record/index.js
var Util = require("../../../utils/util.js");
var Api = require("../../../config/api.js");
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    days_style: [],
    habit_id: null,
    bottomData: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      habit_id: options.habit_id,
    })
    //进入页面处理当前时间的默认年月
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
    let nowDate = `${year}-${month}`;
    let data = { habit_id: options.habit_id, month: nowDate };
    this.fetchData(data);
  },

  /**
   * 点击日历上个月
   */
  prevMonth: function (event) {
    let year = event.detail.currentYear;
    let month = event.detail.currentMonth < 10 ? `0${event.detail.currentMonth}` : event.detail.currentMonth;
    let nowDate = `${year}-${month}`
    let habit_id = this.data.habit_id;
    let data = { habit_id, month: nowDate };
    this.setData({
      days_style: [],
    })
    this.fetchData(data);
  },

  /**
   * 点击日历下个月
   */
  nextMonth: function (event) {
    let year = event.detail.currentYear;
    let month = event.detail.currentMonth < 10 ? `0${event.detail.currentMonth}` : event.detail.currentMonth;
    let nowDate = `${year}-${month}`
    let habit_id = this.data.habit_id;
    let data = { habit_id, month: nowDate };
    this.setData({
      days_style: [],
    })
    this.fetchData(data);
  },

  /**
   * 点击日历选择年月
   */
  dateChange: function (event) {
    let year = event.detail.currentYear;
    let month = event.detail.currentMonth < 10 ? `0${event.detail.currentMonth}` : event.detail.currentMonth;
    let nowDate = `${year}-${month}`
    let habit_id = this.data.habit_id;
    let data = { habit_id, month: nowDate };
    this.setData({
      days_style: [],
    })
    this.fetchData(data);
  },

  /**
   * 查询方法
   */
  fetchData: function (data) {
    Util.request(Api.ClockMonth, data).then(res => {
      let monthClock = res.data.month_statistics;
      let ary = [];
      monthClock.forEach((item, index) => {
        if (item == 1) {
          ary.push({ month: 'current', day: ++index, color: 'white', background: '#3ACC88' })
        }
      });
      this.setData({
        days_style: ary,
        bottomData: res.data,
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