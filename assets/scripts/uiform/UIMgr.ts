import AssetUtil from "../utils/AssetUtil";
import BundleUtil from "../utils/BundleUtil";
import LogUtil from "../utils/LogUtil";
import UIBase from "./UIBase";
import DiaLog, { DialogOptions, DialogType } from "./ui/common/DiaLog";
import Toast from "./ui/common/Toast";

export enum UIType {
    /**弹窗类型 */
    WINDOW = 1,
    /**通用类型 */
    SCREEN = 2,
    /**场景 */
    SCENE = 3
}

/**
 * UI控制器
 */
class UIMgr {

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
    public async show(url: string, name: string, params: any = null, isRepeat: boolean = false, target?: cc.Node): Promise<cc.Node> {
        let node: cc.Node = this.nodeMap.get(name) || null;
        if (!isRepeat && cc.isValid(node)) {
            LogUtil.warn("节点已存在场景中!!!", url);
            return node;
        }
        let prefab: cc.Prefab = this.assetMap.get(name) || null;
        if (!cc.isValid(prefab)) prefab = await this.getPrefab(url);
        if (!cc.isValid(prefab)) {
            LogUtil.error("资源不存在！", url);
            return null;
        }
        //防止短时间连续调用异步问题会重复加载页面
        node = this.nodeMap.get(name) || null;
        if (!isRepeat && cc.isValid(node)) {
            LogUtil.warn("节点已存在场景中!!!", url);
            return node;
        }
        let parent: cc.Node = target ? target : cc.find('Canvas');
        node = cc.instantiate(prefab);
        let script: UIBase = node.getComponent(name);
        if (script) {
            script.UIName = name;
            script.onShow(params);
        }
        node.parent = parent;
        this.assetMap.set(name, prefab);
        this.nodeMap.set(name, node);
        return node;
    }

    private async getPrefab(url: string): Promise<cc.Prefab> {
        let prefab: cc.Prefab = await AssetUtil.loadResSync<cc.Prefab>(url);
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

    /**显示loading */
    public showLoading() {
        this.show('prefab/common/Loading', 'Loading');
    }

    /**隐藏loading */
    public hideLoading() {
        this.hide('Loading');
    }


    public allToast: cc.Node[] = [];

    /**
     * 正常toast
     * @param msg 内容
     * @returns 
     */
    public showToast(msg: string, seconds: number = 1.5) {
        return new Promise<void>(async resolve => {
            let total = this.allToast.length;
            this.allToast.forEach(
                (node, index) => {
                    if (cc.isValid(node)) {
                        cc.tween(node).stop();
                        cc.tween(node).to(0.15, { y: (total - index) * 74 }).start()
                    }
                }
            )

            let prefab: cc.Prefab = await this.getPrefab('prefab/common/Toast');
            if (!cc.isValid(prefab)) {
                LogUtil.error("资源不存在！");
                return;
            }
            let toast: cc.Node = cc.instantiate(prefab);
            if (cc.isValid(toast)) {
                toast.parent = cc.find('Canvas');
                toast.getComponent(Toast).updateMsg(msg, seconds)
                this.allToast.push(toast)
            }
            resolve()
        })
    }

    /**
     * 强制清除掉全部toast
     */
    public clearAllToast() {
        this.allToast.forEach(
            (node, index) => {
                if (cc.isValid(node)) {
                    node.destroy()
                    node = null;
                }
            }
        )
        this.allToast = [];
    }

    /**
     * 显示对话框弹窗
     * @param options
     * @description 
     * ----> word: '弹窗提示内容-文字',
     * ----> type: '对话框类型',
     * ----> okCb: '对话框确认按钮点击事件',
     * ----> okTxt: '对话框确认按钮文字',
     * ----> cancelCb: '对话框取消按钮点击事件',
     * ----> cancelTxt: '对话框取消按钮文字',
     * ----> closeCb: '对话框关闭按钮点击事件',
     * ----> showCb: '对话框显示完毕后的回调',
     */
    public async showDialog(options: DialogOptions) {
        let defOptions: DialogOptions = {
            word: '',
            type: DialogType.OnlyOkBtn,
            okCb: null,
            okTxt: '',
            cancelCb: null,
            cancelTxt: '',
            closeCb: null,
            showCb: null,
            hideCb: null,
            hAlign: 0,
            title: ''
        }
        options = Object.assign(defOptions, options)
        let layer: cc.Node = await this.show('prefab/common/DiaLog', 'DiaLog');
        if (cc.isValid(layer)) {
            layer.parent = cc.find('Canvas');
            let script = layer.getComponent(DiaLog);
            if (script) {
                switch (options.type) {
                    case DialogType.OnlyOkBtn:
                        script.showTipsWithOkBtn(options);
                        break;
                    case DialogType.OkCancelBtn:
                        script.showTipsWithOkCancelBtn(options);
                        break;
                    case DialogType.OkBtnAndNoCloseBtn:
                        script.showTipsWithOkBtn(options);
                        script.setCloseBtnVisible(false);
                        break;
                    case DialogType.OnlyClose:
                        script.showTipsWithOnlyCloseBtn(options);
                        script.setCloseBtnVisible(true);
                        break;
                }
            }
        }
    }

    public hideDialog() {
        this.hide('DiaLog');
    }

    /**进入游戏 */
    public async enterGame(name: string): Promise<boolean> {
        //先加载公共bundle
        let common: cc.AssetManager.Bundle = await BundleUtil.getBundle('common');
        if (!common) {
            return false;
        }
        //加载游戏bundle
        let bundle: cc.AssetManager.Bundle = await BundleUtil.getBundle(name);
        if (!bundle) {
            LogUtil.error('bundleName error');
            BundleUtil.clearAllBundle();
            return false;
        }
        if (cc.director.getScene().name != name) {
            BundleUtil.loadBundleScene(name, name);
            return true;
        } else {
            return false;
        }
    }

    /**回到大厅 */
    public goHall() {
        if (cc.director.getScene().name != 'Hall') cc.director.loadScene('Hall');
    }

    /**login界面 */
    public goLogin() {
        if (cc.director.getScene().name != 'Login') cc.director.loadScene('Login');
    }

    /**热更新界面 */
    public goHotUpdate() {
        if (cc.director.getScene().name != 'HotUpdate') cc.director.loadScene('HotUpdate');
    }

}
export default new UIMgr();
