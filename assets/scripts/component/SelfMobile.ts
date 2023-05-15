import UserData from "../data/UserData";
import { HALL_EVT } from "../enum/DeskEnum";
import EventMgr from "../mgr/EventMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SelfMobile extends cc.Component {

    start() {
        this.updatePhone()
    }

    onEnable() {
        EventMgr.on(HALL_EVT.UPDATE_PHONE, this.updatePhone, this);
    }

    onDisable() {
        EventMgr.off(HALL_EVT.UPDATE_PHONE, this.updatePhone, this);
    }

    updatePhone() {
        this.node.getComponent(cc.Label).string = `${UserData.userInfo.phone}` || '';
    }
}