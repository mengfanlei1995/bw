
import { RedYellowBlueWinDto } from "../../../scripts/net/proto/room";
import UIWindow from "../../../scripts/uiform/UIWindow";
import CocosUtil from "../../../scripts/utils/CocosUtil";

const { ccclass, property } = cc._decorator;

@ccclass
export default class WheelHistory extends UIWindow {

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

    public onShow(gameRecordInfo: RedYellowBlueWinDto[]): void {
        this.node.zIndex = 99;
        this.initRecordHistroy(gameRecordInfo)
    }
    /**
     * 初始化历史记录
     * @returns 
     */
    private async initRecordHistroy(gameRecordInfo: RedYellowBlueWinDto[]) {
        this.contentLayout.removeAllChildren();
        if (gameRecordInfo == null || gameRecordInfo.length <= 0) return;
        var b = 0, r = 0, y = 0;
        var caward: string;
        var lastBallNode: cc.Node;
        for (let i = 0; i < gameRecordInfo.length; i++) {
            caward = `${gameRecordInfo[i].id}`;
            if (caward == "1") b++;
            else if (caward == "2") y++;
            else r++;
            var node = this.productBallNode(caward);
            this.contentLayout.addChild(node);
            if (i == gameRecordInfo.length - 1) lastBallNode = node;
        }
        this.blueNumLabel.string = b.toString();
        this.redNumLabel.string = r.toString();
        this.yellowNumLabel.string = y.toString();
        this.updateLastPos(lastBallNode);
    }

    async updateLastPos(lastBallNode: cc.Node) {
        await CocosUtil.sleepSync(0.1);
        var diff = cc.v2(0, -30);
        var pos = this.bgNode.convertToNodeSpaceAR(this.contentLayout.convertToWorldSpaceAR(lastBallNode.getPosition()));
        this.lastTipNode.position = cc.v3(pos.add(diff));
        this.lastTipNode.active = true;
    }

    onClickClose() {
        this.hide();
    }

    /**
    * 生产红黄蓝球
    * @param value 
    * @returns 
    */
    public productBallNode(value: string) {
        var node = new cc.Node();
        node.name = "ball" + value;
        var sp = node.addComponent(cc.Sprite);
        if (value == "1") {
            sp.spriteFrame = this.bludSpriteFrame
        } else if (value == "3") {
            sp.spriteFrame = this.redSpriteFrame
        } else {
            sp.spriteFrame = this.yellowSpriteFrame
        }
        return node
    }

}
