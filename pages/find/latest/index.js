// pages/find/latest/index.js
var Util = require("../../../utils/util.js");
var Api = require("../../../config/api.js");
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latestList: [],
    focusId: null,
    contentId: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
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
    Util.request(Api.FindLatest).then(res => {
      // that.setData({
      //   list: res.data
      // })
    });
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


Component({
  lifetimes: {
    attached: function () {
      this.fetchData();
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },

  },
  methods: {
    /**
     * 获取页面数据
     */
    fetchData: function() {
      Util.request(Api.FindLatest).then(res => {
        this.setData({
          latestList: res.data
        })
      });
    },
    /**
     * 点赞
     */
    support: function(e) {
      const data = { clock_record_id: e.target.dataset.id, type: 1, }
      Util.request(Api.SupportSave, data).then(res => {
        this.fetchData()
      });
    },
    clickMessage: function(e) {
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
    messageSubmit:function(e) {
      console.log(e)
      const data = {
        clock_record_id: e.currentTarget.dataset.id,
        content: e.detail.value,
        parent_id: e.currentTarget.dataset.contentid ? e.currentTarget.dataset.contentid: undefined,
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
    clickContent:function(e) {
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
    blurHandler: function(e) {
      this.setData({
        isInput: false,
      })
    },
    /**
     * 关注
     */
    followHandler: function(e) {
      const data = { follow_id: e.currentTarget.dataset.uid,};
      Util.request(Api.FollowSave, data).then(res => {
        this.fetchData()
      });
    },
    /**
     * 去往个人首页
     */
    gotoHomePage:function(e) {
      console.log(e)
      const uid = e.currentTarget.dataset.uid;
      wx.navigateTo({
        url: `../../homePage/index?uid=${uid}`,
      })
    },
  },
  // ...
})