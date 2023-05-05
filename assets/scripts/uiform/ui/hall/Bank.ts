import LangMgr from "../../../mgr/LangMgr";
import SendMgr from "../../../net/SendMgr";
import RegexUtil from "../../../utils/RegexUtil";
import UIMgr from "../../UIMgr";
import UIScreen from "../../UIScreen";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Bank extends UIScreen {

    @property({ tooltip: 'realName', type: cc.EditBox })
    ed_realName: cc.EditBox = null;

    @property({ tooltip: 'acc', type: cc.EditBox })
    ed_accountNumber: cc.EditBox = null;

    @property({ tooltip: 'ifsc', type: cc.EditBox })
    ed_ifscCode: cc.EditBox = null;

    protected onEnable(): void {
        this.init();
    }

    /**
     * 调取服务端接口 获取之前是否绑定过银行卡
     */
    async init() {
        let info = await SendMgr.sendWithdrawInfo()
        if (info && cc.isValid(this.node)) {
            let { bankInfo } = info;
            if (bankInfo && bankInfo.accName) {
                this.ed_realName.string = bankInfo.accName;
                this.ed_accountNumber.string = bankInfo.accNo;
                this.ed_ifscCode.string = bankInfo.ifsc;
            }
        }
    }

    onClickBack() {
        this.hide();
    }

    async onClickSubmit() {
        let realName: string = this.ed_realName.string;
        let accountNumber: string = this.ed_accountNumber.string;
        let ifsc: string = this.ed_ifscCode.string;
        ifsc = ifsc.replace(/(^\s*)|(\s*$)/g, "");
        realName = realName.replace(/(^\s*)|(\s*$)/g, "");
        realName = realName.replace(/\s+/g, " ");
        if (!realName) {
            UIMgr.showToast(LangMgr.sentence('e0047'));
            return;
        }
        if (!RegexUtil.isValidRealName(realName)) {
            UIMgr.showToast(LangMgr.sentence('e0048'))
            return;
        }

        if (!accountNumber) {
            UIMgr.showToast(LangMgr.sentence('e0050'));
            return;
        }

        if (!ifsc || !RegexUtil.isValidIFSC(ifsc)) {
            UIMgr.showToast(LangMgr.sentence('e0340'));
            return;
        }

        let data = {
            accName: realName,
            accNo: accountNumber,
            ifsc: ifsc
        }
        UIMgr.show('prefab/hall/ConfirmInfo', 'ConfirmInfo', data);
    }

    onEndedHandler(e: cc.EditBox, type: number) {
        // let str: string = e.string;
        // let tips: cc.Node = cc.find("tips", e.node);
        // tips.active = !str
        // if (type == 1) {
        //     str = str.replace(/(^\s*)|(\s*$)/g, "");
        //     str = str.replace(/\s+/g, " ");
        //     if (!RegexUtil.isValidRealName(str)) {
        //         tips.active = true
        //     } else {
        //         tips.active = false
        //     }
        // } else if (type == 3) {
        //     if (!RegexUtil.isValidIFSC(str)) {
        //         tips.active = true
        //     } else {
        //         tips.active = false
        //     }
        // }
    }

}
