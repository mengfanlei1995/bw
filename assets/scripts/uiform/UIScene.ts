
import SysConfig from "../data/SysConfig";
import SoundMgr from "../mgr/SoundMgr";
import UIBase from "./UIBase";
import UIBundleMgr from "./UIBundleMgr";
import UIMgr, { UIType } from "./UIMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UIScene extends UIBase {

    //动态加载的资源 统一通过场景来管理 场景切换统一释放掉
    /**动态加载的资源 */
    protected assets: cc.Asset[] = [];

    public addAssets(asset: cc.Asset) {
        if (asset.isValid) {
            asset.addRef();
            this.assets.push(asset);
        }
    }

    fixedBg(root: cc.Node) {
        let distance: number = SysConfig?.systemInfo?.isPieScreen ? 50 : 0;
        if (cc.isValid(root) && distance) {
            if (root.getComponent(cc.Widget).enabled)
                root.getComponent(cc.Widget).top = 50;
        }
    }

    onLoad() {
        this.UIType = UIType.SCENE;
        // this.fixedBg(this.node);
    }

    onDestroy() {
        this.assets.forEach(asset => {
            asset.decRef();
        });
        if (this.isBundle) {
            UIBundleMgr.hideAll();
            SoundMgr.bundleAudioCache = {};
        } else {
            UIMgr.hideAll();
        }
    }
}
