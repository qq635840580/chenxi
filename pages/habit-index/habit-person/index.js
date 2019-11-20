// pages/habit-index/habit-person/index.js
var Util = require("../../../utils/util.js");
var Api = require("../../../config/api.js");
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    total_user: 0,
    habit_id: null,
    page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const data = { habit_id: options.habit_id };
    this.setData({
      habit_id: options.habit_id,
      page: this.data.page || 1
    })
    this.fetchData(data)
  },

  /**
   * 查询数据
   */
  fetchData: function (data) {
    Util.request(Api.HabitPerson, data).then(res => {
      this.setData({
        list: res.data.list,
        total_user: res.data.total_user,
      })
    });
  },

  /**
   * 点击关注
   */
  attentClick: function (e) {
    // console.log(`触发`)
    const data = { follow_id: e.currentTarget.dataset.uid, };
    Util.request(Api.FollowSave, data).then(res => {
      const datas = { habit_id: this.data.habit_id }
      this.fetchData(datas)
    });
  },

  /**
   * 去往个人主页
   */
  gotoHomePage: function (e) {
    const uid = e.currentTarget.dataset.uid;
    wx.navigateTo({
      url: `../../common/home-page/index?uid=${uid}`,
    })
  },
  onReachBottom: function () {
    let data = {
      habit_id: this.data.habit_id,
      page: ++this.data.page,
    }
    Util.request(Api.HabitPerson, data).then(res => {
      if (res.data.list.length) {
        this.setData({
          page: data.page,
          list: [...this.data.list, ...res.data.list],
        })
      }
    });
  },
})