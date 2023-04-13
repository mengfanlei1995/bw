import UIMgr from "../../UIMgr";
import UIScreen from "../../UIScreen";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Toast extends UIScreen {

    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.Node)
    bg: cc.Node = null;

    updateMsg(msg: string, seconds: number = 0.8) {
        cc.tween(this.node).delay(seconds).to(0.6, { opacity: 0 }, { easing: 'easeOutCubic' }).call(
            () => {
                let index = UIMgr.allToast.indexOf(this.node)
                if (index != -1) {
                    UIMgr.allToast.splice(index, 1);
                }
                if (cc.isValid(this.node)) {
                    UIMgr.hide(this.UIName);
                }
            }
        ).start()
        this.label.string = msg;
        this.label['_forceUpdateRenderData']();
        if (this.label.node.height >= 91) {
            this.bg.height += this.label.node.height - 91;
        }
    }

}
