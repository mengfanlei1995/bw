import { SocketEvent } from "../../enum/SocketEnum";
import EventMgr from "../../mgr/EventMgr";
import LangMgr from "../../mgr/LangMgr";
import SoundMgr from "../../mgr/SoundMgr";
import SocketMgr from "../../net/SocketMgr";
import SocketClient from "../../net/ws/SocketClient";
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
        SocketMgr.connect();
        EventMgr.on(SocketEvent.WS_CONNECTED, this.wsConnected, this)
    }

    start() {

    }

    onDestroy(): void {
        EventMgr.off(SocketEvent.WS_CONNECTED, this.wsConnected, this)
    }

    wsConnected() {
        UIMgr.goLogin();
    }

}
