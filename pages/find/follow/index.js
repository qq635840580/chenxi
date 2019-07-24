// pages/find/follow/index.js
var Util = require("../../../utils/util.js");
var Api = require("../../../config/api.js");
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    followList: [],
    focusId: null,
    contentId: null,
    isShow: false,
    isDel: false,
    clock_id: null,
    checkboxData: [],
    isReport: true,
    reportContent: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

Component({
  lifetimes: {
    attached: function () {
      this.setData({
        checkboxData: [
          { name: '0', value: '色情低俗' },
          { name: '1', value: '不友善行为', },
          { name: '2', value: '涉政敏感' },
          { name: '3', value: '广告推销' },
          { name: '4', value: '违法犯罪' },
          { name: '5', value: '侵权盗用' },
          // { name: '6', value: '其他' },
        ],
      });
      this.fetchData();
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },

  },
  methods: {
    /**
     * 获取页面数据
     */
    fetchData: function () {
      Util.request(Api.FindFollow).then(res => {
        this.setData({
          followList: res.data
        })
      });
    },
    /**
     * 点赞
     */
    support: function (e) {
      const data = { clock_record_id: e.target.dataset.id, type: 1, }
      Util.request(Api.SupportSave, data).then(res => {
        this.fetchData()
      });
    },
    clickMessage: function (e) {
      console.log(e)
    },
    //点击评论 input聚焦
    saveIsInput: function (e) {
      //每次先暂存点击评论的id，方便提交的时候获取到
      this.setData({
        isInput: true,
        focusId: e.currentTarget.dataset.id,
      })
      console.log(e)
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
     * 关注
     */
    followHandler: function (e) {
      const data = { follow_id: e.currentTarget.dataset.uid, };
      Util.request(Api.FollowSave, data).then(res => {
        this.fetchData()
      });
    },
    /**
     * 去往个人首页
     */
    gotoHomePage: function (e) {
      console.log(e)
      const uid = e.currentTarget.dataset.uid;
      wx.navigateTo({
        url: `../../homePage/index?uid=${uid}`,
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
     * 点击更多 存储起来当前点击的id 赋值给删除按钮
     */
    clickMore: function (e) {
      const is_attention = e.currentTarget.dataset.is_attention;
      const clock_id = e.currentTarget.dataset.clock_id;
      this.setData({
        isShow: true,
        isDel: is_attention == 4 ? true : false,
        clock_id: clock_id,
      })
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
                duration: 2000
              });
            });
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    /**
     * 点击举报checkbox
     */
    checkboxChange: function (e) {
      this.setData({
        reportContent: e.detail.value
      });
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
          duration: 2000
        });
      });
    },
  },
  // ...
})