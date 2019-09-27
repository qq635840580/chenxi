// pages/details/detailsNav/index.js
var Util = require("../../../utils/util.js");
var Api = require("../../../config/api.js");
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabflag: 0,
    habit_id: null,
    is_join: 1,
    img: null,
    loadOptions: null,
    name: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      habit_id: options.habit_id,
      loadOptions: options,
      tabflag: 1,
    })
    const data = { habit_id: options.habit_id};
    Util.request(Api.HabitDynamicList, data).then(res => {
      this.setData({
        is_join: res.data.is_join,
        img: res.data.icon,
        name: res.data.name
      })
      //设置动态标题
      wx.setNavigationBarTitle({
        title: res.data.name
      })
    });
  },

  saveNav: function (e) {
    const { tabflag } = e.currentTarget.dataset;
    this.setData({
      tabflag
    })
  },
  
  /**
   * 加入
   */
  addClick:function() {
    const data = {habit_id: this.data.habit_id};
    Util.request(Api.HabitJoin, data).then(res => {
      wx.showToast({
        title: '加入成功',
        icon: 'success',
      });
      setTimeout(()=>{
        wx.hideToast();
      },1500)
      this.onLoad(this.data.loadOptions)
      //加入成功以后给一个表示 返回首页判断是否刷新
      wx.setStorageSync('isJoin', true)
      this.selectComponent('#dynamic').fetchData();
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
    // this.onLoad(this.data.loadOptions);
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
  onShareAppMessage: function (e) {
    console.log(e)
  }
})