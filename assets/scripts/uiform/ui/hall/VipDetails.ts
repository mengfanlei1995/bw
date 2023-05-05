import UIWindow from "../../UIWindow";

const { ccclass, property } = cc._decorator;

@ccclass
export default class VipDetails extends UIWindow {

    @property({ tooltip: '子节点', type: cc.Node })
    item: cc.Node = null;

    public onShow(data: any[]): void {
        if (data && data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                let node: cc.Node = i > 0 ? cc.instantiate(this.item) : this.item;
                let index: number = -1;
                node.children.forEach(child => {
                    let label: cc.Label = child.children[1].getComponent(cc.Label);
                    label.string = index == -1 ? `VIP ${data[i].levelId}` : `${data[i].privilegeList[index].tableContent}`;
                    index++;
                })
                node.parent = this.item.parent;
            }
        }
    }

    onClickClose() {
        this.hide();
    }

}
