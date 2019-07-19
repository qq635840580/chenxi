//生产
var ApiRootUrl = 'https://chenxixiguan.cn/';

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
  HabitRankingWeek: ApiRootUrl + 'habit/WeekRank', //排行榜-周榜
  HabitRankingMonth: ApiRootUrl + 'habit/MonthRank', //排行榜-月榜
  HabitRankingYear: ApiRootUrl + 'habit/YearRank', //排行榜-年榜
  ClockSave: ApiRootUrl + 'clock/save', //打卡
  UploadImg: ApiRootUrl + 'upload/upload', //上传图片
  HabitPerson: ApiRootUrl + 'habit/member', //成员
  ClockWeek: ApiRootUrl + 'clock/weekStatistics', //我的打卡周统计
  ClockMonth: ApiRootUrl + 'clock/monthStatistics', //我的打卡月统计
  ListDetails: ApiRootUrl + 'clock/detail', //打卡详情
  HabitCate: ApiRootUrl + 'habit/cate', //习惯分类
  HabitJoin: ApiRootUrl + 'habit/join', //加入习惯
  HabitSettingSearch: ApiRootUrl + 'habit/settingDetail', //习惯设置查询
  HabitSetting: ApiRootUrl + 'habit/setting', //习惯设置

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