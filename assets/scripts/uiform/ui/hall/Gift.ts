import { HALL_EVT } from "../../../enum/DeskEnum";
import EventMgr from "../../../mgr/EventMgr";
import UIMgr from "../../UIMgr";
import UIWindow from "../../UIWindow";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Gift extends UIWindow {

    @property({ tooltip: '动画', type: sp.Skeleton })
    skel: sp.Skeleton = null;

    onEnable() {
        // this.skel.setAnimation(0, "animation1", false);
        this.skel.setCompleteListener(() => {
            if (this.skel.animation == "animation1") {
                this.skel.setAnimation(0, "animation2", true);
            }
        });
    }

    onClickClose() {
        this.hide();
        EventMgr.emit(HALL_EVT.OPEN_WINDOWS);
    }

    onClickRecharge() {
        this.hide();
        UIMgr.show('prefab/hall/AddCash', 'AddCash', { vipInto: false, vipLevel: 0 });
    }

}
