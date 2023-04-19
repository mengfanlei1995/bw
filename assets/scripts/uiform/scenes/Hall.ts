import SysConfig, { GameListInfo } from "../../data/SysConfig";
import LangMgr from "../../mgr/LangMgr";
import SoundMgr from "../../mgr/SoundMgr";
import SendMgr from "../../net/SendMgr";
import LogUtil from "../../utils/LogUtil";
import LongUtil from "../../utils/LongUtil";
import UIMgr from "../UIMgr";
import UIScene from "../UIScene";
import GameIcon from "../ui/common/GameIcon";


const { ccclass, property } = cc._decorator;

@ccclass
export default class Hall extends UIScene {

    @property(cc.Prefab)
    gameIcon: cc.Prefab = null;

    @property(cc.Node)
    gameContent: cc.Node = null;

    onLoad() {
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
            console.log(info)
            if (info && info.games && info.games.length > 0) {
                SysConfig.setGameList(info.games);
            }
            list = SysConfig.gameList;
        }
        console.log(list)
        list.forEach((value, index) => {
            let node = cc.instantiate(this.gameIcon);
            node.getComponent(GameIcon).init(value);
            this.gameContent.addChild(node);
        })
    }


    start() {

    }

}
