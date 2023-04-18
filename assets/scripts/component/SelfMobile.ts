import UserData from "../data/UserData";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SelfMobile extends cc.Component {

    onEnable() {
        this.node.getComponent(cc.Label).string = `${UserData.userInfo.phone}`
    }
}