import UserData from "../data/UserData";
import { HALL_EVT } from "../enum/DeskEnum";
import EventMgr from "../mgr/EventMgr";
import AssetUtil from "../utils/AssetUtil";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SelfAvatar extends cc.Component {

    start() {
        this.updateHeadpic()
    }

    onEnable() {
        EventMgr.on(HALL_EVT.UPDATE_HALL_HEAD, this.updateHeadpic, this)
    }

    onDisable() {
        EventMgr.off(HALL_EVT.UPDATE_HALL_HEAD, this.updateHeadpic, this)
    }

    async updateHeadpic() {
        this.node.getComponent(cc.Sprite).spriteFrame = await AssetUtil.loadResSync<cc.SpriteFrame>(`avatar/${UserData.userInfo.headPic || '1'}`, false);
    }
}