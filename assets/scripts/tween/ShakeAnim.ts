const { ccclass, property } = cc._decorator;

@ccclass
export default class ShakeAnim extends cc.Component {
    twEff: cc.Tween = null;
    onEnable() {
        this.twEff = cc.tween(this.node)
        this.twEff.repeatForever(
            this.twEff.repeat(2,
                this.twEff.
                    to(0.05, { angle: -10 }, { easing: 'quadOut' }).
                    to(0.1, { angle: 10 }, { easing: 'quadOut' }).
                    to(0.05, { angle: 0 }, { easing: 'quadOut' })
            ).delay(1.5)
        ).start()
    }

    onDisable() {
        this.twEff.stop()
    }
}
