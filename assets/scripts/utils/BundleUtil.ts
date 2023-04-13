import LogUtil from "./LogUtil";

class BundleUtil {

    /**当前使用bundle */
    public _usedBundle: cc.AssetManager.Bundle = null;
    public get usedBundle(): cc.AssetManager.Bundle {
        return this._usedBundle;
    }
    public set usedBundle(_bundle: cc.AssetManager.Bundle) {
        if (this._usedBundle) {
            this.removeBundle();
        }
        this._usedBundle = _bundle;
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
            bundleName = bundleName.toLowerCase()
            let bundle: cc.AssetManager.Bundle = cc.assetManager.getBundle(bundleName);
            if (!bundle) {
                bundle = await this.loadBundle(bundleName, version ? { version } : null);
                bundle && (this.usedBundle = bundle)
            }
            resolve(bundle || null);
        })
    }

    /*
     * 加载bundle 资源 
     */
    public loadBundleSync<T extends cc.Asset>(url: string, onProgress?: (completedCount: number, totalCount: number, item: any) => void): Promise<T> {
        if (!this.usedBundle) {
            LogUtil.warn("请先加载bundle!!!");
            return;
        }
        let bundle: cc.AssetManager.Bundle = this.usedBundle;
        return new Promise(resolve => {
            bundle.load(url, onProgress, (err: Error, asset: T) => {
                resolve(err ? null : asset);
            })
        })
    }

    /*
     *加载bundle 资源 
     */
    public loadResSync<T extends cc.Asset>(url: string, onProgress?: (completedCount: number, totalCount: number, item: any) => void): Promise<T> {
        if (!this.usedBundle) {
            LogUtil.warn("请先加载bundle!!!");
            return;
        }
        let bundle: cc.AssetManager.Bundle = this.usedBundle;
        return new Promise(resolve => {
            if (bundle) {
                bundle.load(url, onProgress, (err: Error, asset: T) => {
                    resolve(err ? null : asset);
                })
            } else resolve(null);
        })
    }

    /**加载bundle scene */
    public loadBundleScene(sceneName: string, onProgress?: (completedCount: number, totalCount: number, item: any) => void): void {
        if (!this.usedBundle) {
            LogUtil.warn("请先加载bundle!!!");
            return;
        }
        let bundle: cc.AssetManager.Bundle = this.usedBundle;
        bundle.loadScene(sceneName, onProgress, (err: Error, scene: cc.SceneAsset) => {
            scene && cc.director.runScene(scene)
        })
    }

    public clearBundle() {
        if (!this.usedBundle) {
            LogUtil.warn("请先加载bundle!!!");
            return;
        }
        let bundle: cc.AssetManager.Bundle = this.usedBundle;
        this.releaseBundle();
        this.removeBundle();
    }

    /**移除bnudle */
    public removeBundle(): void {
        if (!this.usedBundle) {
            LogUtil.warn("请先加载bundle!!!");
            return;
        }
        let bundle: cc.AssetManager.Bundle = this.usedBundle;
        cc.assetManager.removeBundle(bundle);
    }

    /**释放bundle所有资源 */
    public releaseBundle(): void {
        if (!this.usedBundle) {
            LogUtil.warn("请先加载bundle!!!");
            return;
        }
        let bundle: cc.AssetManager.Bundle = this.usedBundle;
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

    /**
      * 加载bundle 资源 
      * type  cc.Prefab cc.SpriteFrame 等
    */
    public preLoadBundleDirSync(url: string, type: typeof cc.Asset, onProgress?: (completedCount: number, totalCount: number, item: any) => void): Promise<boolean> {
        if (!this.usedBundle) {
            LogUtil.warn("请先加载bundle!!!");
            return;
        }
        let bundle: cc.AssetManager.Bundle = this.usedBundle;
        return new Promise(resolve => {
            bundle.preloadDir(url, type, onProgress, (err: Error, items: cc.AssetManager.RequestItem[]) => {
                resolve(err ? false : true);
            })
        })
    }
}

export default new BundleUtil();