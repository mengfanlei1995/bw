import UIScreen from "../../UIScreen";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Loading extends UIScreen {

    protected start(): void {
        this.scheduleOnce(() => {
            this.node.opacity = 255;
        }, 1)
    }

}
