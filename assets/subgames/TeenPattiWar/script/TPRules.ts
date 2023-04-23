
import UIWindow from "../../../scripts/uiform/UIWindow";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends UIWindow {

    onClickClose() {
        this.hide();
    }

}
