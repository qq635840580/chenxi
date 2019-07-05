// pages/index/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputVal: "",
    cateList: ['推荐', '健康', '运动', '学习', '效率', '思考', '推荐', '健康', '运动', '学习', '效率', '思考'],
    cateIndex: 0,
    list: [
      {
        img: '/uploads/home/zaoqi.png',
        title: '早起',
        is_clock: true,
        days: '618',
        remind: '5:00'
      },
      {
        img: '/uploads/home/zaoshui.png',
        title: '早睡',
        is_clock: false,
        days: '618',
        remind: '21:00'
      },
      {
        img: '/uploads/home/paobu.png',
        title: '跑步',
        is_clock: true,
        days: '618',
        remind: null
      },
      {
        img: '/uploads/home/jianshen.png',
        title: '健身',
        is_clock: false,
        days: '618',
        remind: null
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  /**
   * 清空搜索框内容
   */
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  /**
   * 搜索框输入内容
   */
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  }
})