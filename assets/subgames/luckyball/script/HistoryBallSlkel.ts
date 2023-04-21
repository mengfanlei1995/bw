const { ccclass, property } = cc._decorator;

@ccclass
export default class HistoryBallSlkel extends cc.Component {
    @property({ tooltip: '挂载到球上的数字', type: cc.Prefab })
    ballTextPrefab: cc.Prefab = null;

    ballTextNode: cc.Node = null;
    @property({ tooltip: '球动画', type: sp.Skeleton })
    colorBallSkel: sp.Skeleton = null;

    /**9个球从左到右依次的角度 */
    ballAngleArr: number[] = [35, 25, 15, 10, 0, -10, -15, -25, -35];

    /**球的数字对应的图片序号 */
    ballValueToSprite: number[] = [0, 2, 2, 2, 2, 0, 1, 1, 1, 1];

    skeletonAnim: sp.Skeleton = null;

    colorBallSkelArr: string[] = ['Colorball_2a', 'Colorball_2b', 'Colorball_2c', 'Colorball_2e']

    /**球的颜色编号 1：红 3：黄 5：蓝 */
    colorBallSkelColorArr: number[] = [1, 3, 5]

    init(ballValue: number, ballIndex: number) {
        this.ballColor(this.colorBallSkelColorArr[this.ballValueToSprite[ballValue]], ballValue, ballIndex)
    }

    /**
     * 播放历史记录中 球动画
     * @param step - 摇奖的某个阶段 共3个阶段
     * @param loop - 当前阶段的动画是否循环播放
     */
    playBallSkel(step: number, loop: boolean = false) {
        this.colorBallSkel.setAnimation(0, this.colorBallSkelArr[step], loop);
        /* this.colorBallSkel.setCompleteListener(() => {
            let attachUtil = this.colorBallSkel['attachUtil'];
            attachUtil.destroyAllAttachedNodes();
        }) */
    }

    /**
     * 设计历史记录 球信息
     * @param ballColor 出球颜色
     * @param ballValue 出球号码
     */
    ballColor(ballColor: number, ballValue: number, ballIndex: number) {
        this.colorBallSkel.setAttachment('xq', `tex/x${ballColor}`)
        if (!this.ballTextNode) {
            let attachUtil = this.colorBallSkel[`attachUtil`];
            attachUtil.generateAllAttachedNodes();
            // 因为同名骨骼可能不止一个，所以需要返回数组
            let boneNodes = attachUtil.getAttachedNodes('xq_text');
            // 取第一个骨骼作为挂点
            let boneNode = boneNodes[0];
            this.ballTextNode = cc.instantiate(this.ballTextPrefab)
            this.ballTextNode.y += 5
            boneNode.addChild(this.ballTextNode)
        }
        const attLbl: cc.Label = this.ballTextNode.getComponent(cc.Label);
        attLbl.string = `${ballValue}`
        attLbl.fontSize = 21
        this.ballTextNode.angle = this.ballAngleArr[ballIndex]
    }
}
