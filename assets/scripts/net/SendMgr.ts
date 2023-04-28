import SysConfig from "../data/SysConfig";
import UserData from "../data/UserData";
import StorageMgr from "../mgr/StorageMgr";
import UIMgr from "../uiform/UIMgr";
import LogUtil from "../utils/LogUtil";
import LongUtil from "../utils/LongUtil";
import { BetCmd, EmailCmd, Email_CollectCmd, Email_DeleteCmd, Email_InfoCmd, Email_ReadCmd, ExitRoomCmd, Hall_GameListCmd, Hall_InfoCmd, JoinRoomCmd, Login_OTPCmd, RecordListCmd, ReferCmd, Refer_InvitationCmd, Refer_InvitationLinkCmd, Refer_MyInvitationCmd, Refer_MyRewardCmd, User_ChangeNameCmd, User_InfoCmd } from "./CmdData";
import { HallCmd } from "./CmdData";
import { LoginCmd, Login_GuestCmd, Login_PhoneCmd, Login_SessionCmd, UserCmd, User_ChangeHeadCmd } from "./CmdData";
import CmdMgr from "./CmdMgr";
import NetMgr from "./NetMgr";
import SocketMgr from "./SocketMgr";
import { ExternalMessage, encodeExternalMessage } from "./proto/ExternalMessage";
import { HomepageResponse, LoginMobileSmsVO, MailOptDTO, MailPageDTO, MailPageVO, RedDotVO, ReferInvitationMapUrlVO, ReferInvitationNowVO, ReferInvitationTotalVO, ReferRankTop20DTO, ReferRankVO, ReferRewardPageDTO, ReferTotalPageDTO, TimezoneReferRewardVO, decodeHomepageGameVO, decodeHomepageResponse, decodeLoginMobileSmsVO, decodeMailPageVO, decodeRedDotVO, decodeReferInvitationMapUrlVO, decodeReferInvitationNowVO, decodeReferInvitationTotalVO, decodeReferRankVO, decodeTimezoneReferRewardVO, encodeMailOptDTO, encodeMailPageDTO, encodeReferRankTop20DTO, encodeReferRewardPageDTO, encodeReferTotalPageDTO } from "./proto/hall";
import { encodeUserUpdateHeadPicDTO } from "./proto/hall";
import { UserUpdateNicknameDTO } from "./proto/hall";
import { HomepageUserInfoResponse } from "./proto/hall";
import { decodeHomepageUserInfoResponse } from "./proto/hall";
import { HomepageGameDTO } from "./proto/hall";
import { encodeHomepageGameDTO } from "./proto/hall";
import { HomepageGameVO } from "./proto/hall";
import { encodeUserUpdateNicknameDTO } from "./proto/hall";
import { UserUpdateHeadPicDTO, decodeLoginVO, encodeLoginDTO } from "./proto/hall";
import { LoginDTO } from "./proto/hall";
import { LoginVO } from "./proto/hall";
import { RoomBetDTO, RoomEnterDTO, RoomExitDTO, RoomRecordDTO, encodeRoomBetDTO, encodeRoomEnterDTO, encodeRoomExitDTO, encodeRoomRecordDTO } from "./proto/room";
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
        appChannel: StorageMgr.mediaId,
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
        appName: SysConfig.appName,
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
                    StorageMgr.sessionId = '';
                    StorageMgr.userId = '';
                    UserData.userInfo = {};
                    UIMgr.goLogin();
                }
                resolve(code == 0 ? decodeLoginVO(data) : null);
            })
        })
    }

    /**
     * 登陆
     * @param params 登陆数据
     * @param loginType 登陆类型
     */
    public async sendSms(params: LoginDTO = {}): Promise<string> {
        params = Object.assign(loginCommonParams(), params);
        return new Promise<string>(resolve => {
            this.send(commonParams(CmdMgr.getMergeCmd(LoginCmd, Login_OTPCmd), encodeLoginDTO(params)), async (code: number, data: Uint8Array) => {
                if (code == 0) {
                    console.log(decodeLoginMobileSmsVO(data).smsCode);
                }
                resolve(code == 0 ? decodeLoginMobileSmsVO(data).smsCode : null);
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
    public async sendHallInfo(): Promise<HomepageResponse> {
        return new Promise<HomepageResponse>(resolve => {
            this.send(commonParams(CmdMgr.getMergeCmd(HallCmd, Hall_InfoCmd), new Uint8Array()), (code: number, data: Uint8Array) => {
                resolve(code === 0 ? decodeHomepageResponse(data) : null);
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
    public async sendBet(params: RoomBetDTO, gameCmd: number): Promise<boolean> {
        return new Promise<boolean>(resolve => {
            this.send(commonParams(CmdMgr.getMergeCmd(gameCmd, BetCmd), encodeRoomBetDTO(params)), (code: number, data: Uint8Array) => {
                resolve(code === 0);
            })
        })
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
            this.send(commonParams(CmdMgr.getMergeCmd(ReferCmd, Refer_MyInvitationCmd), encodeReferRankTop20DTO(params)), (code: number, data: Uint8Array) => {
                resolve(code === 0 ? decodeReferRankVO(data) : null);
            })
        })
    }

    /**发送消息 */
    private send(data: ExternalMessage, callFunc: NetCallFunc): boolean {
        return SocketMgr.send(data.cmdMerge, encodeExternalMessage(data), callFunc);
    }

}

export default new SendMgr();
