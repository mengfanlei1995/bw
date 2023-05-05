import { HALL_EVT, REPORT_EVT } from "../../../enum/DeskEnum";
import EventMgr from "../../../mgr/EventMgr";
import UIWindow from "../../UIWindow";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RechargeIncome extends UIWindow {

    @property({ tooltip: 'deposit', type: cc.Label })
    lb_deposit: cc.Label = null;

    @property({ tooltip: 'bonus', type: cc.Label })
    lb_bonus: cc.Label = null;

    protected start(): void {
        EventMgr.emit(REPORT_EVT.SCENE, { page_name: `RechargeIncome` })
    }

    public onShow(params: any): void {
        if (!params) return;
        let { isClick, info } = params;
        if (isClick) {
            let data = JSON.parse(info);
            this.lb_deposit.string = `${data.deposit / 100}`;
            this.lb_bonus.string = `${data.bonus / 100}`;
        } else {
            let data = JSON.parse(info.popInfo.nextDayRechargeGetInfo);
            this.lb_deposit.string = `${data.deposit / 100}`;
            this.lb_bonus.string = `${data.bonus / 100}`;
        }
    }

    onClickClose() {
        this.hide();
        EventMgr.emit(HALL_EVT.OPEN_WINDOWS);
    }

}
