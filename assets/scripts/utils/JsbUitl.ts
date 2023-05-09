import SysConfig, { AppSysInfo, afLaunchData } from "../data/SysConfig";
import UserData from "../data/UserData";
import { APPS_FLYER, HALL_EVT, REPORT_EVT } from "../enum/DeskEnum";
import { FirebaseEvent } from "../enum/FirebaseEnum";
import { SYS_CONST } from "../enum/SysEventEnum";
import EventMgr from "../mgr/EventMgr";
import LangMgr from "../mgr/LangMgr";
import StorageMgr from "../mgr/StorageMgr";
import { DialogType } from "../model/DialogOptions";
import { Login_SessionCmd } from "../net/CmdData";
import SendMgr from "../net/SendMgr";
import SocketMgr from "../net/SocketMgr";
import UIMgr from "../uiform/UIMgr";
import CommonUtil from "./CommonUtil";
import ListenerMgr from "./ListenerMgr";
import LogUtil from "./LogUtil";


const clazz: string = cc.sys.os == cc.sys.OS_ANDROID ? 'com.bw.game.bridge/JsbBridge' : 'JsbBridge';

const callBackEnum = cc.Enum({
    /**切后台 */
    onHide: 'appTurnIntoBackGround',
    /**切回APP */
    onShow: 'appTurnIntoForeground',
    /**获取GPS授权成功后的回调 */
    locationPermissionSuccess: 'locationPermissionSuccess',
    /**获取GPS授权失败 */
    locationPermissionFail: 'locationPermissionFail',
    /**获取af的启动数据成功 */
    appsflyerLaunchSuccess: 'appsflyerLaunchSuccess',
    /**af启动数据获取失败 */
    appsflyerLaunchFail: 'appsflyerLaunchFail',
    /**震动 */
    vibrate: 'vibrate',
    /**获取手机系统信息 */
    getSystemInfoSync: 'getSystemInfoSync',
    /**拉起webview */
    openWebView: 'openWebView',
    /**橫豎屏操作 */
    setOrientation: 'setOrientation',
    ClipBoard: 'ClipBoard',
    recordIncome: 'recordIncome',
    getAFData: 'getAFData',
    afInitFail: 'afInitFail',
    checkGPSContacts: 'checkGPSContacts',
    /**上报登陆数据 */
    reportLogin: "reportLogin",
    /**拉起设置 */
    pullUpSet: "pullUpSet",
    /**强更 */
    installUpdate: 'installUpdate',
    /**原生端场景上报 */
    nativeSceneReport: 'nativeSceneReport',
    /**原生端点击上报 */
    nativeClickReport: 'nativeClickReport',
    /**拉起whatsApp聊天 */
    chatInWhatsApp: 'chatInWhatsApp',
    /**拉起telegram聊天 */
    chatInTelegram: 'chatInTelegram',
    /**分享到facebook、whatsApp等等 */
    shareLink: 'shareLink',
    loginFB: 'loginFB',
    faceBookLogined: 'faceBookLogined',
    faceBookLoginSuccess: 'faceBookLoginSuccess',
    faceBookLoginCancel: 'faceBookLoginCancel',
    faceBookLoginFail: 'faceBookLoginFail',
    /**facebook上报事件 */
    postFacebookEvent: "postFacebookEvent",
    /**facebook支付上报 */
    postFacebookPurchase: "postFacebookPurchase",
    /**firebase上报事件 */
    postFirebaseEvent: "postFirebaseEvent",
    /**setUserId */
    setFirebaseUserId: "setFirebaseUserId",
    /**设置用户属性 */
    setFirebaseUserProperty: 'setFirebaseUserProperty',
    /**返回 */
    onKeyDownEvent: 'onKeyDownEvent',
    /**af上报事件 */
    postAfEvent: "postAfEvent",
    /**去google商店 */
    goStore: "goStore"
})

/**
 * jsb call调用的封装
 * @param func ＪＮＩ方法名　及　ａｐｐ回调ｊｓ方法名，两端统一，维护简单
 * @param sig 
 * @param params
 */
function callMethod(func: string = '', sig: string = '', params: any = null) {
    let _jsbCall = cc.sys.isNative ? jsb.reflection.callStaticMethod : null
    let ret = '';
    if (_jsbCall) {
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            ret = params ? _jsbCall(clazz, func, sig, typeof params == "string" ? params : JSON.stringify(params)) : _jsbCall(clazz, func, sig);
        } else if (cc.sys.os == cc.sys.OS_IOS) {
            ret = _jsbCall(clazz, func + ':', JSON.stringify(params));
        }
    }
    return ret;
}

