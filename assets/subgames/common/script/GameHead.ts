import SysConfig from "../../../scripts/data/SysConfig";
import SoundMgr from "../../../scripts/mgr/SoundMgr";
import StorageMgr from "../../../scripts/mgr/StorageMgr";
import SendMgr from "../../../scripts/net/SendMgr";
import UIBundleMgr from "../../../scripts/uiform/UIBundleMgr";
import UIMgr from "../../../scripts/uiform/UIMgr";
import UIScreen from "../../../scripts/uiform/UIScreen";
import LongUtil, { LongType } from "../../../scripts/utils/LongUtil";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameHead extends UIScreen {

    @property({ tooltip: "声音开", type: cc.SpriteFrame })
    soundOpenFrame: cc.SpriteFrame = null
    @property({ tooltip: "声音关", type: cc.SpriteFrame })
    soundCloseFrame: cc.SpriteFrame = null
    @property({ tooltip: "声音开", type: cc.Node })
    btnSound: cc.Node = null

    private gameCmd: number = 0;
    private roomId: string = '';
    private gameType: number = 0;
    private gameName: string = '';

    protected numberToLong(value: number): LongType {
        return LongUtil.numberToLong(value);
    }

    public onShow(data: any): void {
        this.gameType = data?.gameId;
        this.roomId = data?.roomId;
        this.gameCmd = data.gameCmd;
        this.gameName = data.gameName;
    }

    start(): void {
        this.soundSpriteFrameChange = StorageMgr.effectPercent;
        SoundMgr.resumeOrPauseMusic(false);
    }

    onDestroy(): void {
        SoundMgr.resumeOrPauseMusic(true);
    }

    private onHelpClick(e: cc.Event.EventTouch) {
        let bundleName: string = 'common';
        let url: string = 'prefab/GameRules';
        let name: string = 'GameRules';
        if (this.gameType == +SysConfig.GameIDConfig.TeenPattiWar) {
            bundleName = 'TeenPattiWar';
            url = 'prefab/TPRules';
            name = 'TPRules';
        }
        UIBundleMgr.show(bundleName, url, name, this.gameType);
    }

    private onTransactionsClick(e: cc.Event.EventTouch) {
        UIBundleMgr.show('common', 'prefab/GameRecord', 'GameRecord', { gameCmd: this.gameCmd, gameName: this.gameName });
    }

    private onSoundClick(e: cc.Event.EventTouch) {
        let isOpenSound: boolean = StorageMgr.effectPercent > 0
        this.soundSpriteFrameChange = isOpenSound ? 0 : 1
        StorageMgr.effectPercent = isOpenSound ? 0 : 1
    }

    private set soundSpriteFrameChange(open: number) {
        this.btnSound.getComponent(cc.Sprite).spriteFrame = open ? this.soundOpenFrame : this.soundCloseFrame;
    }

    private async onBackClick(e: cc.Event.EventTouch) {
        SendMgr.sendExitRoom({ roomId: this.roomId }, this.gameCmd);
        // this.hide();
        UIMgr.goHall();
    }

}
