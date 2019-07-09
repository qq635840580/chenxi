// pages/details/clockIn/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    days_style:[],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let days_style = new Array;
    days_style.push(
      { month: 'current', day: 12, color: 'white', background: '#3ACC88' },
      { month: 'current', day: 17, color: 'white', background: '#3ACC88' },
      { month: 'current', day: 20, color: 'white', background: '#3ACC88' },
      { month: 'current', day: 25, color: 'white', background: '#3ACC88' },
    );
    this.setData({ days_style: days_style});
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