import StorageMgr from "../../../mgr/StorageMgr";
import UIFixed from "../../UIFixed";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HandAni extends UIFixed {

    onEnable() {
        StorageMgr.hallHandTimes = 1;
    }

    onClickClose() {
        this.hide();
    }

}
