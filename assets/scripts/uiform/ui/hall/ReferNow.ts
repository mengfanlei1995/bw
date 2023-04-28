import SendMgr from "../../../net/SendMgr";
import { ReferInvitationNowVO } from "../../../net/proto/hall";
import UIMgr from "../../UIMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ReferNow extends cc.Component {
    @property({ tooltip: 'skel动画', type: sp.Skeleton })
    skelAnim: sp.Skeleton = null;

    @property({ tooltip: '金字塔全部文字节点', type: cc.Node })
    lblArr: cc.Node[] = [];

    @property({ tooltip: '左边飘进来节点', type: cc.Node })
    leftInfo: cc.Node = null;
    @property({ tooltip: '右边飘进来节点', type: cc.Node })
    rightInfo: cc.Node = null;

    @property(cc.Label)
    lb_friendDeposit: cc.Label = null;

    @property(cc.Label)
    lb_friendReg: cc.Label = null;

    @property(cc.Label)
    lb_mutualFriendDeposit: cc.Label = null;

    @property(cc.Label)
    lb_mutualFriendReg: cc.Label = null;

    onClickDetails() {
        UIMgr.show('prefab/hall/RankDetails', 'RankDetails', this.info)
    }

    protected onEnable(): void {
        this.init();
        this.skelAnim.setAnimation(0, 'invitation', false);
        this.lblArr.forEach(
            (node, index) => {
                node.opacity = 0
                let delay: number = 0.05 * index
                cc.tween(node).delay(0.35 + delay).to(1.45, { opacity: 255 }, { easing: 'backOut' }).start()
            }
        )

        this.leftInfo.x = -538;
        this.rightInfo.x = 538;

        cc.tween(this.leftInfo).sequence(
            cc.tween().to(.55, { x: -175.5 + 30 }, { easing: 'backOut' }),
            cc.tween().to(.25, { x: -175.5 }, { easing: 'backOut' })
        ).start()
        cc.tween(this.rightInfo).sequence(
            cc.tween().to(.55, { x: 175.5 - 30 }, { easing: 'backOut' }),
            cc.tween().to(.25, { x: 175.5 }, { easing: 'backOut' })
        ).start()
    }

    private info = null;

    async init() {
        let info: ReferInvitationNowVO = await SendMgr.sendReferInvitation();
        if (!info || !cc.isValid(this.node)) return
        let { friendDeposit, friendReg, mutualFriendDeposit, mutualFriendReg } = info;
        this.info = info;
        this.lb_friendDeposit.string = `${friendDeposit}%`;
        this.lb_friendReg.string = `${friendReg}`;
        this.lb_mutualFriendDeposit.string = `${mutualFriendDeposit}%`;
        this.lb_mutualFriendReg.string = `${mutualFriendReg}`;
        this.lb_friendDeposit.node.parent.active = !!friendDeposit;
        this.lb_friendReg.node.parent.active = !!friendReg;
        this.lb_mutualFriendDeposit.node.parent.active = !!mutualFriendDeposit;
        this.lb_mutualFriendReg.node.parent.active = !!mutualFriendReg;
    }
}
