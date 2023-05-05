import CommonUtil from "../../../utils/CommonUtil";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MoneyRecordItem extends cc.Component {

    @property(cc.Label)
    lb_status: cc.Label = null;

    @property(cc.Label)
    lb_amount: cc.Label = null;

    @property(cc.Label)
    lb_time: cc.Label = null;

    @property(cc.Label)
    lb_orderId: cc.Label = null;

    @property(cc.Label)
    lb_tips: cc.Label = null;

    private typeText = [["All", "Progress", "Completed", "Failed"], ["All", "Review", "Process", "Rejected", "Refunded", "Completed"]];
    private color: cc.Color[][] = [[cc.color(255, 255, 255), cc.color(45, 139, 255), cc.color(0, 198, 23), cc.color(255, 67, 3)], [cc.color(255, 255, 255), cc.color(255, 255, 255), cc.color(45, 139, 255), cc.color(255, 1, 1), cc.color(255, 67, 3), cc.color(0, 198, 23)]];

    init(type, info) {
        this.lb_status.string = this.typeText[type][info.state];
        this.lb_status.node.color = this.color[type][info.state];
        this.lb_amount.string = `₹${info.get}`
        this.lb_time.string = CommonUtil.getDate(info.time);
        this.lb_orderId.string = info.id;
        this.lb_tips.string = info.remark;
        this.lb_tips.node.parent.active = !!info.remark;
    }

}
