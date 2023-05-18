import SysConfig from "../../data/SysConfig";
import { APPS_FLYER } from "../../enum/DeskEnum";
import { SocketEvent } from "../../enum/SocketEnum";
import EventMgr from "../../mgr/EventMgr";
import LangMgr from "../../mgr/LangMgr";
import SoundMgr from "../../mgr/SoundMgr";
import StorageMgr from "../../mgr/StorageMgr";
import { DialogType } from "../../model/DialogOptions";
import { Login_SessionCmd } from "../../net/CmdData";
import NetMgr from "../../net/NetMgr";
import SendMgr from "../../net/SendMgr";
import SocketMgr from "../../net/SocketMgr";
import { BundleChannelVO } from "../../net/proto/hall";
import SocketClient from "../../net/ws/SocketClient";
import CommonUtil from "../../utils/CommonUtil";
import JsbUitl from "../../utils/JsbUitl";
import LogUtil from "../../utils/LogUtil";
import LongUtil from "../../utils/LongUtil";
import UIMgr from "../UIMgr";
import UIScene from "../UIScene";


const { ccclass, property } = cc._decorator;

@ccclass
export default class Main extends UIScene {

    @property({ displayName: '进度条', type: cc.Node })
    progress: cc.Node = null;

    async start() {
        this.mockProgress();
        SoundMgr.init();
        LangMgr.init();
        JsbUitl.initInfo();
        StorageMgr.initSetting();
        StorageMgr.refreshCrossDayData();
        EventMgr.on(SocketEvent.WS_CONNECTED, this.wsConnected, this);
        EventMgr.on(APPS_FLYER.SDK_INITED, this.afCallBack, this);
        SocketMgr.connect();
    }

    //防止第一次启动拿AF数据比较慢 等一下af数据
    private afInitd: boolean = cc.sys.isBrowser || StorageMgr.firstStart ? true : false;

    afCallBack() {
        this.afInitd = true;
    }

    getIpAddress() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.ipify.org/?format=json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                const ip = response.ip;
                cc.log(ip);
            }
        };
        xhr.send();
    }

    async getSystemInfo(): Promise<boolean> {
        let result: boolean = true;
        let config: BundleChannelVO = await SendMgr.sendSystemInfo({ channel: SysConfig.cid });
        if (config) {
            let ret = CommonUtil.versionCompare(SysConfig.version, config.appVersion);
            if (ret < 0) {
                result = false;
                let isForce = CommonUtil.versionCompare(SysConfig.version, config.forceVersion);
                UIMgr.showDialog({
                    word: LangMgr.sentence('e0346'),
                    type: isForce < 0 ? DialogType.OkBtnAndNoCloseBtn : DialogType.OkCancelBtn,
                    okCb: () => {
                        // JsbUitl.goStore();
                        cc.sys.openURL(config.downloadUrl);
                    }
                })
            }
            SysConfig.policyUrl = config.policyUrl;
            SysConfig.tcUrl = config.tcUrl;
            SysConfig.telegram = config.telegram;
        }
        return result;
    }

    /**模拟进度条，对下个场景预加载时使用，避免进去时，下个场景出现卡顿现象 */
    private mockProgress() {
        let currPercent: number = this.getPercent();
        if (currPercent < .9)
            this.scheduleOnce(
                () => {
                    currPercent += 0.016;
                    this.setPercent(currPercent);
                    currPercent < .9 && this.mockProgress();
                },
                0.015
            );
    }

    private setPercent(percent: number) {
        this.progress.children[0].active = percent > 0
        if (percent < this.getPercent()) return;
        if (percent > 1) percent = 1;
        this.progress.getComponent(cc.ProgressBar).progress = percent;
    }

    private getPercent(): number {
        return this.progress.getComponent(cc.ProgressBar).progress;
    }

    onDestroy(): void {
        EventMgr.off(SocketEvent.WS_CONNECTED, this.wsConnected, this);
        EventMgr.off(APPS_FLYER.SDK_INITED, this.afCallBack, this);
    }

    private SystemInfo = false;
    private SystemInfoInitd: boolean = false;
    async wsConnected() {
        this.setPercent(.95);
        let result = await this.getSystemInfo();
        this.SystemInfo = result;
        this.SystemInfoInitd = true;
    }

    private isInitLogin: boolean = false;

    protected update(dt: number): void {
        if (!this.SystemInfoInitd || !this.afInitd || this.isInitLogin) return;
        this.setPercent(1);
        this.isInitLogin = true;
        let result = this.SystemInfo;
        if (result) {
            if (!StorageMgr.firstStart)
                StorageMgr.firstStart = 1;
            if (StorageMgr.sessionId) {
                SendMgr.sendLogin({}, Login_SessionCmd);
            } else {
                UIMgr.goLogin();
            }
        }
    }

}
