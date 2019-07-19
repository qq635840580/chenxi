// pages/index/search.js
var Util = require("../../utils/util.js");
var Api = require("../../config/api.js");
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputVal: "",
    cateList: ['推荐', '健康', '运动', '学习', '效率', '思考'],
    cateIndex: 0,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    Util.request(Api.HabitList).then(res => {
      this.setData({
        list: res.data
      })
    });
    Util.request(Api.HabitCate).then(res => {
      this.setData({
        cateList: res.data
      })
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  /**
   * 清空搜索框内容
   */
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  /**
   * 搜索框输入内容
   */
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  /**
   * 点击增加
   */
  addClick: function (e) {
    console.log(e)
  }
})