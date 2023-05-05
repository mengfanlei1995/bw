import UIWindow from "../../UIWindow";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RankRules extends UIWindow {

    @property({ tooltip: 'rank', type: [cc.Label] })
    lbRank: cc.Label[] = [];

    @property({ tooltip: 'rate', type: [cc.Label] })
    lbRate: cc.Label[] = [];

    public onShow(info: rankInfo[]): void {
        if (info && cc.isValid(this.node)) {
            for (let i = 0; i < this.lbRank.length; i++) {
                if (info[i]) {
                    this.lbRank[i].string = info[i].rank;
                    this.lbRate[i].string = `${info[i].rate}%`;
                }
            }
        }
    }

    onClickClose() {
        this.hide();
    }

}

interface rankInfo {
    rank: string;
    rate: string;
}