import UIScene from "../uiform/UIScene";

class AssetUtil {

    /** 加载资源 */
    public loadResSync<T extends cc.Asset>(url: string, isAdd: boolean = true, onProgress?: (completedCount: number, totalCount: number, item: any) => void): Promise<T> {
        return new Promise(resolve => {
            cc.resources.load(url, onProgress, (err, asset: T) => {
                if (err) {
                    resolve(null);
                } else {
                    isAdd && this.addRef(asset);
                    resolve(asset);
                }
            });
        });
    }


    /**加载远程资源 */
    public loadRemoteSync<T extends cc.Asset>(url: string): Promise<T> {
        return new Promise(resolve => {
            cc.assetManager.loadRemote(url, (err, asset: T) => {
                if (err) {
                    resolve(null);
                } else {
                    this.addRef(asset);
                    resolve(asset);
                }
            })
        })
    }

    /**增加引用计数 统一放在当前运行场景来统一管理 场景销毁 统一释放*/
    private addRef(asset: cc.Asset) {
        if (!cc.isValid(asset)) return;
        let scene: cc.Node = cc.find('Canvas');
        let script: UIScene = scene.getComponent(cc.director.getScene().name);
        script?.addAssets(asset);
    }

}

export default new AssetUtil();
