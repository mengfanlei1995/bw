const { ccclass, property } = cc._decorator;

@ccclass
export default class PokerSmall extends cc.Component {

    @property({ tooltip: "红色牌", type: cc.SpriteFrame })
    redPokerSpriteList: cc.SpriteFrame[] = Array<cc.SpriteFrame>()
    @property({ tooltip: "黑色牌", type: cc.SpriteFrame })
    blackPokerSpriteList: cc.SpriteFrame[] = Array<cc.SpriteFrame>()
    @property({ tooltip: "花色", type: cc.SpriteFrame })
    huaSeSpriteList: cc.SpriteFrame[] = Array<cc.SpriteFrame>()
    @property({ tooltip: "joker人物", type: cc.SpriteFrame })
    jokerSpriteList: cc.SpriteFrame[] = Array<cc.SpriteFrame>()

    private cardArray: string[] = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K"]

    getValue(value: string) {
        let index = -1;
        for (let i = 0; i < this.cardArray.length; i++) {
            if (value == this.cardArray[i]) {
                index = i
                break;
            }
        }

        return index
    }

    /**
     * 设置牌
     * @param huaSe 
     * @param value 
     */
    public init(huaSe: string, value: string) {
        let card: cc.Node = this.node;
        var isRed = huaSe == "2" || huaSe == "4"
        card.getChildByName("cardSprite").getComponent(cc.Sprite).spriteFrame = isRed ? this.redPokerSpriteList[this.getValue(value)] : this.blackPokerSpriteList[this.getValue(value)]
        if (huaSe == "X" || huaSe == "D") {
            card.getChildByName("typeSprite2").active = false
            card.getChildByName("typeSprite3").active = true
            card.getChildByName("typeSprite3").getComponent(cc.Sprite).spriteFrame = this.jokerSpriteList[huaSe == "X" ? 0 : 1]
        } else {
            card.getChildByName("typeSprite3").active = false
            card.getChildByName("typeSprite2").active = true
            card.getChildByName("typeSprite2").getComponent(cc.Sprite).spriteFrame = this.huaSeSpriteList[+huaSe - 1]
        }

    }
}
