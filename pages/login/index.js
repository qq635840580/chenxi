//index.js
var Api = require("../../config/api.js");
Page({
  data: {
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function() {
    wx.showLoading({
      title: '加载中',
    })
    wx.getSetting({
      success: function (res) {
        let isAuth = res.authSetting['scope.userInfo'];
        if (isAuth) {
          //在已授权的情况下先去抓user的信息
          wx.getUserInfo({
            success: function (user) {
              //触发微信的登录方法
              wx.login({
                success: function (loginRes) {
                  var data = {
                    code: loginRes.code,
                    nickname: user.userInfo.nickName,
                    avatarUrl: user.userInfo.avatarUrl,
                    gender: user.userInfo.gender
                  };
                  //
                  wx.request({
                    url: Api.LoginUrl,
                    data: data,
                    method: 'POST',
                    success(res1) {
                      if (res1.data.code === '200') {
                        console.log(res1.data.data)
                        wx.setStorageSync('token', res1.data.data.token)
                        wx.setStorageSync('uid', res1.data.data.uid)
                        wx.setStorageSync('openid', res1.data.data.openid)
                        wx.hideLoading()
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
        } else {
          wx.hideLoading()
        }
      }
    })
  },
  //点击登录触发方法
  clickGetUserInfo: function(e) {
    let userInfo = e.detail.userInfo;
    if (userInfo) {
      wx.login({
        success: function (res) {
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
                wx.setStorageSync('openid', res1.data.data.openid)
                wx.switchTab({
                  url: '/pages/index/index',
                })
              }
            }
          })
        }
      })
    } else {
      wx.showToast({
        title: '授权拒绝',
        icon: 'none',
        duration: 1500,
      })
    }
  }
})