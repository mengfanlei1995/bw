import SysConfig from "../data/SysConfig";
import CommonUtil from "../utils/CommonUtil";

const StorageKey = cc.Enum({
    /**语言 */
    LANG: 'LANG',
    /**上次玩游戏时间 */
    LASTTIME: 'LASTTIME',
    /**玩家账号id */
    USERID: 'USERID',
    /**玩家登陆态token */
    SESSIONID: 'SESSIONID',
    /**设备号 */
    DEVID: 'DEVID',
    /**UUID */
    UUID: 'UUID',
    /**昵称 */
    NICK: 'NICK',
    /**头像 */
    HEADPIC: 'HEADPIC',
    /**手机号 */
    PHONE: 'PHONE',
    /**账号类型 */
    ACCOUNTTYPE: 'ACCOUNTTYPE',
    /**背景音乐是否开启 */
    BGMSOUND: 'BGMSOUND',
    /**功能音乐音量 */
    EFFECTPERCENT: 'EFFECTPERCENT',
    /**背景音乐音量 */
    BGMPERCENT: 'BGMPERCENT',
    /**震动是否开启 */
    VIBRATION: 'VIBRATION',
    /**af启动 */
    AFLAUNCH: 'AFLAUNCH',
    /**cocos游戏版本 */
    COCOSVERSION: 'COCOSVERSION',
    /**是否首次启动 */
    FIRSTSTART: "FIRSTSTART",
    INVATECODE: 'INVATECODE',
    INVATETYPE: 'INVATETYPE',
    MEDIAID: 'MEDIAID',
    AFID: 'AFID',
    /**提现信息 */
    WITHDRAW: "WITHDRAW",
    /**进入过大厅了，下次断网情况下，如果该缓存存在，则表示该马甲包不需要走开关 */
    ENTER_GAME: 'ENTER_GAME',
    /**是否弹过商城 */
    ISOPENADDCASH: 'ISOPENADDCASH',
    /**点击弹商城次数 */
    CLICKADDCASH: 'CLICKADDCASH',
    /**是否播放过大厅手势动画 */
    HALLHANDANI: 'HALLHANDANI',
});

const pageParams = CommonUtil.paramsToJson()

/**用户唯一标识 */
const device: string = "";

class StorageMgr {

    public saveItem(key: string, val: string | number | boolean) {
        if (val === null || val === undefined) val = ''
        let device: string = pageParams.device ? `${pageParams.device}_` : '';
        cc.sys.localStorage.setItem(`${device}${key}`, val)
    }

    public loadItem(key: string) {
        let device: string = pageParams.device ? `${pageParams.device}_` : '';
        let val = cc.sys.localStorage.getItem(`${device}${key}`)
        if (val === null || val === undefined) val = ''
        return val
    }

    /**当前语言包 */
    public set lang(_lang: string) {
        this.saveItem(StorageKey.LANG, _lang);
    }
    public get lang(): string {
        return this.loadItem(StorageKey.LANG) || 'en';
    }

    /**
     * 缓存热更版本
     */
    public set cocosVersion(cocosVersion: string) {
        this.saveItem(StorageKey.COCOSVERSION, cocosVersion);
    }
    public get cocosVersion(): string {
        return this.loadItem(StorageKey.COCOSVERSION);
    }

    /**af启动数据 */
    public set afLaunch(afLaunch: string) {
        this.saveItem(StorageKey.AFLAUNCH, afLaunch);
    }
    public get afLaunch(): string {
        return this.loadItem(StorageKey.AFLAUNCH);
    }

    public set invateCode(invateCode: string) {
        this.saveItem(StorageKey.INVATECODE, invateCode);
    }
    public get invateCode(): string {
        return this.loadItem(StorageKey.INVATECODE);
    }

    public set invateType(invateType: string) {
        this.saveItem(StorageKey.INVATETYPE, invateType);
    }
    public get invateType(): string {
        return this.loadItem(StorageKey.INVATETYPE);
    }

    public set mediaId(mediaId: string) {
        this.saveItem(StorageKey.MEDIAID, mediaId);
    }
    public get mediaId(): string {
        return this.loadItem(StorageKey.MEDIAID) || SysConfig.defaultChannel;
    }

    public set afId(afId: string) {
        this.saveItem(StorageKey.AFID, afId);
    }
    public get afId(): string {
        return this.loadItem(StorageKey.AFID) || '';
    }

    /**玩家设备号 */
    public set devId(devId: string) {
        this.saveItem(StorageKey.DEVID, devId);
    }
    public get devId(): string {
        return pageParams.device || this.loadItem(StorageKey.DEVID);
    }

    public set UUID(uuid: string) {
        this.saveItem(StorageKey.UUID, uuid);
    }
    public get UUID(): string {
        return this.loadItem(StorageKey.UUID) || '';
    }

    /**登陆用户ID */
    public set userId(userId: string) {
        this.saveItem(StorageKey.USERID, userId);
    }
    public get userId(): string {
        return this.loadItem(StorageKey.USERID);
    }

    /**登陆用户会话 */
    public set sessionId(sessionId: string) {
        this.saveItem(StorageKey.SESSIONID, sessionId);
    }
    public get sessionId(): string {
        return this.loadItem(StorageKey.SESSIONID);
    }

    public set enterGame(enterGame: number) {
        this.saveItem(StorageKey.ENTER_GAME, enterGame);
    }
    public get enterGame(): number {
        let first = this.loadItem(StorageKey.ENTER_GAME);
        return first ? +first : 0;
    }

