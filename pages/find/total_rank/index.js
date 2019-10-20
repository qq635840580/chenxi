// pages/find/total_rank/index.js
var Util = require("../../../utils/util.js");
var Api = require("../../../config/api.js");
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rankingTotalList: [],
    own: {},
    logFlag: false,
    isShow: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

Component({
  lifetimes: {
    attached: function () {
      // this.fetchData();
      this.logFlag();
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },

  },
  methods: {
    /**
     * 请求数据
     */
    fetchData:function(data) {
      wx.showLoading({
        title: '加载中',
      })
      Util.request(Api.FindTotalRank,data).then(res => {
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
        if (data && data.page > 1) {
          this.setData({
            rankingTotalList: [...this.data.rankingTotalList, ...list],
            own: res.data.own
          })
          wx.hideLoading()
          return;
        }
        this.setData({
          rankingTotalList: list,
          own: res.data.own
        })
        wx.hideLoading()
      });
    },

    /**
     * 获取当前是否已登录
     */
    logFlag: function() {
      wx.getStorage({
        key: 'uid',
        success:  (res) => {
          this.setData({
            logFlag: true,
          });
          this.fetchData();
        },
      });
    },

    /**
     * 点击登录 跳转
     */
    clickLogin: function(e) {
      wx.navigateTo({
        url: '/pages/login/index'
      });
    },

    /**
     * 点赞
     */
    pariseClick: function(e) {
      const data = { id: e.currentTarget.dataset.id, type: 8};
      let own = this.data.own;
      let rankList = this.data.rankingTotalList;
      let id = e.currentTarget.dataset.id;
      let isPraise = e.currentTarget.dataset.praise;
      let flag = e.currentTarget.dataset.isown? true : false;
      if(flag) {
        if(isPraise) {
          own.total_praise_count = own.total_praise_count - 1;
          own.is_praise = 0;
        }else {
          own.total_praise_count = own.total_praise_count + 1;
          own.is_praise = 1;
        }
      }
      rankList.forEach(item => {
        if(item.id == id) {
          if(isPraise) {
            item.total_praise_count = item.total_praise_count - 1;
            item.is_praise = 0;
          }else {
            item.total_praise_count = item.total_praise_count + 1;
            item.is_praise = 1;
          }
        }
      })
      this.setData({
        rankingTotalList: rankList,
        own: own
      })

      if(isPraise) {
        Util.request(Api.RankCancelParise, data);
      }else {
        Util.request(Api.RankParise, data);
      }
    },
    /**
     * 去往个人主页
     */
    gotoHomePage: function (e) {
      const uid = e.currentTarget.dataset.uid;
      wx.navigateTo({
        url: `../../homePage/index?uid=${uid}`,
      })
    },

    /**
     * 查看说明
     */
    clickMessage: function(e) {
      this.setData({
        isShow: true
      })
    },

    /**
     * 
     */
    isShowDialog: function(e) {
      this.setData({
        isShow: false
      })
    },

  },
})