import UIMgr from "../../UIMgr";
import UIWindow from "../../UIWindow";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Description extends UIWindow {

    @property({ tooltip: '子节点', type: cc.Node })
    item: cc.Node = null;

    //显示vip等级对应提现次数关系
    public onShow(data: any): void {
        if (data) {
            for (var key in data) {
                let node: cc.Node = cc.instantiate(this.item);
                node.active = true;
                let vipLevel: cc.Label = node.getChildByName("small").children[0].getComponent(cc.Label);
                vipLevel.string = `VIP ${key}`;
                let vipTimes: cc.Label = node.getChildByName("big").children[0].getComponent(cc.Label);
                vipTimes.string = `${data[key]}`;
                node.parent = this.item.parent;
            }
        }
    }

    onClickClose() {
        this.hide();
    }

    onClickDetails() {
        this.hide();
        UIMgr.show('prefab/hall/VipPrivileges', 'VipPrivileges');
    }

}
