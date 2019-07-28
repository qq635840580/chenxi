// pages/index/index.js
var Util = require("../../utils/util.js");
var Api = require("../../config/api.js");
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[], //列表数据
    user_id: null, //用户id
    page: 1, // 页数
    listRows: 10, //每页显示数量
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 页面数据查询
   */
  fetchData() {
    const data = {
      user_id: this.data.user_id,
      page: this.data.page,
      listRows: this.data.listRows
    };
    Util.request(Api.HabitMyList, data).then(res => {
      this.setData({
        list: this.data.list.concat(res.data)
      })
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
    that = this
    wx.getStorage({
      key: 'uid',
      success: function (res) {
        that.setData({
          user_id: res.data,
          page: 1,
          list: [],
        })
        that.fetchData();
      },
    })
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
  onReachBottom: function (e) {
    this.setData({
      page: this.data.page+1,
    })
    this.fetchData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})