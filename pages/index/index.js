// pages/index/index.js
var Util = require("../../utils/util.js");
var Api = require("../../config/api.js");
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[], //列表数据
    user_id: null, //用户id
    page: 1, // 页数
    listRows: 20, //每页显示数量
    isNull: false,//是否有数据
    isShow: false,//是否展示删除习惯
    habit_id: null,//暂存需要删除的习惯id
    backgroundUrl: null,//背景图暂存区
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    
  },

  /**
   * 页面数据查询
   */
  fetchData() {
    const data = {
      user_id: this.data.user_id,
      page: this.data.page,
      listRows: this.data.listRows
    };
    wx.showLoading({
      title: '加载中',
    })
    Util.request(Api.HabitMyList, data).then(res => {
      this.setData({
        list: res.data,
        isNull: res.data.length==0? true : false,
      })
      wx.hideLoading()
    });
  },

  /**
   * 获取倒计时区域相关信息
   */
  backgroundUrl:function() {
    Util.request(Api.BackgroundIndex).then(res => {
      this.setData({
        backgroundUrl: res.data[0]
      })
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
    wx.getStorage({
      key: 'uid',
      success: function (res) {
        that.setData({
          user_id: res.data,
          page: 1,
          list: [],
        })
        that.fetchData();
      },
    })
    this.timeFunc();
    this.backgroundUrl();
  },

  /**
   * 长按习惯
   */
  longPressHabit:function(e) {
    if(e.type=='longpress') {
      console.log(e)
      this.setData({
        isShow: true,
        habit_id: e.currentTarget.dataset.habit_id,
      });
    }
  },

  /**
   * 删除习惯操作
   */
  delClick:function(e) {
    const data = { 
      habit_id: e.currentTarget.dataset.habit_id, 
      user_id: wx.getStorageSync('uid'),
      };
    Util.request(Api.DeleteHabit, data).then(res => {
      this.setData({
        isShow: false,
      });
      wx.showToast({
        title: '删除成功',
        icon: 'success',
      });
      setTimeout(() => {
        wx.hideToast();
        this.fetchData();
      }, 1500)
    });
  },

  /**
   * 弹出层取消
   */
  cancelClick:function(e) {
    this.setData({
      isShow: false,
    })
  },

  /**
   * 倒计时方法
   */
  timeFunc: function() {
    //获取当前时间
    var date = new Date();
    var now = date.getTime();
    //设置截止时间  
    var str = "2020/1/1 00:00:00";
    var endDate = new Date(str);
    var end = endDate.getTime();
    //时间差  
    var leftTime = end - now;
    //定义变量 d,h,m,s保存倒计时的时间  
    var d, h, m, s;
    if (leftTime >= 0) {
      d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
      h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
      m = Math.floor(leftTime / 1000 / 60 % 60);
      s = Math.floor(leftTime / 1000 % 60);
    }
    this.setData({
      day: d,
      hour: h,
      minute: m,
      seconds: s,
    })
    setTimeout(this.timeFunc, 1000)
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
  onReachBottom: function (e) {
    // this.setData({
    //   page: this.data.page+1,
    // })
    // this.fetchData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})