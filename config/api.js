//生产
var ApiRootUrl = 'https://cs.chenxixiguan.cn/api/';

module.exports = {
  LoginUrl: ApiRootUrl + 'wechat/getOpenid', //登录
  MainPage: ApiRootUrl + 'users/mainPage', //个人主页
  Profile: ApiRootUrl + 'users/userInfo', //个人资料
  ClockIn: ApiRootUrl + 'clock/detail', //我的粉丝
  MyFans: ApiRootUrl + 'users/myFans', //我的粉丝
  MyFollow: ApiRootUrl + 'users/myFollow', //我的关注
  FollowSave: ApiRootUrl + 'follow/save', //我的关注
  ClockRecords: ApiRootUrl + 'users/clockRecord', //打卡记录
  UsersEdit: ApiRootUrl + 'users/edit', //修改个人资料
  BgImg: ApiRootUrl + 'backend/advert', //获取轮播图

  Contact: ApiRootUrl + 'backend/contact', //联系我们
  Question: ApiRootUrl + 'backend/question', //常见问题
  QuestionDetail: ApiRootUrl + 'backend/question_info', //常见问题详情
  About: ApiRootUrl + 'backend/about', //关于我们

  CommenteSave: ApiRootUrl + 'comment/save', //评论
  FollowSave: ApiRootUrl + 'follow/save', //关注
  RankParise: ApiRootUrl + 'support/rankPraise', //排行榜点赞
  RankCancelParise: ApiRootUrl + 'support/cancelRankPraise', //排行榜取消点赞
  DeleteDetails: ApiRootUrl + 'clock/del', //删除动态
  TipofDetails: ApiRootUrl + 'clock/tipOff', //举报动态
  CancelFollow: ApiRootUrl + 'follow/cancel', //取消关注

  HabitMyList: ApiRootUrl + 'habit/myList', //加入的习惯列表
  HabitList: ApiRootUrl + 'habit/lists', //习惯列表
  HabitSave: ApiRootUrl + 'habit/save', //创建习惯
  HabitTypeSearch: ApiRootUrl + 'habit/search', //习惯分类搜索
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
  SupportSave: ApiRootUrl + 'support/save', //点赞
  CancelSupport: ApiRootUrl + 'support/cancel', //取消点赞
  DeleteHabit: ApiRootUrl + 'habit/deleteHabit', //删除习惯
  BackgroundIndex: ApiRootUrl + 'index/background', //首页背景图
  GetHabitIcon: ApiRootUrl + 'habit/getHabitIcon',//获取图标
  HabitDetail: ApiRootUrl + 'users/HabitDetail',//只有本人的习惯列表

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
  getImg: ApiRootUrl+ 'users/RandImage', // 获取分享生成图的随机背景图
  RandWord: ApiRootUrl+ 'users/RandWord', // 获取随机一条鸡汤
}