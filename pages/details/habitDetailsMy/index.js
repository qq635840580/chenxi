// pages/details/habitDetailsMy/index.js
var Util = require("../../../utils/util.js");
var Api = require("../../../config/api.js");
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsList:[],
    continuity_days: 0,
    week_statistics: [],
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
  gotoDynamic:() => {
    wx.navigateTo({
      url: '../habitDetails/index',
    })
  },

  gotoClock:() => {
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
      this.fetchData();
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {
      console.log(`进入`)
    },
    hide: function () { 
    },
    resize: function () { },
  },
  methods: {
    fetchData: function() {
      const data = { habit_id: this.data.habit_id };
      //获取时间轴信息
      Util.request(Api.HabitMy).then(res => {
        this.setData({
          newsList: res.data
        })
      });
      //获取打卡周列表
      Util.request(Api.ClockWeek, data).then(res => {
        this.setData({
          continuity_days: res.data.continuity_days,
          week_statistics: res.data.week_statistics,
        });
      });
    },
    gotoClock: () => {
      wx.navigateTo({
        url: '../clockIn/index',
      })
    }
  },
  // ...
})