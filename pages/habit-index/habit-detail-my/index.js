// pages/habit-index/habit-detail-my/index.js
var Util = require("../../../utils/util.js");
var Api = require("../../../config/api.js");
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsList: [],
    continuity_days: 0,
    week_statistics: [],
    is_clock: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  /**
   * 跳转
   */
  gotoDynamic: () => {
    wx.navigateTo({
      url: '../habitDetails/index',
    })
  },

  gotoClockIn: function () {
    wx.navigateTo({
      url: '../clockIn/index',
    })
  }
})

Component({
  properties: {
    habit_id: {
      type: Number,
    }
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      this.setData({
        is_clock: 0,
      })
      this.fetchData();
      this.fetchWeekClock();
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {
      this.fetchData();
      this.fetchWeekClock();
    },
    hide: function () {
    },
    resize: function () { },
  },

  methods: {
    fetchData: function (pageNo) {
      wx.showLoading({
        title: '加载中',
      });
      const datas = { habit_id: this.data.habit_id, page: pageNo ? pageNo : 1 };
      //获取时间轴信息
      Util.request(Api.HabitMy, datas).then(res => {
        this.setData({
          newsList: pageNo && pageNo > 1 ? [...this.data.newsList, ...res.data] : res.data
        })
        wx.hideLoading()
      });
    },

    /**
     * 打卡周详情
     */
    fetchWeekClock: function () {
      const datas = { habit_id: this.data.habit_id };
      //获取打卡周列表
      Util.request(Api.ClockWeek, datas).then(res => {
        this.setData({
          continuity_days: res.data.continuity_days,
          week_statistics: res.data.week_statistics,
        });
      });
    },

    /**
     * 跳转到动态详情
     */
    gotoDetails: function (e) {
      const id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: `../../common/dynamic-detail/index?id=${id}&type=1`,
      })
    },

    /**
     * 点击打卡
     */
    gotoClock: function () {
      const habit_id = this.data.habit_id;
      wx.navigateTo({
        url: '../habit-clock/index?habit_id=' + habit_id,
      })
    },
    /**
     * 跳转到打卡坚持
     */
    gotoClockIn: function () {
      const habit_id = this.data.habit_id;
      wx.navigateTo({
        url: '../habit-record/index?habit_id=' + habit_id,
      })
    },

  },
  // ...
})