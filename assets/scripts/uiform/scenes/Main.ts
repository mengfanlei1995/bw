import SocketMgr from "../../net/SocketMgr";
import SocketClient from "../../net/ws/SocketClient";
import LogUtil from "../../utils/LogUtil";
import UIMgr from "../UIMgr";
import UIScene from "../UIScene";


const { ccclass, property } = cc._decorator;

@ccclass
export default class Main extends UIScene {

    onLoad() {
        // SocketMgr.connect();
    }

    start() {

    }

    // update (dt) {}
}
