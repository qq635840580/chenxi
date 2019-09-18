//app.js
var Util = require("/utils/util.js");
var Api = require("/config/api.js");

App({
  onLaunch: function () {
    // 查询本地是否有值，如果有值不需要登录，如果没有值，判断是否授权，如果未授权跳转login如果已授权 在本页面执行默认登录用户的逻辑
    wx.getStorage({
      key: 'token',
      success: function(res) {},
      fail: function(e) {
        wx.reLaunch({
          url: '/pages/login/index',
        })
      },
    });
  },
  
  globalData: {
    userInfo: null
  },

})