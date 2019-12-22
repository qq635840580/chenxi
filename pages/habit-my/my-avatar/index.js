var Util = require("../../../utils/util.js");
var Api = require("../../../config/api.js");

Page({
  data: {
    src: '',
    width: 250,//宽度
    height: 250,//高度
  },
  onLoad: function (options) {
    //获取到image-cropper实例
    this.cropper = this.selectComponent("#image-cropper");
    //开始裁剪
    this.setData({
      src: options.avatarUrl,
    });
    wx.showLoading({
      title: '加载中'
    })
  },
  cropperload(e) {
    console.log("cropper初始化完成");
  },
  loadimage(e) {
    console.log("图片加载完成", e.detail);
    wx.hideLoading();
    //重置图片角度、缩放、位置
    this.cropper.imgReset();
  },
  clickcut(e) {
    console.log(e.detail);
    //点击裁剪框阅览图片
    wx.previewImage({
      current: e.detail.url, // 当前显示图片的http链接
      urls: [e.detail.url] // 需要预览的图片http链接列表
    })
  },

  clickImg(e) {
    wx.showLoading({
      title: '修改头像中'
    });
    this.selectComponent("#image-cropper").getImg((url) => {
      wx.uploadFile({
        url: Api.UploadAvatar,
        filePath: url.url,
        name: 'fileId',
        header: {
          'token': wx.getStorageSync('token'),
          'uid': wx.getStorageSync('uid'),
          'openid': wx.getStorageSync('openid'),
        },
        success: function (res1) {
          const data = { avatarUrl: JSON.parse(res1.data).data.msg };
          Util.request(Api.UsersEdit, data).then(res => {
            wx.hideLoading();
            wx.navigateBack({
              delta: 1,
            });
          });
        }
      })      
    })
  },
})