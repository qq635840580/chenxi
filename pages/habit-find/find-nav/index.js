// pages/habit-find/find-nav/index.js
var that, App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabflag: 1,
    paddingTop: null, //存储paddingTop的值 试试
    page: 1
  },
  onTabItemTap: function() {
    App.getTotalCount();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this;
    wx.setNavigationBarTitle({
      title: '发现'
    })
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          paddingTop: res.statusBarHeight * 2.5
        })
      }
    });
  },

  /**
   * 菜单切换
   */
  saveNav: function(e) {
    const {
      tabflag
    } = e.currentTarget.dataset;
    this.setData({
      tabflag,
      page: 1
    });
    if (tabflag == 1) {
      wx.setNavigationBarTitle({
        title: '发现'
      })
    } else if (tabflag == 2) {
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
  gotoHabitList: function() {
    wx.navigateTo({
      url: `../../habit-index/habit-list/index`
    })
  },

  /**
   * 触底
   */
  onReachBottom: function() {
    let page = ++this.data.page
    let tabflag = this.data.tabflag;
    let routerName;
    if (tabflag == 1) {
      routerName = "#Choice"
    } else if (tabflag == 2) {
      routerName = '#Latest';
    } else if (tabflag == 3) {
      routerName = '#Follow';
    } else if (tabflag == 4) {
      return;
    }
    const component = this.selectComponent(routerName);
    component.fetchData({
      page: this.data.page
    });
    this.setData({
      page,
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(e) {
    const {
      id,
      name,
      total_user
    } = e.target.dataset;
    console.log(id)
    if (id) {
      return {
        path: `/pages/common/dynamic-detail/index?id=${id}&type=2`,
        title: "TA在培养【" + name + "】习惯已经坚持" + total_user + "天"
      }
    }
  }

})