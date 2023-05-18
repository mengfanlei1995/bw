import SysConfig from "../data/SysConfig";
import UserData from "../data/UserData";
import StorageMgr from "../mgr/StorageMgr";
import UIMgr from "../uiform/UIMgr";
import LogUtil from "../utils/LogUtil";
import LongUtil from "../utils/LongUtil";
import { BetCmd, BindPhoneCmd, BindPhone_BindCmd, BindPhone_ChangeCmd, BindPhone_OTPCmd, DailyBonusCmd, DailyBonus_InfoCmd, DailyBonus_SignCmd, DailyBonus_TaskReceiveCmd, EmailCmd, Email_CollectCmd, Email_DeleteCmd, Email_InfoCmd, Email_ReadCmd, ExitRoomCmd, GullakCmd, Gullak_InfoCmd, Hall_GameListCmd, Hall_InfoCmd, JoinRoomCmd, Login_ForgetSubmitCmd, Login_OTPCmd, PayCmd, Pay_RechargeCmd, Pay_WithdrawCmd, PopupCmd, Popup_InfoCmd, RechargeCmd, Recharge_InfoCmd, Recharge_RecordCmd, RecordListCmd, ReferCmd, Refer_InvitationCmd, Refer_InvitationLinkCmd, Refer_MyInvitationCmd, Refer_MyRewardCmd, Refer_Top20Cmd, SystemConfigCmd, SystemConfig_InfoCmd, TransactionCmd, Transaction_InfoCmd, User_ChangeNameCmd, User_InfoCmd, VipCmd, Vip_InfoCmd, WithdrawCmd, Withdraw_BindBankCmd, Withdraw_InfoCmd, Withdraw_RecordCmd } from "./CmdData";
import { HallCmd } from "./CmdData";
import { LoginCmd, Login_GuestCmd, Login_PhoneCmd, Login_SessionCmd, UserCmd, User_ChangeHeadCmd } from "./CmdData";
import CmdMgr from "./CmdMgr";
import NetMgr from "./NetMgr";
import SocketMgr from "./SocketMgr";
import { ExternalMessage, encodeExternalMessage } from "./proto/ExternalMessage";
import { MyBaseActionVO, decodeMyBaseActionVO } from "./proto/core";
import { BundleChannelDTO, BundleChannelVO, DailyBonusAwardDTO, DailyBonusLongVO, DailyBonusSignInVipAwardVO, DailyBonusVO, GullakMainInfoV2VO, HomepageVO, LoginMobileSmsVO, MailOptDTO, MailPageDTO, MailPageVO, PayRechargeOrderDTO, PayRechargeOrderVO, PayWithdrawOrderDTO, PhoneDTO, PhoneSmsDTO, PhoneSmsVO, PopupDTO, PopupListVO, RechargeInfoResponseV2VO, RechargeInfoV2DTO, RechargePageDTO, RedDotVO, ReferInvitationMapUrlVO, ReferInvitationNowVO, ReferInvitationTotalVO, ReferRankTop20DTO, ReferRankVO, ReferRewardPageDTO, ReferTotalPageDTO, TimezoneRechargeVO, TimezoneReferRewardVO, TimezoneTransactionVO, TimezoneWithdrawVO, TransactionDTO, VipInfoV2VO, WithdrawBankDTO, WithdrawInfoVO, WithdrawPageDTO, decodeBundleChannelVO, decodeDailyBonusLongVO, decodeDailyBonusSignInVipAwardVO, decodeDailyBonusVO, decodeGullakMainInfoV2VO, decodeHomepageGameVO, decodeHomepageVO, decodeLoginMobileSmsVO, decodeMailPageVO, decodePayRechargeOrderVO, decodePhoneSmsVO, decodePopupListVO, decodeRechargeInfoResponseV2VO, decodeRedDotVO, decodeReferInvitationMapUrlVO, decodeReferInvitationNowVO, decodeReferInvitationTotalVO, decodeReferRankVO, decodeTimezoneRechargeVO, decodeTimezoneReferRewardVO, decodeTimezoneTransactionVO, decodeTimezoneWithdrawVO, decodeVipInfoV2VO, decodeWithdrawInfoVO, encodeBundleChannelDTO, encodeDailyBonusAwardDTO, encodeMailOptDTO, encodeMailPageDTO, encodePayRechargeOrderDTO, encodePayWithdrawOrderDTO, encodePhoneDTO, encodePhoneSmsDTO, encodePopupDTO, encodeRechargeInfoV2DTO, encodeRechargePageDTO, encodeReferRankTop20DTO, encodeReferRewardPageDTO, encodeReferTotalPageDTO, encodeTransactionDTO, encodeWithdrawBankDTO, encodeWithdrawPageDTO } from "./proto/hall";
import { encodeUserUpdateHeadPicDTO } from "./proto/hall";
import { UserUpdateNicknameDTO } from "./proto/hall";
import { HomepageGameDTO } from "./proto/hall";
import { encodeHomepageGameDTO } from "./proto/hall";
import { HomepageGameVO } from "./proto/hall";
import { encodeUserUpdateNicknameDTO } from "./proto/hall";
import { UserUpdateHeadPicDTO, decodeLoginVO, encodeLoginDTO } from "./proto/hall";
import { LoginDTO } from "./proto/hall";
import { LoginVO } from "./proto/hall";
import { PointBetCoinsVO, RoomBetDTO, RoomEnterDTO, RoomExitDTO, RoomRecordDTO, decodePointBetCoinsVO, encodeRoomBetDTO, encodeRoomEnterDTO, encodeRoomExitDTO, encodeRoomRecordDTO } from "./proto/room";
import { NetCallFunc } from "./ws/NetInterface";

