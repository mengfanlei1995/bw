import { HALL_EVT, REPORT_EVT } from "../../../enum/DeskEnum";
import EventMgr from "../../../mgr/EventMgr";
import SendMgr from "../../../net/SendMgr";
import { NextDayRechargeVO } from "../../../net/proto/hall";
import JsbUitl from "../../../utils/JsbUitl";
import LongUtil from "../../../utils/LongUtil";
import UIWindow from "../../UIWindow";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SuperBonus extends UIWindow {

    @property({ tooltip: 'Recharge按钮', type: cc.Node })
    btnRecharge: cc.Node = null;

    @property({ tooltip: '奖励1节点', type: cc.Node })
    box1: cc.Node = null;
    @property({ tooltip: '奖励2节点', type: cc.Node })
    box2: cc.Node = null;
    @property({ tooltip: '奖励3节点', type: cc.Node })
    box3: cc.Node = null;

    @property({ tooltip: '正常材质', type: cc.Material })
    material: cc.Material = null;

    @property({ tooltip: '灰色材质', type: cc.Material })
    materialGray: cc.Material = null;

    @property({ tooltip: 'time', type: cc.Label })
    lb_time: cc.Label = null;

    @property({ tooltip: 'deposit', type: [cc.Label] })
    lb_deposit: cc.Label[] = [];

    @property({ tooltip: 'bonus', type: [cc.Label] })
    lb_bonus: cc.Label[] = [];

    @property({ tooltip: 'totalGet', type: cc.Label })
    lb_totalGet: cc.Label = null;

    @property({ tooltip: '充值金额', type: cc.Label })
    lb_money: cc.Label = null;

    grayBox(root: cc.Node) {
        this.graySprite(root)
        this.grayLabel(root.children[0])
        let childs: cc.Node[] = root.children[1].children;
        this.graySprite(childs[0])
        this.graySprite(childs[3])
        this.graySprite(childs[3].children[0])

        this.grayLabel(childs[1])
        this.grayLabel(childs[2])
        this.grayLabel(childs[4])
    }

    grayLabel(root: cc.Node) {
        root.getComponent(cc.Label).setMaterial(0, this.materialGray)
    }

    graySprite(root: cc.Node) {
        root.getComponent(cc.Sprite).setMaterial(0, this.materialGray)
    }

    private popInfo: NextDayRechargeVO = null;

    /**更新破冰礼包UI 数据在hall获取 */
    public onShow(params: any): void {
        let { isClick, info } = params;
        if (isClick) {
            this.popInfo = info;
        } else {
            let popInfo = JSON.parse(info.popInfo);
            this.popInfo = popInfo.nextDayRechargeInfo;
        }
        this.seconds = LongUtil.longToNumber(this.popInfo.leftSeconds);
        if (this.seconds) {
            this.updateTime();
            this.lb_time.node.parent.active = true;
            this.schedule(this.updateTime, 1);
        }
        this.btnRecharge.active = !this.popInfo.buy;
        this.lb_money.string = `₹${this.popInfo.oriRecharge / 100}`;
        this.lb_totalGet.string = `₹${this.popInfo.totalGet / 100}`;
        if (this.popInfo.stateDay1)
            this.grayBox(this.box1);
        if (this.popInfo.stateDay2)
            this.grayBox(this.box2);
        if (this.popInfo.stateDay3)
            this.grayBox(this.box3);

        for (let i = 0; i < this.lb_bonus.length; i++) {
            this.lb_bonus[i].string = `${this.popInfo["bonusDay" + (i + 1)] / 100}`;
            this.lb_deposit[i].string = `${this.popInfo["depositDay" + (i + 1)] / 100}`;
        }
    }

    protected start(): void {
        EventMgr.emit(REPORT_EVT.SCENE, { page_name: `SuperBonus` });
    }

    private seconds: number = 0;

    updateTime() {
        this.seconds--;
        if (this.seconds <= 0) {
            this.unschedule(this.updateTime);
            this.lb_time.node.parent.active = false;
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

    onClickClose() {
        this.hide();
        EventMgr.emit(HALL_EVT.OPEN_WINDOWS);
        EventMgr.emit(REPORT_EVT.CLICK, {
            element_id: "superBonus_close",
            element_name: "破冰活动关闭按钮",
            element_type: "button",
            element_position: '',
            element_content: '',
        });
    }

    /**购买破冰礼包 */
    async onClickRecharge() {
        if (!this.popInfo || this.popInfo.buy) return;
        EventMgr.emit(REPORT_EVT.CLICK, {
            element_id: "btn_addcash_bySuperBonus",
            element_name: "破冰活动充值按钮",
            element_type: "button",
            element_position: '',
            element_content: '',
        });
        let data = {
            productId: 0,
            amount: this.popInfo.oriRecharge / 100,
            activityId: this.popInfo.activityId
        }
        EventMgr.emit(REPORT_EVT.CLICK, {
            element_id: "api_addcash",
            element_name: "调用充值接口",
            element_type: "button",
            element_position: '',
            element_content: '',
        });
        let result = await SendMgr.sendPay(data);
        if (result) {
            this.hide();
            this.openUrl(result.url)
        }
        EventMgr.emit(REPORT_EVT.CLICK, {
            element_id: result ? "api_addcash_success" : "api_addcash_fail",
            element_name: "调用充值接口" + result ? "成功" : "失败",
            element_type: "button",
            element_position: '',
            element_content: '',
        });
    }

    /**打开充值链接 */
    openUrl(url: string = "") {
        if (cc.sys.isBrowser) {
            cc.sys.openURL(url)
        } else {
            JsbUitl.openWebView(url)
        }
    }

}
