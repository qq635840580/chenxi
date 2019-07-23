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
    monthList: [],
    yearList: [],
    weekMe: {},
    monthMe: {},
    yearMe: {},
    isShow: false,
    week: true,
    month: false,
    year: false,
    name: null,
    habit_id: null,
    isWeek: false,
    isMonth: false,
    isYear: false,
  },

  saveNav: function (e) {
    const { tabflag } = e.target.dataset
    this.setData({
      tabflag,
      week: tabflag==1,
      month: tabflag==2,
      year: tabflag==3,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const data = { habit_id: options.habit_id };
    this.setData({
      name: options.name,
      habit_id: options.habit_id,
    })
    this.fetchData(data);
  },

  /**
   * 查询方法
   */
  fetchData:function(data) {
    //查询周榜
    Util.request(Api.HabitRankingWeek, data).then(res => {
      let list = res.data.list;
      // 长度为1、2、3时分别插入image，
      if (list.length == 1) {
        list[0].image = '/img/ranking/one.png';
      } else if (list.length == 2) {
        list[0].image = '/img/ranking/one.png';
        list[1].image = '/img/ranking/two.png';
      } else if (list.length >= 3) {
        list[0].image = '/img/ranking/one.png';
        list[1].image = '/img/ranking/two.png';
        list[2].image = '/img/ranking/three.png';
      }
      console.log(res.data.own.user)
      this.setData({
        weekList: list,
        weekMe: res.data.own,
        isWeek: res.data.own.user==undefined? false: true,
      })
    });
    //查询月榜
    Util.request(Api.HabitRankingMonth, data).then(res => {
      let list = res.data.list;
      // 长度为1、2、3时分别插入image，
      if (list.length == 1) {
        list[0].image = '/img/ranking/one.png';
      } else if (list.length == 2) {
        list[0].image = '/img/ranking/one.png';
        list[1].image = '/img/ranking/two.png';
      } else if (list.length >= 3) {
        list[0].image = '/img/ranking/one.png';
        list[1].image = '/img/ranking/two.png';
        list[2].image = '/img/ranking/three.png';
      }
      this.setData({
        monthList: list,
        monthMe: res.data.own,
        isMonth: res.data.own.user == undefined ? false : true,
      })
    });
    //查询年榜
    Util.request(Api.HabitRankingYear, data).then(res => {
      let list = res.data.list;
      // 长度为1、2、3时分别插入image，
      if (list.length == 1) {
        list[0].image = '/img/ranking/one.png';
      } else if (list.length == 2) {
        list[0].image = '/img/ranking/one.png';
        list[1].image = '/img/ranking/two.png';
      } else if (list.length >= 3) {
        list[0].image = '/img/ranking/one.png';
        list[1].image = '/img/ranking/two.png';
        list[2].image = '/img/ranking/three.png';
      }
      this.setData({
        yearList: list,
        yearMe: res.data.own,
        isYear: res.data.own.user == undefined ? false : true,
      })
    });
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
   * 点赞
   */
  pariseClick: function(e) {
    console.log(e.currentTarget.dataset.id)
    const data = { id: e.currentTarget.dataset.id, type: e.currentTarget.dataset.type};
    Util.request(Api.RankParise, data).then(res => {
      const datas = { habit_id: this.data.habit_id};
      this.fetchData(datas)
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