import { HALL_EVT } from "../../../enum/DeskEnum";
import EventMgr from "../../../mgr/EventMgr";
import SendMgr from "../../../net/SendMgr";
import { VipLevelV2VO } from "../../../net/proto/hall";
import LongUtil from "../../../utils/LongUtil";
import UIMgr from "../../UIMgr";
import UIScreen from "../../UIScreen";
import VipItem from "./VipItem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class VipPrivileges extends UIScreen {

    @property({ tooltip: '当前选中vip等级', type: cc.Label })
    lb_curVipLevel: cc.Label = null;

    @property({ tooltip: 'leftVip', type: cc.Label })
    lb_leftVipLevel: cc.Label = null;

    @property({ tooltip: 'rightVip', type: cc.Label })
    lb_rightVipLevel: cc.Label = null;

    @property({ tooltip: '进度', type: cc.Label })
    lb_progress: cc.Label = null;

    @property({ tooltip: 'rightBonus', type: cc.Sprite })
    progress: cc.Sprite = null;

    // @property({ tooltip: 'vipSp', type: cc.Sprite })
    // sp_vipLeft: cc.Sprite = null;

    // @property({ tooltip: 'vipSp', type: cc.Sprite })
    // sp_vipRight: cc.Sprite = null;

    @property({ tooltip: 'vipSpf', type: [cc.SpriteFrame] })
    spf_vip: cc.SpriteFrame[] = [];

    @property({ tooltip: 'item', type: cc.Prefab })
    item: cc.Prefab = null;

    @property({ tooltip: 'pageview', type: cc.PageView })
    pageview: cc.PageView = null;

    @property({ tooltip: 'content', type: cc.Node })
    content: cc.Node = null;

    private currentLevel: number = 0;

    private pages: number = 0;

    private levels: VipLevelV2VO[] = [];

    protected onEnable(): void {
        EventMgr.on(HALL_EVT.DESK_RELOAD, this.initVipInfo, this);
        this.initVipInfo();
    }

    protected onDisable(): void {
        EventMgr.off(HALL_EVT.DESK_RELOAD, this.initVipInfo, this);
    }

    private isLoad: boolean = false;

    /**
     * 获取vip相关信息
     */
    async initVipInfo() {
        let info = await SendMgr.sendVipInfo();
        if (info && cc.isValid(this.node)) {
            let { currentLevel, levels } = info;
            this.levels = levels;
            this.pageview.removeAllPages();
            for (let i = 0; i < levels.length; i++) {
                let page: cc.Node = cc.instantiate(this.item);
                page.getComponent(VipItem).init(levels[i]);
                this.pageview.addPage(page);
            }
            if (!this.isLoad) {
                this.isLoad = true;
                this.currentLevel = currentLevel;
            }
            this.initUI(this.currentLevel);
            this.pageview.scrollToPage(this.currentLevel, 0);
        }
    }

    /**
     * 根据等级渲染UI
     */
    initUI(level: number) {
        if (level < 0 || level >= this.levels.length) return;
        for (let i = 0; i < this.content.childrenCount; i++) {
            this.content.children[i].opacity = i >= level - 1 && i <= level + 1 ? 255 : 0;
        }
        let levelId: number = LongUtil.longToNumber(this.levels[level].levelId);
        let processMin: number = LongUtil.longToNumber(this.levels[level].processMin);
        let processMax: number = LongUtil.longToNumber(this.levels[level].processMax);
        this.lb_curVipLevel.string = `VIP${levelId}`;
        this.lb_leftVipLevel.string = `V${levelId}`;
        this.lb_rightVipLevel.string = `${level + 1 > this.levels.length - 1 ? "MAX" : "V" + LongUtil.longToNumber(this.levels[level + 1].levelId)}`;
        this.lb_progress.string = `${processMin}/${processMax}`;
        this.progress.fillRange = processMin / processMax;
        let indexLeft = 0;
        if (level - 1 >= this.spf_vip.length) indexLeft = this.spf_vip.length - 1;
        else indexLeft = level - 1;
        let indexRight = 0;
        if (level >= this.spf_vip.length) indexRight = this.spf_vip.length - 1;
        else indexRight = level;
        // this.sp_vipLeft.spriteFrame = this.spf_vip[indexLeft < 0 ? 0 : indexLeft];
        // this.sp_vipRight.spriteFrame = this.spf_vip[indexRight < 0 ? 0 : indexRight];
    }

    onClickHelp() {
        UIMgr.show('prefab/hall/VipDetails', 'VipDetails', this.levels);
    }

    onClickBack() {
        this.hide();
    }

    onClickAddCash() {
        UIMgr.show('prefab/hall/AddCash', 'AddCash', { vipInto: true, vipLevel: this.currentLevel });
    }

    onClickLeft() {
        if (this.currentLevel == 0) return;
        this.currentLevel--;
        this.pageview.scrollToPage(this.currentLevel, this.pageview.pageTurningSpeed);
        this.initUI(this.currentLevel);
    }

    onClickRight() {
        if (this.currentLevel >= this.levels.length - 1) return;
        this.currentLevel++;
        this.pageview.scrollToPage(this.currentLevel, this.pageview.pageTurningSpeed);
        this.initUI(this.currentLevel);
    }

    onPageEvent(e: cc.PageView) {
        this.currentLevel = e["_curPageIdx"];
        this.initUI(this.currentLevel);
    }

}
