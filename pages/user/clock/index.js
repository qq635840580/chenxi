// pages/user/clock/index.js
var Util = require("../../../utils/util.js");
var Api = require("../../../config/api.js");
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    this.setData({
      user_id: options.user_id,
    })
    if (options.user_id) {
      const data = { user_id: options.user_id };
      that.fetchData(data)
    } else {
      wx.getStorage({
        key: 'uid',
        success: function (res) {
          const data = { user_id: res.data };
          that.fetchData(data)
          that.setData({
            user_id: res.data,
          })
        },
      })
    } 
  },

  /**
   * 数据查询
   */
  fetchData: function(data) {
    Util.request(Api.ClockRecords, data).then(res => {
      this.setData({
        newsList: res.data
      })
    });
  },

  /**
    * 跳转到动态详情
    */
  gotoDetails: function (e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../../details/clockInDetails/index?id=${id}`,
    })
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