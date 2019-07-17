// pages/details/clock/index.js
var Util = require("../../../utils/util.js");
var Api = require("../../../config/api.js");
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    habit_id: null,
    textVal: null,
    imgAry: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      habit_id: options.habit_id,
    })
  },

  /**
   * 发布
   */
  release: function() {
    const {habit_id, textVal} = this.data;
    const data = { habit_id, content:textVal};
    Util.request(Api.ClockSave, data).then(res => {
      // this.setData({
      //   list: res.data
      // })
      wx.navigateBack({
        delta: 1,
      });
    });
  },

  /**
   * 点击上传图片
   */
  addImg:function() {
    let that = this;
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        tempFilePaths.forEach(item => {
          let listImg = that.data.imgAry;
          console.log(listImg)
          console.log(item)
          let newListImg = listImg.push(item);
          console.log(newListImg)
          that.setData({
            imgAry: newListImg,
          })
          wx.uploadFile({
            url: Api.UploadImg,
            filePath: item,
            name: 'file',
            header: {
              'token': wx.getStorageSync('token'),
              'uid': wx.getStorageSync('uid')
            },
            // body: {
            //   field:item,
            // },
            success: function (res) {
              // util.debug(res);
              console.log(res)
            }
          })
        });
      }
    })
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

  eventhandle: function (e) {
    console.log(e)
    this.setData({
      textVal: e.detail.value,
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
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})