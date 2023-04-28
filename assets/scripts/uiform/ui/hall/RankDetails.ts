
import { ReferInvitationNowVO } from "../../../net/proto/hall";
import UIWindow from "../../UIWindow";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RankDetails extends UIWindow {

    @property({ tooltip: '子节点', type: cc.Node })
    item: cc.Node = null;

    @property({ tooltip: 'top', type: cc.Label })
    lbTop: cc.Label = null;

    @property({ tooltip: 'bottom', type: cc.RichText })
    lbBottom: cc.RichText = null;

    @property({ tooltip: '表格', type: cc.Node })
    table: cc.Node = null;

    public onShow(data: ReferInvitationNowVO): void {
        if (!data) return;
        let { rechargeRateResponseList, top, bottom } = data;
        this.lbTop.string = top;
        this.lbBottom.string = bottom;
        if (rechargeRateResponseList && rechargeRateResponseList.length > 0) {
            for (let i = 0; i < rechargeRateResponseList.length; i++) {
                let node: cc.Node = i > 0 ? cc.instantiate(this.item) : this.item;
                node.children.forEach((child, index) => {
                    let label: cc.Label = child.children[1].getComponent(cc.Label);
                    if (index == 0) {
                        label.string = `${i + 1}`
                    } else if (index == 1) {
                        label.string = `${rechargeRateResponseList[i].min / 100}<=C<${rechargeRateResponseList[i].max / 100}`;
                    } else {
                        label.string = `${rechargeRateResponseList[i].rate}%`;
                    }
                })
                node.parent = this.item.parent;
            }
        } else {
            this.table.active = false;
        }
    }

    onClickClose() {
        this.hide();
    }

}
