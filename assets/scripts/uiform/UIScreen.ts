
import UIBase from "./UIBase";
import { UIType } from "./UIMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UIScreen extends UIBase {

    onLoad() {
        this.fixedBg(this.node);
        this.UIType = UIType.SCREEN;
        this.node.zIndex = 98;
    }

}
