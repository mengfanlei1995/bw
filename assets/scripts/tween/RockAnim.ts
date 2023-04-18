const { ccclass, property } = cc._decorator;

@ccclass
export default class RockAnim extends cc.Component {
    @property({tooltip:'方向', type: cc.Integer})
    dir: number = 1;

    twEff: cc.Tween = null;
    defX: number = 0;

    onEnable() {
        let defX: number = this.node.x;
        this.defX = defX;
        this.twEff = cc.tween(this.node)
        this.twEff.repeatForever(
            this.twEff.repeat(2,
                this.twEff.
                    to(0.45, { x: defX + 15 * this.dir }, { easing: 'easeIn' }).
                    to(0.45, { x: defX }, { easing: 'easeOut' })
            )
        ).start()
    }

    onDisable() {
        this.node.x = this.defX;
        this.twEff.stop()
    }
}