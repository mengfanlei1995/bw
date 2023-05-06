import { HALL_EVT, REPORT_EVT } from "../../../enum/DeskEnum";
import EventMgr from "../../../mgr/EventMgr";
import LangMgr from "../../../mgr/LangMgr";
import { DialogType } from "../../../model/DialogOptions";
import { Gullak_ReceiveCmd } from "../../../net/CmdData";
import SendMgr from "../../../net/SendMgr";
import { GullakMainInfoV2VO } from "../../../net/proto/hall";
import CommonUtil from "../../../utils/CommonUtil";
import LongUtil from "../../../utils/LongUtil";
import UIMgr from "../../UIMgr";
import UIWindow from "../../UIWindow";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Bonus extends UIWindow {

    @property({ tooltip: 'collect按钮', type: cc.Node })
    btnCollect: cc.Node = null;

    @property({ tooltip: 'total', type: cc.Label })
    lb_total: cc.Label = null;

    @property({ tooltip: 'cash', type: cc.Label })
    lb_cash: cc.Label = null;

    @property({ tooltip: '正常材质', type: cc.Material })
    material: cc.Material = null;

    @property({ tooltip: '灰色材质', type: cc.Material })
    materialGray: cc.Material = null;

    grayLabel(root: cc.Node) {
        root.getComponent(cc.Label).setMaterial(0, this.materialGray);
    }

    graySprite(root: cc.Node) {
        root.getComponent(cc.Sprite).setMaterial(0, this.materialGray);
    }

    //比例
    private ratio: number = 0;
    //可提取金额
    private cash: number = 0;
    //bonus 总余额
    private total: number = 0;

    onShow(info: GullakMainInfoV2VO) {
        this.init(info);
    }

    //初始化UI 数据在hall里边获取的
    init(info: GullakMainInfoV2VO) {
        this.ratio = info.ratio;
        let cash: number = LongUtil.longToNumber(info.cash);
        let total: number = LongUtil.longToNumber(info.total);
        this.cash = cash;
        this.total = total;
        this.lb_cash.string = `₹${cash / 100}`;
        this.lb_total.string = `₹${total / 100}`;
        if (!cash) {
            this.graySprite(this.btnCollect);
            this.grayLabel(this.btnCollect.children[0]);
        }
    }

    onClickClose() {
        this.hide();
        EventMgr.emit(REPORT_EVT.CLICK, {
            element_id: "bonus_close",
            element_name: "bonus关闭按钮",
            element_type: "button",
            element_position: '',
            element_content: '',
        });
    }

    onClickTips() {
        UIMgr.showDialog({
            word: CommonUtil.format(LangMgr.sentence("e0072"), this.ratio, this.ratio * 2),
            type: DialogType.OnlyOkBtn,
            title: 'BONUS RULES',
            okTxt: 'OK'
        })
    }

    protected start(): void {
        EventMgr.emit(REPORT_EVT.SCENE, { page_name: `Bonus` });
    }

    /**提取bonus */
    async onClickCollect() {
        let cash: number = this.cash;
        if (!cash) return;
        let info = await SendMgr.sendGullak(Gullak_ReceiveCmd);
        this.init(info);
        EventMgr.emit(HALL_EVT.UPDATE_BONUS_RED, false);
        EventMgr.emit(REPORT_EVT.CLICK, {
            element_id: "bonus_Collect",
            element_name: "bonusCollect按钮",
            element_type: "button",
            element_position: '',
            element_content: '',
        });
    }

}
