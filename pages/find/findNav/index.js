// pages/find/findNav/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabflag: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '发现'
    })
  },

  /**
   * 菜单切换
   */
  saveNav: function (e) {
    const { tabflag } = e.currentTarget.dataset;
    this.setData({
      tabflag
    })
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