import SysConfig from "../data/SysConfig";
import UserData from "../data/UserData";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HideNode extends cc.Component {

    protected onLoad(): void {
        this.node.active = SysConfig.isGreen;
    }

}
