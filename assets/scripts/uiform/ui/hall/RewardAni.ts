import { HALL_EVT } from "../../../enum/DeskEnum";
import EventMgr from "../../../mgr/EventMgr";
import UIWindow from "../../UIWindow";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RewardAni extends UIWindow {

    @property({ tooltip: 'deposit', type: cc.Label })
    lb_deposit: cc.Label = null;


    public onShow(deposit: number): void {
        this.lb_deposit.string = `${deposit}`;
    }

    onClickClose(e: cc.Event.EventTouch) {
        let targer: cc.Node = e.target as cc.Node;
        targer.getComponent(cc.Button).interactable = false;
        this.hide();
    }

}
