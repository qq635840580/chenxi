// pages/common/fans-list/index.js
var Util = require("../../../utils/util.js");
var Api = require("../../../config/api.js");
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ltst: [],
    user_id: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    if (options.user_id) {
      const data = { user_id: options.user_id };
      that.setData({
        user_id: options.user_id
      })
      that.fetchData(data);
      wx.setNavigationBarTitle({
        title: 'TA的粉丝'
      })
    } else {
      wx.getStorage({
        key: 'uid',
        success: function (res) {
          const data = { user_id: res.data };
          that.setData({
            user_id: res.data
          })
          that.fetchData(data)
          wx.setNavigationBarTitle({
            title: '我的粉丝'
          })
        },
      })
    }
  },

  /**
   * 点击跳转到个人主页
   */
  gotoHomePage: function (e) {
    const uid = e.currentTarget.dataset.uid;
    wx.navigateTo({
      url: `../home-page/index?uid=${uid}`,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 查询数据
   */
  fetchData: function (data) {
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
        title: '关注成功',
        icon: 'success'
      })
      setTimeout(() => {
        wx.hideToast();
        const data = { user_id: that.data.user_id };
        that.fetchData(data)
      }, 1500)
    });
  },
  /**
 * 取消关注
 */
  cancelFollow: function (e) {
    wx.showModal({
      title: '操作',
      content: '是否要取消关注？',
      success(res) {
        if (res.confirm) {
          Util.request(Api.CancelFollow, {
            follow_id: e.currentTarget.dataset.id
          }).then(res => {
            wx.showToast({
              title: '取消关注成功',
              icon: 'success',
            })
            setTimeout(() => {
              wx.hideToast();
              const data = { user_id: that.data.user_id };
              that.fetchData(data)
            }, 1500)
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    });
  },
})