const commonParams = function (mergeCmd: number, data: Uint8Array, cmdCode: number = 1, protocolSwitch: number = 0): ExternalMessage {
    let param: ExternalMessage = {
        cmdCode: cmdCode,
        protocolSwitch: protocolSwitch,
        cmdMerge: mergeCmd,
        responseStatus: 0,
        validMsg: "",
        data: data
    }
    return param;
}

const loginCommonParams = function (): LoginDTO {
    let common: LoginDTO = {
        channel: SysConfig.cid,
        afChannel: StorageMgr.mediaId,
        appVersion: SysConfig.version,
        bundleId: SysConfig.pkgName,
        // code: '11',
        devId: StorageMgr.devId,
        invitationCode: StorageMgr.invateCode,
        invitationType: StorageMgr.invateType,
        // mobile: StorageMgr.phone,
        // mobilePassword:'',
        platform: 'android',
        userId: StorageMgr.userId,
        sessionId: StorageMgr.sessionId,
        afId: StorageMgr.afId,
        imei: SysConfig.systemInfo?.android_id || '',
        gaId: SysConfig.systemInfo?.gaid || '',
        uuid: StorageMgr.UUID,
        appName: SysConfig.systemInfo?.appName,
        simulator: SysConfig.systemInfo?.simulator,
        root: SysConfig.systemInfo?.root
        // fbId: ''
    }
    return common;
}

class SendMgr {

    /**心跳 */
    public sendHeart(): void {
        let _data = commonParams(0, new Uint8Array(), 0);
        this.send(_data, null);
    }

    /**
     * 登陆
     * @param params 登陆数据
     * @param loginType 登陆类型
     */
    public async sendLogin(params: LoginDTO = {}, loginType: number = Login_GuestCmd): Promise<LoginVO> {
        params = Object.assign(loginCommonParams(), params);
        if (loginType == Login_SessionCmd && !StorageMgr.sessionId) return;
        // await NetMgr.getIp();
        return new Promise<LoginVO>(resolve => {
            this.send(commonParams(CmdMgr.getMergeCmd(LoginCmd, loginType), encodeLoginDTO(params)), async (code: number, data: Uint8Array) => {
                if (code === 0) {
                    let userInfo: LoginVO = decodeLoginVO(data);
                    UserData.initUserInfo(userInfo);
                    UIMgr.goHall();
                } else {
                    UIMgr.goLogin(() => {
                        StorageMgr.sessionId = '';
                        StorageMgr.userId = '';
                        UserData.userInfo = {};
                    });
                }
                resolve(code == 0 ? decodeLoginVO(data) : null);
            })
        })
    }

    /**
     * 发送验证码
     */
    public async sendSms(subCmd: number, params: LoginDTO = {}): Promise<boolean> {
        params = Object.assign(loginCommonParams(), params);
        return new Promise<boolean>(resolve => {
            this.send(commonParams(CmdMgr.getMergeCmd(LoginCmd, subCmd), encodeLoginDTO(params)), async (code: number, data: Uint8Array) => {
                resolve(code == 0);
            })
        })
    }

