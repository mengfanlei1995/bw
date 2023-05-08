import UIFixed from "../../UIFixed";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Loading extends UIFixed {

    protected start(): void {
        this.node.zIndex = 999;
        this.scheduleOnce(() => {
            this.node.opacity = 255;
        }, 1)
    }

}
