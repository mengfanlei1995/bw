import UserData from "../data/UserData";
import { HALL_EVT } from "../enum/DeskEnum";
import EventMgr from "../mgr/EventMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SelfVip extends cc.Component {


    start() {
        this.updateVip()
    }

    onEnable() {
        EventMgr.on(HALL_EVT.UPDATE_VIP, this.updateVip, this);
    }

    onDisable() {
        EventMgr.off(HALL_EVT.UPDATE_VIP, this.updateVip, this);
    }

    updateVip() {
        this.node.getComponent(cc.Label).string = `VIP${UserData.vipLevel}`;
    }
}