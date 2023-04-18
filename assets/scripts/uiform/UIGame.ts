import Chip from "../../subgames/common/script/Chip";
import SysConfig from "../data/SysConfig";
import LangMgr from "../mgr/LangMgr";
import PoolMgr from "../mgr/PoolMgr";
import SendMgr from "../net/SendMgr";
import { RoomOptParam } from "../net/proto/room";
import LongUtil, { LongType } from "../utils/LongUtil";
import UIBundleMgr from "./UIBundleMgr";
import UIMgr from "./UIMgr";
import UIScene from "./UIScene";
import { DialogType } from "./ui/common/DiaLog";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UIGame extends UIScene {

    @property({ tooltip: '筹码预制', type: cc.Prefab })
    chipPrefab: cc.Prefab = null;

    @property({ tooltip: '在线人数', type: cc.Label })
    lbOnLine: cc.Label = null;

    //=============== 下注筹码选择区域组件=====================
    @property({ tooltip: "下注选择按钮", type: cc.Button })
    betChoiceList: cc.Button[] = Array<cc.Button>()
    @property({ tooltip: '封苍下注蒙版', type: cc.Node })
    drawTimeBetMask: cc.Node = null;
    @property({ tooltip: '游戏状态提示动画', type: sp.Skeleton })
    statusTipSkel: sp.Skeleton = null;
    @property({ tooltip: '游戏等待提示动画', type: sp.Skeleton })
    statusWaitingSkel: sp.Skeleton = null;
    @property({ tooltip: '游戏剩余时间', type: cc.Label })
    timeLeftLabel: cc.Label = null;
    @property({ tooltip: '游戏时间提示', type: cc.Label })
    timeTipLabel: cc.Label = null;
    @property({ tooltip: '筹码产生源', type: cc.Node })
    chipsSourceNode: cc.Node = null;
    @property({ tooltip: '筹码产生源动画', type: sp.Skeleton })
    getChipsSkel: sp.Skeleton = null;
    @property({ tooltip: '荷官', type: cc.Node })
    dealerNode: cc.Node = null;
    @property({ tooltip: 'lastNode', type: cc.Node })
    lastNode: cc.Node = null;
    @property({ tooltip: '尾气', type: cc.Prefab })
    tailGasPrefab: cc.Prefab = null;
    @property({ tooltip: '赢金币动画', type: cc.Label })
    winBonusAni: cc.Label = null;
    //=============== 历史记录组件=====================
    @property({ tooltip: '开奖记录', type: cc.Node })
    recordLayoutNode: cc.Node = null;
    @property({ tooltip: '筹码生成区域', type: cc.Node })
    chipsProductAreaNode: cc.Node = null;

    /**
     * 单个区域最大筹码数量
     */
    protected singleAreaMaxChipsNum: number = 50;

    // 是否第一次进入
    protected isFirstInto: boolean = true;
    // 是否处于下注时间
    protected isBetTime: boolean = false;
    // 当前时间
    protected curTime: number = 0;

    protected winBonus: number = 0;

    //下注筹码列表
    protected betNums = [2, 10, 100, 500, 1000, 5000];
    //默认下注筹码为10
    protected betIndex: number = 1;

    protected gameNum: number;

    protected gameResultList: any[] = [];

    protected selfChipsSourcePos: cc.Vec2 = null;
    protected chipsSourcePos: cc.Vec2 = null;
    protected areaPosMap: any = {};
    protected gameId: string = '';
    protected gameCmd: number = 0;
    protected waitingAction: cc.Tween;

    protected numberToLong(value: number): LongType {
        return LongUtil.numberToLong(value);
    }

    protected optData: RoomOptParam = {
        betCoins: this.numberToLong(0),
        //下注区域
        betId: 0,
        //游戏局数
        gameNum: 0,
        //游戏ID
        gameType: 0,
        //操作类型 3 进入房间 4退出房间 18下注
        optType: 3,
        //房间id
        roomId: "",
        // 1
        roomLevel: 1,
        // 1
        roomType: 1
    }

    onLoad(): void {

    }

    async enterRoom(gameId: string, gameCmd: number): Promise<Uint8Array> {
        this.gameId = gameId;
        this.gameCmd = gameCmd;
        this.optData.gameType = +gameId;
        this.optData.optType = 3;
        let info: Uint8Array = await SendMgr.sendEnterRoom(this.optData, gameCmd);
        if (!info && cc.isValid(this.node)) {
            UIMgr.goHall();
            UIMgr.showDialog({
                word: LangMgr.sentence('e0067'),
                type: DialogType.OnlyOkBtn,
            })
            return null;
        }
        if (!cc.isValid(this.node)) return null;
        return info;
    }

    onDestroy(): void {
        UIBundleMgr.hideAll();
    }

    /**
    * 生产筹码
    * @param value 
    * @returns 
    */
    public productChipsNode(value: number, areaType: string, betNums: number[]) {
        let node = PoolMgr.getNode(this.chipPrefab)
        node.getComponent(Chip).init(value, areaType, betNums)
        return node
    }


}
