import UIScene from "../uiform/UIScene";
import LogUtil from "./LogUtil";

class BundleUtil {

    /**当前使用bundle */
    private _usedBundle: Map<string, cc.AssetManager.Bundle> = new Map();

    private setUsedBundle(bundleName: string, bundle: cc.AssetManager.Bundle): void {
        if (!this.getUsedBundle(bundleName)) this._usedBundle.set(bundleName, bundle);
    }

    public getUsedBundle(bundleName: string): cc.AssetManager.Bundle {
        return this._usedBundle.get(bundleName) || null;
    }

    /**加载bundle */
    public loadBundle(bundleName: string, options: any = null): Promise<cc.AssetManager.Bundle> {
        return new Promise(resolve => {
            cc.assetManager.loadBundle(bundleName, options, (err: Error, bundle: cc.AssetManager.Bundle) => {
                resolve(err ? null : bundle);
            })
        })
    }

    /**获取Bundle */
    public getBundle(bundleName: string, version?: string): Promise<cc.AssetManager.Bundle> {
        return new Promise(async resolve => {
            // bundleName = bundleName.toLowerCase()
            let bundle: cc.AssetManager.Bundle = this.getUsedBundle(bundleName);
            if (!bundle) {
                bundle = await this.loadBundle(bundleName, version ? { version } : null);
                bundle && (this.setUsedBundle(bundleName, bundle))
            }
            resolve(bundle || null);
        })
    }

    /*
     *加载bundle 资源 
     */
    public loadResSync<T extends cc.Asset>(bundleName: string, url: string, onProgress?: (completedCount: number, totalCount: number, item: any) => void): Promise<T> {
        let bundle: cc.AssetManager.Bundle = this.getUsedBundle(bundleName);
        if (!bundle) {
            LogUtil.warn("bundle不存在!!!");
            return;
        }
        return new Promise(resolve => {
            if (bundle) {
                bundle.load(url, onProgress, (err: Error, asset: T) => {
                    asset.isValid && (this.addRef(asset))
                    resolve(err ? null : asset);
                })
            } else resolve(null);
        })
    }

    /**加载bundle scene */
    public loadBundleScene(bundleName: string, sceneName: string, onProgress?: (completedCount: number, totalCount: number, item: any) => void): void {
        let bundle: cc.AssetManager.Bundle = this.getUsedBundle(bundleName);
        if (!bundle) {
            LogUtil.warn("bundle不存在!!!");
            return;
        }
        bundle.loadScene(sceneName, onProgress, (err: Error, scene: cc.SceneAsset) => {
            scene && cc.director.runScene(scene)
        })
    }

    public clearBundle(bundleName: string): void {
        let bundle: cc.AssetManager.Bundle = this.getUsedBundle(bundleName);
        if (!bundle) {
            LogUtil.warn("bundle不存在!!!");
            return;
        }
        // this.releaseBundle(bundle);
        this.removeBundle(bundle);
        this._usedBundle.delete(bundleName);
    }

    public clearAllBundle(): void {
        if (this._usedBundle.size == 0) return;
        this._usedBundle.forEach(bundle => {
            // this.releaseBundle(bundle);
            this.removeBundle(bundle);
        })
        this._usedBundle.clear();
    }

    /**移除bnudle */
    private removeBundle(bundle: cc.AssetManager.Bundle): void {
        cc.assetManager.removeBundle(bundle);
    }

    /**释放bundle所有资源 */
    private releaseBundle(bundle: cc.AssetManager.Bundle): void {
        bundle.releaseAll();
    }

    /**下载bundle资源 */
    public loadBundleAnySync(assets: string | string[] | Record<string, any> | Record<string, any>[], options: Record<string, any>, onProgress?: (completedCount: number, totalCount: number, item: any) => void): Promise<boolean> {
        return new Promise(resolve => {
            cc.assetManager.preloadAny(assets, options, onProgress, (err: Error, items: cc.AssetManager.RequestItem[]) => {
                resolve(err ? false : true)
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

export default new BundleUtil();