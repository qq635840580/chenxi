// pages/habit-index/habit-detail-my-list/index.js
var Util = require("../../../utils/util.js");
var Api = require("../../../config/api.js");
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    habitDetail: null,//习惯详细
    isShow: false,
    isDel: false,
    clock_id: null,
    checkboxData: [],
    isReport: false,
    is_clock: 0,
    is_join: 0,
    page: 1,
    checkboxData: [
      { name: '0', value: '色情低俗' },
      { name: '1', value: '不友善行为', },
      { name: '2', value: '涉政敏感' },
      { name: '3', value: '广告推销' },
      { name: '4', value: '违法犯罪' },
      { name: '5', value: '侵权盗用' },
      // { name: '6', value: '其他' },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      habit_id: options.habit_id,
      user_id: options.user_id,
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
    this.fetchData();
  },

  /**
   * 初始化页面值
   */
  fetchData: function (pageNo) {
    wx.showLoading({
      title: '加载中',
    });
    const data = { habit_id: this.data.habit_id, user_id: this.data.user_id, page: pageNo ? pageNo : 1 };
    Util.request(Api.HabitDetail, data).then(res => {
      this.setData({
        list: pageNo && pageNo > 1 ? [...this.data.list, ...res.data.list] : res.data.list,
        habitDetail: res.data.habit,
      });
      wx.hideLoading();
    });
  },

  /**
   * 点赞
   */
  support: function (e) {
    if (e.target.dataset.is_praise || e.target.dataset.is_praise === 1) {
      /**
       * 取消点赞操作
       */
      const data = { clock_record_id: e.target.dataset.id, type: 1, }
      Util.request(Api.CancelSupport, data).then(res => {
        this.fetchData()
      });
      return;
    } else {
      /**
       * 点赞操作
       */
      const data = { clock_record_id: e.target.dataset.id, type: 1, }
      Util.request(Api.SupportSave, data).then(res => {
        this.fetchData()
      });
    }
  },
  clickMessage: function (e) {
    console.log(e)
  },

  //点击评论 input聚焦
  saveIsInput: function (e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../clockInDetails/index?id=${id}`,
    })
  },

  //评论触发的方法
  messageSubmit: function (e) {
    console.log(e)
    const data = {
      clock_record_id: e.currentTarget.dataset.id,
      content: e.detail.value,
      parent_id: e.currentTarget.dataset.contentid ? e.currentTarget.dataset.contentid : undefined,
    };
    Util.request(Api.CommenteSave, data).then(res => {
      this.setData({
        isInput: false,
        contentId: null,
      })
      this.fetchData()
    });
  },

  /**
   * 点击评论的评论
   */
  clickContent: function (e) {
    console.log(e.currentTarget.dataset)
    this.setData({
      focusId: e.currentTarget.dataset.clockid,
      contentId: e.currentTarget.dataset.contentid,
      isInput: true,
    })
  },

  /**
   * 失去焦点
   */
  blurHandler: function (e) {
    this.setData({
      isInput: false,
    })
  },

  /**
   * 跳转到动态的详情
   */
  gotoClockInDetails: function (e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../../common/dynamic-detail/index?id=${id}&type=1`,
    })
  },

  /**
   * 点击图片 查看全屏图片
   */
  viewImage: function (e) {
    const cueerntImg = e.currentTarget.dataset.imgcurrent;
    let imgList = e.currentTarget.dataset.imglist;
    let newImgList = [];
    imgList.forEach(item => {
      newImgList.push(item.path)
    })
    wx.previewImage({
      current: cueerntImg, // 当前显示图片的http链接
      urls: newImgList // 需要预览的图片http链接列表
    })
  },

  /**
   * 点击跳转个人主页
   */
  gotoHomePage: function (e) {
    const uid = e.currentTarget.dataset.uid;
    wx.navigateTo({
      url: `../../common/home-page/index?uid=${uid}`,
    })
  },

  /**
   * 点击更多 存储起来当前点击的id 赋值给删除按钮
   */
  clickMore: function (e) {
    let that = this;
    wx.getStorage({
      key: 'uid',
      success: (res) => {
        const is_attention = e.currentTarget.dataset.is_attention;
        const clock_id = e.currentTarget.dataset.clock_id;
        that.setData({
          isShow: true,
          isDel: is_attention == 4 ? true : false,
          clock_id: clock_id,
        });
      },
      fail: function (e) {
        wx.showModal({
          content: '当前未登录，登录后即可享受小程序全部功能',
          success(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/login/index'
              });
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    });
  },
  /**
   * 弹出层点击取消
   */
  cancelClick: function (e) {
    this.setData({
      isShow: false,
    })
  },
  /**
   * 点击删除
   */
  delClick: function (e) {
    this.setData({
      isShow: false,
    })
    let that = this;
    wx.showModal({
      content: '确认要删除这条动态？',
      confirmText: '删除',
      confirmColor: '#F65C5C',
      success(res) {
        if (res.confirm) {
          const data = { clock_record_id: e.currentTarget.dataset.clock_id };
          Util.request(Api.DeleteDetails, data).then(res => {
            that.fetchData();
            wx.showToast({
              title: '删除成功',
              icon: 'success',
              duration: 2500,
            });
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 点击举报确认
   */
  checkboxChange: function (e) {
    this.setData({
      reportContent: e.detail.value
    });
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },
  /**
   * 关闭举报窗口
   */
  closeReport: function (e) {
    this.setData({
      isReport: false,
    })
  },
  /**
   * 点击举报
   */
  reportClick: function (e) {
    this.setData({
      isShow: false,
      isReport: true,
    })
  },
  /**
   * 点击确认举报
   */
  enterReport: function (e) {
    if (this.data.reportContent) {
      const data = {
        clock_record_id: e.currentTarget.dataset.clock_id,
        type: this.data.reportContent.join(','),
      };
      let that = this;
      Util.request(Api.TipofDetails, data).then(res => {
        that.fetchData();
        this.setData({
          isReport: false,
        })
        wx.showToast({
          title: '举报成功',
          icon: 'success',
          duration: 2500,
        });
      });
    } else {
      wx.showToast({
        title: '请勾选举报选项',
        icon: 'none',
        duration: 1000,
      });
    }
  },

  /**
   * 跳转至习惯详情
   */
  gotoHabitDetails: function () {
    wx.navigateTo({
      url: `../habit-detail-nav/index?habit_id=${this.data.habit_id}`
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
    let page = this.data.page + 1;
    this.fetchData(page);
    this.setData({ page: page });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }

})