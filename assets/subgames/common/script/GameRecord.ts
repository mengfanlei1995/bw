import LangMgr from "../../../scripts/mgr/LangMgr";
import SendMgr from "../../../scripts/net/SendMgr";
import { ResponseRoomPageRecordVO, ResponseRoomRecordVO, RoomRecordDTO, decodeResponseRoomPageRecordVO } from "../../../scripts/net/proto/room";
import UIMgr from "../../../scripts/uiform/UIMgr";
import UIScreen from "../../../scripts/uiform/UIScreen";
import UISuperLayout from "../../../scripts/uiform/UISuperLayout";
import { UISuperHeaderAndFooterEvent } from "../../../scripts/uiform/UISuperScrollView";
import LongUtil from "../../../scripts/utils/LongUtil";
import GameRecordItem from "./GameRecordItem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameRecord extends UIScreen {

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

    /**总页数 */
    private totalPage: number = 1;

    /**每页数量 */
    private pageSize: number = 10;

    private datas: ResponseRoomRecordVO[] = [];

    /**数据类型 */
    private type: number = 0;

    private time: number = 1;

    private gameCmd: number = 0;
    private gameName: string = '';

    public onShow(params: any): void {
        this.gameCmd = params.gameCmd;
        this.gameName = params.gameName;
        this._initData();
    }

    protected onDisable(): void {
        this.currentPage = 1;
        this.type = 0;
        this.time = 1;
        this.datas = [];
        this.layout.node.removeAllChildren();
    }

    onClickBack() {
        this.hide();
    }

    onClickOpenCheckType() {
        let isOpen: boolean = this.node_CheckType.active;
        this.node_CheckType.active = !isOpen;
        this.sp_arrow.spriteFrame = isOpen ? this.spf_close : this.spf_open;
    }

    onClickCheckType(e: cc.Event.EventTouch, type: number) {
        let target: cc.Node = e.target;
        this.node_CheckType.active = false;
        this.lb_checkType.string = target.getComponentInChildren(cc.Label).string;
        this.sp_arrow.spriteFrame = this.spf_close;
        this.type = type;
        this.currentPage = 1;
        this.datas = [];
        this._initData();
    }

    onClickCheckTime(e: cc.Event.EventTouch, time: number) {
        this.time = Number(time);
        this.currentPage = 1;
        this.datas = [];
        this._initData();
    }

    private onRefreshEvent(node: cc.Node, index: number) {
        let info = this.datas[index];
        node.getComponent(GameRecordItem).init(info, this.gameName);
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
            if (this.currentPage >= this.totalPage) {
                UIMgr.showToast(LangMgr.sentence('e0009'))
                this.layout.scrollView.release();
                return;
            }
            this.currentPage++;
            this._initData();
        }
    }

    /**
     * 获取游戏流水信息
     */
    async _initData() {
        let data: RoomRecordDTO = {
            page: this.currentPage,
            dateType: this.time,
            winLost: this.type
        }
        let infos: Uint8Array = await SendMgr.sendRecordList(data, this.gameCmd);
        if (!infos) return;
        let info: ResponseRoomPageRecordVO = decodeResponseRoomPageRecordVO(infos);
        let { records, total } = info;
        if (records && records.length > 0) {
            this.node_noRecord.active = false;
            this.totalPage = LongUtil.longToNumber(total);
            for (let i = 0; i < records.length; i++) {
                this.datas.push(records[i]);
            }
        } else {
            if (this.currentPage == 1) {
                this.node_noRecord.active = true;
                this.datas = [];
            }
            // else DialogMgr.showToast("没有更多数据");
        }
        this.layout.total(this.datas.length)
        // this.scheduleOnce(() => this.layout.total(this.datas.length), 0.5)
    }

}
