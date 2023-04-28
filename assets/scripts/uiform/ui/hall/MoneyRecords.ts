import LangMgr from "../../../mgr/LangMgr";
import CommonUtil from "../../../utils/CommonUtil";
import UIMgr from "../../UIMgr";
import UIScreen from "../../UIScreen";
import UISuperLayout from "../../UISuperLayout";
import { UISuperHeaderAndFooterEvent } from "../../UISuperScrollView";
import MoneyRecordItem from "./MoneyRecordItem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MoneyRecords extends UIScreen {

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

    @property([cc.Node])
    recordType: cc.Node[] = [];

    /**页数 */
    private currentPage: number = 1;

    /**总页数 */
    private totalPage: number = 1;

    /**每页数量 */
    private pageSize: number = 10;

    private detailsData: MoneyRecords;

    private datas: MoneyRecordInfo[] = [];

    private startDate: string = CommonUtil.formatDate(new Date().getTime(), "yyyy-MM-dd");
    private endDate: string = CommonUtil.formatDate(new Date().getTime(), "yyyy-MM-dd");
    private btnTypeText = [[LangMgr.sentence("e0163"), LangMgr.sentence("e0209"), LangMgr.sentence("e0210"), LangMgr.sentence("e0211")], [LangMgr.sentence("e0163"), LangMgr.sentence("e0212"), LangMgr.sentence("e0213"), LangMgr.sentence("e0214"), LangMgr.sentence("e0215"), LangMgr.sentence("e0210")]];

    /**数据类型  充值/提现*/
    private type: number = 0;

    /**数据类型 processed/failed等 */
    private process: number = 0;

    public onShow(index: number): void {
        this.type = index;
        for (let i = 0; i <= 1; i++) {
            let node: cc.Node = this.recordType[i].getChildByName("checkmark");
            node.active = i == index;
        }
        this._initData();
    }

    protected onDisable(): void {
        this.currentPage = 1;
        this.type = 0;
        this.datas = [];
        this.layout.node.removeAllChildren();
    }

    onClickBack() {
        this.hide();
    }

    onClickSupport() {
        UIMgr.show('prefab/hall/Support', 'Support');
    }

    /**选中充值流水 */
    onClickAddCash() {
        this.type = 0;
        this.lb_checkType.string = "All";
        this.process = 0;
        for (let i = 0; i <= 1; i++) {
            let node: cc.Node = this.recordType[i].getChildByName("checkmark");
            node.active = i == this.type;
        }
        this.currentPage = 1;
        this.datas = [];
        this._initData();
    }

    /** 选中提现流水 */
    onClickWithdraw() {
        this.type = 1;
        this.lb_checkType.string = "All";
        this.process = 0;
        for (let i = 0; i <= 1; i++) {
            let node: cc.Node = this.recordType[i].getChildByName("checkmark");
            node.active = i == this.type;
        }
        this.currentPage = 1;
        this.datas = [];
        this._initData();
    }

    onClickOpenCheckType() {
        let isOpen: boolean = this.node_CheckType.active;
        this.node_CheckType.active = !isOpen;
        this.sp_arrow.spriteFrame = isOpen ? this.spf_close : this.spf_open;
        let btnNode: cc.Node = this.node_CheckType;
        for (let i = 0; i < btnNode.childrenCount; i++) {
            btnNode.children[i].active = !!this.btnTypeText[this.type][i];
            this.btnTypeText[this.type][i] && (btnNode.children[i].getComponentInChildren(cc.Label).string = this.btnTypeText[this.type][i]);
        }
    }

    onClickCheckType(e: cc.Event.EventTouch, process: number) {
        let target: cc.Node = e.target;
        this.node_CheckType.active = false;
        this.lb_checkType.string = target.getComponentInChildren(cc.Label).string;
        this.sp_arrow.spriteFrame = this.spf_close;
        this.process = Number(process);
        this.currentPage = 1;
        this.datas = [];
        this._initData();
    }

    onClickCheckTime(e: cc.Event.EventTouch, time: number) {
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
        node.getComponent(MoneyRecordItem).init(this.type, info);
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
            if (this.currentPage >= this.detailsData.total) {
                UIMgr.showToast(LangMgr.sentence('e0009'))
                this.layout.scrollView.release();
                return;
            }
            this.currentPage++;
            this._initData();
        }
    }

    /**获取流水信息 充值或者提现 */
    async _initData() {
        let data = {
            startDate: this.startDate,
            endDate: this.endDate,
            type: this.process,
            pageNum: this.currentPage
        }
        let detailsInfo: MoneyRecords = this.type == 0 ? await NetMgr.inst.addCashRecord(data) : await NetMgr.inst.withdrawRecord(data);
        if (!detailsInfo || !cc.isValid(this.node)) return;
        if (detailsInfo) {
            this.detailsData = detailsInfo;
            let info: MoneyRecordInfo[] = this.type == 0 ? detailsInfo.recharges : detailsInfo.withdraws
            if (info && info.length > 0) {
                for (let i = 0; i < info.length; i++) {
                    this.datas.push(info[i]);
                }
            } else {
                if (detailsInfo.total == 0) {
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
