import SysConfig from "../data/SysConfig";
import UserData from "../data/UserData";
import StorageMgr from "../mgr/StorageMgr";
import LogUtil from "../utils/LogUtil";
import LongUtil from "../utils/LongUtil";
import { BetCmd, ExitRoomCmd, Hall_GameListCmd, Hall_InfoCmd, JoinRoomCmd, RecordListCmd } from "./CmdData";
import { HallCmd } from "./CmdData";
import { LoginCmd, Login_GuestCmd, Login_PhoneCmd, Login_SessionCmd, UserCmd, User_ChangeHeadCmd } from "./CmdData";
import CmdMgr from "./CmdMgr";
import SocketMgr from "./SocketMgr";
import { ExternalMessage, encodeExternalMessage } from "./proto/ExternalMessage";
import { BaseUserInfoVO, decodeBaseUserInfoVO } from "./proto/core";
import { HomepageResponse, decodeHomepageGameVO, decodeHomepageResponse } from "./proto/hall";
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
import { RoomOptParam, encodeRoomOptParam } from "./proto/room";
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
        appName: SysConfig.appName,
        appVersion: SysConfig.version,
        appResVersion: 1,
        bundleId: SysConfig.pkgName,
        // code: '11',
        devId: StorageMgr.devId,
        invitationCode: StorageMgr.invateCode,
        invitationType: StorageMgr.invateType,
        // mobile: StorageMgr.phone,
        platform: 'android',
        productId: 11,
        userId: StorageMgr.userId,
        sessionId: StorageMgr.sessionId,
        appsflyerId: StorageMgr.afId
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
        return new Promise<LoginVO>(resolve => {
            this.send(commonParams(CmdMgr.getMergeCmd(LoginCmd, loginType), encodeLoginDTO(params)), async (code: number, data: Uint8Array) => {
                if (code === 0) {
                    let userInfo: LoginVO = decodeLoginVO(data);
                    UserData.initUserInfo(userInfo);
                }
                resolve(code == 0 ? decodeLoginVO(data) : null);
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
            this.send(commonParams(CmdMgr.getMergeCmd(UserCmd, User_ChangeHeadCmd), encodeUserUpdateNicknameDTO(params)), (code: number, data: Uint8Array) => {
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
    public async sendEnterRoom(params: RoomOptParam, gameCmd: number): Promise<Uint8Array> {
        return new Promise<Uint8Array>(resolve => {
            this.send(commonParams(CmdMgr.getMergeCmd(gameCmd, JoinRoomCmd), encodeRoomOptParam(params)), (code: number, data: Uint8Array) => {
                resolve(code === 0 ? data : null);
            })
        })
    }

    /**退出房间 */
    public async sendExitRoom(params: RoomOptParam, gameCmd: number): Promise<boolean> {
        return new Promise<boolean>(resolve => {
            this.send(commonParams(CmdMgr.getMergeCmd(gameCmd, ExitRoomCmd), encodeRoomOptParam(params)), (code: number, data: Uint8Array) => {
                resolve(code === 0);
            })
        })
    }

    /**下注 */
    public async sendBet(params: RoomOptParam, gameCmd: number): Promise<boolean> {
        return new Promise<boolean>(resolve => {
            this.send(commonParams(CmdMgr.getMergeCmd(gameCmd, BetCmd), encodeRoomOptParam(params)), (code: number, data: Uint8Array) => {
                resolve(code === 0);
            })
        })
    }

    /**流水 */
    public async sendRecordList(params: RoomOptParam, gameCmd: number): Promise<Uint8Array> {
        return new Promise<Uint8Array>(resolve => {
            this.send(commonParams(CmdMgr.getMergeCmd(gameCmd, RecordListCmd), encodeRoomOptParam(params)), (code: number, data: Uint8Array) => {
                resolve(code === 0 ? data : null);
            })
        })
    }

    /**发送消息 */
    private send(data: ExternalMessage, callFunc: NetCallFunc): boolean {
        return SocketMgr.send(data.cmdMerge, encodeExternalMessage(data), callFunc);
    }

}

export default new SendMgr();