    /**
     * 发送修改密码
     */
    public async sendChangePass(params: LoginDTO = {}): Promise<boolean> {
        params = Object.assign(loginCommonParams(), params);
        return new Promise<boolean>(resolve => {
            this.send(commonParams(CmdMgr.getMergeCmd(LoginCmd, Login_ForgetSubmitCmd), encodeLoginDTO(params)), async (code: number, data: Uint8Array) => {
                resolve(code == 0);
            })
        })
    }

    /**获取用户信息 */
    public async sendGetUserInfo(): Promise<boolean> {
        if (!UserData.userInfo.userId) return;
        return new Promise<boolean>(resolve => {
            this.send(commonParams(CmdMgr.getMergeCmd(UserCmd, User_InfoCmd), new Uint8Array()), (code: number, data: Uint8Array) => {
                if (code === 0) {
                    let userInfo: LoginVO = decodeLoginVO(data);
                    UserData.initUserInfo(userInfo);
                }
                resolve(code === 0);
            })
        })
    }

    /**修改头像 */
    public async sendChangeHead(headPic: string): Promise<boolean> {
        let params: UserUpdateHeadPicDTO = {
            headpic: headPic
        }
        return new Promise<boolean>(resolve => {
            this.send(commonParams(CmdMgr.getMergeCmd(UserCmd, User_ChangeHeadCmd), encodeUserUpdateHeadPicDTO(params)), (code: number, data: Uint8Array) => {
                resolve(code === 0);
            })
        })
    }

    /**修改昵称 */
    public async sendChangeNickName(nickname: string): Promise<boolean> {
        let params: UserUpdateNicknameDTO = {
            nickname: nickname
        }
        return new Promise<boolean>(resolve => {
            this.send(commonParams(CmdMgr.getMergeCmd(UserCmd, User_ChangeNameCmd), encodeUserUpdateNicknameDTO(params)), (code: number, data: Uint8Array) => {
                resolve(code === 0);
            })
        })
    }

    /**大厅信息查询 */
    public async sendHallInfo(): Promise<HomepageVO> {
        return new Promise<HomepageVO>(resolve => {
            this.send(commonParams(CmdMgr.getMergeCmd(HallCmd, Hall_InfoCmd), new Uint8Array()), (code: number, data: Uint8Array) => {
                resolve(code === 0 ? decodeHomepageVO(data) : null);
            })
        })
    }

    /**游戏列表查询 */
    public async sendGameList(): Promise<HomepageGameVO> {
        let params: HomepageGameDTO = {
            productId: 0,
            appVersion: SysConfig.version,
            appResVersion: 0
        }
        return new Promise<HomepageGameVO>(resolve => {
            this.send(commonParams(CmdMgr.getMergeCmd(HallCmd, Hall_GameListCmd), encodeHomepageGameDTO(params)), (code: number, data: Uint8Array) => {
                resolve(code === 0 ? decodeHomepageGameVO(data) : null);
            })
        })
    }

    /**进入房间 */
    public async sendEnterRoom(params: RoomEnterDTO, gameCmd: number): Promise<Uint8Array> {
        return new Promise<Uint8Array>(resolve => {
            this.send(commonParams(CmdMgr.getMergeCmd(gameCmd, JoinRoomCmd), encodeRoomEnterDTO(params)), (code: number, data: Uint8Array) => {
                resolve(code === 0 ? data : null);
            })
        })
    }

    /**退出房间 */
    public async sendExitRoom(params: RoomExitDTO, gameCmd: number): Promise<boolean> {
        return new Promise<boolean>(resolve => {
            this.send(commonParams(CmdMgr.getMergeCmd(gameCmd, ExitRoomCmd), encodeRoomExitDTO(params)), (code: number, data: Uint8Array) => {
                resolve(code === 0);
            })
        })
    }

    /**下注 */
    public sendBet(params: RoomBetDTO, gameCmd: number): void {
        this.send(commonParams(CmdMgr.getMergeCmd(gameCmd, BetCmd), encodeRoomBetDTO(params)), null);
    }

    /**流水 */
    public async sendRecordList(params: RoomRecordDTO, gameCmd: number): Promise<Uint8Array> {
        return new Promise<Uint8Array>(resolve => {
            this.send(commonParams(CmdMgr.getMergeCmd(gameCmd, RecordListCmd), encodeRoomRecordDTO(params)), (code: number, data: Uint8Array) => {
                resolve(code === 0 ? data : null);
            })
        })
    }

