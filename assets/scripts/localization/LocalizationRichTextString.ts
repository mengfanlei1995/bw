import LangMgr from "../mgr/LangMgr";
import LocalizationBase from "./LocalizationBase";

const { ccclass, property, requireComponent } = cc._decorator;

@ccclass
@requireComponent(cc.RichText)
export default class LocalizationRichTextString extends LocalizationBase {

    @property
    langCode: string = ''

    private label: cc.RichText = null;

    protected onLoad() {
        super.onLoad();
        this.label = this.node.getComponent(cc.RichText);
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