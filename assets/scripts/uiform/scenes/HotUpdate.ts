import SysConfig from "../../data/SysConfig";
import LangMgr from "../../mgr/LangMgr";
import SoundMgr from "../../mgr/SoundMgr";
import StorageMgr from "../../mgr/StorageMgr";
import { DialogType } from "../../model/DialogOptions";
import { ChannelConfig, WhiteConfig } from "../../model/ServerConfig";
import { Login_GuestCmd, Login_SessionCmd } from "../../net/CmdData";
import SendMgr from "../../net/SendMgr";
import CommonUtil from "../../utils/CommonUtil";
import JsbUitl from "../../utils/JsbUitl";
import UIMgr from "../UIMgr";
import UIScene from "../UIScene";


const { ccclass, property } = cc._decorator;

@ccclass
export default class HotUpdate extends UIScene {

    @property({ displayName: 'project.manifest', type: cc.Asset })
    manifest: cc.Asset = null;

    @property({ displayName: '版本号', type: cc.Label })
    versionLabel: cc.Label = null;

    @property({ displayName: '热更新进度条', type: cc.Node })
    progress: cc.Node = null;

    @property({ displayName: '消息提示', type: cc.Label })
    tipsLabel: cc.Label = null;

    async onLoad() {
        this._initView();
        let needUpdate: boolean = false;
        //优先读取强更配置并检测是否需要强更
        let config = await NetMgr.inst.getServerVersion();
        if (config) {
            config = JSON.parse(config)
            let { device_id, apkVersion } = SysConfig.systemInfo
            /**设备号存在，并且只更新白名单，并且该设备号在白名单，则需要更新 */
            let whiteConfig: WhiteConfig = config.whiteConfig;
            let whiteChannelConfig: ChannelConfig = whiteConfig.config || new ChannelConfig(SysConfig.version);
            let inWhite: boolean = device_id && whiteConfig.users && whiteConfig.users.indexOf(device_id) !== -1
            let whiteChannelSwitchOn: boolean = !!whiteChannelConfig.switch
            //走白名单的设备
            if (whiteChannelSwitchOn && inWhite) {
                const { mode, force, ver } = whiteChannelConfig
                let ret = CommonUtil.versionCompare(mode == 1 ? apkVersion : SysConfig.version, ver);
                //console.log(`检测白名单版本:`, ret)
                if (ret < 0) {
                    let isForce: boolean = !!force;
                    this.selectUpdateMode(mode, isForce, apkVersion, ver, config.packageUrl);
                    needUpdate = true;
                }
            } else {
                //其它正常玩家
                let normalConfig: ChannelConfig = config.commonConfig || new ChannelConfig(SysConfig.version);
                const { mode, force, ver } = normalConfig;
                let switchOn: boolean = !!normalConfig.switch;
                if (switchOn) {
                    let channelMode: number = mode;
                    let isForce: boolean = force == 1;
                    let ret = CommonUtil.versionCompare(channelMode == 1 ? apkVersion : SysConfig.version, ver);
                    //console.log(`检测通用配置版本号`, switchOn, ret)
                    if (ret < 0) {
                        this.selectUpdateMode(channelMode, isForce, apkVersion, ver, config.packageUrl);
                        needUpdate = true;
                    }
                }
            }
        }
        //无更新，则直接进入游戏
        if (!needUpdate) {
            this._enterGame();
        }
    }


