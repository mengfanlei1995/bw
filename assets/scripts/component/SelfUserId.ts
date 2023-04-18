import UserData from "../data/UserData";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SelfUserId extends cc.Component {
    
    onEnable() {
        this.node.getComponent(cc.Label).string = `UID:${UserData.userInfo.userId}`
    }
}