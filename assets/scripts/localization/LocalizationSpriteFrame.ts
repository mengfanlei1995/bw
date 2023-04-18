import LangMgr from "../mgr/LangMgr";
import LocalizationBase from "./LocalizationBase";

const { ccclass, property, requireComponent } = cc._decorator;

@ccclass
@requireComponent(cc.Sprite)
export default class LocalizationSpriteFrame extends LocalizationBase {

    @property(cc.SpriteFrame)
    en: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    por: cc.SpriteFrame = null;

    private sprite: cc.Sprite = null;

    protected onLoad() {
        super.onLoad();
        this.sprite = this.node.getComponent(cc.Sprite);
        this.onLangChanged();
    }

    protected onLangChanged() {
        if (this.sprite) this.sprite.spriteFrame = this[LangMgr.currLang];
    }

}