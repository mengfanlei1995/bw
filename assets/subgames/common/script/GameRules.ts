import SysConfig from "../../../scripts/data/SysConfig";
import LangMgr from "../../../scripts/mgr/LangMgr";
import UIWindow from "../../../scripts/uiform/UIWindow";
import CocosUtil from "../../../scripts/utils/CocosUtil";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameRules extends UIWindow {

    @property(cc.RichText)
    text: cc.RichText = null;

    @property(cc.Node)
    root: cc.Node = null;

    onClickClose() {
        this.hide();
    }

    /**游戏规则界面 根据gameid显示文本 */
    public async onShow(gameId: number): Promise<void> {
        let lang = null;
        switch (`${gameId}`) {
            case SysConfig.GameIDConfig.Dice3:
                lang = "e0026";
                break;
            case SysConfig.GameIDConfig.LuckyBall:
                lang = "e0025";
                break;
            case SysConfig.GameIDConfig.LuckyDice:
                lang = "e0024";
                break;
            case SysConfig.GameIDConfig.PokeKing:
                lang = "e0027";
                break;
            case SysConfig.GameIDConfig.TigerVSElephant:
                lang = "e0023";
                break;
            case SysConfig.GameIDConfig.WheelofForune:
                lang = "e0022";
                break;
            case SysConfig.GameIDConfig.JhandiMunda:
                lang = "e0076";
                break;
        }
        if (lang) {
            this.text.string = LangMgr.sentence(lang);
            await CocosUtil.sleepSync(0.05)
            if (this.text.node.height >= 127.8) {
                this.root.height += this.text.node.height - 127.8;
            }
        }
    }

}
