import UserData from "../../data/UserData";
import { HALL_EVT } from "../../enum/DeskEnum";
import { SocketEvent } from "../../enum/SocketEnum";
import EventMgr from "../../mgr/EventMgr";
import StorageMgr from "../../mgr/StorageMgr";
import UIMgr from "../../uiform/UIMgr";
import AssetUtil from "../../utils/AssetUtil";
import LogUtil from "../../utils/LogUtil";
import { Login_SessionCmd, Push_WalletCmd, Push_Wallet_ChangeCmd } from "../CmdData";
import CmdMgr from "../CmdMgr";
import HandleMgr from "../HandleMgr";
import SendMgr from "../SendMgr";
import WsPushMgr from "../WsPushMgr";
import { ExternalMessage, decodeExternalMessage } from "../proto/ExternalMessage";
import { GameUserWalletNotifyVO, decodeGameUserWalletNotifyVO } from "../proto/core";
import { ISocket, NetCallFunc } from "./NetInterface";

class SocketClient implements ISocket {

    private readonly SocketState_NoConnect: number = 0;  //没有连接
    private readonly SocketState_Connected: number = 1;  //已经连接
    private readonly SocketState_Closing: number = 2; //正在关闭中
    private readonly SocketState_Closed: number = 3; //已经关闭
    private SocketState: number;
    private webScoket: WebSocket = null;
    private heart: number = null;
    /**是否自动重连 */
    private autoConnect: boolean = true;


    constructor() {
        this.SocketState = this.SocketState_NoConnect;
    }

    //ws://192.168.124.13:1005/websocket 本地
    //ws://16.163.128.21/websocket 测试服
    //ws://65.2.121.34/websocket 正式服

    public async connect(ws: string = "ws://16.163.128.21/websocket"): Promise<void> {
        if (this.SocketState != this.SocketState_Connected) {
            if (cc.sys.isNative) {
                let cacert: cc.Asset = await AssetUtil.loadResSync<cc.Asset>("ssl/cacert", false);
                let pemUrl = cacert.nativeUrl;
                this.webScoket = new WebSocket(ws, null, pemUrl);
            } else {
                this.webScoket = new WebSocket(ws);
            }
            this.webScoket.binaryType = "arraybuffer";
            this.webScoket.onclose = this.onclose.bind(this);
            this.webScoket.onerror = this.onerror.bind(this);
            this.webScoket.onmessage = this.onmessage.bind(this);
            this.webScoket.onopen = this.onopen.bind(this);
        } else {
            this.onopen(null);
        }
    }


    public onopen(event: Event): void {
        LogUtil.log("onopen", event);
        this.SocketState = this.SocketState_Connected;
        UIMgr.hideLoading();
        this.sendHeart();
        if (UserData.userInfo.userId) SendMgr.sendLogin({}, Login_SessionCmd);
        EventMgr.emit(SocketEvent.WS_CONNECTED);
    }

    private sendHeart(): void {
        if (this.heart === null) {
            let func: Function = () => {
                SendMgr.sendHeart();
            }
            this.heart = setInterval(func, 4000)
        }
    }

    //发送消息
    public send(mergeCmd: number, pbBuff: Uint8Array, callFunc: NetCallFunc): boolean {
        // LogUtil.log("===send", mergeCmd, pbBuff)
        if (this.webScoket && this.webScoket.readyState === this.SocketState_Connected) {
            if (!pbBuff) {
                LogUtil.error("没有数据")
                return false;
            }
            if (callFunc) {
                HandleMgr.addHandler(mergeCmd, callFunc);
            }
            this.webScoket.send(pbBuff);
            return true;
        } else {
            //网络连接异常
            // this.connect();
            return false;
        }
    }

    public onmessage(event: MessageEvent): void {
        let recvData: Uint8Array = new Uint8Array(<ArrayBuffer>event.data);
        let data: ExternalMessage = decodeExternalMessage(recvData);
        let call = HandleMgr.packageHandler(data.cmdMerge, data.responseStatus, data.data);
        //返回错误
        if (data.responseStatus != 0) {
            if (data.cmdMerge != 0) LogUtil.log("onmessage", data)
            data.validMsg && UIMgr.showToast(data.validMsg);
        } else {
            //处理推送消息  暂时先拿不到相应的函数发送推送
            if (!call && data.cmdMerge != 0) {
                WsPushMgr.push(data);
            }
        }
    }

    //关闭close
    public close(autoConnect: boolean = true, code?: number, reason?: string): void {
        if (this.webScoket) {
            this.autoConnect = autoConnect;
            this.SocketState = this.SocketState_Closing;
            this.webScoket.close(code, reason);
        }
    }


    public onclose(event: CloseEvent): void {
        LogUtil.error("onclose", event)
        this.SocketState = this.SocketState_Closed;
        HandleMgr.clearHandler();
        UIMgr.showLoading();
        if (this.heart) {
            clearInterval(this.heart);
            this.heart = null;
        }
        if (this.autoConnect) {
            setTimeout(() => {
                this.connect();
            }, 3000);
        }
    }


    public onerror(event: Event): void {
        LogUtil.error("onerror", event)
        this.SocketState = this.SocketState_Closed;
    }
}

export default new SocketClient();
