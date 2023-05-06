
import UIBase from "./UIBase";
import { UIType } from "./UIMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UIWindow extends UIBase {

    onLoad() {
        this.UIType = UIType.WINDOW;
        this.node.zIndex = 99;
        this.showTween();
    }

    /**
     * UI 打开动画
     */
    public async showTween() {
        return new Promise(resolve => {
            this.node.scale = 0.5;
            cc.tween(this.node)
                .to(0.5, { scale: 1 }, { easing: 'backOut' })
                .call(() => {
                    resolve(null)
                })
                .start();
        })
    }

    /**
     * UI 关闭动画
     */
    public async hideTween() {
        return new Promise(resolve => {
            cc.tween(this.node)
                .to(0.5, { scale: 0.5 }, { easing: 'backIn' })
                .call(() => {
                    this.node.active = false;
                    resolve(null)
                })
                .start();
        })
    }
}
