import StorageMgr from "../mgr/StorageMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HideNode extends cc.Component {

    protected onLoad(): void {
        this.node.active = !StorageMgr.isGreen;
    }

}
