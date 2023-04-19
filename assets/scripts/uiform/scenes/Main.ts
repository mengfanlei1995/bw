import { SocketEvent } from "../../enum/SocketEnum";
import EventMgr from "../../mgr/EventMgr";
import LangMgr from "../../mgr/LangMgr";
import SoundMgr from "../../mgr/SoundMgr";
import StorageMgr from "../../mgr/StorageMgr";
import { Login_SessionCmd } from "../../net/CmdData";
import SendMgr from "../../net/SendMgr";
import SocketMgr from "../../net/SocketMgr";
import SocketClient from "../../net/ws/SocketClient";
import JsbUitl from "../../utils/JsbUitl";
import LogUtil from "../../utils/LogUtil";
import LongUtil from "../../utils/LongUtil";
import UIMgr from "../UIMgr";
import UIScene from "../UIScene";
import { DialogType } from "../ui/common/DiaLog";


const { ccclass, property } = cc._decorator;

@ccclass
export default class Main extends UIScene {

    onLoad() {
        SoundMgr.init();
        LangMgr.init();
        JsbUitl.initInfo();
        SocketMgr.connect();
        EventMgr.on(SocketEvent.WS_CONNECTED, this.wsConnected, this)
    }

    start() {

    }

    onDestroy(): void {
        EventMgr.off(SocketEvent.WS_CONNECTED, this.wsConnected, this)
    }

    async wsConnected() {
        // if (StorageMgr.sessionId) {
        //     let result = await SendMgr.sendLogin({ sessionId: StorageMgr.sessionId }, Login_SessionCmd);
        //     if (result) {
        //         UIMgr.goHall();
        //     }
        // } else {
        UIMgr.goLogin();
        // }
    }

}
