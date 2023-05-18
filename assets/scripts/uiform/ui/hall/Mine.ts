import SysConfig from "../../../data/SysConfig";
import UserData from "../../../data/UserData";
import SoundMgr from "../../../mgr/SoundMgr";
import StorageMgr from "../../../mgr/StorageMgr";
import SocketMgr from "../../../net/SocketMgr";
import JsbUitl from "../../../utils/JsbUitl";
import UIMgr from "../../UIMgr";
import UIScreen from "../../UIScreen";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Mine extends UIScreen {

    @property({ tooltip: '声音关', type: cc.Node })
    closeSoundSprite: cc.Node = null;
    @property({ tooltip: '声音开', type: cc.Node })
    openSoundSprite: cc.Node = null;

    @property({ tooltip: '音乐关', type: cc.Node })
    closeMusicSprite: cc.Node = null;
    @property({ tooltip: '音乐开', type: cc.Node })
    openMusicSprite: cc.Node = null;

    @property({ tooltip: '删除数据key', type: cc.Label })
    keyLabel: cc.Label = null;

    @property({ tooltip: '版本', type: cc.Label })
    versionLabel: cc.Label = null;

    private isOpenSound: boolean = true;
    private isOpenMusic: boolean = true;

    protected start(): void {
        this.node.zIndex = 1;
        this.versionLabel.string = `ver:${SysConfig.isTest ? 'T-' : ''}${SysConfig.version}`;
        this.isOpenSound = StorageMgr.effectPercent == 1;
        this.openSoundSprite.active = this.isOpenSound;
        this.closeSoundSprite.active = !this.isOpenSound;
        this.isOpenMusic = StorageMgr.bgmPercent == 1;
        this.openMusicSprite.active = this.isOpenMusic;
        this.closeMusicSprite.active = !this.isOpenMusic;
        let removeKey = UserData.userInfo.removeKey;
        let ketStrStart: string = removeKey.substring(0, 4);
        let ketStrEnd: string = removeKey.substring(removeKey.length - 4);
        this.keyLabel.string = `Key:${ketStrStart}****${ketStrEnd}`;
    }

    onClickCopyKey() {
        JsbUitl.ClipBoard(UserData.userInfo.removeKey);

    }

    onClickBack() {
        this.hide();
    }

    onSoundClick(e: cc.Event.EventTouch) {
        this.isOpenSound = !this.isOpenSound;
        this.openSoundSprite.active = this.isOpenSound;
        this.closeSoundSprite.active = !this.isOpenSound;
        SoundMgr.setEffectVolume(this.isOpenSound ? 1 : 0);
    }

    onMusicClick(e: cc.Event.EventTouch) {
        this.isOpenMusic = !this.isOpenMusic;
        this.openMusicSprite.active = this.isOpenMusic;
        this.closeMusicSprite.active = !this.isOpenMusic;
        SoundMgr.setMusicVolume(this.isOpenMusic ? 1 : 0);
    }

    onSettingsClick(e: cc.Event.EventTouch) {
        UIMgr.show('prefab/hall/Profile', 'Profile');
    }

    onAddCashClick(e: cc.Event.EventTouch) {
        UIMgr.show('prefab/hall/AddCash', 'AddCash', { vipInto: false, vipLevel: 0 });
    }

    onWithdrawClick(e: cc.Event.EventTouch) {
        UIMgr.show('prefab/hall/Withdraw', 'Withdraw');
    }

    onTransactionsClick(e: cc.Event.EventTouch) {
        UIMgr.show('prefab/hall/Transactions', 'Transactions');
    }

    onSupportClick(e: cc.Event.EventTouch) {
        UIMgr.show('prefab/hall/Support', 'Support');
    }

    onLanguageClick(e: cc.Event.EventTouch) {
    }

    async onLogoutClick(e: cc.Event.EventTouch) {
        UIMgr.goLogin(() => {
            StorageMgr.sessionId = '';
            StorageMgr.userId = '';
            UserData.userInfo = {};
            SocketMgr.close();
        });
    }

}
