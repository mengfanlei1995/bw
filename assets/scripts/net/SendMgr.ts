import LogUtil from "../utils/LogUtil";
import { LoginCmd, LoginGuestCmd } from "./CmdData";
import CmdMgr from "./CmdMgr";
import SocketMgr from "./SocketMgr";
import { ExternalMessage, encodeExternalMessage } from "./proto/ExternalMessage";
import { decodeLoginVO, encodeLoginDTO } from "./proto/hall";
import { LoginDTO } from "./proto/hall";
import { LoginVO } from "./proto/hall";
import { NetCallFunc } from "./ws/NetInterface";
import SocketClient from "./ws/SocketClient";

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

class SendMgr {

    /**心跳 */
    public sendHeart(): void {
        let _data = commonParams(0, new Uint8Array(), 0);
        this.send(_data, null);
    }


    /**登陆 */
    public async sendLogin(params?: LoginDTO): Promise<void> {
        // let a: LoginDTO = {
        //     appChannel: '11',
        //     appName: '11',
        //     appVersion: '11',
        //     appResVersion: 1,
        //     bundleId: '11',
        //     code: '11',
        //     devId: '11',
        //     invitationCode: '11',
        //     invitationType: '11',
        //     mobile: '11',
        //     platform: '11',
        //     productId: 11,
        //     userId: '11',
        //     sessionId: '11',
        //     appsflyerId: '11'
        // }
        return new Promise<any>(resolve => {
            this.send(commonParams(CmdMgr.getMergeCmd(LoginCmd, LoginGuestCmd), encodeLoginDTO(params)), (code: number, data: Uint8Array) => {
                resolve(code == 0 ? decodeLoginVO(data) : null);
            })
        })
    }

    /**发送消息 */
    private send(data: ExternalMessage, callFunc: NetCallFunc): boolean {
        return SocketMgr.send(data.cmdMerge, encodeExternalMessage(data), callFunc);
    }

}

export default new SendMgr();
