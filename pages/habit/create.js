// pages/habit/create.js
var Util = require("../../utils/util.js");
var Api = require("../../config/api.js");
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    time: '05:00'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this
    this.setData({
      name: options.name
    })
  },
  /**
   * 选择时间
   */
  bindTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  /**
   * 提交表单
   */
  submitForm: function(e) {
    const params = e.detail.value

    console.log(params)

    Util.request(Api.HabitSave, params, 'POST').then(res => {
      if (res.code === '200') {
        wx.showToast({
          title: res.msg
        })
        wx.switchTab({
          url: '/pages/index/index',
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    });
  }
})