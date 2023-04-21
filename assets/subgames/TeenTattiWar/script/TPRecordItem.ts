const { ccclass, property } = cc._decorator;

@ccclass
export default class TPRecordItem extends cc.Component {

    @property({ tooltip: "结果", type: cc.Sprite })
    resultSprite: cc.Sprite = null
    @property({ tooltip: "k", type: cc.SpriteFrame })
    kSpriteFrame: cc.SpriteFrame = null
    @property({ tooltip: "q", type: cc.SpriteFrame })
    qSpriteFrame: cc.SpriteFrame = null
    @property({ tooltip: "luckyHit", type: cc.Node })
    luckyHit: cc.Node = null

    init(id: number[]) {
        this.luckyHit.active = id.length > 1;
        let result = id[0] > 1 ? id[0] : id[1];
        this.resultSprite.spriteFrame = result == 2 ? this.kSpriteFrame : this.qSpriteFrame;
    }

}
