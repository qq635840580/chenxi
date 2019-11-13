// pages/details/habitDetails/index.js
var Util = require("../../../utils/util.js");
var Api = require("../../../config/api.js");
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    total_user: 0,
    total_clock: 0,
    habitName: null,
    isShow: false,
    isDel: false,
    clock_id: null,
    checkboxData: [],
    isReport :true,
    is_clock: 0,
    is_join: 0,
  },
  /**
   * 跳转排行榜
   */
  gotoRanking: () => {
    wx.navigateTo({
      url: '../ranking/index',
    })
  },

  /**
   * 跳转成员
   */
  gotoPerson: () => {
    wx.navigateTo({
      url: '../person/index',
    })
  },

  /**
   * 跳转设置
   */
  gotoInstall: () => {
    wx.navigateTo({
      url: '../install/index',
    })
  },
  onShareAppMessage: function (e) {
  }
})

Component({
  properties: {
    habit_id: {
      type: Number,
    }
  },
  lifetimes: {
    attached: function () {
      // // 在组件实例进入页面节点树时执行
      this.fetchData();
      this.setData({
        checkboxData: [
          { name: '0', value: '色情低俗' },
          { name: '1', value: '不友善行为',},
          { name: '2', value: '涉政敏感' },
          { name: '3', value: '广告推销' },
          { name: '4', value: '违法犯罪' },
          { name: '5', value: '侵权盗用' },
          // { name: '6', value: '其他' },
        ],
      })
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
    // 组件首次渲染完毕
    ready: function() {
      
    },
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () { 
      this.fetchData();

    },
    hide: function () { },
    resize: function () { },
  },
  methods: {
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function (e) {
    }, 
    /**
     * 初始化页面值
     */
    fetchData: function(pageNo) {
      // wx.showLoading({
      //   title: '加载中',
      // });
      const data = { habit_id: this.data.habit_id, page: pageNo? pageNo: 1};
      Util.request(Api.HabitDynamicList, data).then(res => {
        this.setData({
          list: pageNo && pageNo > 1 ? [...this.data.list, ...res.data.list] : res.data.list,
          total_user: res.data.total_user,
          total_clock: res.data.total_clock,
          habitName: res.data.name,
          is_clock: res.data.is_clock,
          is_join: res.data.is_join,
        });
        wx.hideLoading();
      });
    },

    /**
     * 点赞
     */
    support: function (e) {
      const data = { clock_record_id: e.target.dataset.id, type: 1, };
      let list = this.data.list;
      let isPraise = e.target.dataset.is_praise;
      let id = e.target.dataset.id;
      list.forEach(item => {
        if(item.id == id) {
          if(isPraise) {
            item.support_count = item.support_count - 1;
            item.is_praise = 0;
          }else {
            item.support_count = item.support_count + 1;
            item.is_praise = 1;
          }
        }
      });
      this.setData({
        list: list
      });
      if(isPraise) {
        Util.request(Api.CancelSupport, data);
      }else {
        Util.request(Api.SupportSave, data);
      }
    },

    clickMessage: function (e) {
      console.log(e)
    },
    
    //点击评论 input聚焦
    saveIsInput: function (e) {
      //每次先暂存点击评论的id，方便提交的时候获取到
      // this.setData({
      //   isInput: true,
      //   focusId: e.currentTarget.dataset.id,
      // })
      // console.log(e)
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
     * 跳转排行榜
     */
    gotoRanking:function () {
      const habit_id = this.data.habit_id;
      const name = this.data.habitName;
      wx.navigateTo({
        url: `../ranking/index?habit_id=${habit_id}&name=${name}`,
      })
    },

    /**
     * 跳转成员
     */
    gotoPerson:function () {
      const habit_id = this.data.habit_id;
      wx.navigateTo({
        url: '../person/index?habit_id='+ habit_id,
      })
    },

    /**
     * 跳转设置
     */
    gotoInstall: function() {
      const habit_id = this.data.habit_id;
      wx.navigateTo({
        url: '../install/index?habit_id=' + habit_id,
      })
    },

    /**
     * 跳转动态详情
     */
    gotoDetails: () => {
      wx.navigateTo({
        url: '../clockInDetails/index',
      })
    },

    /**
     * 点击邀请好友
     */
    openPerson: function() {
      
    },

    /**
     * 点击打卡
     */
    gotoClock: function() {
      const habit_id = this.data.habit_id;
      wx.navigateTo({
        url: '../clock/index?habit_id='+ habit_id,
      })
    },
    /**
     * 跳转到动态的详情
     */
    gotoClockInDetails: function(e) {
      const id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: `../clockInDetails/index?id=${id}`,
      })
    },
    /**
     * 点击图片 查看全屏图片
     */
    viewImage:function(e) {
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
    gotoHomePage: function(e) {
      const uid = e.currentTarget.dataset.uid;
      wx.navigateTo({
        url: `../../homePage/index?uid=${uid}`,
      })
    },
    /**
     * 点击更多 存储起来当前点击的id 赋值给删除按钮
     */
    clickMore:function(e) {
      const is_attention = e.currentTarget.dataset.is_attention;
      const clock_id = e.currentTarget.dataset.clock_id;
      this.setData({
        isShow: true,
        isDel: is_attention==4 ? true : false,
        clock_id: clock_id,
      })
    },
    /**
     * 弹出层点击取消
     */
    cancelClick:function(e) {
      this.setData({
        isShow: false,
      })
    },
    /**
     * 点击删除
     */
    delClick: function(e) {
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
            const data = { clock_record_id: e.currentTarget.dataset.clock_id};
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
    closeReport: function(e) {
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
      if(this.data.reportContent) {
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
      }else {
        wx.showToast({
          title: '请勾选举报选项',
          icon: 'none',
          duration: 1000,
        });
      }
    },
  },
  // ...
})