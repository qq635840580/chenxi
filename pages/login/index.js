//index.js
var Api = require("../../config/api.js");
Page({
  data: {
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function() {},
  //点击登录触发方法
  getUserInfo: function(e) {
    let userInfo = e.detail.userInfo;
    wx.login({
      success: res => {
        console.log(res)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var data = {
          code: res.code,
          nickname: userInfo.nickName,
          avatarUrl: userInfo.avatarUrl,
          gender: userInfo.gender
        };
        wx.request({
          url: Api.LoginUrl,
          data: data,
          method: 'POST',
          success(res1) {
            if (res1.data.code === '200') {
              console.log(res1)
              wx.setStorageSync('token', res1.data.data.token)
              wx.setStorageSync('uid', res1.data.data.uid)
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