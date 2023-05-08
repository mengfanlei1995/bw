import SysConfig from "../data/SysConfig";
import UIBundleMgr from "./UIBundleMgr";
import UIMgr, { UIType } from "./UIMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UIBase extends cc.Component {

    /**ui类型 */
    public UIType: number;

    /**ui名字 */
    public UIName: string;

    public isBundle: number = 0;

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

    async hide() {
        await this.hideTween();
        if (this.isBundle) {
            UIBundleMgr.hide(this.UIName);
        } else {
            UIMgr.hide(this.UIName);
        }
    }

    fixedBg(root: cc.Node) {
        let distance: number = SysConfig?.systemInfo?.isPieScreen ? 50 : 0;
        if (cc.isValid(root) && distance) {
            if (root.getComponent(cc.Widget).enabled)
                root.getComponent(cc.Widget).top = distance;
        }
    }

}
