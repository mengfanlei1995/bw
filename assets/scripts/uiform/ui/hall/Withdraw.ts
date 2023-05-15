import UserData from "../../../data/UserData";
import { HALL_EVT } from "../../../enum/DeskEnum";
import EventMgr from "../../../mgr/EventMgr";
import LangMgr from "../../../mgr/LangMgr";
import StorageMgr from "../../../mgr/StorageMgr";
import { DialogType } from "../../../model/DialogOptions";
import SendMgr from "../../../net/SendMgr";
import CommonUtil from "../../../utils/CommonUtil";
import LongUtil from "../../../utils/LongUtil";
import UIMgr from "../../UIMgr";
import UIScreen from "../../UIScreen";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Withdraw extends UIScreen {

    @property({ tooltip: '按钮点击区域', type: cc.Node })
    node_amount: cc.Node = null;

    @property({ tooltip: '银行卡号', type: cc.Label })
    lb_bank: cc.Label = null;

    @property({ tooltip: '提现次数', type: cc.Label })
    lb_withdraw: cc.Label = null;

    @property({ tooltip: '时间', type: cc.Label })
    lb_time: cc.Label = null;

    /**提现最小金额 */
    private withdraw_min_money: number = 300;
    private withdraw_max_money: number = 20000;

    /**银行卡信息 */
    private bankInfo: any = null;
    private amount: number = 0;

    /**提现审核金额 */
    audit: number = 0;
    /**提现费率比例 */
    ratio: number = 0;

    /**可选提现金额 */
    private amountArray: number[] = [110, 300, 500, 1000, 3000, 5000, 10000, 30000];

    private levelWithdraw = null;

    protected onEnable(): void {
        EventMgr.on(HALL_EVT.UPDATE_WITHDRAW, this.initWithdrawInfo, this);
        this.initWithdrawInfo();
    }

    protected onDisable(): void {
        EventMgr.off(HALL_EVT.UPDATE_WITHDRAW, this.initWithdrawInfo, this);
    }

    /** 
    * 获取提现信息 刷新UI 
    */
    async initWithdrawInfo() {
        let info = await SendMgr.sendWithdrawInfo();
        if (info && cc.isValid(this.node)) {
            let { audit, ratio, withdrawAmounts, bankInfo, vip } = info;
            let withdrawNumber: number = LongUtil.longToNumber(vip?.withdrawNumber);
            this.lb_withdraw.string = `${withdrawNumber}`;
            this.lb_time.node.active = !withdrawNumber;
            this.levelWithdraw = vip?.levelWithdraw;
            if (!withdrawNumber) {
                this.updateTime();
                this.schedule(this.updateTime.bind(this), 1);
            }
            this.bankInfo = bankInfo;
            if (bankInfo.accNo) {
                this.lb_bank.string = bankInfo.accNo;
            }
            this.audit = +audit
            this.ratio = +ratio
            this.amountArray = withdrawAmounts
            this.withdraw_min_money = withdrawAmounts[0];
            this.withdraw_max_money = withdrawAmounts[withdrawAmounts.length - 1];
            let node: cc.Node = this.node_amount;
            for (let i = 0; i < node.childrenCount; i++) {
                let child: cc.Node = node.children[i];
                let bonus: cc.Label = cc.find("bonus", child).getComponent(cc.Label);
                bonus.string = `₹${this.amountArray[i]}`
            }
        }
    }

    updateTime() {
        let { hour, minute, second } = getNowTimeDate();
        if (hour == 0 && minute == 0 && second == 0) {
            this.unschedule(this.updateTime);
            this.initWithdrawInfo();
        }
        this.lb_time.string = `${hour < 10 ? "0" + hour : hour}:${minute < 10 ? "0" + minute : minute}:${second < 10 ? "0" + second : second}`;
    }

    onClickBack() {
        this.hide();
    }

    onClickRecord() {
        UIMgr.show('prefab/hall/MoneyRecords', 'MoneyRecords', 1);
    }


    /**提现 */
    async onClickWithdraw() {
        if (!UserData.userInfo.phone) {
            UIMgr.show('prefab/hall/BindPhone', 'BindPhone', 1);
            return;
        }
        if (!this.bankInfo || !this.bankInfo.accName || !this.bankInfo.accNo || !this.bankInfo.ifsc) {
            UIMgr.show('prefab/hall/Bank', 'Bank');
            return;
        }
        if (!this.amount || this.amount < this.withdraw_min_money) {
            UIMgr.showToast(CommonUtil.format(LangMgr.sentence("e0034"), this.withdraw_min_money))
            return;
        }

        if (this.amount > UserData.userInfo.walletInfo.withdrawBalance) {
            UIMgr.showDialog({
                word: CommonUtil.format(LangMgr.sentence('e0052'), this.amount),
                type: DialogType.OnlyOkBtn
            })
            return;
        }

        let result = await SendMgr.sendWithdraw({
            amount: this.amount
        })
        if (result) {
            this.initWithdrawInfo();
            UIMgr.showToast(LangMgr.sentence("e0035"));
        }
    }

    /**选中提现金额 */
    onClickCheckAmount(e: cc.Event.EventTouch, index: number) {
        this.amount = this.amountArray[index];
        this.checkAmount(index);
    }

    checkAmount(index: number) {
        let node: cc.Node = this.node_amount;
        for (let i = 0; i < node.childrenCount; i++) {
            let child: cc.Node = node.children[i];
            let checkmark: cc.Node = cc.find("checkmark", child);
            checkmark.active = index == i
        }
    }

    onChangeHandler() {
        let amount: number = this.amount;
        if (amount >= this.withdraw_max_money) {
            amount = this.withdraw_max_money
            this.amount = amount;
        }
        for (let i = 0; i < this.amountArray.length; i++) {
            if (this.amountArray[i] == amount) {
                this.checkAmount(i);
                break;
            }
            if (i == this.amountArray.length - 1) {
                this.checkAmount(-1);
            }
        }
    }

    /**vip介绍界面 */
    onClickHelp() {
        UIMgr.show('prefab/hall/Description', 'Description', this.levelWithdraw);
    }

    /**打开vip界面 */
    onClickVip() {
        UIMgr.show('prefab/hall/VipPrivileges', 'VipPrivileges');
    }

    /**绑定银行卡 */
    onClickAddCard() {
        if (!UserData.userInfo.phone) {
            UIMgr.show('prefab/hall/BindPhone', 'BindPhone', 1);
            return;
        }
        UIMgr.show('prefab/hall/Bank', 'Bank');
    }

    onClickCustomer() {
        UIMgr.show('prefab/hall/Customer', 'Customer');
    }

}

function getNowTimeDate() {
    let date = new Date();
    let hour: number = 23 - date.getHours();
    let minute: number = 60 - date.getMinutes();
    let second: number = 60 - date.getSeconds();
    return { hour, minute, second };
}