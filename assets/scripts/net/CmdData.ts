//登陆
export const LoginCmd: number = 1;
export const Login_GuestCmd: number = 1;
export const Login_PhoneCmd: number = 2;
export const Login_SessionCmd: number = 3;
export const Login_FBCmd: number = 4;
export const Login_OTPCmd: number = 5;
export const Login_PhoneRegisterCmd: number = 6;
export const Login_ForgetOTPCmd: number = 7;
export const Login_ForgetSubmitCmd: number = 8;
//用户
export const UserCmd: number = 2;
export const User_InfoCmd: number = 1;
export const User_ChangeHeadCmd: number = 2;
export const User_ChangeNameCmd: number = 3;
//大厅信息
export const HallCmd: number = 4;
export const Hall_InfoCmd: number = 1;
export const Hall_GameListCmd: number = 2;
//roomopt
export const JoinRoomCmd: number = 1;
export const ExitRoomCmd: number = 2;
export const BetCmd: number = 3;
export const RecordListCmd: number = 4;
//dice3
export const Dice3Cmd: number = 6;
//龙虎
export const TigerVsElephantCmd: number = 7;
//JhandiMunda
export const JhandiMundaCmd: number = 8;
//LuckyBall
export const LuckyBallCmd: number = 9;
//LuckyDice
export const LuckyDiceCmd: number = 10;
//PokerKing
export const PokerKingCmd: number = 11;
//WhellOfForune
export const WhellOfForuneCmd: number = 12;
//TPWar
export const TPWarCmd: number = 13;

//Transaction
export const TransactionCmd: number = 14;
//流水
export const Transaction_InfoCmd: number = 1;

//email
export const EmailCmd: number = 15;
//获取邮件
export const Email_InfoCmd: number = 1;
//读取邮件
export const Email_ReadCmd: number = 2;
//领取邮件奖励
export const Email_CollectCmd: number = 3;
//删除邮件
export const Email_DeleteCmd: number = 4;

//代理
export const ReferCmd: number = 16;
//查询代理分销描述
export const Refer_InvitationCmd: number = 1;
//查询代理分销邀请码链接
export const Refer_InvitationLinkCmd: number = 2;
//My Rewards界面分页查询
export const Refer_MyRewardCmd: number = 3;
//My Invitation
export const Refer_MyInvitationCmd: number = 4;
//top20
export const Refer_Top20Cmd: number = 5;


//存钱罐
export const GullakCmd: number = 17;
//存钱罐主页面信息
export const Gullak_InfoCmd: number = 1;
//存钱罐领取
export const Gullak_ReceiveCmd: number = 2;

//签到任务
export const DailyBonusCmd: number = 18;
//签到任务主页面信息
export const DailyBonus_InfoCmd: number = 1;
//每日签到
export const DailyBonus_SignCmd: number = 3;
//领取任务奖励
export const DailyBonus_TaskReceiveCmd: number = 4;


//vip
export const VipCmd: number = 19;
//vip主页面信息
export const Vip_InfoCmd: number = 1;

//充值相关
export const RechargeCmd: number = 20;
//充值主页面信息
export const Recharge_InfoCmd: number = 1;
//充值流水
export const Recharge_RecordCmd: number = 2;


//提现相关
export const WithdrawCmd: number = 21;
//提现主页面信息
export const Withdraw_InfoCmd: number = 1;
//绑定银行卡
export const Withdraw_BindBankCmd: number = 2;
//提现流水
export const Withdraw_RecordCmd: number = 3;

//弹窗相关
export const PopupCmd: number = 22;
//弹窗信息
export const Popup_InfoCmd: number = 1;

//Pay相关
export const PayCmd: number = 23;
//充值
export const Pay_RechargeCmd: number = 1;
//提现
export const Pay_WithdrawCmd: number = 2;

//绑定相关相关
export const BindPhoneCmd: number = 24;
//发送验证码
export const BindPhone_OTPCmd: number = 1;
//绑定手机号
export const BindPhone_BindCmd: number = 2;
//换绑手机号
export const BindPhone_ChangeCmd: number = 3;

//系统配置
export const SystemConfigCmd: number = 25;
export const SystemConfig_InfoCmd: number = 1;



//推送
//钱包
export const Push_WalletCmd: number = 1004;
export const Push_Wallet_ChangeCmd: number = 1;

//游戏推送
export const Push_GameCmd: number = 1005;
export const Push_Game_TackOutCmd: number = 1;
export const Push_Game_SelfBetCmd: number = 3;

//下注
export const Push_Game_BetCmd: number = 1;
//开始
export const Push_Game_StartCmd: number = 2;
//结束
export const Push_Game_EndCmd: number = 3;


//dice3
export const Push_Dice3Cmd: number = 1006;
//龙虎
export const Push_TigerVsElephantCmd: number = 1007;
//JhandiMunda
export const Push_JhandiMundaCmd: number = 1008;
//LuckyBall
export const Push_LuckyBallCmd: number = 1009;
//LuckyDice
export const Push_LuckyDiceCmd: number = 1010;
//PokerKing
export const Push_PokerKingCmd: number = 1011;
//WhellOfForune
export const Push_WhellOfForuneCmd: number = 1012;
//TPWar
export const Push_TPWarCmd: number = 1013;

//vip
export const Push_VipCmd: number = 1014;
//vip升级
export const Push_VipUpgradeCmd: number = 1;

//活动
export const Push_ActivityCmd: number = 1015;
//活动通知
export const Push_ActivitySubCmd: number = 1;
//隔日充值通知
export const Push_ActivityNextDayCmd: number = 2;

//金额
export const Push_BonusCmd: number = 1016;
//充值成功
export const Push_BonusRechargeCmd: number = 1;
//提现成功
export const Push_BonusWithdrawCmd: number = 2;

//跑马灯
export const Push_MarqueeCmd: number = 1017;
export const Push_MarqueeSubCmd: number = 1;