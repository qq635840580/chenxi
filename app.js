//app.js
var Util = require("/utils/util.js");
var { MessageTotalCount } = require("/config/api.js");

App({
  onShow: function() {
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
    this.getTotalCount();
  },
  getTotalCount:() => {
    wx.getStorage({
      key: 'uid',
      success: function (res) {
        Util.request(MessageTotalCount).then(({
          data
        }) => {
          if (data.count) {
            let text = data.count
            wx.showTabBarRedDot({
              index: 2
            })
            if (text > 99) {
              text = '99+';
            } else {
              text = text + '';
            }
            wx.setTabBarBadge({
              index: 2,
              text,
            })
          } else {
            wx.removeTabBarBadge({
              index: 2
            })
          }
        });
      },
      fail: function () {
        console.log('未登录，不请求')
      },
    });
  },
  globalData: {
    userInfo: null
  },

})