class JsbUitl {
    public jsbInited: boolean = false
    /**初始化信息 */
    public initInfo(): void {
        if (this.jsbInited) return;
        this.jsbInited = true;
        if (!StorageMgr.UUID) {
            StorageMgr.UUID = CommonUtil.randomStr(32).toUpperCase();
        }
        if (cc.sys.isNative) {
            let sysInfo: AppSysInfo = this.getSystemInfoSync();
            let { device_id } = sysInfo;
            SysConfig.systemInfo = sysInfo;
            SysConfig.systemInfo.timezone = SysConfig.pkgTimeZone;
            StorageMgr.cocosVersion = SysConfig.version;
            if (StorageMgr.devId != device_id) StorageMgr.devId = device_id;
            EventMgr.emit(REPORT_EVT.INSTALL);
            // this.postFirebaseEvent({
            //     eventName: FirebaseEvent.APP_OPEN,
            //     params: { deviceId: SysConfig.systemInfo.device_id, userId: StorageMgr.userId }
            // })
            // this.postFacebookEvent({
            //     eventName: FirebaseEvent.APP_OPEN,
            //     params: { deviceId: SysConfig.systemInfo.device_id, userId: StorageMgr.userId }
            // })
            ListenerMgr.create(() => {
                cc.game.emit(SYS_CONST.ON_HIDE)
            }, callBackEnum.onHide)

            ListenerMgr.create(() => {
                cc.game.emit(SYS_CONST.ON_SHOW)
            }, callBackEnum.onShow)

            ListenerMgr.create(() => {
                // EventMgr.emit(SYS_CONST.BACK);
            }, callBackEnum.onKeyDownEvent)

            ListenerMgr.create(
                async (loginInfo: string) => {
                    // LogUtil.log(`facebook已登陆：`, JSON.stringify(loginInfo))
                    let params: any = JSON.stringify(loginInfo);
                    SendMgr.sendLogin({ fbId: params.token });
                },
                callBackEnum.faceBookLogined
            )

            ListenerMgr.create(
                (failInfo: string) => {
                    LogUtil.log(`facebook登陆失败：`, JSON.stringify(failInfo))
                },
                callBackEnum.faceBookLoginFail
            )

            ListenerMgr.create(
                () => {
                    LogUtil.log(`facebook登陆取消授权：`)
                },
                callBackEnum.faceBookLoginCancel
            )

            ListenerMgr.create(
                async (loginInfo: string) => {
                    // LogUtil.log(`facebook登陆成功：`, JSON.stringify(loginInfo))
                    let params: any = JSON.stringify(loginInfo);
                    SendMgr.sendLogin({ fbId: params.token });
                },
                callBackEnum.faceBookLoginSuccess
            )

            ListenerMgr.create(
                location => {
                    SysConfig.systemInfo.location = JSON.stringify(location)
                    EventMgr.emit(HALL_EVT.CHECKGPS)
                },
                callBackEnum.locationPermissionSuccess
            )

            ListenerMgr.create(
                () => {
                    UIMgr.showToast(LangMgr.sentence('e0010'))
                    EventMgr.emit(HALL_EVT.GET_GPS_FAIL)
                },
                callBackEnum.locationPermissionFail
            )

            ListenerMgr.create(
                (launch: afLaunchData) => {
                    let { ic, ict, media_source, afid } = launch
                    if (!StorageMgr.invateCode)
                        StorageMgr.invateCode = ic || ''
                    if (!StorageMgr.invateType)
                        StorageMgr.invateType = ict || ''
                    if (!StorageMgr.afId)
                        StorageMgr.afId = afid || ''
                    if (StorageMgr.mediaId == 'organic')
                        StorageMgr.mediaId = media_source || ''
                    StorageMgr.afLaunch = JSON.stringify(launch)
                    EventMgr.emit(APPS_FLYER.SDK_INITED, media_source || '')
                },
                callBackEnum.appsflyerLaunchSuccess
            )

            ListenerMgr.create(
                (params: any) => {
                    EventMgr.emit(REPORT_EVT.SCENE, params);
                },
                callBackEnum.nativeSceneReport
            )

            // ListenerMgr.create(
            //     (params: AppClickParams) => {
            //         EventMgr.emit(REPORT_EVT.CLICK, params);
            //     },
            //     callBackEnum.nativeClickReport
            // )

            ListenerMgr.create(
                () => {
                    //console.log(`SDK_INITED................................`)
                    //看是否需要上报获取af数据失败的情况
                    EventMgr.emit(APPS_FLYER.SDK_INITED, "")
                },
                callBackEnum.appsflyerLaunchFail
            )

            ListenerMgr.create(
                (type: string) => {
                    EventMgr.emit(REPORT_EVT.SCENE, {
                        page_name: 'gps_set_pop'
                    });
                    UIMgr.showDialog({
                        word: LangMgr.sentence('e0012'),
                        type: DialogType.OkCancelBtn,
                        hideCb: (witch) => {
                            EventMgr.emit(HALL_EVT.GET_GPS_FAIL);
                            if (witch == 0) {
                                EventMgr.emit(REPORT_EVT.CLICK, {
                                    element_id: "gps_00001",
                                    element_name: "拒绝GPS拉起设置弹窗yes按钮",
                                    element_type: "button",
                                    element_position: '',
                                    element_content: '',
                                });
                                this.pullUpSet(type);
                            } else {
                                EventMgr.emit(REPORT_EVT.CLICK, {
                                    element_id: "gps_00002",
                                    element_name: "拒绝GPS拉起设置弹窗no按钮",
                                    element_type: "button",
                                    element_position: '',
                                    element_content: '',
                                });
                            }
                        }
                    })
                },
                callBackEnum.checkGPSContacts
            )

            cc.game.on(SYS_CONST.ON_HIDE, () => {
                SysConfig.isHide = true
                EventMgr.emit(REPORT_EVT.BACKGROUND);
            });
            cc.game.on(SYS_CONST.ON_SHOW, async () => {
                await SocketMgr.clearHistoryMsgPool()
                EventMgr.emit(HALL_EVT.DESK_RELOAD)
                EventMgr.emit(REPORT_EVT.STARTONLINE);
                SendMgr.sendGetUserInfo();
            });
        } else {
            try {
                if (!StorageMgr.devId) {
                    StorageMgr.devId = CommonUtil.randomStr(32).toUpperCase()
                }
                let params = CommonUtil.paramsToJson();
                SysConfig.systemInfo = Object.assign({
                    channel: `h5_${params.cid || 'official'}`,
                    device_id: StorageMgr.devId,
                    os_name: navigator.platform,
                    os_language: navigator.language,
                    app_package_name: SysConfig.pkgName
                });

                cc.game.on(cc.game.EVENT_HIDE, () => {
                    SysConfig.isHide = true
                    EventMgr.emit(REPORT_EVT.BACKGROUND);
                });
                cc.game.on(cc.game.EVENT_SHOW, async () => {
                    await SocketMgr.clearHistoryMsgPool()
                    EventMgr.emit(HALL_EVT.DESK_RELOAD);
                    EventMgr.emit(REPORT_EVT.STARTONLINE);
                    SendMgr.sendGetUserInfo();
                });
            } catch (e) { }
        }
    }

