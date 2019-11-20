// pages/habit-index/habit-ranking/index.js
var Util = require("../../../utils/util.js");
var Api = require("../../../config/api.js");
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabflag: 1,
    weekList: [],
    monthList: [],
    yearList: [],
    weekMe: {},
    monthMe: {},
    yearMe: {},
    isShow: false,
    week: true,
    month: false,
    year: false,
    name: null,
    habit_id: null,
    isWeek: false,
    isMonth: false,
    isYear: false,
  },

  saveNav: function (e) {
    const { tabflag } = e.target.dataset
    this.setData({
      tabflag,
      week: tabflag == 1,
      month: tabflag == 2,
      year: tabflag == 3,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const data = { habit_id: options.habit_id };
    this.setData({
      name: options.name,
      habit_id: options.habit_id,
    })
    this.fetchData(data);
  },

  /**
   * 查询方法
   */
  fetchData: function (data) {
    //查询周榜
    Util.request(Api.HabitRankingWeek, data).then(res => {
      let list = res.data.list;
      // 长度为1、2、3时分别插入image，
      if (list.length == 1) {
        list[0].image = '/img/habit-detail/one.png';
      } else if (list.length == 2) {
        list[0].image = '/img/habit-detail/one.png';
        list[1].image = '/img/habit-detail/two.png';
      } else if (list.length >= 3) {
        list[0].image = '/img/habit-detail/one.png';
        list[1].image = '/img/habit-detail/two.png';
        list[2].image = '/img/habit-detail/three.png';
      }
      console.log(res.data.own.user)
      this.setData({
        weekList: list,
        weekMe: res.data.own,
        isWeek: res.data.own.user == undefined ? false : true,
      })
    });
    //查询月榜
    Util.request(Api.HabitRankingMonth, data).then(res => {
      let list = res.data.list;
      // 长度为1、2、3时分别插入image，
      if (list.length == 1) {
        list[0].image = '/img/habit-detail/one.png';
      } else if (list.length == 2) {
        list[0].image = '/img/habit-detail/one.png';
        list[1].image = '/img/habit-detail/two.png';
      } else if (list.length >= 3) {
        list[0].image = '/img/habit-detail/one.png';
        list[1].image = '/img/habit-detail/two.png';
        list[2].image = '/img/habit-detail/three.png';
      }
      this.setData({
        monthList: list,
        monthMe: res.data.own,
        isMonth: res.data.own.user == undefined ? false : true,
      })
    });
    //查询年榜
    Util.request(Api.HabitRankingYear, data).then(res => {
      let list = res.data.list;
      // 长度为1、2、3时分别插入image，
      if (list.length == 1) {
        list[0].image = '/img/habit-detail/one.png';
      } else if (list.length == 2) {
        list[0].image = '/img/habit-detail/one.png';
        list[1].image = '/img/habit-detail/two.png';
      } else if (list.length >= 3) {
        list[0].image = '/img/habit-detail/one.png';
        list[1].image = '/img/habit-detail/two.png';
        list[2].image = '/img/habit-detail/three.png';
      }
      this.setData({
        yearList: list,
        yearMe: res.data.own,
        isYear: res.data.own.user == undefined ? false : true,
      })
    });
  },

  /**
   * 是否显示dialog
   */
  isShowDialog: function () {
    this.setData({
      isShow: !this.data.isShow,
    })
  },

  /**
   * 去往个人主页
   */
  gotoHomePage: function (e) {
    const uid = e.currentTarget.dataset.uid;
    wx.navigateTo({
      url: `../../common/home-page/index?uid=${uid}`,
    })
  },

  /**
   * 点赞
   */
  pariseClick: function (e) {
    const data = { id: e.currentTarget.dataset.id, type: e.currentTarget.dataset.type };
    let weekMe = this.data.weekMe;
    let weekList = this.data.weekList;
    let monthMe = this.data.monthMe;
    let monthList = this.data.monthList;
    let yearMe = this.data.yearMe;
    let yearList = this.data.yearList;
    let id = e.currentTarget.dataset.id;
    let type = e.currentTarget.dataset.type;
    let isPraise = e.currentTarget.dataset.praise;
    let flag = e.currentTarget.dataset.isown ? true : false;
    if (type == 5) {
      if (flag) {
        if (isPraise) {
          weekMe.week_praise_count = weekMe.week_praise_count - 1;
          weekMe.is_praise = 0;
        } else {
          weekMe.week_praise_count = weekMe.week_praise_count + 1;
          weekMe.is_praise = 1;
        }
      }
      weekList.forEach(item => {
        if (item.id == id) {
          if (isPraise) {
            item.week_praise_count = item.week_praise_count - 1;
            item.is_praise = 0;
          } else {
            item.week_praise_count = item.week_praise_count + 1;
            item.is_praise = 1;
          }
        }
      });
    } else if (type == 6) {
      if (flag) {
        if (isPraise) {
          monthMe.month_praise_count = monthMe.month_praise_count - 1;
          monthMe.is_praise = 0;
        } else {
          monthMe.month_praise_count = monthMe.month_praise_count + 1;
          monthMe.is_praise = 1;
        }
      }
      monthList.forEach(item => {
        if (item.id == id) {
          if (isPraise) {
            item.month_praise_count = item.month_praise_count - 1;
            item.is_praise = 0;
          } else {
            item.month_praise_count = item.month_praise_count + 1;
            item.is_praise = 1;
          }
        }
      });
    } else if (type == 7) {
      if (flag) {
        if (isPraise) {
          yearMe.year_praise_count = yearMe.year_praise_count - 1;
          yearMe.is_praise = 0;
        } else {
          yearMe.year_praise_count = yearMe.year_praise_count + 1;
          yearMe.is_praise = 1;
        }
      }
      yearList.forEach(item => {
        if (item.id == id) {
          if (isPraise) {
            item.year_praise_count = item.year_praise_count - 1;
            item.is_praise = 0;
          } else {
            item.year_praise_count = item.year_praise_count + 1;
            item.is_praise = 1;
          }
        }
      });
    }

    this.setData({
      weekMe: weekMe,
      weekList: weekList,
      monthMe: monthMe,
      monthList: monthList,
      yearMe: yearMe,
      yearList: yearList
    })
    if (isPraise) {
      Util.request(Api.RankCancelParise, data);
    } else {
      Util.request(Api.RankParise, data);
    }
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