    /**
     * 选择更新模式
     * @param mode - 是否整包
     * @param isForce 是否强制更新
     * @param apkVersion 原生端版本号
     * @param configVer 要升级到的版本号
     * @param packageUrl 原生端包的url路径，不包括apk包名
     */
    selectUpdateMode(mode: number, isForce: boolean, apkVersion: string, configVer: string, packageUrl: string) {
        //需要整包更
        if (mode == 1) {
            let msg: string = CommonUtil.format(LangMgr.sentence(isForce ? 'e0014' : 'e0013'), apkVersion, configVer)
            UIMgr.showDialog({
                hAlign: 1,
                word: msg,
                type: isForce ? DialogType.OnlyOkBtn : DialogType.OkCancelBtn,
                okTxt: 'Go',
                cancelTxt: 'Later',
                okCb: () => {
                    let apkUrl: string = packageUrl
                    JsbUitl.installUpdate({ apkUrl, updateTip: LangMgr.sentence('e0018'), isForceUpdate: isForce, apkVersion: configVer })
                },
                cancelCb: () => {
                    this._enterGame();
                }
            });
        } else {
            this.checkHotUpdate(isForce)
        }
    }

    _initView() {
        //this.changeTips(LangMgr.sentence("e0019"))
        this.versionLabel.string = `V ${SysConfig.version}`;
        this.setPercent(0)
    }

    changeTips(tips: string) {
        this.tipsLabel.string = `${tips}`
    }

    setPercent(percent: number) {
        this.progress.children[0].active = percent > 0
        this.progress.getComponent(cc.ProgressBar).progress = percent
    }

    getPercent(): number {
        return this.progress.getComponent(cc.ProgressBar).progress;
    }

    /**更新失败次数 */
    private updateFailTimes: number = 0;

    // 检查热更新
    checkHotUpdate(isForce: boolean = false) {
        let versionInfo: any = { local: '', server: '' }
        let options = new HotOptions();
        options.OnVersionInfo = (data) => {
            let { local, server } = data;
            versionInfo = { local, server }
            this.versionLabel.string = `ver:${local} -> ver:${server}`;
        };
        options.OnUpdateProgress = (event: jsb.EventAssetsManager) => {
            /* let bytes = event.getDownloadedBytes() + '/' + event.getTotalBytes();
            let files = event.getDownloadedFiles() + '/' + event.getTotalFiles(); */

            let filePercent = event.getPercentByFile().toFixed(2);
            /* let bytePercent = event.getPercent().toFixed(2); */
            let msg = event.getMessage();

            //console.log('HOT-UPDAT', '[update]: 进度=' + filePercent);
            this.setPercent(parseFloat(filePercent));
            this.changeTips(LangMgr.sentence('e0002'));
            //console.log('HOT-UPDAT', msg);
        };
        options.OnNeedToUpdate = (data) => {
            // DialogMgr.showDialog({
            //     hAlign: 1,
            //     word: CommonUtil.format(LangMgr.sentence(isForce ? 'e0014' : 'e0013'), versionInfo.local, versionInfo.server),
            //     type: isForce ? DialogType.OnlyOkBtn : DialogType.OkCancelBtn,
            //     cancelTxt: 'Later',
            //     okTxt: 'Update',
            //     okCb: () => {
            //         //console.log('HOT-UPDAT', 'ddd 开始更新...')
            //         // this.loading.active = false
            //         // this.progress.getChildByName('pbg').active = true
            //         // this.progress.active = true
            //         HotUpdate.hotUpdate()
            //     },
            //     cancelCb: () => {
            //         HotUpdate.updateOver()
            //         this._enterGame();
            //     },
            //     closeCb: () => {
            //         HotUpdate.updateOver()
            //         this._enterGame();
            //     }
            // });
            HotUpdateData.hotUpdate()
        };
        options.OnNoNeedToUpdate = () => {
            //console.log('HOT-UPDAT', 'ddd 不需要更新...')
            this._enterGame();
        };
        options.OnUpdateFailed = () => {
            this.changeTips(LangMgr.sentence('e0003'));
            //console.log('HOT-UPDAT', '热更新失败');
            HotUpdateData.updateOver()
            if (this.updateFailTimes == 0) {
                this.updateFailTimes++
                UIMgr.showDialog({
                    word: LangMgr.sentence('e0003'),
                    type: DialogType.OkBtnAndNoCloseBtn,
                    okTxt: 'Try Again',
                    okCb: () => {
                        HotUpdateData.init(this.manifest, options);
                        HotUpdateData.checkUpdate();
                    }
                });
            } else {
                this._enterGame();
            }
        };
        options.OnReadManifestFailed = () => {
            /* this.tipsLabel.string = '无法读取配置';
            //console.log('HOT-UPDAT','读取Manifest失败');
            DialogMgr.showDialog({
                word: '无法读取配置，请检查网络',
                type: DialogType.OkBtnAndNoCloseBtn,
                okCb: ()=>{
                    HotUpdate.checkUpdate()
                }
            }); */
            //console.log('HOT-UPDAT', '找不到热更资源配置文件，不做热更');
            HotUpdateData.updateOver()
            this._enterGame();
        };

        options.OnUpdateSucceed = () => {
            HotUpdateData.updateOver()
            this.changeTips(LangMgr.sentence('e0004'));
            //console.log('HOT-UPDAT', '更新成功');
            this.scheduleOnce(
                () => {
                    SoundMgr.stopMusic();
                    StorageMgr.cocosVersion = versionInfo.server;
                    cc.game.restart();
                }, 0.75
            )
        };
        //console.log('HOT-UPDAT', 'dddd 进入游戏热更新环节');
        this.setPercent(0)
        this.changeTips(LangMgr.sentence('e0005'));
        HotUpdateData.init(this.manifest, options);
        HotUpdateData.checkUpdate();
    }

