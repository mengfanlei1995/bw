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

    protected numberToLong(value: number): LongType {
        return LongUtil.numberToLong(value);
    }

    private optData = {
        betCoins: this.numberToLong(0),
        //下注区域
        betId: 0,
        //游戏局数
        gameNum: 0,
        //游戏ID
        gameType: 0,
        //操作类型 3 进入房间 4退出房间 18下注
        optType: 4,
        //房间id
        roomId: "",
        // 1
        roomLevel: 1,
        // 1
        roomType: 1,
        //userid
        userId: StorageMgr.userId
    }

    public onShow(data: any): void {
        this.optData.gameType = data?.gameId;
        this.optData.roomId = data?.roomId;
        this.gameCmd = data.gameCmd;
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
        if (this.optData.gameType == +SysConfig.GameIDConfig.TeenPattiWar) {
            bundleName = 'TeenPattiWar';
            url = 'prefab/TPRules';
            name = 'TPRules';
        }
        UIBundleMgr.show(bundleName, url, name, this.optData.gameType);
    }

    private onTransactionsClick(e: cc.Event.EventTouch) {
        // FixedMgr.open(UIConfig.GameRecord.prefab, this.optData.gameType);
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
        SendMgr.sendExitRoom({ roomId: this.optData.roomId }, this.gameCmd);
        // this.hide();
        UIMgr.goHall();
    }

}
