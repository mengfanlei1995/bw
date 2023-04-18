import EventMgr from "../mgr/EventMgr";

/** 语言更改事件 */
export const LANG_CHANGED = 'lang-change';

const { ccclass, property } = cc._decorator;

/**
 * 多语言组件基类
 */
@ccclass
export default class LocalizationBase extends cc.Component {

    private langChanged: Function = () => {
        this.onLangChanged();
    }

    protected onLoad() {
        EventMgr.on(LANG_CHANGED, this.langChanged, this);
    }

    protected onDestroy() {
        EventMgr.off(LANG_CHANGED, this.langChanged, this);
    }

    /**
     * 语言更改回调（子类重写该函数以具体实现）
     */
    protected onLangChanged() {

    }

}