    _enterGame() {
        if (!StorageMgr.firstStart) {
            StorageMgr.firstStart = 1;
            SendMgr.sendLogin(null, Login_GuestCmd);
        } else {
            SendMgr.sendLogin(null, Login_SessionCmd);
        }
    }

}



class HotOptions {
    /**显示新旧版本号 */
    OnVersionInfo: Function;
    /**检测到需要做更新的回调 */
    OnNeedToUpdate: Function;
    /**检测比对完毕，无需更新的回调 */
    OnNoNeedToUpdate: Function;
    /**更新失败回调 */
    OnUpdateFailed: Function;
    /**读取Manifest失败 */
    OnReadManifestFailed: Function;
    /**更新成功回调 */
    OnUpdateSucceed: Function;
    /**更新进度回调 */
    OnUpdateProgress: Function;

    check() {
        for (let key in this) {
            if (key !== 'check') {
                if (!this[key]) {
                    // LogUtil.log('HOT-UPDATE', `参数HotOptions.${key}未设置！`);
                    return false;
                }
            }
        }
        return true
    }
}

class Hot {
    _assetsMgr: jsb.AssetsManager = null;
    _options: HotOptions = null;
    _state = Hot.State.None;

    static State = {
        None: 0,
        Check: 1,
        Update: 2,
    }

    /**检查更新 */
    checkUpdate() {
        if (!this._assetsMgr) {
            // LogUtil.log('HOT-UPDATE', '请先初始化')
            return;
        }

        if (this._assetsMgr.getState() === jsb.AssetsManager.State.UNINITED) {
            cc.error('未初始化')
            return;
        }
        if (!this._assetsMgr.getLocalManifest().isLoaded()) {
            // LogUtil.log('HOT-UPDATE', '加载本地 manifest 失败 ...');
            return;
        }
        // LogUtil.log('HOT-UPDATE', '检测热更新............')
        this._assetsMgr.setEventCallback(this._hotUpdateCallBack.bind(this));
        this._state = Hot.State.Check;
        // 下载version.manifest，进行版本比对
        this._assetsMgr.checkUpdate();
    }

    /**开始热更新 */
    hotUpdate() {
        if (!this._assetsMgr) {
            // LogUtil.log('HOT-UPDATE', '请先初始化')
            return
        }
        // LogUtil.log('HOT-UPDATE', '开始热更新............')
        this._assetsMgr.setEventCallback(this._hotUpdateCallBack.bind(this));
        this._state = Hot.State.Update;
        this._assetsMgr.update();
    }

