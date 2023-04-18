import { LANG_CHANGED } from "../localization/LocalizationBase";
import AssetUtil from "../utils/AssetUtil";
import EventMgr from "./EventMgr";
import StorageMgr from "./StorageMgr";

class LangMgr {

    private _langAsset: cc.JsonAsset = null;

    /**初始化语言包 */
    public async init() {
        let currLang = StorageMgr.lang;
        if (this._langAsset) {
            cc.assetManager.releaseAsset(this._langAsset);
            this._langAsset = null;
        }
        this._langAsset = await AssetUtil.loadResSync<cc.JsonAsset>(`language/${currLang}/lang`, false);
        EventMgr.emit(LANG_CHANGED);
    }
    /**
     * 根据编号获取对应的语言内容
     * @param key 
     * @returns 
     */
    public sentence(key: string) {
        return this._langAsset ? this._langAsset.json[key] : "";
    }
    /**
     * 语言包变更
     */
    public async change(lang: string) {
        StorageMgr.lang = lang;
        this.init();
    }
}

export default new LangMgr();
