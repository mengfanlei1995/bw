import SysConfig, { GameListInfo } from "../../../data/SysConfig";
import AssetUtil from "../../../utils/AssetUtil";
import UIMgr from "../../UIMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameIcon extends cc.Component {

    /**游戏状态图标图标 */
    @property(cc.Node)
    gameType: cc.Node[] = [];

    private gameData: GameListInfo = null;

    async init(index: number, gameData: GameListInfo) {
        let child: cc.Node = this.node.children[0];
        child.y -= 1000;
        this.gameData = gameData;
        let spineConf = SysConfig.spineHash[`${gameData.gameType}`];
        let { file, animation } = spineConf;
        let skeletonData: sp.SkeletonData = await AssetUtil.loadResSync<sp.SkeletonData>(`spine/${file}`);
        if (!cc.isValid(this.node)) return;
        let iconAnim: sp.Skeleton = child.getComponent(sp.Skeleton);
        iconAnim.skeletonData = skeletonData;
        iconAnim.animation = animation;
        let row: number = Math.floor(index / 2);
        child.active = true;
        for (let i = 1; i < this.gameType.length; i++) {
            this.gameType[i].active = i == gameData.flag;
        }
        cc.tween(child).delay(row * .15).to(0.5, { y: 0 }, { easing: 'backOut' }).start();
    }

    async onClickEnterRoom(e: cc.Event.EventTouch) {
        if (SysConfig.isEnterGaming) return;
        SysConfig.isEnterGaming = true;
        this.node.getComponent(cc.Button).interactable = false;
        let result = await UIMgr.enterGame(this.gameData.name);
        if (!result) {
            SysConfig.isEnterGaming = false;
            this.node.getComponent(cc.Button).interactable = true;
        }
    }

}
