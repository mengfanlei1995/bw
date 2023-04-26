import UserData from "../data/UserData";
import { HALL_EVT } from "../enum/DeskEnum";
import EventMgr from "../mgr/EventMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SelfDeposit extends cc.Component {

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
        this.node.getComponent(cc.Label).string = `${this.str}${UserData.userInfo.walletInfo.depositBalance}`;
    }
}