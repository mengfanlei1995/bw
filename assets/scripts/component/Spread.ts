import CocosUtil from "../utils/CocosUtil";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Spread extends cc.Component {

    @property({ tooltip: '点击区', type: cc.Node })
    clickArea: cc.Node = null;

    protected onEnable(): void {
        this.clickArea.on('click', this.clickEvent, this);
    }

    protected onDisable(): void {
        this.clickArea.off('click', this.clickEvent, this);
    }

    private clickEvent() {
        let arrow: cc.Node = this.clickArea.getChildByName('arrow');
        let spread: cc.Node = this.clickArea.parent.getChildByName('spread');
        spread.active = !spread.active;
        if (cc.isValid(arrow)) {
            let isSpread: boolean = spread.active;
            let down: cc.Node = arrow.children[0];
            let up: cc.Node = arrow.children[1];
            down.active = !isSpread;
            up.active = isSpread;
        }
    }
}
