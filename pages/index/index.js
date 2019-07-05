// pages/index/index.js
var Util = require("../../utils/util.js");
var Api = require("../../config/api.js");
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {
        img:'/uploads/home/zaoqi.png',
        title:'早起',
        is_clock:true,
        days:'618',
        remind:'5:00'
      },
      {
        img: '/uploads/home/zaoshui.png',
        title: '早睡',
        is_clock: false,
        days: '618',
        remind: '21:00'
      },
      {
        img: '/uploads/home/paobu.png',
        title: '跑步',
        is_clock: true,
        days: '618',
        remind: null
      },
      {
        img: '/uploads/home/jianshen.png',
        title: '健身',
        is_clock: false,
        days: '618',
        remind: null
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: (options) => {
    that = this
    console.log(options)
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
    Util.request(Api.HabitList).then(res => {
      // that.setData({
      //   list: res.data
      // })
    });
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