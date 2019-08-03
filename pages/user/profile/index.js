// pages/user/profile/index.js
var Util = require("../../../utils/util.js");
var Api = require("../../../config/api.js");
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: null,//头像url
    sexList:['男', '女'],
    nickname: null,//昵称
    gender: null,//性别id
    genderName: null, //性别
    birth: null, //出生年月日
    city: null,//所在城市
    phont: null,//手机号码
    sign: null,//个性签名
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    Util.request(Api.Profile).then(res => {
      this.setData({
        avatarUrl: res.data.avatarUrl,//头像链接
        nickname: res.data.nickname,//名称
        gender: res.data.gender, //性别id
        genderName: res.data.gender ==1? '男': '女', //性别
        birth: res.data.birth, //出生年月日
        city: res.data.city, //所在城市
        phone: res.data.phone, //手机号码
        sign: res.data.sign,//个性签名
      })
    });
  },

  /**
   * 更改性别
   */
  bindGenderChange: function(e) {
    this.setData({
      gender: e.detail.value,
      genderName: e.detail.value ==1 ? '男': '女',
    })
  },

  /**
   * 更改出生年月日
   */
  bindDateChange: function(e) {
    this.setData({
      birth: e.detail.value,
    })
  },

  /**
   * 更改城市
   */
  bindCityChange: function(e) {
    this.setData({
      city: `${e.detail.value[0]}-${e.detail.value[1]}-${e.detail.value[2]}`
    })
  },

  /**
   * 更改昵称
   */
  bindNameChange: function(e) {
    this.setData({
      nickname: e.detail.value
    })
  },

  /**
   * 更改手机号
   */
  bindPhoneChange: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },

  /**
   * 更改个性签名
   */
  bindSignChange: function(e) {
    this.setData({
      sign: e.detail.value
    })
  },

  /**
   * 点击保存修改资料
   */
  bindSaveChange: function() {
    const data = {
      avatarUrl: this.data.avatarUrl,//头像链接
      nickname: this.data.nickname,//名称
      gender: this.data.gender ==1? '1': '0', //性别id
      genderName: this.data.gender == 1 ? '男' : '女', //性别
      birth: this.data.birth, //出生年月日
      city: this.data.city, //所在城市
      phone: this.data.phone, //手机号码
      sign: this.data.sign,//个性签名
    }
    Util.request(Api.UsersEdit, data).then(res => {
      wx.showToast({
        title: '修改成功',
        icon: 'success',
        duration: 2500,
      })
      this.onShow();
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