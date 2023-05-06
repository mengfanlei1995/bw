import { DialogOptions } from "../../../model/DialogOptions";
import CocosUtil from "../../../utils/CocosUtil";
import UIWindow from "../../UIWindow";

const { ccclass, property } = cc._decorator;

/**
 * 那个按钮被点击
 */
enum BtnClick {
    none = -1,
    ok,
    cancel,
    close
}

@ccclass
export default class DiaLog extends UIWindow {
    @property({ type: cc.Node, displayName: "确定按钮" })
    okBtn: cc.Node = null;
    @property({ type: cc.Node, displayName: "取消按钮" })
    cancelBtn: cc.Node = null;
    @property({ type: cc.Node, displayName: "关闭按钮" })
    closeBtn: cc.Node = null;
    @property({ type: cc.Label, displayName: "居中提示语" },)
    lblCenter: cc.Label = null
    @property({ type: cc.Label, displayName: "居左提示语" },)
    lblLeft: cc.Label = null
    @property({ type: cc.Label, displayName: "居右提示语" },)
    lblRight: cc.Label = null
    @property({ type: cc.Label, displayName: "标题" },)
    lblTitle: cc.Label = null
    /**水平对齐方式 */
    hAlign: number = 0;

    /**确定按钮回调 */
    _okCb: Function = null
    /**取消按钮回调 */
    _cancelCb: Function = null
    /**关闭按钮回调 */
    _closeCb: Function = null

    _showCb: Function = null

    _hideCb: Function = null;

    _witchBtnClick: number = BtnClick.none;

    showWord(word) {
        let lblWord: cc.Label | cc.RichText = null;
        this.lblCenter.node.active = false
        this.lblLeft.node.active = false
        this.lblRight.node.active = false
        switch (this.hAlign) {
            case 0:
                this.lblCenter.node.active = true
                lblWord = this.lblCenter
                break;
            case 1:
                this.lblLeft.node.active = true
                lblWord = this.lblLeft
                break;
            case 2:
                this.lblRight.node.active = true
                lblWord = this.lblRight
                break;
        }

        lblWord.string = word
        return lblWord
    }

    showTipsWithOkBtn(options: DialogOptions) {
        let { word, okCb, okTxt, cancelCb, closeCb, showCb, hideCb, hAlign, title } = options;
        this.hAlign = hAlign;
        this.okBtn.active = true;
        this.okBtn.x = 0;
        title && (this.lblTitle.string = title)
        okTxt && (this.okBtn.children[0].getComponent(cc.Label).string = okTxt)
        this.cancelBtn.active = false;
        let lblWord: cc.Label | cc.RichText = this.showWord(word)
        this._okCb = okCb;
        this._cancelCb = cancelCb;
        this._closeCb = closeCb;
        this._showCb = showCb;
        this._hideCb = hideCb;
        this.checkHeight(lblWord);
    }

    showTipsWithOkCancelBtn(options: DialogOptions) {
        let { word, okCb, okTxt, cancelCb, cancelTxt, closeCb, showCb, hideCb, hAlign, title } = options;
        this.hAlign = hAlign;
        this.okBtn.active = true;
        title && (this.lblTitle.string = title)
        okTxt && (this.okBtn.children[0].getComponent(cc.Label).string = okTxt)
        this.cancelBtn.active = true;
        cancelTxt && (this.cancelBtn.children[0].getComponent(cc.Label).string = cancelTxt)
        let lblWord: cc.Label | cc.RichText = this.showWord(word)
        this._okCb = okCb;
        this._cancelCb = cancelCb;
        this._closeCb = closeCb;
        this._showCb = showCb;
        this._hideCb = hideCb;
        this.checkHeight(lblWord);
    }

    showTipsWithOnlyCloseBtn(options: DialogOptions) {
        let { word, okCb, okTxt, cancelCb, cancelTxt, closeCb, showCb, hideCb, hAlign, title } = options;
        this.hAlign = hAlign;
        this.okBtn.active = false;
        title && (this.lblTitle.string = title)
        okTxt && (this.okBtn.children[0].getComponent(cc.Label).string = okTxt)
        this.cancelBtn.active = false;
        cancelTxt && (this.cancelBtn.children[0].getComponent(cc.Label).string = cancelTxt)
        let lblWord: cc.Label | cc.RichText = this.showWord(word)
        this._okCb = okCb;
        this._cancelCb = cancelCb;
        this._closeCb = closeCb;
        this._showCb = showCb;
        this._hideCb = hideCb;
        this.checkHeight(lblWord);
    }

    /**根据文字内容更改高度 */
    async checkHeight(lblWord: cc.Label | cc.RichText) {
        // lblWord['_forceUpdateRenderData']();
        await CocosUtil.sleepSync(0.05);
        if (lblWord.node.height >= 130) {
            let root: cc.Node = this.node.getChildByName("root");
            root.height += lblWord.node.height - 130;
        }
    }

    setCloseBtnVisible(show: boolean = true) {
        this.closeBtn.active = show;
    }

    onClickBtnOk() {
        this._witchBtnClick = BtnClick.ok
        //添加声音资源
        if (this._okCb) {
            this._okCb();
        }
        this.hide();
    }

    onClickBtnCancel() {
        this._witchBtnClick = BtnClick.cancel
        if (this._cancelCb) {
            this._cancelCb();
        }
        this.hide();
    }

    onClickBtnClose() {
        this._witchBtnClick = BtnClick.close
        if (this._closeCb) {
            this._closeCb();
        }
        this.hide();
    }


    onEnable() {
        this._showCb && this._showCb()
    }

    onDestroy() {
        this._hideCb && this._hideCb(this._witchBtnClick)
    }
}
