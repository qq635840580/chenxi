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
    isPublic: true,
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
    this.setData({
      time: e.detail.value
    })
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
   *  是否公开
   */
  isPublic: function(e) {
    this.setData({
      isPublic: e.detail.value
    })
  },

  /**
   * 点击提交触发
   */
  handleSave: function() {
    const { name, iconList, isRemind, time, isPublic } = this.data;
    const data = {
      name,
      is_remind: isRemind? 1: '0',
      is_public: isPublic? 1: '0',
      icon: iconList.icon,
      time,
    }
    if(isRemind) {
      wx.requestSubscribeMessage({
        tmplIds: ['rESRPjZaqk7dhE-MnnKoG6owdEtt_bscXYPC3J3lr0E'],
        success:(res) => {
          console.log(res)
        },
        fail:(res) => {
          console.log(res)
        }
      })
    }else {
      this.handleSubmit(data);
    }
  },

  /**
   * 提交
   */
  handleSubmit: function(data) {
    Util.request(Api.HabitSave, data, 'POST').then(res => {
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
   * 提交表单
   */
  submitForm: function(e) {
    const params = e.detail.value;
    params.is_remind = Number(params.is_remind) == 0 ? '0': 1;
    params.is_public = Number(params.is_public) == 0 ? '0' : 1;
    params.formid = e.detail.formId;
    params.icon = this.data.iconList.icon;
    Util.request(Api.HabitSave, data, 'POST').then(res => {
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
    if(params.is_remind != 0) {
      wx.requestSubscribeMessage({
        tmplIds: ['rESRPjZaqk7dhE-MnnKoG6owdEtt_bscXYPC3J3lr0E'],
        success:(res) => {
          console.log(res)
        },
        fail:(res) => {
          console.log(res)
        }
      })
    }else {
      console.log(params.is_remind)
      this.handleSave(params);
    }
    
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