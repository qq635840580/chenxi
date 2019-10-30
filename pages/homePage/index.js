// pages/homePage/index.js
  // "navigationStyle":"custom" 

var Util = require("../../utils/util.js");
var Api = require("../../config/api.js");
var that
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_id: null,//当访问别人的主页需要存储userid点击关注需要刷新
    userInfo: {},
    isMy: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    console.log(options)
    if(options.uid) {
      console.log(`有`)
      const data = { user_id: options.uid, }
      this.setData({
        user_id: options.uid,
      });
      this.fetchData(data);
    } else {
      console.log(`没有`)
      wx.getStorage({
        key: 'uid',
        success: function (res) {
          const data = { user_id: res.data };
          that.setData({
            user_id: res.data
          })
          that.fetchData(data)
        },
      })
    }
  },

  /**
   * 访问数据
   */
  fetchData:function(data) {
    wx.showLoading({
      title: '加载中',
    })
    Util.request(Api.MainPage, data).then(res => {
      this.setData({
        userInfo: res.data,
      })
      wx.hideLoading()
    });
  },

  /**
   * 点击关注
   */
  followClick:function(e) {
    console.log(e)
    Util.request(Api.FollowSave, {
      follow_id: that.data.user_id,
    }).then(res => {
      wx.showToast({
        title: '关注成功',
        icon: 'success',
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
  cancelFollow:function(e) {
    wx.showModal({
      title: '操作',
      content: '是否要取消关注？',
      success(res) {
        if (res.confirm) {
          Util.request(Api.CancelFollow, {
            follow_id: that.data.user_id
          }).then(res => {
            wx.showToast({
              title: '取消关注成功',
              icon: 'success',
            })
            setTimeout(()=>{
              const data = { user_id: that.data.user_id };
              that.fetchData(data)
            },1500)
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    });
  },

  /**
   * 点击进入动态详情
   */
  gotoFindDetails:function(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../find/findDetails/index?id=${id}`,
    })
  },

  /**
   * 跳转到习惯列表
   */
  gotoHabitDetails: function (e) {
    const habit_id = e.currentTarget.dataset.habit_id;
    wx.navigateTo({
      url: `../details/habitListMy/index?habit_id=${habit_id}&user_id=${this.data.user_id}`
    })
  },

  /**
   * 点击返回按钮
   */
  goBack: function(e) {
    wx.navigateBack({
      delta: 1,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})