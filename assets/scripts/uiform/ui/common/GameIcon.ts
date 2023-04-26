import { GameListInfo } from "../../../data/SysConfig";
import AssetUtil from "../../../utils/AssetUtil";
import UIMgr from "../../UIMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameIcon extends cc.Component {

    private gameData: GameListInfo = null;

    async init(index: number, gameData: GameListInfo) {
        let child: cc.Node = this.node.children[0];
        this.gameData = gameData;
        let texture: cc.Texture2D = await AssetUtil.loadResSync<cc.Texture2D>(gameData.file);
        let spriteFrame: cc.SpriteFrame = new cc.SpriteFrame(texture);
        child.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        child.y -= 1000;
        let row: number = Math.floor(index / 2);
        child.active = true;
        cc.tween(child).delay(row * .15).to(0.5, { y: 0 }, { easing: 'backOut' }).start()
    }

    async onClickEnterRoom(e: cc.Event.EventTouch) {
        this.node.getComponent(cc.Button).interactable = false;
        let result = await UIMgr.enterGame(this.gameData.name);
        if (!result) {
            this.node.getComponent(cc.Button).interactable = true;
        }
    }

}
