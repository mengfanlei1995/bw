import UIMgr, { UIType } from "./UIMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UIBase extends cc.Component {

    /**ui类型 */
    protected UIType: number;

    /**ui名字 */
    protected UIName: string;

    onLoad() {

    }

    /**
     * UI 打开动画
     */
    protected async showTween(): Promise<any> {

    }

    /**
     * UI 关闭动画
     */
    protected async hideTween(): Promise<any> {
        
    }

    start() {

    }

    async hide() {
        await this.hideTween();
        UIMgr.hide(this.UIName);
    }


    update(deltaTime: number) {

    }

}
