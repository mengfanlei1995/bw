const { ccclass, property } = cc._decorator;

@ccclass
export default class JumpAnim extends cc.Component {
    twEff: cc.Tween = null;
    defY: number = 0;

    onEnable() {
        let defY: number = this.node.y;
        this.defY = defY;
        this.twEff = cc.tween(this.node)
        this.twEff.repeatForever(
            this.twEff.repeat(2,
                this.twEff.
                    to(0.45, { y: defY + 15 }, { easing: 'easeIn' }).
                    to(0.45, { y: defY }, { easing: 'easeOut' })
            )
        ).start()
    }

    onDisable() {
        this.node.y = this.defY;
        this.twEff.stop()
    }
}