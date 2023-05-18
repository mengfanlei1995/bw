import { HALL_EVT } from "../../enum/DeskEnum";
import EventMgr from "../../mgr/EventMgr";
import SoundMgr from "../../mgr/SoundMgr";
import UIMgr from "../UIMgr";
import UIScene from "../UIScene";


const { ccclass, property } = cc._decorator;

@ccclass
export default class Hall extends UIScene {

    private curIndex: number = 0;

    protected onEnable(): void {
        SoundMgr.resumeOrPauseMusic(true);
        SoundMgr.playMusic();
    }

    protected onDisable(): void {
        SoundMgr.resumeOrPauseMusic(false);
    }

    start() {
        UIMgr.show('prefab/hall/Home', 'Home');
        UIMgr.show('prefab/hall/Menu', 'Menu');
    }

}
