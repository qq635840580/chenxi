//index.js
var Api = require("../../config/api.js");
var Util = require("../../utils/util.js");

Page({
  data: {
    userInfo: {},
  },
  onLoad: function() {
    // wx.getSetting({
    //   success: function (res) {
    //     let isAuth = res.authSetting['scope.userInfo'];
    //     if (isAuth) {
    //       //在已授权的情况下先去抓user的信息
    //       wx.getUserInfo({
    //         success: function (user) {
    //           //触发微信的登录方法
    //           wx.login({
    //             success: function (loginRes) {
    //               var data = {
    //                 code: loginRes.code,
    //                 nickname: user.userInfo.nickName,
    //                 avatarUrl: user.userInfo.avatarUrl,
    //                 gender: user.userInfo.gender
    //               };
    //               //
    //               wx.request({
    //                 url: Api.LoginUrl,
    //                 data: data,
    //                 method: 'POST',
    //                 success(res1) {
    //                   if (res1.data.code === '200') {
    //                     console.log(res1.data.data)
    //                     wx.setStorageSync('token', res1.data.data.token)
    //                     wx.setStorageSync('uid', res1.data.data.uid)
    //                     wx.setStorageSync('openid', res1.data.data.openid)
    //                     wx.hideLoading()
    //                     wx.navigateBack();
    //                   }
    //                 }
    //               })
    //             }
    //           })
    //         }
    //       })
    //     } else {
    //       wx.hideLoading()
    //     }
    //   }
    // })
  },
  //点击登录触发方法
  clickGetUserInfo: function(e) {
    wx.showLoading({ title: '加载中' });
    let userInfo = e.detail.userInfo;
    if (userInfo) {
      wx.login({
        success: function (res) {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          var data = {
            code: res.code,
            nickname: userInfo.nickName,
            avatarUrl: userInfo.avatarUrl,
            gender: userInfo.gender || '0',
          };
          wx.request({
            url: Api.LoginUrl,
            data: data,
            method: 'POST',
            success(res1) {
              if (res1.data.code === '200') {
                wx.setStorageSync('token', res1.data.data.token)
                wx.setStorageSync('uid', res1.data.data.uid)
                wx.setStorageSync('openid', res1.data.data.openid)
                wx.setStorageSync('gifFlag', true)
                wx.navigateBack();
                wx.hideLoading();
              }else {
                wx.showModal({
                  content: `${res1.data.code},${res1.data.msg}`,
                  success(res) {
                    console.log(res);
                    wx.hideLoading();
                  }
                });
              }
            },
            fail: function(error) {
              wx.hideLoading();
              wx.showModal({
                content: `${error}`,
                success(res) {
                  console.log(res)
                }
              });
            },
          })
        },
        fail: function(e) {
          wx.hideLoading();
          wx.showToast({
            title: '微信登录接口调用失败，请重新登录',
            icon: 'none',
            duration: 1500,
          })
        }
      })
    } else {
      wx.hideLoading();
      wx.showToast({
        title: '授权拒绝',
        icon: 'none',
        duration: 1500,
      })
    }
  }
})