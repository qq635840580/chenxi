// pages/user/fans/index.js
var Util = require("../../../utils/util.js");
var Api = require("../../../config/api.js");
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ltst: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this
    if (options.user_id) {
      const data = { user_id: options.user_id };
      that.fetchData(data)
    } else {
      wx.getStorage({
        key: 'uid',
        success: function (res) {
          const data = { user_id: res.data };
          that.fetchData(data)
        },
      })
    } 
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    
  },

  /**
   * 查询数据
   */
  fetchData:function(data) {
    Util.request(Api.MyFans, data).then(res => {
      that.setData({
        list: res.data
      })
    });
  },

  /**
   * 关注
   */
  followSave: function (e) {
    console.log(e)
    Util.request(Api.FollowSave, {
      follow_id: e.currentTarget.dataset.id
    }).then(res => {
      wx.showToast({
        title: res.msg,
        icon: 'none'
      })
      that.onShow()
    });
  }
})