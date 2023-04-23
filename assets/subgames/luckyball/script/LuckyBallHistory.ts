import { LBWinVO } from "../../../scripts/net/proto/room";
import UIWindow from "../../../scripts/uiform/UIWindow";
import CocosUtil from "../../../scripts/utils/CocosUtil";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LuckyBallHistory extends UIWindow {

    @property({ tooltip: '背景', type: cc.Node })
    bgNode: cc.Node = null;
    @property({ tooltip: '内容区域', type: cc.Node })
    contentLayout: cc.Node = null;
    @property({ tooltip: 'LastBall', type: cc.Node })
    lastTipNode: cc.Node = null;

    @property({ tooltip: '蓝色数量', type: cc.Label })
    blueNumLabel: cc.Label = null;
    @property({ tooltip: '红色数量', type: cc.Label })
    redNumLabel: cc.Label = null;
    @property({ tooltip: '黄色数量', type: cc.Label })
    yellowNumLabel: cc.Label = null;

    @property({ tooltip: "蓝色球", type: cc.SpriteFrame })
    bludSpriteFrame: cc.SpriteFrame = null
    @property({ tooltip: "红色球", type: cc.SpriteFrame })
    redSpriteFrame: cc.SpriteFrame = null
    @property({ tooltip: "黄色球", type: cc.SpriteFrame })
    yellowSpriteFrame: cc.SpriteFrame = null

    @property({ tooltip: '挂载到球上的数字', type: cc.Prefab })
    ballTextPrefab: cc.Prefab = null;

    public onShow(gameRecordInfo: LBWinVO[]): void {
        this.initRecordHistroy(gameRecordInfo);
    }

    /**
    * 查历史记录
    * @returns 
    */
    initRecordHistroy(gameRecordInfo: LBWinVO[]) {
        this.contentLayout.removeAllChildren()
        if (gameRecordInfo == null || gameRecordInfo.length <= 0) return;
        let b = 0, r = 0, y = 0
        let lastBallNode: cc.Node
        for (let i = 0; i < gameRecordInfo.length; i++) {
            let cwardcode = gameRecordInfo[i].ball
            if (cwardcode >= 1 && cwardcode <= 4) b++
            else if (cwardcode == 0 || cwardcode == 5) r++
            else y++
            let node = this.productBallNode(cwardcode)
            this.contentLayout.addChild(node)
            if (i == gameRecordInfo.length - 1) lastBallNode = node
        }
        this.blueNumLabel.string = `${b}`
        this.redNumLabel.string = `${r}`
        this.yellowNumLabel.string = `${y}`
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
    * @param cwardcode 
    * @returns 
    */
    public productBallNode(cwardcode: number) {
        let node = new cc.Node();
        node.name = "ball" + cwardcode;
        let sp = node.addComponent(cc.Sprite);
        let spVal: cc.SpriteFrame = null;
        if (+cwardcode >= 1 && +cwardcode <= 4) spVal = this.bludSpriteFrame
        else if (+cwardcode == 0 || +cwardcode == 5) spVal = this.redSpriteFrame
        else spVal = this.yellowSpriteFrame
        sp.spriteFrame = spVal
        let lblNode: cc.Node = cc.instantiate(this.ballTextPrefab)
        lblNode.parent = node;
        lblNode.getComponent(cc.Label).string = `${cwardcode}`
        lblNode.getComponent(cc.Label).fontSize = 24
        return node
    }



}
