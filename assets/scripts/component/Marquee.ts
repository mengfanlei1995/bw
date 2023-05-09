import MarqueeData from "../data/MarqueeData";
import LangMgr from "../mgr/LangMgr";
import UIFixed from "../uiform/UIFixed";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Marquee extends UIFixed {

    @property(cc.RichText)
    lb_str: cc.RichText = null;

    //默认播放内容
    private defaultStr: string = "";

    private parentName: string = "";

    /**需要移动的距离 */
    private diffX: number = 0;
    /**下次等待时间 */
    private waitTime: number = 0;
    /**是否需要执行跑马灯 */
    private isShow: boolean = false;

    async start() {
        this.defaultStr = LangMgr.sentence("e0068");
        this.parentName = this.node.parent.name;
        this.node.opacity = 0;
        this.checkNext();
    }

    protected update(dt: number): void {
        if (!this.isShow) return;
        let currX: number = this.lb_str.node.x;
        if (currX <= -this.diffX) {
            this.lb_str.string = '';
            this.lb_str.node.x = 350;
            this.isShow = false;
            this.diffX = 0;
            this.scheduleOnce(this.checkNext.bind(this), this.waitTime);
        } else {
            this.lb_str.node.x -= .75;
        }
    }

    checkNext() {
        let type: string = MarqueeData.scene(this.parentName);
        let data = MarqueeData.marqueeData[type];
        let marqueInfo: any = null;
        if (data && data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                if (data[i] && data[i].length > 0) {
                    marqueInfo = data[i].shift();
                    this.waitTime = marqueInfo?.playInterval
                    break;
                }
            }
        }

        let show: boolean = !!marqueInfo;
        this.node.opacity = show ? 255 : 0;

        if (!show) {
            this.scheduleOnce(this.checkNext.bind(this), 7);
        } else {
            this.lb_str.string = marqueInfo?.msg;
            this.scheduleOnce(() => {
                this.diffX = this.lb_str.node.width + this.lb_str.node.parent.width;
                this.isShow = show;
            }, 1)
        }
    }

}