    /**热更新回调 */
    _hotUpdateCallBack(event: jsb.EventAssetsManager) {
        let code = event.getEventCode();
        // LogUtil.log('HOT-UPDATE', `hotUpdate Code: ${code}`);
        switch (code) {
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                // LogUtil.log('HOT-UPDATE', "已经和远程版本一致，无须更新");
                this._options.OnNoNeedToUpdate && this._options.OnNoNeedToUpdate(code)
                break;
            case jsb.EventAssetsManager.NEW_VERSION_FOUND:
                // LogUtil.log('HOT-UPDATE', '发现新版本,请更新');
                // LogUtil.log('HOT-UPDATE', '更新文件数量' + event.getTotalFiles())
                // LogUtil.log('HOT-UPDATE', '更新文件大小' + event.getTotalBytes())
                this._options.OnNeedToUpdate && this._options.OnNeedToUpdate(code);
                break;
            case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                // LogUtil.log('HOT-UPDATE', '更新中...')
                if (this._state === Hot.State.Update) {
                    this._options.OnUpdateProgress && this._options.OnUpdateProgress(event);
                } else {
                    // 检查状态下，不回调更新进度
                }
                break;
            case jsb.EventAssetsManager.UPDATE_FINISHED:
                // LogUtil.log('HOT-UPDATE', '更新成功');
                this._onUpdateFinished();
                break;
            case jsb.EventAssetsManager.ASSET_UPDATED:
                // 不予理会的消息事件
                break;
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                // LogUtil.log('HOT-UPDATE', '本地文件丢失 - ERROR_NO_LOCAL_MANIFEST');
                this._onUpdateFailed(code);
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                // LogUtil.log('HOT-UPDATE', 'ERROR_DOWNLOAD_MANIFEST或者ERROR_PARSE_MANIFEST错误');
                this._OnReadManifestFailed(code);
                break;
            case jsb.EventAssetsManager.ERROR_UPDATING:
                // LogUtil.log('HOT-UPDATE', "ERROR_UPDATING 错误 :", event.getAssetId() + ', ' + event.getMessage());
                this._onUpdateFailed(code);
                break;
            case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                // LogUtil.log('HOT-UPDATE', "ERROR_DECOMPRESS错误 :", event.getAssetId() + ', ' + event.getMessage());
                this._onUpdateFailed(code);
                break;
            case jsb.EventAssetsManager.UPDATE_FAILED:
                // LogUtil.log('HOT-UPDATE', 'UPDATE_FAILED...........', code);
                this._onUpdateFailed(code);
                break;
            default:
                this._onUpdateFailed(code);
                break;
        }
    }

    _onUpdateFailed(code) {
        this._assetsMgr.setEventCallback(null)
        this._options.OnUpdateFailed && this._options.OnUpdateFailed(code);
    }

    _OnReadManifestFailed(code) {
        this._assetsMgr.setEventCallback(null)
        this._options.OnReadManifestFailed && this._options.OnReadManifestFailed(code);
    }

    // 更新完成
    _onUpdateFinished() {
        this._assetsMgr.setEventCallback(null)
        let searchPaths = jsb.fileUtils.getSearchPaths();
        // LogUtil.log('HOT-UPDATE', "searchPaths1 : " + JSON.stringify(searchPaths));
        let newPaths = this._assetsMgr.getLocalManifest().getSearchPaths();
        // LogUtil.log('HOT-UPDATE', "[HotUpdate] 搜索路径 newPaths: " + JSON.stringify(newPaths));
        Array.prototype.unshift.apply(searchPaths, newPaths);
        cc.sys.localStorage.setItem('HotUpdateSearchPaths', JSON.stringify(searchPaths));
        // LogUtil.log('HOT-UPDATE', "searchPaths2 : " + JSON.stringify(searchPaths));
        jsb.fileUtils.setSearchPaths(searchPaths);
        this._options.OnUpdateSucceed && this._options.OnUpdateSucceed();
    }

