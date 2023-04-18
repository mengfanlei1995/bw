import LangMgr from "../mgr/LangMgr";
import LocalizationBase from "./LocalizationBase";

const { ccclass, property, requireComponent } = cc._decorator;

@ccclass
@requireComponent(cc.Label)
export default class LocalizationLabelString extends LocalizationBase {

    @property
    langCode: string = ''

    private label: cc.Label = null;

    protected onLoad() {
        super.onLoad();
        this.label = this.node.getComponent(cc.Label);
        this.onLangChanged();
    }

    protected onLangChanged() {
        if (this.label) this.label.string = LangMgr.sentence(this.get());
    }

    /**
     * 获取当前语言资源
     */
    protected get(): string {
        return this.langCode;
    }

}