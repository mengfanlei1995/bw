import SocketClient from "../../../net/ws/SocketClient";
import UIFixed from "../../UIFixed";
import UIMgr from "../../UIMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Loading extends UIFixed {

    protected start(): void {
        this.node.zIndex = 999;
        this.scheduleOnce(() => {
            this.node.opacity = 255;
        }, 1)
        this.scheduleOnce(() => {
            if (SocketClient.isConnected()) UIMgr.hideLoading();
        }, 5)
    }

}
