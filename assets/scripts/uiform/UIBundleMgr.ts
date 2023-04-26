import BundleUtil from "../utils/BundleUtil";
import LogUtil from "../utils/LogUtil";
import UIBase from "./UIBase";

class UIBundleMgr {

    /**
     * 所有节点集合
     */
    private nodeMap: Map<string, cc.Node> = new Map();

    /**
     * 所有资源集合
     */
    private assetMap: Map<string, cc.Prefab> = new Map();

    /**
     * 显示UI 必须继承UIBase
     * @param name UI名字
     * @param type UI类型
     * @param target 父节点
     * @returns 
     */
    public async show(bundleName: string, url: string, name: string, params: any = null, isRepeat: boolean = false, target?: cc.Node): Promise<cc.Node> {
        let node: cc.Node = this.nodeMap.get(name) || null;
        if (!isRepeat && cc.isValid(node)) {
            LogUtil.warn("节点已存在场景中!!!", url);
            return node;
        }
        let prefab: cc.Prefab = this.assetMap.get(name) || null;
        if (!cc.isValid(prefab)) prefab = await this.getPrefab(bundleName, url);
        if (!cc.isValid(prefab)) {
            LogUtil.error("资源不存在！", url);
            return null;
        }
        let parent: cc.Node = target ? target : cc.find('Canvas');
        node = cc.instantiate(prefab);
        let script: UIBase = node.getComponent(name);
        if (script) {
            script.isBundle = 1;
            script.UIName = name;
            script.onShow(params);
        }
        node.parent = parent;
        this.assetMap.set(name, prefab);
        this.nodeMap.set(name, node);
        return node;
    }

    private async getPrefab(bundleName: string, url: string): Promise<cc.Prefab> {
        let prefab: cc.Prefab = await BundleUtil.loadResSync<cc.Prefab>(bundleName, url);
        return prefab || null;
    }

    /**
     * 销毁节点
     * @param name 
     */
    public hide(name: string) {
        let node: cc.Node = this.nodeMap.get(name);
        if (node) {
            if (cc.isValid(node)) {
                node.destroy();
            }
            this.nodeMap.delete(name);
        }
    }

    /**
     * 销毁所有节点
     */
    public hideAll() {
        this.nodeMap.forEach((node: cc.Node) => {
            cc.isValid(node) && node.destroy();
        })
        this.nodeMap.clear();
        this.assetMap.clear();
    }

    public async showGameHead(param: any): Promise<void> {
        await this.show('common', 'prefab/GameHead', 'GameHead', param);
    }

}

export default new UIBundleMgr();