import { HALL_EVT } from "../enum/DeskEnum";
import SysConfig from "../data/SysConfig";
import EventMgr from "../mgr/EventMgr";
import UserData from "../data/UserData";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SelfBalance extends cc.Component {

    @property(cc.String)
    str: string = ""

    start() {
        this.updateBalance()
    }

    onEnable() {
        EventMgr.on(HALL_EVT.GOLD_CHANGE, this.updateBalance, this)
    }

    onDisable() {
        EventMgr.off(HALL_EVT.GOLD_CHANGE, this.updateBalance, this)
    }

    updateBalance() {
        if (SysConfig.isSettling) return;
        this.node.getComponent(cc.Label).string = `${this.str}${UserData.userInfo.walletInfo.totalCashBalance}`;
    }
}