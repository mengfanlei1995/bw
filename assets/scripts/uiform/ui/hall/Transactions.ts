import { REPORT_EVT } from "../../../enum/DeskEnum";
import EventMgr from "../../../mgr/EventMgr";
import LangMgr from "../../../mgr/LangMgr";
import SendMgr from "../../../net/SendMgr";
import { TimezoneTransactionVO, TransactionVO } from "../../../net/proto/hall";
import CommonUtil from "../../../utils/CommonUtil";
import LongUtil from "../../../utils/LongUtil";
import UIMgr from "../../UIMgr";
import UIScreen from "../../UIScreen";
import UISuperLayout from "../../UISuperLayout";
import { UISuperHeaderAndFooterEvent } from "../../UISuperScrollView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Transactions extends UIScreen {


    @property(cc.Node) footer: cc.Node = null

    @property(UISuperLayout) layout: UISuperLayout = null

    @property({ tooltip: '选择记录类型背景', type: cc.Node })
    node_CheckType: cc.Node = null;

    @property({ tooltip: '没有记录', type: cc.Node })
    node_noRecord: cc.Node = null;

    @property({ tooltip: '打开', type: cc.SpriteFrame })
    spf_open: cc.SpriteFrame = null;

    @property({ tooltip: '关闭', type: cc.SpriteFrame })
    spf_close: cc.SpriteFrame = null;

    @property({ tooltip: '箭头', type: cc.Sprite })
    sp_arrow: cc.Sprite = null;

    @property({ tooltip: '选择类型', type: cc.Label })
    lb_checkType: cc.Label = null;


    /**页数 */
    private currentPage: number = 1;

    /**每页数量 */
    private pageSize: number = 10;

    private detailsData: TimezoneTransactionVO;

    private datas: TransactionVO[] = [];

    private startDate: string = CommonUtil.formatDate(new Date().getTime(), "yyyy-MM-dd");
    private endDate: string = CommonUtil.formatDate(new Date().getTime(), "yyyy-MM-dd");

    /**数据类型 */
    private type: number = 1;

    protected async onEnable(): Promise<void> {
        this._initData();
        EventMgr.emit(REPORT_EVT.SCENE, { page_name: `transactions` })
    }

    protected onDisable(): void {
        this.currentPage = 1;
        this.type = 1;
        this.datas = [];
        this.layout.node.removeAllChildren();
    }

    onClickBack() {
        this.hide();
    }

    onClickSupport() {

    }

    onClickOpenCheckType() {
        let isOpen: boolean = this.node_CheckType.active;
        this.node_CheckType.active = !isOpen;
        this.sp_arrow.spriteFrame = isOpen ? this.spf_close : this.spf_open;
    }

    onClickCheckType(e: cc.Event.EventTouch, type: string) {
        let target: cc.Node = e.target;
        this.node_CheckType.active = false;
        this.lb_checkType.string = target.getComponentInChildren(cc.Label).string;
        this.sp_arrow.spriteFrame = this.spf_close;
        this.type = +type;
        this.currentPage = 1;
        this.datas = [];
        this._initData();
    }

    onClickCheckTime(e: cc.Event.EventTouch, time: string) {
        if (+time == 1) {
            this.endDate = CommonUtil.formatDate(new Date().getTime() - +time * 86400000, "yyyy-MM-dd");
        } else {
            this.endDate = CommonUtil.formatDate(new Date().getTime(), "yyyy-MM-dd");
        }
        this.startDate = CommonUtil.formatDate(new Date().getTime() - +time * 86400000, "yyyy-MM-dd");
        this.currentPage = 1;
        this.datas = [];
        this._initData();
    }

    private onRefreshEvent(node: cc.Node, index: number) {
        let info = this.datas[index];
        let lb_type: cc.Label = cc.find("lb_type", node).getComponent(cc.Label);
        let lb_amount: cc.Label = cc.find("lb_amount", node).getComponent(cc.Label);
        let lb_time: cc.Label = cc.find("lb_time", node).getComponent(cc.Label);
        let lb_text: cc.Label = cc.find("lb_text", node).getComponent(cc.Label);
        lb_time.string = CommonUtil.getDate(info.time);
        let amount = LongUtil.longToNumber(info.amount) + LongUtil.longToNumber(info.withdrawAmount);
        lb_amount.string = amount >= 0 ? `+₹${amount}` : `-₹${Math.abs(amount)}`
        lb_amount.node.color = amount >= 0 ? cc.color(241, 156, 113, 255) : cc.color(231, 255, 107, 255)
        lb_type.string = info.title;
        lb_text.string = `Source:${info.title}`;
    }
    private onRemove(index: number) {
        this.datas.splice(index, 1)
        this.layout.total(this.datas.length)
    }

    private gotoHeader() {
        this.layout.scrollToHeader(0.618)
    }
    private gotoFooter() {
        this.layout.scrollToFooter(0.618)
    }

    private onFooterEvent(scrollView: any, event: UISuperHeaderAndFooterEvent) {
        this.footer.opacity = event.progress * 255
        let label = this.footer.getComponentInChildren(cc.Label)

        if (event.progressStage == "touch") {
            label.string = LangMgr.sentence("e0129")
        }
        if (event.progressStage == "wait") {
            label.string = LangMgr.sentence("e0216")
        }
        if (event.progressStage == "lock") {
            label.string = LangMgr.sentence("e0079")
        }
        if (event.progressStage == 'release') {
            label.string = ""
        }
        if (event.progress > 2) {
            if (!this.footer['playing']) {
                this.footer.runAction(cc.scaleTo(0.618, 1, 1).easing(cc.easeElasticOut(0.236)))
                this.footer['playing'] = true
            }
        } else {
            this.footer.stopAllActions()
            this.footer['playing'] = false
            this.footer.scaleY = event.progress >= 1 ? 1 : event.progress
        }
        if (event.action) {
            if (this.currentPage >= LongUtil.longToNumber(this.detailsData.total)) {
                UIMgr.showToast(LangMgr.sentence('e0009'))
                this.layout.scrollView.release();
                return;
            }
            this.currentPage++;
            this._initData();
        }
    }

    //获取数据
    async _initData() {
        let data = {
            startDate: this.startDate,
            endDate: this.endDate,
            type: this.type,
            pageNum: this.currentPage
        }
        let detailsInfo: TimezoneTransactionVO = await SendMgr.sendTransaction(data);
        if (!detailsInfo || !cc.isValid(this.node)) return;
        if (detailsInfo) {
            this.detailsData = detailsInfo;
            if (detailsInfo.transactions && detailsInfo.transactions.length > 0) {
                for (let i = 0; i < detailsInfo.transactions.length; i++) {
                    this.datas.push(detailsInfo.transactions[i]);
                }
            } else {
                if (LongUtil.longToNumber(detailsInfo.total) == 0) {
                    this.datas = [];
                    this.layout.total(this.datas.length)
                }
            }
            if (this.datas && this.datas.length > 0) {
                this.node_noRecord.active = false;
                this.layout.total(this.datas.length)
            } else {
                if (this.currentPage == 1) this.node_noRecord.active = true;
            }
        }
    }

}
