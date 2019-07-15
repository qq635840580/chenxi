// pages/details/habitDetailsMy/index.js
var Util = require("../../../utils/util.js");
var Api = require("../../../config/api.js");
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsList:[
      { content: '这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容', time:'2019-09-09'},
    ],
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
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      Util.request(Api.HabitMy).then(res => {
        // this.setData({
        //   list: res.data
        // })
      });
      this.setData({
        newsList: [
          { content: '这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容', time: '2019-09-09' },
        ]
      })
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  // 以下是旧式的定义方式，可以保持对 <2.2.3 版本基础库的兼容
  attached: function () {
    // 在组件实例进入页面节点树时执行
  },
  detached: function () {
    // 在组件实例被从页面节点树移除时执行
  },
  // ...
})