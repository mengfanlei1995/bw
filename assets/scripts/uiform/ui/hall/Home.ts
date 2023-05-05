import SysConfig from "../../../data/SysConfig";
import { HALL_EVT } from "../../../enum/DeskEnum";
import EventMgr from "../../../mgr/EventMgr";
import SendMgr from "../../../net/SendMgr";
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

    start() {
        this.node.zIndex = 1;
        this.initHallInfo();
        this.initGameList();
    }

    async initHallInfo() {
        let info = await SendMgr.sendHallInfo();
        console.log(info)
    }

    async initGameList() {
        let list = SysConfig.gameList;
        if (list.length === 0) {
            let info = await SendMgr.sendGameList();
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

    onClickAddCash() {
        UIMgr.show('prefab/hall/AddCash', 'AddCash');
    }

    onClickVip() {
        UIMgr.show('prefab/hall/VipPrivileges', 'VipPrivileges');
    }

    onClickHead() {
        EventMgr.emit(HALL_EVT.CHANGE_MENU_ACTIVE, 4);
    }

}
