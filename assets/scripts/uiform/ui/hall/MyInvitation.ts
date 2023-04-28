import LangMgr from "../../../mgr/LangMgr";
import SendMgr from "../../../net/SendMgr";
import { ReferInvitationTotalChildVO, ReferInvitationTotalVO } from "../../../net/proto/hall";
import LongUtil from "../../../utils/LongUtil";
import UIMgr from "../../UIMgr";
import UISuperLayout from "../../UISuperLayout";
import { UISuperHeaderAndFooterEvent } from "../../UISuperScrollView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MyInvitation extends cc.Component {
    @property({ tooltip: 'skel动画', type: sp.Skeleton })
    skelAnim: sp.Skeleton = null;
    @property({ tooltip: '全部Label文字', type: cc.Node })
    lblArr: cc.Node[] = [];

    @property({ tooltip: 'total invite', type: cc.Label })
    lblTotalInvite: cc.Label = null;
    @property({ tooltip: 'today invite', type: cc.Label })
    lblTodayInvite: cc.Label = null;

    private typeConf: any = {
        MyInvitation: 1,
        FriendInvitation: 2
    }

    @property(cc.Node)
    footer: cc.Node = null

    @property(UISuperLayout)
    layout: UISuperLayout = null

    @property({ tooltip: '没有记录', type: cc.Node })
    node_noRecord: cc.Node = null;

    private queryType: number = 1;

    /**页数 */
    private currentPage: number = 1;

    /**总页数 */
    private totalPage: number = 1;

    private datas: ReferInvitationTotalChildVO[] = [];

    protected onEnable(): void {
        this.refreshData()
    }

    protected onDisable(): void {
        this.hideAllLable()
    }

    acitveTab(e: cc.Event.EventTouch) {
        let target: cc.Node = e.target as cc.Node;
        target.parent.children.forEach(
            node => {
                node.children[0].active = node.name === target.name;
                node.children[1].active = node.name !== target.name;
            }
        )
        this.hideAllLable()
        this.queryType = this.typeConf[target.name]
        this.refreshData()
    }

    async refreshData() {
        let infos: ReferInvitationTotalVO = await SendMgr.sendMyInvitation({ relation: this.queryType, pageNum: this.currentPage });
        if (!infos || !cc.isValid(this.node)) return;
        let { todayInvited, total, totalInvited, childList } = infos
        this.lblTotalInvite.string = `${totalInvited}`
        this.lblTodayInvite.string = `${todayInvited}`
        this.skelAnim.setAnimation(0, 'lnvitation', false)
        this.skelAnim.setCompleteListener(() => {
            this.lblArr.forEach(
                (node) => {
                    cc.tween(node).to(.75, { opacity: 255 }, { easing: 'backOut' }).start()
                }
            )
        })
        this._initData(infos);
    }

    hideAllLable() {
        this.datas = [];
        this.currentPage = 1;
        this.totalPage = 1;
        this.lblArr.forEach(
            (node) => {
                node.opacity = 0
            }
        )
    }

    private onRefreshEvent(node: cc.Node, index: number) {
        let info: ReferInvitationTotalChildVO = this.datas[index];
        let { name, todayBonus, totalBonus, uid } = info
        let children: cc.Node[] = node.children;
        let lb_uid: cc.Label = children[0].getComponent(cc.Label);
        let lb_name: cc.Label = children[1].getComponent(cc.Label);
        let lb_today: cc.Label = children[2].getComponent(cc.Label);
        let lb_total: cc.Label = children[3].getComponent(cc.Label);
        lb_uid.string = `${uid}`;
        lb_name.string = `${name}`;
        lb_today.string = `₹${todayBonus}`;
        lb_total.string = `₹${totalBonus}`;
    }
    private onRemove(index: number) {
        this.datas.splice(index, 1)
        this.layout.total(this.datas.length)
    }

    private gotoHeader() {
        this.layout.scrollToHeader(0.618)
    }
    private gotoFooter() {
        this.layout.scrollToFooter(0.618)
    }

    private async onFooterEvent(scrollView: any, event: UISuperHeaderAndFooterEvent) {
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
            if (this.currentPage >= this.totalPage) {
                UIMgr.showToast(LangMgr.sentence('e0009'))
                this.layout.scrollView.release();
                return;
            }
            this.currentPage++;
            let infos: ReferInvitationTotalVO = await SendMgr.sendMyInvitation({ relation: this.queryType, pageNum: this.currentPage })
            this._initData(infos);
        }
    }



    async _initData(infos: ReferInvitationTotalVO) {
        if (!infos || !cc.isValid(this.node)) return;
        let { todayInvited, total, totalInvited, childList } = infos
        if (childList && childList.length > 0) {
            this.node_noRecord.active = false;
            this.totalPage = LongUtil.longToNumber(total);
            for (let i = 0; i < childList.length; i++) {
                this.datas.push(childList[i])
            }
        } else {
            if (LongUtil.longToNumber(total) <= 1) {
                this.node_noRecord.active = true;
                this.datas = [];
            }
        }
        this.layout.total(this.datas.length)
    }
}
