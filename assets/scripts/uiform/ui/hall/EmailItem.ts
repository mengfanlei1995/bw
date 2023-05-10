import { HALL_EVT } from "../../../enum/DeskEnum";
import EventMgr from "../../../mgr/EventMgr";
import LangMgr from "../../../mgr/LangMgr";
import { DialogType } from "../../../model/DialogOptions";
import SendMgr from "../../../net/SendMgr";
import { MailVO } from "../../../net/proto/hall";
import CocosUtil from "../../../utils/CocosUtil";
import CommonUtil from "../../../utils/CommonUtil";
import LongUtil from "../../../utils/LongUtil";
import UIMgr from "../../UIMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class EmailItem extends cc.Component {
    @property({ tooltip: '类型', type: cc.Label })
    lb_type: cc.Label = null;

    @property({ tooltip: '标题', type: cc.Label })
    lb_title: cc.Label = null;

    @property({ tooltip: '日期', type: cc.Label })
    lb_date: cc.Label = null;

    @property({ tooltip: '是否已经看过的标识', type: cc.Sprite })
    sp_email: cc.Sprite = null;

    @property({ tooltip: '邮件内容', type: cc.RichText })
    lblContent: cc.RichText = null;

    @property({ tooltip: '标识icon图片', type: [cc.SpriteFrame] })
    spf_email: cc.SpriteFrame[] = [];

    @property({ tooltip: '详情展开节点', type: cc.Node })
    contentNode: cc.Node = null;

    @property({ tooltip: '金币', type: cc.Label })
    lb_gold: cc.Label = null;

    @property({ tooltip: '金币', type: cc.Node })
    node_gold: cc.Node = null;

    @property({ tooltip: '领取按钮', type: cc.Node })
    node_receive: cc.Node = null;

    @property({ tooltip: '空节点 填充', type: cc.Node })
    node_null: cc.Node = null;

    private emailData: MailVO;
    private index: number
    private remove: Function

    protected onEnable(): void {
        this.node.on("init", this.init, this)
    }

    /**初始化UI */
    async init(emailData: MailVO, index: number, remove: Function) {
        this.index = index
        this.remove = remove
        this.emailData = emailData;
        this.lb_title.string = CommonUtil.splitStr(emailData.title, 0, 20);
        this.lb_date.string = CommonUtil.getDate(emailData.sendTime);
        this.lblContent.string = emailData.content;
        if (emailData.read) this.sp_email.spriteFrame = this.spf_email[1];
        else this.sp_email.spriteFrame = this.spf_email[0];
        this.node_gold.active = emailData.attachments.length > 0;
        this.node_receive.active = emailData.attachments.length > 0;
        this.node_receive.getComponent(cc.Button).interactable = emailData.attachmentState <= 1;
        this.node_null.active = false;
        if (emailData.attachments.length > 0) {
            this.lb_gold.string = `${LongUtil.longToNumber(emailData.attachments[0].amount) / 100}`;
        } else {
            await CocosUtil.sleepSync(0.1)
            if (this.lblContent.node.height < 100) {
                this.node_null.active = true;
            }
        }
    }

    /**删除邮件 */
    async onClickDelete() {
        let isFirst: boolean = true;
        UIMgr.showDialog({
            word: LangMgr.sentence('e0046'),
            type: DialogType.OkCancelBtn,
            okCb: async () => {
                if (!isFirst) return;
                isFirst = false;
                let data = await SendMgr.sendDeleteEmail({ id: this.emailData.id });
                if (data != null) {
                    this.remove(this.index);
                    EventMgr.emit(HALL_EVT.UPDATE_EMAIL)
                    EventMgr.emit(HALL_EVT.UPDATE_EMAIL_RED, data.redDot)
                }
            }
        })
    }

    /**打开邮件 */
    async onClickOpen() {
        this.contentNode.active = !this.contentNode.active;
        if (!this.emailData.read) {
            let data = await SendMgr.sendReadEmail({ id: this.emailData.id });
            if (data != null) {
                this.emailData.read = true;
                this.sp_email.spriteFrame = this.spf_email[1];
                EventMgr.emit(HALL_EVT.UPDATE_EMAIL_RED, data.redDot)
            }
        }
    }

    /**领取邮件奖励 */
    async onClickCollect() {
        let data = await SendMgr.sendEmailCollect({ id: this.emailData.id });
        if (data) {
            this.emailData.attachmentState = 3;
            this.node_receive.getComponent(cc.Button).interactable = false;
        }
    }

}
