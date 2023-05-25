import LangMgr from "../../../mgr/LangMgr";
import SendMgr from "../../../net/SendMgr";
import { DailyBonusEventVO } from "../../../net/proto/hall";
import LongUtil from "../../../utils/LongUtil";
import UIMgr from "../../UIMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TaskItem extends cc.Component {

    /**任务描述 */
    @property(cc.Label)
    lb_cname: cc.Label = null;

    /**任务奖励金额 */
    @property(cc.Label)
    lb_bonus: cc.Label = null;

    /**进度 */
    @property(cc.Label)
    lb_progress: cc.Label = null;

    /**任务完成进度 */
    @property(cc.Sprite)
    sp_progress: cc.Sprite = null;

    /**已领取 */
    @property(cc.Node)
    node_received: cc.Node = null;

    /**可领取 */
    @property(cc.Node)
    node_receive: cc.Node = null;

    private data: DailyBonusEventVO = null;

    private isLoad: boolean = false;

    /**初始化任务UI */
    async init(data: DailyBonusEventVO, index: number) {
        if (!data) {
            this.node.destroy();
            return;
        }
        this.data = data;
        this.lb_cname.string = data.title;
        this.lb_bonus.string = `₹${LongUtil.longToNumber(data.awardAmount)}`;
        this.sp_progress.fillRange = data.processMin / data.processMax;
        this.lb_progress.string = data.processMin + "/" + data.processMax
        if (!this.isLoad) {
            this.isLoad = true;
            let root: cc.Node = cc.find("root", this.node);
            cc.tween(root).delay(index * 0.1)
                .to(0.5, { y: 0, opacity: 255 }, { easing: 'backOut' })
                .call(() => {
                    this.node_received.active = this.data.state == 2;
                    this.node_receive.active = this.data.state == 1;
                })
                .start();
        }
    }

    /**领取任务 */
    async onClickReceive() {
        if (this.data.state == 0) {
            UIMgr.showToast(LangMgr.sentence("e0038"));
        } else if (this.data.state == 1) {
            let result = await SendMgr.sendDailyBonusTaskReceive({ eventId: this.data.id });
            if (result) {
                UIMgr.showToast(LangMgr.sentence("e0040"));
                this.data.state = 2;
                this.node_received.active = this.data.state == 2;
                this.node_receive.active = this.data.state == 1;
                UIMgr.show('prefab/hall/RewardAni', 'RewardAni', LongUtil.longToNumber(this.data.awardAmount));
            }
        } else if (this.data.state == 2) {
            UIMgr.showToast(LangMgr.sentence("e0039"))
        }
    }
}
