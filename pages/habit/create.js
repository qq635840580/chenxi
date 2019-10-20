// pages/habit/create.js
var Util = require("../../utils/util.js");
var Api = require("../../config/api.js");
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    time: '05:00',
    isRemind: true,
    iconList: {},//存储图标

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this
    this.setData({
      name: options.name
    });
    this.getHabitIcon(options);
  },

  /**
   * 获取图标
   */
  getHabitIcon:function(options) {
    console.log(options)
    if(options.iconid) {
      this.setData({
        iconList: {
          icon:options.url,
          id: options.iconid
        }
      })
    }else {
      Util.request(Api.GetHabitIcon).then(res => {
        this.setData({
          iconList: res.data[0]
        });
      });
    }
  },

  /**
   * 存储填写名称
   */
  habitname:function(e) {
    this.setData({
      name: e.detail.value,
    })
  },

  /**
   * 选择时间
   */
  bindTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  /**
   * 提交表单
   */
  submitForm: function(e) {
    const params = e.detail.value;
    params.is_remind = Number(params.is_remind) == 0 ? '0': 1;
    params.is_public = Number(params.is_public) == 0 ? '0' : 1;
    params.formid = e.detail.formId;
    params.icon = this.data.iconList.icon;
    Util.request(Api.HabitSave, params, 'POST').then(res => {
      if (res.code === '200') {
        //创建成功以后给一个表示 返回首页判断是否刷新
        wx.setStorageSync('isJoin', true)
        wx.showToast({
          title: '创建成功',
          icon: 'success',
          duration: 1500,
        })
        wx.switchTab({
          url: '/pages/index/index',
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 1500,
        })
      }
    });
  },
  /**
   * 提醒
   */
  isRemind:function(e) {
    this.setData({
      isRemind: e.detail.value
    })
  },

  /**
   * 去往图标列表
   */
  gotoIconList:function() {
    wx.navigateTo({
      url: `./icon-list?name=${this.data.name}`,
    })
  },
})