
import UIWindow from "../../../scripts/uiform/UIWindow";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TPRules extends UIWindow {

    onClickClose() {
        this.hide();
    }

}