    /* showSearchPath() {
        LogUtil.log('HOT-UPDATE', "========================搜索路径========================");
        let searchPaths = jsb.fileUtils.getSearchPaths();
        for (let i = 0; i < searchPaths.length; i++) {
            LogUtil.log('HOT-UPDATE', "[" + i + "]: " + searchPaths[i]);
        }
        LogUtil.log('HOT-UPDATE', "======================================================");
    } */

    // ------------------------------初始化------------------------------
    init(manifest: cc.Asset, opt: HotOptions) {
        if (!cc.sys.isNative) {
            return;
        }
        if (!opt.check()) {
            return;
        }
        this._options = opt;
        if (this._assetsMgr) {
            return;
        }

        // this.showSearchPath();
        let url = manifest.nativeUrl;

        // LogUtil.log('HOT-UPDATE', 'init manifest.nativeUrl', url)
        if (cc.loader.md5Pipe) {
            url = cc.loader.md5Pipe.transformURL(url)
            // LogUtil.log('HOT-UPDATE', 'init manifest.nativeUrl -> md5 ', url)
        }

        let storagePath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + 'remote-asset');

        // LogUtil.log('HOT-UPDATE', 'init storagePath', storagePath)
        // LogUtil.log('HOT-UPDATE', '当前代码版本为' + SysConfig.Version)
        this._assetsMgr = new jsb.AssetsManager(url, storagePath, (versionA, versionB) => {
            // 比较版本
            // LogUtil.log('HOT-UPDATE', "客户端版本: " + versionA + ', 当前最新版本: ' + versionB);
            this._options.OnVersionInfo({ local: versionA, server: versionB });
            let vA = versionA.split('.');
            let vB = versionB.split('.');
            for (let i = 0; i < vA.length; ++i) {
                let a = parseInt(vA[i]);
                let b = parseInt(vB[i] || '0');
                if (a !== b) {
                    return a - b;
                }
            }
            // todo 需要强更版本

            if (vB.length > vA.length) {
                return -1;
            } else {
                return 0;
            }
        });
        this._assetsMgr.setVerifyCallback((assetsFullPath, asset) => {
            let { compressed, md5, path, size } = asset;

            // LogUtil.log('HOT-UPDATE', path, md5, size)
            if (compressed) {
                return true;
            } else {
                return true;
            }
            //使用jsb.fileUtils.getStringFromFile读取文件内容，计算md5，但是这么比对的md5不相等，后面再去查原因吧
            /* const md5str = MYMD5.hashString(jsb.fileUtils.getStringFromFile(path));
            LogUtil.log(`verifyAssetFile path=${path}, size=${size}, md5=${md5}-${md5str}`);
            //与曾经manifest中的md5做比较
            if (md5str === md5) {
                return true;
            }

            //md5不相同，删除下载文件
            if (jsb.fileUtils.isFileExist(path)) {
                jsb.fileUtils.removeFile(path);
            }
            //返回false，重新下载
            return false; */
        })
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            // 安卓手机设置 最大并发任务数量限制为2
            // this._assetsMgr.setMaxConcurrentTask(10);
        }

        /* let localManifest = this._assetsMgr.getLocalManifest()
        LogUtil.log('HOT-UPDATE', '[HotUpdate] 热更新资源存放路径: ' + storagePath);
        LogUtil.log('HOT-UPDATE', '[HotUpdate] 本地manifest路径: ' + url);
        LogUtil.log('HOT-UPDATE', '[HotUpdate] local packageUrl: ' + localManifest.getPackageUrl());
        LogUtil.log('HOT-UPDATE', '[HotUpdate] project.manifest remote url: ' + localManifest.getManifestFileUrl());
        LogUtil.log('HOT-UPDATE', '[HotUpdate] version.manifest remote url: ' + localManifest.getVersionFileUrl()); */
    }

    /**
     * 更新结束，清除资源对象
     */
    updateOver() {
        this._assetsMgr = null
        this._options = null;
        this._state = Hot.State.None;
    }
}

const HotUpdateData = new Hot();

