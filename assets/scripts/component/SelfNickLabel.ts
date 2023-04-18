import UserData from "../data/UserData";
import { HALL_EVT } from "../enum/DeskEnum";
import EventMgr from "../mgr/EventMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SelfNickLabel extends cc.Component {

    onEnable() {
        this.updateNickName()
        EventMgr.on(HALL_EVT.UPDATE_HALL_NICKNAME, this.updateNickName, this)
    }

    onDisable() {
        EventMgr.off(HALL_EVT.UPDATE_HALL_NICKNAME, this.updateNickName, this)
    }

    async updateNickName() {
        this.node.getComponent(cc.Label).string = `${UserData.userInfo.nickName}`
    }
}