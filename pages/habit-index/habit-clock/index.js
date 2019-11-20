// pages/habit-index/habit-clock/index.js
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
  release: function (e) {
    const { habit_id, textVal, imgAry } = this.data;
    if (!textVal && !imgAry.length) {
      wx.showToast({
        title: '请填写发布内容',
        icon: 'none',
        duration: 1000,
      });
      return;
    }
    wx.showLoading({
      title: '加载中',
    })
    const data = { habit_id, content: textVal, images: imgAry, formid: e.detail.formId };
    Util.request(Api.ClockSave, data).then(res => {
      wx.navigateBack({
        delta: 1,
      });
      wx.hideLoading()
    });
  },

  /**
   * 点击上传图片
   */
  /**
   * 点击上传图片
   */
  addImg: function () {
    let that = this;
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        tempFilePaths.forEach(item => {
          wx.uploadFile({
            url: Api.UploadImg,
            filePath: item,
            name: 'fileId',
            header: {
              'token': wx.getStorageSync('token'),
              'uid': wx.getStorageSync('uid'),
              'openid': wx.getStorageSync('openid'),
            },
            success: function (res1) {
              let newRes = JSON.parse(res1.data);
              that.setData({
                imgAry: [...that.data.imgAry, newRes.data.msg]
              })
            }
          })
        });
      }
    })
  },

  /**
   * 删除图片
   */
  delImage: function (e) {
    const index = e.currentTarget.dataset.index;
    let list = this.data.imgAry;
    list.splice(index, 1)
    this.setData({
      imgAry: list
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
    let val = e.detail.value;
    let keyCode = e.detail.keyCode;
    let newVal;
    if (keyCode == 10) {
      // newVal = val + '<br/>'
      newVal = val;
    } else {
      newVal = val
    }
    this.setData({
      textVal: newVal,
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