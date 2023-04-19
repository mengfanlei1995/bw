import { GameListInfo } from "../../../data/SysConfig";
import AssetUtil from "../../../utils/AssetUtil";
import UIMgr from "../../UIMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameIcon extends cc.Component {

    private gameData: GameListInfo = null;

    async init(gameData: GameListInfo) {
        this.gameData = gameData;
        let texture: cc.Texture2D = await AssetUtil.loadResSync<cc.Texture2D>(gameData.file);
        var spriteFrame: cc.SpriteFrame = new cc.SpriteFrame(texture);
        this.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
    }

    onClickEnterRoom() {
        UIMgr.enterGame(this.gameData.name);
    }

}
