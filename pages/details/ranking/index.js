// pages/details/ranking/index.js
var Util = require("../../../utils/util.js");
var Api = require("../../../config/api.js");
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabflag: 1,
    weekList: [],
    me: {},
    isShow: false,
  },

  saveNav: function (e) {
    const { tabflag } = e.target.dataset
    this.setData({
      tabflag
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const data = { habit_id: options.habit_id };
    //查询周榜
    Util.request(Api.HabitRankineWeek, data).then(res => {
      let list = res.data.list;
      // 长度为1、2、3时分别插入image，
      if(list.length ==1) {
        list[0].image = '/img/ranking/one.png';
      }else if(list.length ==2) {
        list[0].image = '/img/ranking/one.png';
        list[1].image = '/img/ranking/two.png';
      }else if(list.length >=3) {
        list[0].image = '/img/ranking/one.png';
        list[1].image = '/img/ranking/two.png';
        list[2].image = '/img/ranking/three.png';
      }
      this.setData({
        weekList: list,
        me: res.data.own
      })
    });
    //查询月榜
    
    //查询年榜
  },

  /**
   * 是否显示dialog
   */
  isShowDialog:function() {
    this.setData({
      isShow: !this.data.isShow,
    })
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