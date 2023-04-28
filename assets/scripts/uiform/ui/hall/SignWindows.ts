import UserData from "../../../data/UserData";
import UIWindow from "../../UIWindow";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SignWindows extends UIWindow {

    @property({ tooltip: 'vip', type: cc.Label })
    lb_vip: cc.Label = null;

    @property({ tooltip: 'bonus', type: cc.Label })
    lb_bonus: cc.Label = null;

    @property({ tooltip: 'bonusVip', type: cc.Label })
    lb_bonusVip: cc.Label = null;

    @property({ tooltip: 'ratio', type: cc.Label })
    lb_ratio: cc.Label = null;

    @property({ tooltip: 'vipSp', type: cc.Sprite })
    sp_vip: cc.Sprite = null;

    @property({ tooltip: 'vipSpf', type: [cc.SpriteFrame] })
    spf_vip: cc.SpriteFrame[] = [];

    public onShow(params: any): void {
        if (!params) return;
        let { normalAmount, vipAmount, vipRatio } = params;
        this.lb_bonus.string = `${normalAmount / 100}`;
        this.lb_bonusVip.string = `${vipAmount / 100}`;
        this.lb_ratio.string = `${vipRatio * 100}%`;
        this.lb_vip.string = `V${UserData.userInfo.vipLevel}`;
        let index = 0;
        if (UserData.userInfo.vipLevel >= this.spf_vip.length) index = this.spf_vip.length - 1;
        else index = UserData.userInfo.vipLevel;
        this.sp_vip.spriteFrame = this.spf_vip[index];
    }

    onClickClose() {
        this.hide();
    }

}
