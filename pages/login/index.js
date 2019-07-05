//index.js
var Api = require("../../config/api.js");
Page({
  data: {
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function() {},
  getUserInfo: function(e) {
    let userInfo = e.detail.userInfo;
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var data = {
          code: res.code,
          nickname: userInfo.nickName,
          avatarUrl: userInfo.avatarUrl,
          sex: userInfo.gender
        };
        wx.request({
          url: Api.LoginUrl,
          data: data,
          method: 'POST',
          success(res) {
            if (res.data.code === '200') {
              wx.setStorageSync('token', res.data.data.token)
              wx.setStorageSync('uid', res.data.data.uid)
              wx.switchTab({
                url: '/pages/index/index',
              })
            }
          }
        })
      }
    })
  }
})