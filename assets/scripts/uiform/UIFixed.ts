
import UIBase from "./UIBase";
import { UIType } from "./UIMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UIFixed extends UIBase {

    onLoad() {
        this.UIType = UIType.FIXED;
        this.node.zIndex = 98;
    }

}
