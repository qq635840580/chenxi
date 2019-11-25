// pages/habit-index/habit-list/index.js
var Util = require("../../../utils/util.js");
var Api = require("../../../config/api.js");
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputVal: "",
    cateList: ['推荐', '健康', '运动', '学习', '效率', '思考'],
    cateIndex: 0,
    list: [],
    page: 1, // 页数
    listRows: 10, //每页显示数量
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      page: 1,
      list: [],
    })
    this.fetchCate();
    this.fetchData();
  },
  /**
   * 数据搜索
   */
  fetchData: function (val) {
    const datas = {
      page: this.data.page,
      listRows: this.data.listRows,
    }
    const data = val ? val : datas;
    Util.request(Api.HabitList, data).then(res => {
      this.setData({
        list: this.data.list.concat(res.data),
        page: this.data.page,
        listRows: this.data.listRows,
      })
    });
  },

  /**
   * 分类搜索
   */
  fetchCate: function (val) {
    Util.request(Api.HabitCate).then(res => {
      this.setData({
        cateList: [{ id: 0, name: '推荐' }, ...res.data]
      })
    });
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
    const data = { name: e.detail.value }
    Util.request(Api.HabitTypeSearch, data).then(res => {
      this.setData({
        list: res.data,
        cateIndex: 0,
      })
    });
  },
  /**
   * 点击增加
   */
  addClick: function (e) {
    console.log(e)
  },
  /**
   * 点击分类
   */
  cateClick: function (e) {
    const data = { cate_id: e.currentTarget.dataset.id };
    this.setData({
      cateIndex: e.currentTarget.dataset.index,
      page: 1,
      list: [],
    });
    this.fetchData(data)
  },
  /**
   * 点击确认搜索
   */
  searchType: function (e) {
    console.log(e)
    const data = { name: e.detail.value }
    Util.request(Api.HabitTypeSearch, data).then(res => {
      this.setData({
        list: res.data,
        cateIndex: 0,
      })
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function (e) {
    this.setData({
      page: this.data.page + 1,
    })
    this.fetchData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})