    /**获取邮件 */
    public async sendEmailList(params: MailPageDTO): Promise<MailPageVO> {
        return new Promise<MailPageVO>(resolve => {
            this.send(commonParams(CmdMgr.getMergeCmd(EmailCmd, Email_InfoCmd), encodeMailPageDTO(params)), (code: number, data: Uint8Array) => {
                resolve(code === 0 ? decodeMailPageVO(data) : null);
            })
        })
    }

    /**读取邮件 */
    public async sendReadEmail(params: MailOptDTO): Promise<RedDotVO> {
        return new Promise<RedDotVO>(resolve => {
            this.send(commonParams(CmdMgr.getMergeCmd(EmailCmd, Email_ReadCmd), encodeMailOptDTO(params)), (code: number, data: Uint8Array) => {
                resolve(code === 0 ? decodeRedDotVO(data) : null);
            })
        })
    }

    /**领取邮件奖励 */
    public async sendEmailCollect(params: MailOptDTO): Promise<boolean> {
        return new Promise<boolean>(resolve => {
            this.send(commonParams(CmdMgr.getMergeCmd(EmailCmd, Email_CollectCmd), encodeMailOptDTO(params)), (code: number, data: Uint8Array) => {
                resolve(code === 0);
            })
        })
    }

    /**删除邮件 */
    public async sendDeleteEmail(params: MailOptDTO): Promise<RedDotVO> {
        return new Promise<RedDotVO>(resolve => {
            this.send(commonParams(CmdMgr.getMergeCmd(EmailCmd, Email_DeleteCmd), encodeMailOptDTO(params)), (code: number, data: Uint8Array) => {
                resolve(code === 0 ? decodeRedDotVO(data) : null);
            })
        })
    }

    /**查询代理分销描述 */
    public async sendReferInvitation(): Promise<ReferInvitationNowVO> {
        return new Promise<ReferInvitationNowVO>(resolve => {
            this.send(commonParams(CmdMgr.getMergeCmd(ReferCmd, Refer_InvitationCmd), new Uint8Array()), (code: number, data: Uint8Array) => {
                resolve(code === 0 ? decodeReferInvitationNowVO(data) : null);
            })
        })
    }

    /**查询代理分销邀请码链接 */
    public async sendReferInvitationLink(): Promise<ReferInvitationMapUrlVO> {
        return new Promise<ReferInvitationMapUrlVO>(resolve => {
            this.send(commonParams(CmdMgr.getMergeCmd(ReferCmd, Refer_InvitationLinkCmd), new Uint8Array()), (code: number, data: Uint8Array) => {
                resolve(code === 0 ? decodeReferInvitationMapUrlVO(data) : null);
            })
        })
    }

    /**My Rewards界面分页查询 */
    public async sendMyRewards(params: ReferRewardPageDTO): Promise<TimezoneReferRewardVO> {
        return new Promise<TimezoneReferRewardVO>(resolve => {
            this.send(commonParams(CmdMgr.getMergeCmd(ReferCmd, Refer_MyRewardCmd), encodeReferRewardPageDTO(params)), (code: number, data: Uint8Array) => {
                resolve(code === 0 ? decodeTimezoneReferRewardVO(data) : null);
            })
        })
    }

    /**My Rewards界面分页查询 */
    public async sendMyInvitation(params: ReferTotalPageDTO): Promise<ReferInvitationTotalVO> {
        return new Promise<ReferInvitationTotalVO>(resolve => {
            this.send(commonParams(CmdMgr.getMergeCmd(ReferCmd, Refer_MyInvitationCmd), encodeReferTotalPageDTO(params)), (code: number, data: Uint8Array) => {
                resolve(code === 0 ? decodeReferInvitationTotalVO(data) : null);
            })
        })
    }

    /**top20查询 */
    public async sendTop20(params: ReferRankTop20DTO): Promise<ReferRankVO> {
        return new Promise<ReferRankVO>(resolve => {
            this.send(commonParams(CmdMgr.getMergeCmd(ReferCmd, Refer_Top20Cmd), encodeReferRankTop20DTO(params)), (code: number, data: Uint8Array) => {
                resolve(code === 0 ? decodeReferRankVO(data) : null);
            })
        })
    }

