import SysConfig from "../../../data/SysConfig";
import EventMgr from "../../../mgr/EventMgr";
import LangMgr from "../../../mgr/LangMgr";
import StorageMgr from "../../../mgr/StorageMgr";
import { DialogType } from "../../../model/DialogOptions";
import SendMgr from "../../../net/SendMgr";
import { RechargeInfoVO } from "../../../net/proto/hall";
import CommonUtil from "../../../utils/CommonUtil";
import JsbUitl from "../../../utils/JsbUitl";
import LongUtil from "../../../utils/LongUtil";
import UIMgr from "../../UIMgr";
import UIScreen from "../../UIScreen";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AddCash extends UIScreen {

    @property({ tooltip: '按钮点击区域', type: cc.Node })
    node_amount: cc.Node = null;

    //活动
    @property({ tooltip: '活动节点', type: cc.Node })
    node_activity: cc.Node = null;

    @property({ tooltip: 'totalGet', type: cc.Label })
    lb_totalGet: cc.Label = null;

    @property({ tooltip: 'addCash', type: cc.Label })
    lb_addCash: cc.Label = null;

    @property({ tooltip: 'cashBack', type: cc.Label })
    lb_cashBack: cc.Label = null;

    @property({ tooltip: 'bonus', type: cc.Label })
    lb_bonus: cc.Label = null;

    @property({ tooltip: 'time', type: cc.Label })
    lb_time: cc.Label = null;

    @property({ tooltip: 'btnAddCash', type: cc.Button })
    btnAddCash: cc.Button = null;

    @property({ tooltip: '活动角标图片', type: [cc.SpriteFrame] })
    sp_ac: cc.SpriteFrame[] = [];

    private amont: number = 0;
    private activityId: string = "";
    private amountArray: number[] = [100, 300, 500, 1000, 3000, 5000, 10000, 20000, 30000];
    private rechargeInfoList: RechargeInfoVO[] = [];
    private seconds: number = 0;
    private curCheckIndex: number = 0;

    protected onEnable(): void {
        this.amont = this.amountArray[0];
    }

    public onShow(param: any = { vipInto: false, vipLevel: 0 }): void {
        this.getRechargeInfo(param);
    }

    init() {
        this.getRechargeInfo();
    }

    /**是否已经获取过信息 */
    private isLoad: boolean = false;

    /**
     * 初始化充值页面 相关信息
     * @param param  vipInto 是否从vip界面打开的充值界面 vipLevel 从哪个vip等级进入的充值界面
     */
    async getRechargeInfo(param: any = { vipInto: false, vipLevel: 0 }) {
        let { vipInto, vipLevel } = param;
        let result = await SendMgr.sendRechargeInfo({ vipInto: vipInto, vipLevel: vipLevel });
        if (cc.isValid(this.node)) this.btnAddCash.interactable = true;
        if (result && cc.isValid(this.node)) {
            let { actLeftSeconds, rechargeInfoVOList, rechargeIndex } = result;
            this.seconds = LongUtil.longToNumber(actLeftSeconds);
            this.rechargeInfoList = rechargeInfoVOList;
            this.onClickCheckAmount(null, this.isLoad ? this.curCheckIndex : rechargeIndex >= 0 ? rechargeIndex : 1);
            this.isLoad = true;
            let node: cc.Node = this.node_amount;
            this.updateTime();
            this.schedule(this.updateTime, 1);
            for (let i = 0; i < node.childrenCount; i++) {
                let child: cc.Node = node.children[i];
                let bonus: cc.Label = cc.find("bonus", child).getComponent(cc.Label);
                let oriMoney: number = LongUtil.longToNumber(rechargeInfoVOList[i].oriMoney);
                let extraMoney: number = LongUtil.longToNumber(rechargeInfoVOList[i].extraMoney);
                bonus.string = `₹${oriMoney / 100}`;
                this.amountArray[i] = oriMoney / 100;
                let activity: cc.Node = cc.find("activity", child);
                if (rechargeInfoVOList[i].morePercent) {
                    activity.active = true
                    activity.getComponent(cc.Sprite).spriteFrame = this.sp_ac[+rechargeInfoVOList[i].showTag];
                    let lb_activity: cc.Label = cc.find("bonus", activity).getComponent(cc.Label);
                    lb_activity.string = `${rechargeInfoVOList[i].morePercent}%`;
                } else {
                    activity.active = false;
                }
                let get: cc.Node = cc.find("get", child);
                let lb_get: cc.Label = cc.find("bonus", get).getComponent(cc.Label);
                if (rechargeInfoVOList[i].extraMoney) {
                    lb_get.string = `${LangMgr.sentence("e0338")} +${extraMoney / 100}`;
                } else {
                    lb_get.string = "";
                }
            }
        }
    }

    /**
     * 充值活动倒计时
     * @returns 
     */
    updateTime() {
        this.seconds--;
        if (this.seconds <= 0) {
            this.unschedule(this.updateTime);
            this.lb_time.node.active = false;
            return;
        }
        let runTime = this.seconds;
        let day = Math.floor(runTime / 86400);
        runTime = runTime % 86400;
        let hour = Math.floor(runTime / 3600);
        runTime = runTime % 3600;
        let minute = Math.floor(runTime / 60);
        runTime = runTime % 60;
        let second = runTime;
        this.lb_time.string = `${day > 0 ? "0" + day + "D" : ""} ${hour < 10 ? "0" + hour : hour}:${minute < 10 ? "0" + minute : minute}:${second < 10 ? "0" + second : second}`
    }


    onClickBack() {
        this.hide();
    }

    onClickRecord() {
        UIMgr.show('prefab/hall/MoneyRecords', 'MoneyRecords', 0);
    }

    async onClickAddCash() {
        let data = {
            productId: 0,
            amount: this.amont,
            activityId: this.activityId
        }
        let result = await SendMgr.sendPay(data);
        if (result) {
            this.openUrl(result.url);
        }
    }

    /**打开充值链接 */
    openUrl(url: string = "") {
        if (cc.sys.isBrowser) {
            cc.sys.openURL(url);
        } else {
            JsbUitl.openWebView(url);
        }
    }

    /**金额选择 */
    onClickCheckAmount(e: cc.Event.EventTouch, index: number) {
        this.amont = this.amountArray[index];
        this.curCheckIndex = index;
        this.checkAmount(index);
        this.updateActivityInfo(index)
    }

    /**更新选中金额信息 */
    updateActivityInfo(index: number) {
        let info = this.rechargeInfoList[index];
        if (!info) {
            this.getRechargeInfo();
            UIMgr.showToast(LangMgr.sentence("e0000"));
            return;
        }
        this.lb_addCash.string = `₹${this.amountArray[index]}`;
        this.lb_cashBack.string = `₹${LongUtil.longToNumber(info.giveDeposit) / 100}`;
        this.lb_bonus.string = `₹${LongUtil.longToNumber(info.giveBonus) / 100}`;
        this.lb_totalGet.string = `₹${(LongUtil.longToNumber(info.totalGet) + LongUtil.longToNumber(info.giveBonus)) / 100}`;
        this.activityId = info.activityId;
    }

    /**更新选中框 */
    checkAmount(index: number) {
        let node: cc.Node = this.node_amount;
        for (let i = 0; i < node.childrenCount; i++) {
            let child: cc.Node = node.children[i];
            let checkmark: cc.Node = cc.find("checkmark", child);
            checkmark.active = index == i;
        }
    }

    onClickOpenTips() {
        UIMgr.showDialog({
            word: LangMgr.sentence('e0150'),
            type: DialogType.OnlyOkBtn,
            okTxt: 'Yes',
            title: 'Details'
        });
    }

    onClickCustomer() {
        UIMgr.show('prefab/hall/Customer', 'Customer');
    }

}
