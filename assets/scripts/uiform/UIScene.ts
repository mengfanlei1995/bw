
import UIBase from "./UIBase";
import UIMgr, { UIType } from "./UIMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UIScene extends UIBase {

    //动态加载的资源 统一通过场景来管理 场景切换同意释放掉
    /**动态加载的资源 */
    protected assets: cc.Asset[] = [];

    public addAssets(asset: cc.Asset) {
        if (asset.isValid) {
            asset.addRef();
            this.assets.push(asset);
        }
    }

    onDestroy() {
        this.assets.forEach(asset => {
            asset.decRef();
        });
        UIMgr.hideAll();
    }

    onLoad(): void {
        this.UIType = UIType.SCENE;
    }

}