    /**
     * 短震动
     */
    public vibrateShort() {
        callMethod(callBackEnum.vibrate, '(Ljava/lang/String;)V', { time: 14 })
    }

    /**
     * 长震动
     */
    public vibrateLong() {
        callMethod(callBackEnum.vibrate, '(Ljava/lang/String;)V', { time: 140 })
    }

    /**
     * 获取系统信息
     * @param success 
     */
    public getSystemInfoSync(): AppSysInfo {
        let result = callMethod(callBackEnum.getSystemInfoSync, "()Ljava/lang/String;");
        let json = CommonUtil.isJsonString(result) ? JSON.parse(result) : {};
        let res = json.data || {};
        /* for (let key in res) {
            res[key] = encodeURIComponent(res[key])
        } */
        return res;
    }

    public garbageCollect() {
        cc.sys.garbageCollect()
    }

    /**
     *打开webview
     */
    public openWebView(url: string = "") {
        callMethod(callBackEnum.openWebView, '(Ljava/lang/String;)V', { url })
    }

    public setOrientation(params: any = null) {
        try {
            callMethod(callBackEnum.setOrientation, '(Ljava/lang/String;)V', { ...params })
            let frameSize = cc.view.getFrameSize();
            //console.log('frameSize1', frameSize.height, frameSize.width)
            let view = cc.view.getVisibleSize()
            if (params.mode == 'L') {
                cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
                if (frameSize.height > frameSize.width) {
                    cc.view.setFrameSize(frameSize.height, frameSize.width);
                    cc.Canvas.instance.designResolution = cc.size(view.height, view.width);
                }
            } else {
                cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT);
                if (frameSize.width > frameSize.height) {
                    cc.view.setFrameSize(frameSize.height, frameSize.width);
                }
                cc.Canvas.instance.designResolution = cc.size(750, 1334);
            }
            if (CC_JSB) {
                /* let evt = new cc.Event.EventCustom('resize', true)
                window.dispatchEvent(evt); */
            } else {
                //pc端时，h5页面需要跟着做适配，所以这里需要做通知
                if (!cc.sys.isMobile) {
                    window['ORIENTATION'] = params.mode;
                    window.dispatchEvent(new Event('resize', { bubbles: true }));
                }
            }
        } catch (e) {

        }
    }

    /**
     * 复制
     */
    public ClipBoard(txt: string) {
        callMethod(callBackEnum.ClipBoard, '(Ljava/lang/String;)V', txt)
    }

    /**
     * 上报充值、提现数据到af数据平台 income - 充值金额   withdraw - 提现金额  goodsid和goodsname分别为商品id,商品名称，自定义算了
     * @param info = {income/withdraw, goodsid, goodsname}
     */
    public recordIncome(info: any) {
        callMethod(callBackEnum.recordIncome, '(Ljava/lang/String;)V', info)
    }

    /**
     * 上报登陆数据到af数据平台
     * @param info = {userId, sessionId, nickName, headPic, phone, accountType}
     */
    public reportLogin(info: any) {
        callMethod(callBackEnum.reportLogin, '(Ljava/lang/String;)V', info)
    }

    /**获取appsflyers的安装数据 */
    public getAFData() {
        var result = callMethod(callBackEnum.getAFData, '()Ljava/lang/String;')
        //console.log(`getAFData`, result)
        return result
    }

    public afInitFail() {
        var result = callMethod(callBackEnum.afInitFail, '()Ljava/lang/String;')
        return result === "1"
    }

    /**检测gps是否授权，未授权则弹窗 */
    public checkGPSContacts() {
        callMethod(callBackEnum.checkGPSContacts, '()V')
    }

    /**
     * type 1定位 2权限
     * 拉起设置 
     * */
    public pullUpSet(type) {
        callMethod(callBackEnum.pullUpSet, '(Ljava/lang/String;)V', JSON.parse(type))
    }

    /**
     * 强制整包更新时拉起下载apk的界面
     * @param info { apkUrl, updateTip, isForceUpdate, apkVersion, apkChannel }
     */
    public installUpdate(info: any) {
        let { apkUrl, updateTip, isForceUpdate, apkVersion, apkChannel } = info;
        callMethod(callBackEnum.installUpdate, '(Ljava/lang/String;)V', { apkUrl, updateTip, isForceUpdate, apkVersion, apkChannel })
    }

    /**
     * 拉起whatsApp聊天
     */
    public chatInWhatsApp(mobileNum: string = "") {
        return callMethod(callBackEnum.chatInWhatsApp, '(Ljava/lang/String;)Ljava/lang/String;', mobileNum)
    }

    /**
     * 拉起telegram聊天
     */
    public chatInTelegram(mobileNum: string = "") {
        return callMethod(callBackEnum.chatInTelegram, '(Ljava/lang/String;)Ljava/lang/String;', mobileNum)
    }

    /**
     * 分享
     * @param info { platform, title, url }
     */
    public shareLink(info: any) {
        //let { platform, title, url } = info;
        EventMgr.emit(REPORT_EVT.CLICK, {
            element_id: "share_click_" + info.platform,
            element_name: "分享按钮" + info.platform,
            element_type: "button",
            element_position: '',
            element_content: '',
        });
        callMethod(callBackEnum.shareLink, '(Ljava/lang/String;)V', info)
    }

    public loginFB(info: any) {
        callMethod(callBackEnum.loginFB, '(Ljava/lang/String;)V', info)
    }

    /**
     * firebase上报
     * @param info - {eventName,params}
     */
    public postFirebaseEvent(info: any) {
        info && (info.time = Date.now())
        callMethod(callBackEnum.postFirebaseEvent, '(Ljava/lang/String;)V', info)
    }

    /**
     * firebase设置userId
     */
    public setFirebaseUserId() {
        callMethod(callBackEnum.setFirebaseUserId, '(Ljava/lang/String;)V', StorageMgr.userId)
    }

    /**
     * firebase设置userProperty
     * @param props {...}
     */
    public setFirebaseUserProperty(props: any) {
        callMethod(callBackEnum.setFirebaseUserProperty, '(Ljava/lang/String;)V', props)
    }

    /**
     * facebook上报
     * @param info - {eventName,params}
     */
    public postFacebookEvent(info: any) {
        info && (info.time = Date.now())
        callMethod(callBackEnum.postFacebookEvent, '(Ljava/lang/String;)V', info)
    }

    /**
     * facebook上报支付
     * @param info - {purchaseAmount,currency}
     */
    public postFacebookPurchase(info: any) {
        callMethod(callBackEnum.postFacebookPurchase, '(Ljava/lang/String;)V', info)
    }

    /**
     * af上报
     * @param info - {eventName,params}
     */
    public postAfEvent(info: any) {
        // info && (info.time = Date.now())
        callMethod(callBackEnum.postAfEvent, '(Ljava/lang/String;)V', info)
    }

    /**拉起google商店 */
    public goStore() {
        callMethod(callBackEnum.goStore, '()V')
    }

}
export default new JsbUitl();