    /**首次启动  用来做自动登录*/
    public set firstStart(firstStart: number) {
        this.saveItem(StorageKey.FIRSTSTART, firstStart);
    }
    public get firstStart(): number {
        let first = this.loadItem(StorageKey.FIRSTSTART);
        return first ? +first : 0;
    }

    /**登陆用户昵称 */
    public set nickName(nick: string) {
        this.saveItem(StorageKey.NICK, nick);
    }
    public get nickName(): string {
        return this.loadItem(StorageKey.NICK);
    }

    /**登陆用户头像 */
    public set headPic(headPic: string) {
        this.saveItem(StorageKey.HEADPIC, headPic);
    }
    public get headPic(): string {
        return this.loadItem(StorageKey.HEADPIC);
    }

    /**
     * 手机
     */
    public set phone(phone: string) {
        this.saveItem(StorageKey.PHONE, phone);
    }
    public get phone(): string {
        return this.loadItem(StorageKey.PHONE);
    }

    /**
     * 账户类型
     * 0 unknown
        1 游客
        2 手机号
        3 facebook
        4 谷歌
        5 微信
     *  
     * */
    public set accountType(accountType: number) {
        this.saveItem(StorageKey.ACCOUNTTYPE, accountType);
    }

    public get accountType(): number {
        var item = this.loadItem(StorageKey.ACCOUNTTYPE);
        return item == '' ? 0 : +item;
    }

    /**上一次游戏时间 */
    public set lastTime(lastTime: number) {
        this.saveItem(StorageKey.LASTTIME, lastTime);
    }
    public get lastTime(): number {
        var item = this.loadItem(StorageKey.LASTTIME);
        return item ? Number(item) : 0;
    }

    /**
     * 背景音乐开关
     */
    public set bgmSwitch(isOn: number) {
        this.saveItem(StorageKey.BGMSOUND, isOn);
    }
    /**
     * 背景音乐开关
     */
    public get bgmSwitch(): number {
        var item = this.loadItem(StorageKey.BGMSOUND);
        return item == '' ? 1 : +item;
    }

    /**背景音乐音量 */
    public set bgmPercent(musicPercent: number) {
        this.saveItem(StorageKey.BGMPERCENT, musicPercent);
    }
    /**背景音乐音量 */
    public get bgmPercent(): number {
        var item = this.loadItem(StorageKey.BGMPERCENT);
        return item == '' ? 1 : +item;
    }

    /**功能音乐音量 */
    public set effectPercent(soundPercent: number) {
        this.saveItem(StorageKey.EFFECTPERCENT, soundPercent);
    }
    /**功能音乐音量 */
    public get effectPercent(): number {
        var item = this.loadItem(StorageKey.EFFECTPERCENT);
        return item == '' ? 1 : +item;
    }

    public set vibrate(vibrate: number) {
        this.saveItem(StorageKey.VIBRATION, vibrate);
    }
    public get vibrate(): number {
        var item = this.loadItem(StorageKey.VIBRATION);
        return item == '' ? 1 : +item;
    }

    /**弹过商城次数 */
    public set clickAddCashTimes(isOpenAddCash: number) {
        this.saveItem(StorageKey.CLICKADDCASH, isOpenAddCash);
    }
    public get clickAddCashTimes(): number {
        var item = this.loadItem(StorageKey.CLICKADDCASH);
        return item ? Number(item) : 0;
    }


    /**是否播放过大厅手势动画 */
    public set hallHandTimes(number: number) {
        this.saveItem(StorageKey.HALLHANDANI, number);
    }
    public get hallHandTimes(): number {
        var item = this.loadItem(StorageKey.HALLHANDANI);
        return item ? Number(item) : 0;
    }

    /**弹过商城次数 */
    public set openAddCashTimes(isOpenAddCash: number) {
        this.saveItem(StorageKey.ISOPENADDCASH, isOpenAddCash);
    }
    public get openAddCashTimes(): number {
        var item = this.loadItem(StorageKey.ISOPENADDCASH);
        return item ? Number(item) : 0;
    }

    /**初始化音乐及震动的开关 */
    public initSetting() {
        var item = this.loadItem(StorageKey.EFFECTPERCENT);
        !item && this.saveItem(StorageKey.EFFECTPERCENT, 1);

        item = this.loadItem(StorageKey.VIBRATION);
        !item && this.saveItem(StorageKey.VIBRATION, 1);

        var item = this.loadItem(StorageKey.BGMSOUND);
        !item && this.saveItem(StorageKey.BGMSOUND, 1);
    }

    /**隔天 则需要刷新很多数据 */
    public refreshCrossDayData(): void {
        //获取服务器的当前日期
        let todayDate = new Date().getDate();
        let lastDate = this.lastTime ? new Date(this.lastTime).getDate() : new Date().getDate();
        //以下比较todayDate与玩家上次游戏日期，然后做一些清除操作，一般app启动进入Loading时执行
        if (todayDate != lastDate) {
            this.openAddCashTimes = 0;
            this.clickAddCashTimes = 0;
        }
        this.lastTime = Date.now();
    }

    /**
    * 提现信息 
    */
    public set withdraw(withdraw: string) {
        this.saveItem(StorageKey.WITHDRAW, withdraw);
    }
    public get withdraw(): string {
        return this.loadItem(StorageKey.WITHDRAW) || "{}";
    }



    public logout() {
        this.userId = ''
        this.sessionId = ''
        this.nickName = ''
        this.headPic = ''
        this.phone = ''
        this.accountType = 0
    }

}
export default new StorageMgr();
