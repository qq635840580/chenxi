//app.js
var Util = require("/utils/util.js");
var Api = require("/config/api.js");

App({
  onLaunch: function () {
    // 查询本地是否有值
    wx.getStorage({
      key: 'token',
      success: function (res) {},
      fail: (e) => {
        // 查看是否授权
        wx.getSetting({
          success: function (res1) {
            if (res1.authSetting['scope.userInfo']) {
              wx.getUserInfo({
                success: function (res2) {
                  wx.login({
                    success: res3 => {
                      let data = {
                        code: res3.code,
                        nickname: res2.userInfo.nickName,
                        avatarUrl: res2.userInfo.avatarUrl,
                        gender: res2.userInfo.gender,
                        province: res2.userInfo.province,
                        city: res2.userInfo.city,
                      }
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
                  });
                }
              });
            } else {
              wx.reLaunch({
                url: '/pages/login/index',
              })
            }
          },
          fail: e => {
            console.log(e, 'err')
          }
        });
      }
    })
  },
  globalData: {
    userInfo: null
  },

})