    /**存钱罐 */
    public async sendGullak(subCmd: number): Promise<GullakMainInfoV2VO> {
        return new Promise<GullakMainInfoV2VO>(resolve => {
            this.send(commonParams(CmdMgr.getMergeCmd(GullakCmd, subCmd), new Uint8Array()), (code: number, data: Uint8Array) => {
                resolve(code === 0 ? decodeGullakMainInfoV2VO(data) : null);
            })
        })
    }

    /**签到任务主页面信息 */
    public async sendDailyBonusInfo(): Promise<DailyBonusVO> {
        return new Promise<DailyBonusVO>(resolve => {
            this.send(commonParams(CmdMgr.getMergeCmd(DailyBonusCmd, DailyBonus_InfoCmd), new Uint8Array()), (code: number, data: Uint8Array) => {
                resolve(code === 0 ? decodeDailyBonusVO(data) : null);
            })
        })
    }

    /**签到 */
    public async sendDailyBonusSign(): Promise<DailyBonusSignInVipAwardVO> {
        return new Promise<DailyBonusSignInVipAwardVO>(resolve => {
            this.send(commonParams(CmdMgr.getMergeCmd(DailyBonusCmd, DailyBonus_SignCmd), new Uint8Array()), (code: number, data: Uint8Array) => {
                resolve(code === 0 ? decodeDailyBonusSignInVipAwardVO(data) : null);
            })
        })
    }

    /**领取任务 */
    public async sendDailyBonusTaskReceive(params: DailyBonusAwardDTO): Promise<DailyBonusLongVO> {
        return new Promise<DailyBonusLongVO>(resolve => {
            this.send(commonParams(CmdMgr.getMergeCmd(DailyBonusCmd, DailyBonus_TaskReceiveCmd), encodeDailyBonusAwardDTO(params)), (code: number, data: Uint8Array) => {
                resolve(code === 0 ? decodeDailyBonusLongVO(data) : null);
            })
        })
    }

    /**vip主页面信息 */
    public async sendVipInfo(): Promise<VipInfoV2VO> {
        return new Promise<VipInfoV2VO>(resolve => {
            this.send(commonParams(CmdMgr.getMergeCmd(VipCmd, Vip_InfoCmd), new Uint8Array()), (code: number, data: Uint8Array) => {
                resolve(code === 0 ? decodeVipInfoV2VO(data) : null);
            })
        })
    }

    /**充值主页面信息 */
    public async sendRechargeInfo(params: RechargeInfoV2DTO): Promise<RechargeInfoResponseV2VO> {
        return new Promise<RechargeInfoResponseV2VO>(resolve => {
            this.send(commonParams(CmdMgr.getMergeCmd(RechargeCmd, Recharge_InfoCmd), encodeRechargeInfoV2DTO(params)), (code: number, data: Uint8Array) => {
                resolve(code === 0 ? decodeRechargeInfoResponseV2VO(data) : null);
            })
        })
    }

    /**充值流水 */
    public async sendRechargeRecord(params: RechargePageDTO): Promise<TimezoneRechargeVO> {
        return new Promise<TimezoneRechargeVO>(resolve => {
            this.send(commonParams(CmdMgr.getMergeCmd(RechargeCmd, Recharge_RecordCmd), encodeRechargePageDTO(params)), (code: number, data: Uint8Array) => {
                resolve(code === 0 ? decodeTimezoneRechargeVO(data) : null);
            })
        })
    }

    /**提现主页面信息 */
    public async sendWithdrawInfo(): Promise<WithdrawInfoVO> {
        return new Promise<WithdrawInfoVO>(resolve => {
            this.send(commonParams(CmdMgr.getMergeCmd(WithdrawCmd, Withdraw_InfoCmd), new Uint8Array()), (code: number, data: Uint8Array) => {
                resolve(code === 0 ? decodeWithdrawInfoVO(data) : null);
            })
        })
    }

    /**绑定银行卡 */
    public async sendBindBank(params: WithdrawBankDTO): Promise<MyBaseActionVO> {
        return new Promise<MyBaseActionVO>(resolve => {
            this.send(commonParams(CmdMgr.getMergeCmd(WithdrawCmd, Withdraw_BindBankCmd), encodeWithdrawBankDTO(params)), (code: number, data: Uint8Array) => {
                resolve(code === 0 ? decodeMyBaseActionVO(data) : null);
            })
        })
    }

