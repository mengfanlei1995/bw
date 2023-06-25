import SysConfig from "../../../data/SysConfig";
import UserData from "../../../data/UserData";
import { HALL_EVT } from "../../../enum/DeskEnum";
import EventMgr from "../../../mgr/EventMgr";
import StorageMgr from "../../../mgr/StorageMgr";
import { Gullak_InfoCmd } from "../../../net/CmdData";
import SendMgr from "../../../net/SendMgr";
import { GullakMainInfoV2VO, NextDayRechargeVO, PopupVO } from "../../../net/proto/hall";
import LongUtil from "../../../utils/LongUtil";
import UIMgr from "../../UIMgr";
import UIScreen from "../../UIScreen";
import GameIcon from "../common/GameIcon";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Home extends UIScreen {

    @property(cc.Prefab)
    gameIcon: cc.Prefab = null;

    @property(cc.Node)
    gameContent: cc.Node = null;

    @property({ tooltip: 'SuperBonus按钮', type: cc.Node })
    btnSuperBonus: cc.Node = null;

    @property({ tooltip: 'Gullak按钮', type: cc.Node })
    btnGullak: cc.Node = null;

    @property({ tooltip: 'VIP按钮', type: cc.Node })
    btnVip: cc.Node = null;

    @property({ tooltip: 'Mail按钮', type: cc.Node })
    btnMail: cc.Node = null;

    @property({ tooltip: '轮播节点', type: cc.Node })
    swiperNode: cc.Node = null;

    private nextDayRechargeInfo: NextDayRechargeVO = null;

    private gullakInfo: GullakMainInfoV2VO = null;

    start() {
        SysConfig.isEnterGaming = false;
        this.node.zIndex = 1;
        this.initHallInfo();
        this.initGameList();
        this.queryPopList();
    }

    protected onEnable(): void {
        EventMgr.on(HALL_EVT.DESK_RELOAD, this.initHallInfo, this);
        EventMgr.on(HALL_EVT.UPDATE_BONUS_RED, this.updateBonusRed, this);
        EventMgr.on(HALL_EVT.OPEN_WINDOWS, this.openWindows, this);
        EventMgr.on(HALL_EVT.UPDATE_EMAIL_RED, this.changeEmailRed, this)
    }

    protected onDisable(): void {
        EventMgr.off(HALL_EVT.DESK_RELOAD, this.initHallInfo, this);
        EventMgr.off(HALL_EVT.UPDATE_BONUS_RED, this.updateBonusRed, this);
        EventMgr.off(HALL_EVT.OPEN_WINDOWS, this.openWindows, this);
        EventMgr.off(HALL_EVT.UPDATE_EMAIL_RED, this.changeEmailRed, this)
    }

    /**bonus 信息 */
    async getGullakInfo() {
        let info = await SendMgr.sendGullak(Gullak_InfoCmd);
        if (!info || !cc.isValid(this.node)) return;
        this.gullakInfo = info;
        let total: cc.Label = this.btnGullak.children[1].getComponent(cc.Label);
        total.string = `₹${LongUtil.longToNumber(info.total) / 100}`;
    }

    private popData: PopupVO[] = [];

    /**请求弹窗列表 */
    async queryPopList() {
        if (StorageMgr.isGreen) {
            return;
        }
        let result = await SendMgr.sendPopupInfo({ sceneId: SysConfig.sceneId });
        if (!cc.isValid(this.node)) return;
        if (!result || !result.vos || result.vos.length == 0 || !cc.isValid(this.node)) {
            if (StorageMgr.hallHandTimes == 0) {
                UIMgr.show('prefab/hall/HandAni', 'HandAni');
            }
            return;
        }
        let info: PopupVO[] = result.vos;
        this.popData = info;
        this.openWindows();
    }

    /**主动弹窗  按照服务端顺序弹*/
    openWindows() {
        if (this.popData.length > 0) {
            let data: PopupVO = this.popData[0]
            this.popData.shift();
            if (data.popEvent == "pdd") {
                // let { windowState, window } = data.popInfo.ganesh;
                // this.pddWindows(windowState, window);
            } else {
                UIMgr.show(`prefab/hall/${data.popEvent}`, data.popEvent, { isClick: false, info: data });
            }
        } else {
            if (StorageMgr.hallHandTimes == 0) {
                UIMgr.show('prefab/hall/HandAni', 'HandAni');
            }
        }
    }

    /**pdd弹窗 */
    // pddWindows(windowState, window, click: boolean = false) {
    //     switch (windowState) {
    //         case 0:
    //             if (click) FixedMgr.open(UIConfig.GaneshIntro.prefab);
    //             break;
    //         case 1:
    //             FixedMgr.open(UIConfig.GaneshIntro.prefab);
    //             break;
    //         case 2:
    //             FixedMgr.open(UIConfig.OpenGanesh.prefab, { windowState, window });
    //             break;
    //         case 3:
    //             WindowMgr.open(UIConfig.GaneshInfo.prefab, { windowState, window });
    //             break;
    //     }
    // }

    updateBonusRed(isShow: boolean) {
        this.getGullakInfo();
        this.setRedDotAnim(this.btnGullak, isShow);
    }

    async initHallInfo() {
        if (StorageMgr.isGreen) {
            this.swiperNode.opacity = 255;
            return;
        }
        let hallInfo = await SendMgr.sendHallInfo();
        if (!cc.isValid(this.node) || !hallInfo) return;
        let { userInfo, redDot, nextDayRechargeVO, rotationPictures } = hallInfo;
        let { vipLevel, club } = userInfo
        let { mail, vip, gullak } = redDot;
        this.btnSuperBonus.active = nextDayRechargeVO.showFlag;
        this.nextDayRechargeInfo = nextDayRechargeVO;
        UserData.clubLevel = club;
        UserData.vipLevel = vipLevel;
        this.setRedDotAnim(this.btnMail, mail);
        this.setRedDotAnim(this.btnVip, vip);
        this.updateBonusRed(gullak);
        EventMgr.emit(HALL_EVT.INIT_ROTATIONPICTRUES, rotationPictures || [], () => {
            cc.tween(this.swiperNode).to(0.45, { opacity: 255 }, { easing: 'backOut' }).start()
        });
    }

    async initGameList() {
        let list = SysConfig.gameList;
        if (list.length === 0) {
            let info = await SendMgr.sendGameList();
            if (!cc.isValid(this.node)) return;
            if (info && info.games && info.games.length > 0) {
                SysConfig.setGameList(info.games);
            }
            list = SysConfig.gameList;
        }
        list.forEach((value, index) => {
            let node = cc.instantiate(this.gameIcon);
            node.getComponent(GameIcon).init(index, value);
            this.gameContent.addChild(node);
        })
    }

    setRedDotAnim(target: cc.Node, isShow: boolean) {
        if (cc.isValid(target)) {
            target.getChildByName('RedDotAnim').active = isShow;
        }
    }

    changeEmailRed(isShow: boolean) {
        this.setRedDotAnim(this.btnMail, isShow);
    }

    onClickAddCash() {
        UIMgr.show('prefab/hall/AddCash', 'AddCash', { vipInto: false, vipLevel: 0 });
    }

    onClickVip() {
        this.setRedDotAnim(this.btnVip, false);
        UIMgr.show('prefab/hall/VipPrivileges', 'VipPrivileges');
    }

    onClickHead() {
        EventMgr.emit(HALL_EVT.CHANGE_MENU_ACTIVE, 4);
    }

    onClickMail() {
        UIMgr.show('prefab/hall/Email', 'Email');
    }

    onClickGullak() {
        UIMgr.show('prefab/hall/Bonus', 'Bonus', this.gullakInfo);
    }

    onClickSuperBonus() {
        UIMgr.show('prefab/hall/SuperBonus', 'SuperBonus', { isClick: true, info: this.nextDayRechargeInfo });
    }

}
