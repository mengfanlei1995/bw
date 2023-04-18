const {ccclass, property} = cc._decorator;

@ccclass
export default class RotationAnim extends cc.Component {
    @property({displayName: '选择一周的耗时', type: cc.Integer})
    time: number = 0.45
    @property({displayName: '旋转方向', type: cc.Integer})
    dir: number = 1

    twEff: cc.Tween = null;
    angle: number = 0;

    onEnable() {
        this.twEff = cc.tween(this.node)
        this.twEff.repeatForever(
            this.twEff.by(this.time, { angle: 360 * this.dir  })
        ).start()
    }

    onDisable() {
        this.node.angle = this.angle;
        this.twEff.stop()
    }
}
