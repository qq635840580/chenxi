// pages/habit-index/index/index.js
var Util = require("../../../utils/util.js");
var Api = require("../../../config/api.js");
var that, App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [], //列表数据
    user_id: null, //用户id
    page: 1, // 页数
    listRows: 20, //每页显示数量
    habit_id: null,//暂存需要删除的习惯id
    backgroundUrl: null,//背景图暂存区
    isShow: false,//是否展示
    searchFlag: false,//搜索flag
    loginFlag: false,//已登录标识
    gifFlag: false,//gif图是否展示， 默认不展示
    endDate: '',//结束时间
  },
  onTabItemTap: function () {
    App.getTotalCount();
  },

  onLoad: function (options) {
    that = this
    this.setData({
      searchFlag: false,
      loginFlag: false
    });
  },

  /**
   * 页面数据查询
   */
  fetchData() {
    const data = {
      user_id: this.data.user_id,
      listRows: this.data.listRows
    };
    wx.showLoading({
      title: '加载中',
    })
    Util.request(Api.HabitMyList, data).then(res => {
      this.setData({
        list: res.data,
        searchFlag: true,
        loginFlag: true,
      });
      wx.hideLoading();
      this.indexGifFlag();
      App.getTotalCount();
    }).catch(res => {
      this.setData({
        list: [],
        searchFlag: true,
        page: 1
      })
    });
  },

  /**
   * 获取倒计时区域相关信息
   */
  backgroundUrl: function () {
    Util.request(Api.BackgroundIndex).then(res => {
      this.setData({
        backgroundUrl: res.data[0],
        endDate: res.data[0].end_time
      });
      this.timeFunc();
    });
  },

  /**
   * 获取当前storage是否操作过收藏小程序的过程
   */
  indexGifFlag: function () {
    wx.getStorage({
      key: 'gifFlag',
      success: function (res) {
        that.setData({
          gifFlag: res.data,
        })
      },
      fail: function (error) {
        that.setData({
          gifFlag: true,
        })
      },
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
    //初始化值
    this.setData({
      searchFlag: false,
      loginFlag: false,
      page: 1,
      list: [],
    });
    wx.getStorage({
      key: 'uid',
      success: function (res) {
        that.setData({
          loginFlag: true,
          user_id: res.data
        });
        that.fetchData();
      },
      fail: function () {
        that.fetchData();
      },
    });

    // this.timeFunc();
    this.backgroundUrl();
  },

  /**
   * 点击习惯 跳转对应的习惯列表
   */
  gotoHabitList: function(e) {
    const { habit_id } = e.currentTarget.dataset;
    //提醒习惯打卡
    wx.requestSubscribeMessage({
      tmplIds: ['_4WivtD2yhy0w4dTSM3a_Wwe2hlYduW88FyhE7H2oAs', 'rESRPjZaqk7dhE-MnnKoG6owdEtt_bscXYPC3J3lr0E'],
      success: (res) => {
        wx.navigateTo({
          url: `/pages/habit-index/habit-detail-nav/index?habit_id=${habit_id}`
        });
        console.log('订阅调用成功')
      },
      fail: (res) => {
        wx.navigateTo({
          url: `/pages/habit-index/habit-detail-nav/index?habit_id=${habit_id}`
        });
        console.log(res)
      }
    });
  },

  /**
   * 长按习惯
   */
  longPressHabit: function (e) {
    const that = this;
    if (e.type == 'longpress') {
      wx.showModal({
        content: '是否要删除当前习惯？',
        success(res) {
          if (res.confirm) {
            const data = {
              habit_id: e.currentTarget.dataset.habit_id,
              user_id: wx.getStorageSync('uid'),
            };
            Util.request(Api.DeleteHabit, data).then(res => {
              that.setData({
                isShow: false,
                page: 1,
              });
              wx.showToast({
                title: '删除成功',
                icon: 'success',
              });
              setTimeout(() => {
                wx.hideToast();
                that.fetchData();
              }, 1500)
            });
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      });
    }
  },

  /**
   * 删除习惯操作
   */
  delClick: function (e) {
    const data = {
      habit_id: e.currentTarget.dataset.habit_id,
      user_id: wx.getStorageSync('uid'),
    };
    Util.request(Api.DeleteHabit, data).then(res => {
      this.setData({
        isShow: false,
        page: 1,
      });
      wx.showToast({
        title: '删除成功',
        icon: 'success',
      });
      wx.showTabBar({})
      setTimeout(() => {
        wx.hideToast();
        this.fetchData();
      }, 1500)
    });
  },

  /**
   * 弹出层取消
   */
  cancelClick: function (e) {
    this.setData({
      isShow: false,
    })
    wx.showTabBar({})
  },

  /**
   * 倒计时方法
   */
  timeFunc: function () {
    //获取当前时间
    var date = new Date();
    var now = date.getTime();
    //设置截止时间  
    var str = this.data.endDate;
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
   * 点击未登录的新增习惯提示未登录 跳转
   */
  addHabitClick: function (e) {
    const { loginFlag } = this.data;
    if (loginFlag) {
      wx.navigateTo({
        url: `../habit-list/index`,
      })
    } else {
      wx.showModal({
        content: '当前未登录，登录后即可享受小程序全部功能',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/login/index'
            });
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      });
    }
  },

  /**
   * 点击关闭gif图
   */
  clickGif: function () {
    this.setData({ gifFlag: false });
    wx.setStorageSync('gifFlag', false);
  },

  /**
   * 点击倒计时跳转
   */
  gotoDetails: function() {
    wx.navigateTo({
      url: this.data.backgroundUrl.web_url,
    })
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
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})