
import { D3WinVO } from "../../../scripts/net/proto/room";
import UIWindow from "../../../scripts/uiform/UIWindow";
import CocosUtil from "../../../scripts/utils/CocosUtil";

const { ccclass, property } = cc._decorator;

@ccclass
export default class DiceThreeHistory extends UIWindow {

    @property({ tooltip: '背景', type: cc.Node })
    bgNode: cc.Node = null;
    @property({ tooltip: '内容区域', type: cc.Node })
    contentLayout: cc.Node = null;
    @property({ tooltip: 'LastBall', type: cc.Node })
    lastTipNode: cc.Node = null;

    @property({ tooltip: '绿色数量', type: cc.Label })
    greenNumLabel: cc.Label = null;
    @property({ tooltip: '红色数量', type: cc.Label })
    indiumNumLabel: cc.Label = null;
    @property({ tooltip: '黄色数量', type: cc.Label })
    yellowNumLabel: cc.Label = null;

    @property({ tooltip: "绿色", type: cc.SpriteFrame })
    greenSpriteFrame: cc.SpriteFrame = null
    @property({ tooltip: "红色", type: cc.SpriteFrame })
    indiumSpriteFrame: cc.SpriteFrame = null
    @property({ tooltip: "黄色", type: cc.SpriteFrame })
    yellowSpriteFrame: cc.SpriteFrame = null

    public onShow(gameRecordInfo: D3WinVO[]): void {
        this.initRecordHistroy(gameRecordInfo)
    }

    /**
    * 初始化历史记录
    * @returns 
    */
    initRecordHistroy(gameRecordInfo: D3WinVO[]) {
        this.contentLayout.removeAllChildren()
        if (gameRecordInfo == null || gameRecordInfo.length <= 0) return;
        let g = 0, r = 0, y = 0
        let lastBallNode: cc.Node
        for (let i = 0; i < gameRecordInfo.length; i++) {
            let array = gameRecordInfo[i].dices
            let sum: number = array[0] + array[1] + array[2]
            if (array[0] == array[1] && array[0] == array[2]) {
                g++
            } else {
                if (sum <= 10) {
                    r++
                } else {
                    y++
                }
            }
            let node = this.productBallNode(array)
            this.contentLayout.addChild(node)
            if (i == gameRecordInfo.length - 1) lastBallNode = node
        }
        this.indiumNumLabel.string = r.toString();
        this.yellowNumLabel.string = y.toString();
        this.greenNumLabel.string = g.toString();
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

    /**
     * 生产红黄蓝球
     * @param value 
     * @returns 
     */
    public productBallNode(array: number[]) {
        let node = new cc.Node();
        let sum: number = array[0] + array[1] + array[2]
        let sp = node.addComponent(cc.Sprite);
        if (array[0] == array[1] && array[0] == array[2]) {
            sp.spriteFrame = this.greenSpriteFrame
        } else {
            if (sum <= 10) {
                sp.spriteFrame = this.indiumSpriteFrame
            } else {
                sp.spriteFrame = this.yellowSpriteFrame
            }

        }
        return node
    }

}