    /**提现流水 */
    public async sendWithdrawRecord(params: WithdrawPageDTO): Promise<TimezoneWithdrawVO> {
        return new Promise<TimezoneWithdrawVO>(resolve => {
            this.send(commonParams(CmdMgr.getMergeCmd(WithdrawCmd, Withdraw_RecordCmd), encodeWithdrawPageDTO(params)), (code: number, data: Uint8Array) => {
                resolve(code === 0 ? decodeTimezoneWithdrawVO(data) : null);
            })
        })
    }

    /**弹窗信息 */
    public async sendPopupInfo(params: PopupDTO): Promise<PopupListVO> {
        SysConfig.sceneId = "";
        return new Promise<PopupListVO>(resolve => {
            this.send(commonParams(CmdMgr.getMergeCmd(PopupCmd, Popup_InfoCmd), encodePopupDTO(params)), (code: number, data: Uint8Array) => {
                resolve(code === 0 ? decodePopupListVO(data) : null);
            })
        })
    }

    /**发起支付 */
    public async sendPay(params: PayRechargeOrderDTO): Promise<PayRechargeOrderVO> {
        // if (!StorageMgr.phone) {
        //     UIMgr.show('prefab/hall/BindPhone', 'BindPhone');
        //     return;
        // }
        return new Promise<PayRechargeOrderVO>(resolve => {
            this.send(commonParams(CmdMgr.getMergeCmd(PayCmd, Pay_RechargeCmd), encodePayRechargeOrderDTO(params)), (code: number, data: Uint8Array) => {
                resolve(code === 0 ? decodePayRechargeOrderVO(data) : null);
            })
        })
    }

    /**发起提现 */
    public async sendWithdraw(params: PayWithdrawOrderDTO): Promise<MyBaseActionVO> {
        return new Promise<MyBaseActionVO>(resolve => {
            this.send(commonParams(CmdMgr.getMergeCmd(PayCmd, Pay_WithdrawCmd), encodePayWithdrawOrderDTO(params)), (code: number, data: Uint8Array) => {
                resolve(code === 0 ? decodeMyBaseActionVO(data) : null);
            })
        })
    }

    /**绑定 发送验证码 */
    public async sendBindSms(params: PhoneSmsDTO): Promise<boolean> {
        return new Promise<boolean>(resolve => {
            this.send(commonParams(CmdMgr.getMergeCmd(BindPhoneCmd, BindPhone_OTPCmd), encodePhoneSmsDTO(params)), (code: number, data: Uint8Array) => {
                resolve(code === 0);
            })
        })
    }

    /**绑定手机号 */
    public async sendBindPhone(params: PhoneDTO): Promise<boolean> {
        return new Promise<boolean>(resolve => {
            this.send(commonParams(CmdMgr.getMergeCmd(BindPhoneCmd, BindPhone_BindCmd), encodePhoneDTO(params)), (code: number, data: Uint8Array) => {
                resolve(code === 0);
            })
        })
    }

    /**修改手机号 */
    public async sendChangePhone(params: PhoneDTO): Promise<boolean> {
        return new Promise<boolean>(resolve => {
            this.send(commonParams(CmdMgr.getMergeCmd(BindPhoneCmd, BindPhone_ChangeCmd), encodePhoneDTO(params)), (code: number, data: Uint8Array) => {
                resolve(code === 0);
            })
        })
    }

    /**流水 */
    public async sendTransaction(params: TransactionDTO): Promise<TimezoneTransactionVO> {
        return new Promise<TimezoneTransactionVO>(resolve => {
            this.send(commonParams(CmdMgr.getMergeCmd(TransactionCmd, Transaction_InfoCmd), encodeTransactionDTO(params)), (code: number, data: Uint8Array) => {
                resolve(code === 0 ? decodeTimezoneTransactionVO(data) : null);
            })
        })
    }

    /**获取系统配置 */
    public async sendSystemInfo(params: BundleChannelDTO): Promise<BundleChannelVO> {
        return new Promise<BundleChannelVO>(resolve => {
            this.send(commonParams(CmdMgr.getMergeCmd(SystemConfigCmd, SystemConfig_InfoCmd), encodeBundleChannelDTO(params)), (code: number, data: Uint8Array) => {
                resolve(code === 0 ? decodeBundleChannelVO(data) : null);
            })
        })
    }

    /**发送消息 */
    private send(data: ExternalMessage, callFunc: NetCallFunc): boolean {
        return SocketMgr.send(data.cmdMerge, encodeExternalMessage(data), callFunc);
    }

}

export default new SendMgr();
