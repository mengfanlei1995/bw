import UserData from "../data/UserData";
import { HALL_EVT } from "../enum/DeskEnum";
import EventMgr from "../mgr/EventMgr";
import AssetUtil from "../utils/AssetUtil";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SelfVipSprite extends cc.Component {


    start() {
        this.updateVip()
    }

    onEnable() {
        EventMgr.on(HALL_EVT.UPDATE_VIP, this.updateVip, this);
    }

    onDisable() {
        EventMgr.off(HALL_EVT.UPDATE_VIP, this.updateVip, this);
    }

    async updateVip() {
        let index: number = 1;
        let array: number[] = [1, 1, 1, 2, 2, 3, 3];
        if (UserData.userInfo.vipLevel >= array.length - 1) {
            index = array[array.length - 1];
        } else {
            index = array[UserData.userInfo.vipLevel];
        }
        let texture: cc.Texture2D = await AssetUtil.loadResSync<cc.Texture2D>(`vip/L${index || '1'}`, false);
        let spriteFrame: cc.SpriteFrame = new cc.SpriteFrame(texture);
        this.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
    }
}