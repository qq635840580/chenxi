//app.js
var Util = require("/utils/util.js");
var Api = require("/config/api.js");

App({
  onLaunch: function () {
    console.log('onLaunch')
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        console.log(res)
        if (res) {

          this.globalData.userinfo = res.data
        }
      },
      fail: (e) => {
        console.log(e)
        // 查看是否授权
        wx.getSetting({
          success: function (res1) {
            console.log(res1)
            if (res1.authSetting['scope.userInfo']) {
              wx.getUserInfo({
                success: function (res2) {
                  console.log(res2)
                  wx.login({
                    success: res3 => {
                      console.log(res3)
                      console.log("用户的code:" + res3.code);
                      let data = {
                        appid,
                        secret,
                        js_code: res3.code,
                      }
                      Util.request(Api.LoginUrl).then(res => {
                        wx.setStorageSync(userinfo, res.data)
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