// pages/details/habitDetails/index.js
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
    total_clock: 0,
    habitName: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    Util.request(Api.HabitDynamicList).then(res => {
      // this.setData({
      //   list: res.data
      // })
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

  },

  /**
   * 跳转排行榜
   */
  gotoRanking: () => {
    wx.navigateTo({
      url: '../ranking/index',
    })
  },

  /**
   * 跳转成员
   */
  gotoPerson: () => {
    wx.navigateTo({
      url: '../person/index',
    })
  },

  /**
   * 跳转设置
   */
  gotoInstall: () => {
    wx.navigateTo({
      url: '../install/index',
    })
  },

})

Component({
  properties: {
    habit_id: {
      type: Number,
    }
  },
  lifetimes: {
    attached: function () {
      // // 在组件实例进入页面节点树时执行
      this.fetchData();
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
    
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () { 
      this.fetchData();
    },
    hide: function () { },
    resize: function () { },
  },
  methods: {
    /**
     * 初始化页面值
     */
    fetchData: function() {
      const data = { habit_id: this.data.habit_id};
      Util.request(Api.HabitDynamicList, data).then(res => {
        this.setData({
          list: res.data.list,
          total_user: res.data.total_user,
          total_clock: res.data.total_clock,
          habitName: res.data.name
        });
      });
    },

    /**
     * 点赞
     */
    support: function (e) {
      const data = { clock_record_id: e.target.dataset.id, type: 1, }
      Util.request(Api.SupportSave, data).then(res => {
        this.fetchData()
      });
    },
    clickMessage: function (e) {
      console.log(e)
    },
    //点击评论 input聚焦
    saveIsInput: function (e) {
      //每次先暂存点击评论的id，方便提交的时候获取到
      this.setData({
        isInput: true,
        focusId: e.currentTarget.dataset.id,
      })
      console.log(e)
    },
    //评论触发的方法
    messageSubmit: function (e) {
      console.log(e)
      const data = {
        clock_record_id: e.currentTarget.dataset.id,
        content: e.detail.value,
        parent_id: e.currentTarget.dataset.contentid ? e.currentTarget.dataset.contentid : undefined,
      };
      Util.request(Api.CommenteSave, data).then(res => {
        this.setData({
          isInput: false,
        })
        this.fetchData()
      });
    },
    /**
     * 点击评论的评论
     */
    clickContent: function (e) {
      console.log(e.currentTarget.dataset)
      this.setData({
        focusId: e.currentTarget.dataset.clockid,
        contentId: e.currentTarget.dataset.contentid,
        isInput: true,
      })
    },
    /**
     * 失去焦点
     */
    blurHandler: function (e) {
      this.setData({
        isInput: false,
      })
    },

    gotoRanking:function () {
      const habit_id = this.data.habit_id;
      const name = this.data.habitName;
      wx.navigateTo({
        url: `../ranking/index?habit_id=${habit_id}&name=${name}`,
      })
    },

    /**
     * 跳转成员
     */
    gotoPerson:function () {
      const habit_id = this.data.habit_id;
      wx.navigateTo({
        url: '../person/index?habit_id='+ habit_id,
      })
    },

    /**
     * 跳转设置
     */
    gotoInstall: function() {
      const habit_id = this.data.habit_id;
      wx.navigateTo({
        url: '../install/index?habit_id=' + habit_id,
      })
    },

    /**
     * 跳转动态详情
     */
    gotoDetails: () => {
      wx.navigateTo({
        url: '../clockInDetails/index',
      })
    },

    /**
     * 点击邀请好友
     */
    openPerson: function() {
      
    },

    /**
     * 点击打卡
     */
    gotoClock: function() {
      const habit_id = this.data.habit_id;
      wx.navigateTo({
        url: '../clock/index?habit_id='+ habit_id,
      })
    },
    /**
     * 跳转到动态的详情
     */
    gotoClockInDetails: function(e) {
      const id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: `../clockInDetails/index?id=${id}`,
      })
    }
  },
  // ...
})