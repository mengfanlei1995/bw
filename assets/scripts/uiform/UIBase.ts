import UIMgr, { UIType } from "./UIMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UIBase extends cc.Component {

    /**ui类型 */
    public UIType: number;

    /**ui名字 */
    public UIName: string;

    onLoad() {

    }

    public onShow(params: any) {

    }

    /**
     * UI 打开动画
     */
    public async showTween(): Promise<any> {

    }

    /**
     * UI 关闭动画
     */
    public async hideTween(): Promise<any> {

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
