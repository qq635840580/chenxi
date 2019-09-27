// pages/find/findNav/index.js
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabflag: 1,
    paddingTop: null,//存储paddingTop的值 试试
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    wx.setNavigationBarTitle({
      title: '发现'
    })
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.statusBarHeight)
        that.setData({
          paddingTop: res.statusBarHeight * 2.5
        })
       }
    });
  },

  /**
   * 菜单切换
   */
  saveNav: function (e) {
    const { tabflag } = e.currentTarget.dataset;
    this.setData({
      tabflag
    });
    if (tabflag == 1) {
      wx.setNavigationBarTitle({
        title: '发现'
      })
    } else if(tabflag == 2) {
      wx.setNavigationBarTitle({
        title: '最新'
      })
    } else if (tabflag == 3) {
      wx.setNavigationBarTitle({
        title: '关注'
      })
    } else if (tabflag == 4) {
      wx.setNavigationBarTitle({
        title: '总榜'
      })
    }
  },

  /**
   * 点击跳转习惯列表页
   */
  gotoHabitList:function() {
    wx.navigateTo({
      url: `../../index/search`
    })
  },
  onReachBottom: function () {
    console.log(999)
  },
})