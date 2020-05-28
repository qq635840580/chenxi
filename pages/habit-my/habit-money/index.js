// pages/habit-my/habit-money/index.js
var Util = require("../../../utils/util.js");
var Api = require("../../../config/api.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: null,
    payList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.handlePayList();
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
   * 打赏列表
   */
  handlePayList: function () {
    Util.request(Api.GetList).then(res => {
      this.setData({
        payList: res.data
      });
    });
  },

  /**
   * 点击
   */
  handleClick: function (e) {
    const { num } = e.currentTarget.dataset;
    if (num == this.data.num) {
      this.setData({ num: null })
    } else {
      this.setData({ num })
    }

  },

  /**
   * 输入金额
   */
  handleInput: function (e) {
    let val = e.detail.value;
    this.setData({ num: val })
  },

  /**
   * 点击支付
   */
  handleClickPay: function () {
    const { num } = this.data;
    if (!num) return wx.showModal({
      title: '温馨提示',
      content: '请选择金额或输入金额',
      showCancel: false,
      confirmText: '好哒'
    })
    Util.request(Api.GetPay, { total_fee: num }).then(res => {
      wx.requestPayment({
        'appId': res.data.appId,
        'timeStamp': res.data.timeStamp,
        'nonceStr': res.data.nonceStr,
        'package': res.data.package,
        'signType': res.data.signType,
        'paySign': res.data.sign,
        'success': function (res) {
          this.handlePayList();
          this.setData({ num: null });
          wx.showModal({
            title: '温馨提示',
            content: '感谢您的支持，我们会继续努力哒！',
            showCancel: false,
            confirmText: '好哒'
          });
        },
        'fail': function (res) {
          wx.showModal({
            title: '温馨提示',
            content: '支付失败',
            showCancel: false,
            confirmText: '好哒'
          })
        },
        'complete': function (res) {
          console.log(res); console.log('complete');
        }
      });
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