
import UIWindow from "../../../scripts/uiform/UIWindow";
import CocosUtil from "../../../scripts/utils/CocosUtil";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TigerElephantHistory extends UIWindow {

    public readonly T_ID: string = "1";
    public readonly E_ID: string = "2";
    public readonly TIE_ID: string = "3";

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

    public onShow(gameRecordInfo: number[]): void {
        this.node.zIndex = 99;
        this.initRecordHistroy(gameRecordInfo);
    }

    /**
    * 初始化历史记录
    * @returns 
    */
    private async initRecordHistroy(gameRecordInfo: number[]) {
        this.contentLayout.removeAllChildren();
        if (gameRecordInfo == null || gameRecordInfo.length <= 0) return;
        let b = 0, r = 0, y = 0
        let caward: string;
        let lastBallNode: cc.Node;
        for (let i = 0; i < gameRecordInfo.length; i++) {
            caward = `${gameRecordInfo[i]}`;
            if (caward == this.T_ID) b++;
            else if (caward == this.E_ID) r++;
            else y++;
            let node = this.productBallNode(caward);
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
        let diff = cc.v2(0, -30);
        let pos = this.bgNode.convertToNodeSpaceAR(this.contentLayout.convertToWorldSpaceAR(lastBallNode.getPosition()));
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
        let node = new cc.Node();
        node.name = "ball" + value;
        let sp = node.addComponent(cc.Sprite);
        if (value == this.T_ID) {
            sp.spriteFrame = this.bludSpriteFrame
        } else if (value == this.E_ID) {
            sp.spriteFrame = this.redSpriteFrame
        } else {
            sp.spriteFrame = this.yellowSpriteFrame
        }
        return node
    }

    getAwardResult(caward: string) {
        if (caward == null || caward == "") return
        let result = caward.split(",")
        if (+result[1] == +result[3]) return this.TIE_ID
        else if (+result[1] > +result[3]) return this.T_ID
        else return this.E_ID
    }

}
