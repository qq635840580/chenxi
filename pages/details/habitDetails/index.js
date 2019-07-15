// pages/details/habitDetails/index.js
var Util = require("../../../utils/util.js");
var Api = require("../../../config/api.js");
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    Util.request(Api.HabitDynamicList).then(res => {
      // this.setData({
      //   list: res.data
      // })
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

  },

  /**
   * 跳转排行榜
   */
  gotoRanking: () => {
    wx.navigateTo({
      url: '../ranking/index',
    })
  },

  /**
   * 跳转成员
   */
  gotoPerson: () => {
    wx.navigateTo({
      url: '../person/index',
    })
  },

  /**
   * 跳转设置
   */
  gotoInstall: () => {
    wx.navigateTo({
      url: '../install/index',
    })
  },

  /**
   * 跳转动态详情
   */
  gotoDetails: () => {
    wx.navigateTo({
      url: '../clockInDetails/index',
    })
  },

})

Component({
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      const data = { habit_id: 1};
      Util.request(Api.HabitDynamicList, data).then(res => {
        this.setData({
          list: res.data
        })
      });
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
    
  },
  methods: {

    gotoRanking: () => {
      wx.navigateTo({
        url: '../ranking/index',
      })
    },

    /**
     * 跳转成员
     */
    gotoPerson: () => {
      wx.navigateTo({
        url: '../person/index',
      })
    },

    /**
     * 跳转设置
     */
    gotoInstall: () => {
      wx.navigateTo({
        url: '../install/index',
      })
    },

    /**
     * 跳转动态详情
     */
    gotoDetails: () => {
      wx.navigateTo({
        url: '../clockInDetails/index',
      })
    },
  },
  // ...
})