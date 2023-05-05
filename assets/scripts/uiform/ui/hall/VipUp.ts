import UserData from "../../../data/UserData";
import { REPORT_EVT } from "../../../enum/DeskEnum";
import EventMgr from "../../../mgr/EventMgr";
import UIWindow from "../../UIWindow";

const { ccclass, property } = cc._decorator;

@ccclass
export default class VipUp extends UIWindow {

    @property({ tooltip: '关闭按钮', type: cc.Button })
    btnClose: cc.Button = null;

    @property({ tooltip: '动画', type: sp.Skeleton })
    skel: sp.Skeleton = null;

    /**播放vip升级动画 */
    setAttachment(level: number) {
        let index: number = 1;
        let array: number[] = [1, 1, 1, 2, 2, 3, 3];
        if (array[level]) {
            index = array[level];
        } else if (level > array.length) {
            index = 3;
        }
        this.skel.setAttachment('BL1', `BL${index}`);
        this.skel.setAttachment('VipNum0', `VipNum${level}`);
        this.skel.setAttachment('VipNumVIP1', `VipNumVIP${level == 0 ? 2 : 1}`);
    }

    onEnable() {
        EventMgr.emit(REPORT_EVT.SCENE, { page_name: `vipUp` });
        this.setAttachment(UserData.beforeVipLevel);
        this.skel.setAnimation(0, "animation_narrow", false);
        this.skel.setCompleteListener(() => {
            if (this.skel.animation == "animation_narrow") {
                this.skel.setAnimation(0, "animation_appear", false);
                this.setAttachment(UserData.vipLevel);
            } else if (this.skel.animation == "animation_appear") {
                this.skel.setAnimation(0, "animation_loop", true);
                this.btnClose.interactable = true;
            } else if (this.skel.animation == "animation_disappear") {
                this.hide();
            }
        });
    }

    onClickClose() {
        this.skel.setAnimation(0, "animation_disappear", false);
    }

}
