import { HALL_EVT } from "../../../enum/DeskEnum";
import EventMgr from "../../../mgr/EventMgr";
import LangMgr from "../../../mgr/LangMgr";
import SendMgr from "../../../net/SendMgr";
import { MailPageVO, MailVO } from "../../../net/proto/hall";
import LongUtil from "../../../utils/LongUtil";
import UIMgr from "../../UIMgr";
import UIScreen from "../../UIScreen";
import UISuperLayout from "../../UISuperLayout";
import { UISuperHeaderAndFooterEvent } from "../../UISuperScrollView";
import EmailItem from "./EmailItem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Email extends UIScreen {

    @property(cc.Node)
    no_eamil: cc.Node = null;

    @property(cc.Node) footer: cc.Node = null;

    @property(UISuperLayout) layout: UISuperLayout = null;

    /**页数 */
    private pageNo: number = 1;
    /**每页数量 */
    private pageCount: number = 10;

    private datas: MailVO[] = []

    private emailInfos: MailPageVO;

    protected onEnable(): void {
        this._initEmailData();
        EventMgr.on(HALL_EVT.UPDATE_EMAIL, this._updateEmail, this)
    }

    protected onDisable(): void {
        EventMgr.off(HALL_EVT.UPDATE_EMAIL, this._updateEmail, this)
        this.clear();
    }

    clear() {
        this.datas = [];
        this.layout.node.removeAllChildren();
    }

    private onRefreshEvent(node: cc.Node, index: number) {
        let info = this.datas[index]
        node.getComponent(EmailItem).init(info, index, this.onRemove.bind(this))
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
            if (this.pageNo >= LongUtil.longToNumber(this.emailInfos.totalPageCount)) {
                UIMgr.showToast(LangMgr.sentence('e0009'))
                this.layout.scrollView.release();
                return;
            }
            this.pageNo++;
            this._initEmailData();
        }
    }

    onReturnBack() {
        this.hide();
    }

    /**更新邮件 删除邮件到小于10时 自动调取获取下一页数据 */
    _updateEmail() {
        if (this.pageNo < LongUtil.longToNumber(this.emailInfos.totalPageCount) && this.layout.node.childrenCount < 10) {
            this.pageNo++;
            this._initEmailData();
        } else {
            //没有邮件 
            if (this.layout.node.childrenCount == 0) this.no_eamil.active = true;
        }
    }

    /**获取邮件信息 */
    async _initEmailData() {
        let data = {
            pageNo: this.pageNo,
            pageCount: this.pageCount
        }
        let emailInfos: MailPageVO = await SendMgr.sendEmailList(data);
        if (emailInfos && cc.isValid(this.node)) {
            this.emailInfos = emailInfos;
            if (emailInfos.mails && emailInfos.mails.length > 0) {
                for (let i = 0; i < emailInfos.mails.length; i++) {
                    this.datas.push(emailInfos.mails[i]);
                }
            }
            if (this.datas && this.datas.length > 0) {
                this.no_eamil.active = false;
                this.layout.total(this.datas.length);
            } else {
                if (this.pageNo == 1) this.no_eamil.active = true;
                else UIMgr.showToast(LangMgr.sentence("e0009"));
            }
        }
    }

}
