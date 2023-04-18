const { ccclass, property } = cc._decorator;

@ccclass
export default class TwinkleAnim extends cc.Component {
    twEff: cc.Tween = null;
    onEnable() {
        this.twEff = cc.tween(this.node)
        this.twEff.repeatForever(
            this.twEff.repeat(2,
                this.twEff.
                    to(0.45, { opacity: 75 }, { easing: 'easeIn' }).
                    to(0.45, { opacity: 255 }, { easing: 'easeOut' })
            )
        ).start()
    }

    onDisable() {
        this.twEff.stop()
    }
}