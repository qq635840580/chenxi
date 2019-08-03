// pages/user/concern/index.js
var Util = require("../../../utils/util.js");
var Api = require("../../../config/api.js");
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_id: null, //存储user_id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    this.setData({
      user_id: options.user_id,
    })
    if (options.user_id) {
      const data = { user_id: options.user_id };
      that.fetchData(data)
      //设置动态标题
      wx.setNavigationBarTitle({
        title: 'TA的关注'
      })
    } else {
      wx.getStorage({
        key: 'uid',
        success: function (res) {
          const data = { user_id: res.data };
          that.fetchData(data)
          //设置动态标题
          wx.setNavigationBarTitle({
            title: '我的关注'
          })
        },
      })
    } 
  },

  /**
   * 数据查询
   */
  fetchData:function(data) {
    Util.request(Api.MyFollow, data).then(res => {
      that.setData({
        list: res.data
      })
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
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
        title: '关注成功',
        icon: 'success',
        duration: 2500,
      })
      const data = { user_id: this.data.user_id };
      this.fetchData(data)
    });
  },
  /**
   * 点击跳转到个人主页
   */
  gotoHomePage: function (e) {
    const uid = e.currentTarget.dataset.uid;
    wx.navigateTo({
      url: `../../homePage/index?uid=${uid}`,
    })
  },
})