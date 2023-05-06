import { HALL_EVT, REPORT_EVT } from "../../../enum/DeskEnum";
import EventMgr from "../../../mgr/EventMgr";
import UIMgr from "../../UIMgr";
import UIWindow from "../../UIWindow";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Gift extends UIWindow {

    @property({ tooltip: '动画', type: sp.Skeleton })
    skel: sp.Skeleton = null;

    onEnable() {
        EventMgr.emit(REPORT_EVT.SCENE, { page_name: `newGiftPopup` })
        this.skel.setAnimation(0, "animation_apper", false);
        this.skel.setCompleteListener(() => {
            if (this.skel.animation == "animation_apper") {
                this.skel.setAnimation(0, "animation_loop", true);
            }
        });
    }

    onClickClose() {
        this.hide();
        EventMgr.emit(REPORT_EVT.CLICK, {
            element_id: "newGiftPopup_close",
            element_name: "新手弹窗关闭按钮",
            element_type: "button",
            element_position: '',
            element_content: '',
        });
        EventMgr.emit(HALL_EVT.OPEN_WINDOWS);
    }

    onClickRecharge() {
        this.hide();
        UIMgr.show('prefab/hall/AddCash', 'AddCash', { vipInto: false, vipLevel: 0 });
        EventMgr.emit(REPORT_EVT.CLICK, {
            element_id: "btn_addcash_byGift",
            element_name: "新手弹窗充值按钮",
            element_type: "button",
            element_position: '',
            element_content: '',
        });
    }

}
