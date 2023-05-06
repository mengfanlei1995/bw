import StorageMgr from "../../../mgr/StorageMgr";
import UIScreen from "../../UIScreen";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HandAni extends UIScreen {

    onEnable() {
        StorageMgr.hallHandTimes = 1;
    }

    onClickClose() {
        this.hide();
    }

}
