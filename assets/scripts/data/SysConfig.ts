import { HALL_EVT } from "../enum/DeskEnum";
import EventMgr from "../mgr/EventMgr";
import { HomepageGamesVO } from "../net/proto/hall";
import LongUtil from "../utils/LongUtil";

class SysConfig {
    /**调试模式 */
    readonly isDebug: number = 0;
    /**带有af统计的默认渠道值 */
    readonly defaultChannel: string = 'Organic';
    /**是否是测试环境 */
    readonly isTest: number = 1;
    /**包的时区，根据包运营的国家，配置相应的值 */
    readonly pkgTimeZone: string = 'Asia/Kolkata';
    /**包名，也就是网络请求的主域名 */
    readonly pkgName: string = 'com.winner.casino.wheel';
    /**当前最新版本 */
    readonly version: string = '1.0.3';
    /**app名字 */
    readonly appName: string = "Big Wheel";
    /**ISO货币编号 356印度卢比 */
    readonly currencyCode: string = '356';
    /**从原生端获取的信息，用此变量存储，便于使用 */
    systemInfo: AppSysInfo = {};
    /**是否在游戏中 */
    isSettling: boolean = false;
    /**是否处于后台模式 */
    isHide: boolean = false;

    sceneId: string = "appStart";

    /**隐私协议 */
    policyUrl: string = '';
    /**服务条款 */
    tcUrl: string = '';

    /**默认telegram账号 */
    telegram: string = 'luckywinner001';

    cid: string = '10102';

    //ws://192.168.124.13:1005/websocket 本地  http://192.168.124.13:9001
    //wss://test.bestbw.net/websocket 测试服
    //wss://bestbw.net/websocket 正式服
    readonly WsUrl: string = this.isTest ? 'wss://test.bestbw.net/websocket' : 'wss://bestbw.net/websocket';

    readonly HttpUrl: string = this.isTest ? 'https://test.bestbw.net/bwweb' : 'https://bestbw.net/bwweb';

    set settling(isSettling: boolean) {
        this.isSettling = isSettling;
        EventMgr.emit(HALL_EVT.GOLD_CHANGE);
    }

    readonly GameIDConfig: GameIDConfig = {
        WheelofForune: '300200',
        LuckyBall: '400300',
        LuckyDice: '400100',
        TigerVSElephant: '300100',
        PokeKing: '400400',
        Dice3: '400200',
        JhandiMunda: '400600',
        TeenPattiWar: '400500'
    }

    readonly spineHash: any = {
        '300200': { file: 'WheelofForune/WheelofForune', animation: 'WheelofForune' },
        '300100': { file: 'TigerVSElephant/TigerVSElephant', animation: 'TigerVSElephant' },
        '400300': { file: 'LuckyBall/Icon_WingoLottery', animation: 'animation' },
        '400100': { file: 'LuckyDice/LuckyDice', animation: 'LuckyDice' },
        '400400': { file: 'PokerKing/PokeKing', animation: 'PokeKing' },
        '400200': { file: 'DiceThree/DICE_3', animation: 'animation' },
        '400600': { file: 'JhandiMunda/JhandiMunda', animation: 'JhandiMunda' },
        '400500': { file: 'TeenPattiWar/Icon_TPWar', animation: 'animation' }
    }

    /**大厅游戏列表 */
    public gameList: GameListInfo[] = [];

    /**初始化游戏列表 */
    public setGameList(games: HomepageGamesVO[]) {
        for (let i = 0; i < games.length; i++) {
            let _data: GameListInfo = {};
            let minIn = LongUtil.longToNumber(games[i].minIn);
            _data.minIn = minIn;
            _data.roomId = games[i].roomId;
            _data.gameType = games[i].gameType;
            _data.gameImgUrl = games[i].gameImgUrl;
            _data.gameIconUrl = games[i].gameIconUrl;
            _data.remoteUrl = games[i].remoteUrl;
            _data.version = games[i].version;
            _data.download = games[i].download;
            _data.state = games[i].state;
            _data.select = games[i].select;
            _data.flag = games[i].flag;
            _data.file = games[i].file;
            _data.name = games[i].name;
            _data.cmd = games[i].cmd;
            this.gameList.push(_data);
        }
    }

}


export default new SysConfig();

export interface GameListInfo {
    roomId?: string;
    gameType?: string;
    gameImgUrl?: string;
    gameIconUrl?: string;
    remoteUrl?: string;
    version?: string;
    download?: boolean;
    state?: number;
    select?: number;
    minIn?: number;
    flag?: number;
    file?: string;
    name?: string;
    cmd?: number;
}

export interface GameIDConfig {
    WheelofForune: string
    LuckyBall: string
    LuckyDice: string
    TigerVSElephant: string
    PokeKing: string
    Dice3: string
    JhandiMunda: string
    TeenPattiWar: string
}

export interface afLaunchData {
    afid?: string;
    redirect_response_data?: string
    adgroup_id?: string
    engmnt_source?: string
    retargeting_conversion_type?: string
    is_incentivized?: boolean
    orig_cost?: number
    is_first_launch?: boolean
    af_click_lookback?: string
    af_web_dp?: string
    af_cpi?: string
    iscache?: boolean
    click_time?: string
    af_android_url?: string
    is_branded_link?: string
    match_type?: string
    adset?: string
    af_channel?: string
    campaign_id?: string
    shortlink?: string
    install_time?: string
    media_source?: string
    agency?: string
    af_message?: string
    af_siteid?: string
    af_status?: string
    af_sub1?: string
    cost_cents_USD?: number
    af_sub5?: string
    af_sub4?: string
    af_sub3?: string
    af_sub2?: string
    adset_id?: string
    esp_name?: string
    campaign?: string
    http_referrer?: string
    is_universal_link?: string
    is_retargeting?: boolean
    adgroup?: string
    ic?: string
    it?: string
    source?: string
    agent?: string
}

export interface AppSysInfo {
    apkVersion?: string;//原生端版本号
    timezone?: string //时区
    channelInfo?: any; //包渠道号
    device_id?: string //'', //设备标识
    imei?: string //"", //国际移动设备识别码
    mac?: string //"", //mac地址
    android_id?: string //"",
    sim_id?: string //"", //sim卡id
    os_name?: string //"", //操作系统名称
    os_version?: string //"", //操作系统版本
    os_language?: string //"",
    device_brand?: string //"",
    device_model?: string //"", //设备型号
    screen_height?: number //"",
    screen_width?: number //"",
    carrier?: string //"", //运营商 
    location?: string //"{"latitude"?:"22.543503","longitude"?:"113.935249"}"
    network_type?: string
    bar_height?: number
    isPieScreen?: boolean //是否异形屏
    oaid?: string, //匿名设备标识符
    appName?: string //游戏名称
    afUid?: string //接入af后，获取afuid,
    app_package_name?: string //包名
    gaid?: string //google广告id
    simulator?: boolean //是否为模拟器
    root?: boolean //是否root
}
