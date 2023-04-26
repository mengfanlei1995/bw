import { HALL_EVT } from "../../enum/DeskEnum";
import EventMgr from "../../mgr/EventMgr";
import UIMgr from "../UIMgr";
import UIScene from "../UIScene";


const { ccclass, property } = cc._decorator;

@ccclass
export default class Hall extends UIScene {

    private curIndex: number = 0;

   

    start() {
        UIMgr.show('prefab/hall/Home', 'Home');
        UIMgr.show('prefab/hall/Menu', 'Menu');
    }

}
