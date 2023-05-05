import LangMgr from "../../../mgr/LangMgr";
import SendMgr from "../../../net/SendMgr";
import CommonUtil from "../../../utils/CommonUtil";
import UIMgr from "../../UIMgr";
import UIWindow from "../../UIWindow";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ConfirmInfo extends UIWindow {

    @property({ tooltip: 'acc', type: cc.Label })
    lb_acc: cc.Label = null;

    @property({ tooltip: 'acc', type: cc.Label })
    lb_accNum: cc.Label = null;

    @property({ tooltip: 'ifsc', type: cc.Label })
    lb_ifsc: cc.Label = null;

    @property({ tooltip: 'ifsc', type: cc.Label })
    lb_ifscNum: cc.Label = null;

    private data = null;

    public onShow(data: any): void {
        this.data = data;
        this.lb_acc.string = data.accNo;
        this.lb_ifsc.string = data.ifsc;
        this.lb_accNum.string = CommonUtil.format(LangMgr.sentence("e0073"), data.accNo.length);
        this.lb_ifscNum.string = CommonUtil.format(LangMgr.sentence("e0073"), data.ifsc.length);
    }

    onClickClose() {
        this.hide();
    }

    async onClickSubmit() {
        let result = await SendMgr.sendBindBank(this.data);
        if (result) {
            this.hide();
            UIMgr.hide('Bank');
        }
    }

}
