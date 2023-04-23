import { PKWinVO } from "../../../scripts/net/proto/room";
import UIWindow from "../../../scripts/uiform/UIWindow";
import CocosUtil from "../../../scripts/utils/CocosUtil";
import PokerSmall from "../../common/script/PokerSmall";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PokerKingHistory extends UIWindow {

    @property({ tooltip: '背景', type: cc.Node })
    bgNode: cc.Node = null;
    @property({ tooltip: '内容区域', type: cc.Node })
    contentLayout: cc.Node = null;
    @property({ tooltip: 'LastBall', type: cc.Node })
    lastTipNode: cc.Node = null;

    @property({ tooltip: '黑桃数量', type: cc.Label })
    heitaoNumLabel: cc.Label = null;
    @property({ tooltip: '红桃数量', type: cc.Label })
    hongtaoNumLabel: cc.Label = null;
    @property({ tooltip: '梅花数量', type: cc.Label })
    meihuaNumLabel: cc.Label = null;
    @property({ tooltip: '方块数量', type: cc.Label })
    fangkuaiNumLabel: cc.Label = null;


    @property({ tooltip: 'joker数量', type: cc.Label })
    jokerNumLabel: cc.Label = null;
    @property({ tooltip: '黑色数量', type: cc.Label })
    blackNumLabel: cc.Label = null;
    @property({ tooltip: '红色数量', type: cc.Label })
    redNumLabel: cc.Label = null;

    @property({ tooltip: '记录预制体', type: cc.Prefab })
    recordPrefab: cc.Prefab = null;

    public onShow(gameRecordInfo: PKWinVO[]): void {
        this.initRecordHistroy(gameRecordInfo);
    }

    /**
    * 初始化历史记录
    * @returns 
    */
    private async initRecordHistroy(gameRecordInfo: PKWinVO[]) {
        this.contentLayout.removeAllChildren()
        if (gameRecordInfo == null || gameRecordInfo.length <= 0) return;
        let heitao = 0, hongtao = 0, meihua = 0, fangkuai = 0, joker = 0, black = 0, red = 0
        let value: string
        let lastBallNode: cc.Node
        for (let i = 0; i < gameRecordInfo.length; i++) {
            value = gameRecordInfo[i].poker
            let huaSe = value.slice(0, 1)
            let card = value.slice(1)
            let node = cc.instantiate(this.recordPrefab);
            node.getComponent(PokerSmall).init(huaSe, card)

            switch (huaSe) {
                case "1":
                    heitao++
                    black++
                    break;
                case "2":
                    hongtao++
                    red++
                    break;
                case "3":
                    meihua++
                    black++
                    break;
                case "4":
                    fangkuai++
                    red++
                    break;
                case "X":
                    joker++
                    break;
                case "D":
                    joker++
                    break;

            }
            this.contentLayout.addChild(node)
            if (i == gameRecordInfo.length - 1) lastBallNode = node
        }
        this.redNumLabel.string = red.toString();
        this.blackNumLabel.string = black.toString();
        this.jokerNumLabel.string = joker.toString();
        this.heitaoNumLabel.string = heitao.toString();
        this.hongtaoNumLabel.string = hongtao.toString();
        this.meihuaNumLabel.string = meihua.toString();
        this.fangkuaiNumLabel.string = fangkuai.toString();
        this.updateLastPos(lastBallNode)
    }

    async updateLastPos(lastBallNode: cc.Node) {
        await CocosUtil.sleepSync(0.1);
        let diff = cc.v2(0, -30)
        let pos = this.bgNode.convertToNodeSpaceAR(this.contentLayout.convertToWorldSpaceAR(lastBallNode.getPosition()))
        this.lastTipNode.position = cc.v3(pos.add(diff))
        this.lastTipNode.active = true
    }

    onClickClose() {
        this.hide();
    }

}
