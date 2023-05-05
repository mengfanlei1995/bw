import LangMgr from "../../../mgr/LangMgr";
import SendMgr from "../../../net/SendMgr";
import { TimezoneReferRewardVO } from "../../../net/proto/hall";
import CommonUtil from "../../../utils/CommonUtil";
import LongUtil from "../../../utils/LongUtil";
import UIMgr from "../../UIMgr";
import UISuperLayout from "../../UISuperLayout";
import { UISuperHeaderAndFooterEvent } from "../../UISuperScrollView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MyRewards extends cc.Component {
    @property({ tooltip: 'skel动画', type: sp.Skeleton })
    skelAnim: sp.Skeleton = null;
    @property({ tooltip: '全部Label文字', type: cc.Node })
    lblArr: cc.Node[] = [];
    @property(cc.Label)
    lb_totalBonus: cc.Label = null;

    @property(cc.Label)
    lb_inviteBonus: cc.Label = null;

    @property(cc.Label)
    lb_depositBonus: cc.Label = null;

    @property(cc.Label)
    lb_btnText: cc.Label = null;

    @property(cc.Node)
    node_daysView: cc.Node = null;

    @property(cc.Node)
    node_noDetails: cc.Node = null;

    @property(cc.Node)
    btnOpenDaysView: cc.Node = null;

    @property(UISuperLayout) layout: UISuperLayout = null

    @property(cc.Node) footer: cc.Node = null

    private datas = [];

    private rewardInfo: any;

    /**页数 */
    private pageNo: number = 1;

    protected onEnable(): void {
        this.skelAnim.setAnimation(0, 'MyRewards', false)
        this.skelAnim.setCompleteListener(() => {
            this.lblArr.forEach(
                (node) => {
                    cc.tween(node).to(.75, { opacity: 255 }, { easing: 'backOut' }).start()
                }
            )
        })
        this.queryInviteInfo();
    }

    private onFooterEvent(scrollView: any, event: UISuperHeaderAndFooterEvent) {
        this.footer.opacity = event.progress * 255
        let label = this.footer.getComponentInChildren(cc.Label)

        if (event.progressStage == "touch") {
            label.string = LangMgr.sentence("e0129")
        }
        if (event.progressStage == "wait") {
            label.string = LangMgr.sentence("e0216")
        }
        if (event.progressStage == "lock") {
            label.string = LangMgr.sentence("e0079")
        }
        if (event.progressStage == 'release') {
            label.string = ""
        }
        if (event.progress > 2) {
            if (!this.footer['playing']) {
                this.footer.runAction(cc.scaleTo(0.618, 1, 1).easing(cc.easeElasticOut(0.236)))
                this.footer['playing'] = true
            }
        } else {
            this.footer.stopAllActions()
            this.footer['playing'] = false
            this.footer.scaleY = event.progress >= 1 ? 1 : event.progress
        }
        if (event.action) {
            if (this.pageNo >= this.rewardInfo.total) {
                UIMgr.showToast(LangMgr.sentence('e0009'))
                this.layout.scrollView.release();
                return;
            }
            this.pageNo++;
            this.queryInviteInfo();
        }
    }


    async queryInviteInfo() {
        let result: TimezoneReferRewardVO = await SendMgr.sendMyRewards({ pageNum: this.pageNo });
        if (!result || !cc.isValid(this.node)) return;
        let { total, rewardList, totalBonus, totalDepositBonus, totalInviteBonus } = result;
        this.rewardInfo = result;
        this.lb_totalBonus.string = `₹${LongUtil.longToNumber(totalBonus)}`;
        this.lb_inviteBonus.string = `₹${LongUtil.longToNumber(totalInviteBonus)}`;
        this.lb_depositBonus.string = `₹${LongUtil.longToNumber(totalDepositBonus)}`;
        if (rewardList && rewardList.length > 0) {
            this.datas = rewardList;
            this.node_noDetails.active = false;
        } else {
            this.node_noDetails.active = true;
        }
        this.layout.total(this.datas.length)
    }

    onClickGetListInfo(e: cc.Event.EventTouch, day: number) {
        this.lb_btnText.string = e.target.getComponentInChildren(cc.Label).string;
        this.node_daysView.active = false;
        this.isOpen = false;
        let close: cc.Node = this.btnOpenDaysView.children[1].children[0];
        let open: cc.Node = this.btnOpenDaysView.children[1].children[1];
        close.active = true;
        open.active = false;
    }

    private isOpen: boolean = false;

    onClickOpenDaysView(e: cc.Event.EventTouch) {
        this.isOpen = !this.isOpen;
        this.node_daysView.active = this.isOpen;
        let close: cc.Node = e.target.children[1].children[0];
        let open: cc.Node = e.target.children[1].children[1];
        close.active = !this.isOpen;
        open.active = this.isOpen;
    }

    private onRefreshEvent(node: cc.Node, index: number) {
        let info = this.datas[index];
        let { time, totalBonus, totalDepositBonus, totalInviteBonus } = info;
        let lb_time: cc.Label = cc.find("time", node).getComponent(cc.Label);
        let lb_totalBonus: cc.Label = cc.find("totalBonus", node).getComponent(cc.Label);
        let lb_inviteBonus: cc.Label = cc.find("inviteBonus", node).getComponent(cc.Label);
        let lb_depositBonus: cc.Label = cc.find("depositBonus", node).getComponent(cc.Label);
        lb_time.string = CommonUtil.formatDate(time, "yyyy-MM-dd");
        lb_totalBonus.string = `₹${totalBonus}`;
        lb_inviteBonus.string = `₹${totalInviteBonus}`;
        lb_depositBonus.string = `₹${totalDepositBonus}`;
    }

    protected onDisable(): void {
        this.lblArr.forEach(
            (node) => {
                node.opacity = 0;
            }
        )
    }
}
