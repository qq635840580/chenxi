//app.js
var Util = require("/utils/util.js");
var Api = require("/config/api.js");

App({
  onLaunch: function () {
    /**查询本地是否有值，
     * 如果有值不需要登录，
     * 如果没有值，
     *    判断是否授权，
     *    如果未授权：跳转login
     *    如果已授权：在本页面执行默认登录用户的逻辑
     */
    // wx.getStorage({
    //   key: 'token',
    //   fail: function() {
    //     wx.reLaunch({
    //       url: '/pages/login/index',
    //     })
    //   },
    // });
    // wx.showTabBarRedDot({
    //   index:2
    // })
    // wx.setTabBarBadge({
    //   index:2,
    //   text:"99+",
    //   complete:()=>{
    //     console.log(1)
    //   }
    // })
    // wx.removeTabBarBadge({
    //   index:2
    // })
    // wx.hideTabBarRedDot({
    //   index:2
    // })
  },

  globalData: {
    userInfo: null
  },

})
