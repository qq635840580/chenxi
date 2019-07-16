//生产
var ApiRootUrl = 'http://chenxixiguan.cn/';

module.exports = {
  LoginUrl: ApiRootUrl + 'wechat/getOpenid', //登录
  MainPage: ApiRootUrl + 'users/mainPage', //个人主页
  Profile: ApiRootUrl + 'users/userInfo', //个人资料
  ClockIn: ApiRootUrl + 'clock/detail', //我的粉丝
  MyFans: ApiRootUrl + 'users/myFans', //我的粉丝
  MyFollow: ApiRootUrl + 'users/myFollow', //我的关注
  FollowSave: ApiRootUrl + 'follow/save', //我的关注

  Contact: ApiRootUrl + 'backend/contact', //联系我们
  Question: ApiRootUrl + 'backend/question', //常见问题
  QuestionDetail: ApiRootUrl + 'backend/question_info', //常见问题详情
  About: ApiRootUrl + 'backend/about', //关于我们

  HabitMyList: ApiRootUrl + 'habit/myList', //加入的习惯列表
  HabitList: ApiRootUrl + 'habit/lists', //习惯列表
  HabitSave: ApiRootUrl + 'habit/save', //创建习惯
  HabitDynamicList: ApiRootUrl + 'habit/trends' ,//习惯动态详情列表
  HabitMy: ApiRootUrl + 'users/ownClockList',//习惯-我的
  HabitRankineWeek: ApiRootUrl + 'habit/WeekRank', //排行榜-周榜
  ClockSave: ApiRootUrl + 'clock/save', //打卡

  FindHabit: ApiRootUrl + 'find/habits', //发现_精选习惯
  FindDynamic: ApiRootUrl + 'find/dynamic', //发现_精选动态
  FindLatest: ApiRootUrl + 'find/latest', //发现_最新 
  FindFollow: ApiRootUrl + 'find/follow', //发现_关注
  FindTotalRank: ApiRootUrl + 'find/totalRank', //发现_总榜

  MessageIndex: ApiRootUrl + 'message/index', //消息
  MessageFans: ApiRootUrl + 'message/fans', //粉丝消息
  MessagePraise: ApiRootUrl + 'message/support', //点赞消息
  MessageComment: ApiRootUrl + 'message/evaluate', //评论消息
  MessageSystem: ApiRootUrl + 'message/system', //评论消息
}