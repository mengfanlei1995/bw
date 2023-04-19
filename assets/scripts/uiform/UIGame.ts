import Chip from "../../subgames/common/script/Chip";
import SysConfig from "../data/SysConfig";
import UserData from "../data/UserData";
import { REPORT_EVT } from "../enum/DeskEnum";
import EventMgr from "../mgr/EventMgr";
import LangMgr from "../mgr/LangMgr";
import PoolMgr from "../mgr/PoolMgr";
import SoundMgr from "../mgr/SoundMgr";
import StorageMgr from "../mgr/StorageMgr";
import SendMgr from "../net/SendMgr";
import { RoomOptParam } from "../net/proto/room";
import BundleUtil from "../utils/BundleUtil";
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
    @property({ tooltip: '头像', type: cc.Node })
    avatarNode: cc.Node = null;

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

    protected longToNumber(long: LongType): number {
        return LongUtil.longToNumber(long);
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
        roomType: 1,
        //玩家id
        userId: StorageMgr.userId
    }

    onLoad(): void {
        this.statusTipSkel.node.zIndex = 3;
        this.statusWaitingSkel.node.zIndex = 3;
    }

    async enterRoom(): Promise<Uint8Array> {
        this.optData.gameType = +this.gameId;
        this.optData.optType = 3;
        let info: Uint8Array = await SendMgr.sendEnterRoom(this.optData, this.gameCmd);
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

    countDownTime() {
        this.curTime -= 1000
        if (this.curTime <= 0) {
            SysConfig.settling = true;
            this.curTime = 0;
        }
        let time = parseInt(`${this.curTime / 1000}`);
        this.timeLeftLabel.string = `${time}`
    }

    setOnLineNumber(onlinePlayers: number) {
        this.lbOnLine.string = `${onlinePlayers}`;
        this.lbOnLine.node.parent.active = onlinePlayers && onlinePlayers > 0
    }

    initChipsNum(betCoinList) {
        for (let i = 0; i < this.betChoiceList.length; i++) {
            let node: cc.Node = this.betChoiceList[i].node;
            let lb_chips: cc.Label = cc.find("lb_chips", node).getComponent(cc.Label);
            lb_chips.string = `${this.longToNumber(betCoinList[i]) / 100}`;
            this.betNums[i] = betCoinList[i] / 100;
        }
    }

    betScaleAnim(label: cc.Label, num: number) {
        cc.tween(label.node).delay(0.2).to(0.2, { scale: 1.4 }, { easing: 'sineIn' })
            .call(() => {
                label.string = `${num}`;
            })
            .to(0.1, { scale: 1 }, { easing: 'sineOut' }).start()
    }

    /**
      * 下注筹码
      * @param lryIndex 
      * @param chipNumArray 
    */
    flyChips(isSelf: boolean, areaType: string, chipNum: number) {
        this.getChipsSkel.node.active = true;
        if (!isSelf) this.getChipsSkel.setAnimation(0, "chu", false);
        let targetAreaNode: cc.Node = this.getChipsAreaNode(areaType);
        let targetPos = this.areaPosMap[`${areaType}`];
        let targetW: number = targetAreaNode.width;
        let targetH: number = targetAreaNode.height;
        let moveTime: number = isSelf ? 0.2 : 0.5;
        let node = this.productChipsNode(chipNum, areaType, this.betNums);
        this.chipsProductAreaNode.addChild(node);
        let sourcePos = isSelf ? this.selfChipsSourcePos : this.chipsSourcePos;
        node.position = cc.v3(sourcePos);
        let x = Math.random() * targetW - targetW / 2;
        let y = Math.random() * targetH - targetH / 2;
        targetPos = targetPos.add(cc.v2(x, y));
        cc.tween(node).delay(0.005).parallel(
            cc.tween().to(moveTime, { scale: 0.6 }, { easing: 'sineInOut' }),
            cc.tween().to(moveTime, { position: targetPos }, { easing: 'sineInOut' })
        ).start()
        this.checkAreaChipNum(areaType, 1);
    }


    /**
     * 检测区域筹码数量是否超限
     * @param areaType 
     */
    checkAreaChipNum(areaType: string, addNums) {
        let childrens: cc.Node[] = this.chipsProductAreaNode.children
        let areaNodes: cc.Node[] = []
        let node: cc.Node = null
        let c = 0, j = 0
        for (let i = 0; i < childrens.length; i++) {
            if (childrens[i].name == areaType) {
                areaNodes[j++] = childrens[i]
                c++
            }
        }
        if (c + addNums <= this.singleAreaMaxChipsNum) return
        let destroyNum = c + addNums - this.singleAreaMaxChipsNum
        if (destroyNum >= areaNodes.length) destroyNum = areaNodes.length
        for (let i = 0; i < destroyNum; i++) {
            node = areaNodes[i]
            cc.tween(node).delay(0.5).to(0.5, { opacity: 0 }).call(() => {
                if (node != null) PoolMgr.setNode(node)
            }).start()
        }
    }

    /**
     * 收集筹码到中心
     * @param areaType 
     */
    flyCenterArea(areaType: string) {
        SoundMgr.playEffect('audio/collectchips')
        function moveAnim(node, targetPos, delay) {
            cc.tween(node).delay(delay).parallel(
                cc.tween().to(0.5, { scale: 0.6 }, { easing: 'sineInOut' }),
                cc.tween().to(0.5, { position: targetPos }, { easing: 'sineInOut' })
            ).call(() => {
                node.active = false
            }).start()
        }
        let childrens: cc.Node[] = this.chipsProductAreaNode.children
        let areaNodes: cc.Node[] = []
        let j = 0
        for (let i = 0; i < childrens.length; i++) {
            if (childrens[i].name == areaType) {
                areaNodes[j++] = childrens[i]
            }
        }
        let stepDelay = 0.1 / areaNodes.length
        let targetPos = this.dealerNode.getPosition()
        for (let i = 0; i < areaNodes.length; i++) {
            moveAnim(areaNodes[i], targetPos, stepDelay * i)
        }
    }

    /**
    * 筹码飞向赢家区域
    * @param areaType 
    */
    flyWinArea(areaType: string) {
        SoundMgr.playEffect('audio/collectchips')
        let targetAreaNode: cc.Node = this.getChipsAreaNode(areaType)
        let childrens: cc.Node[] = this.chipsProductAreaNode.children
        let areaNodes: cc.Node[] = []
        let j = 0
        for (let i = 0; i < childrens.length; i++) {
            if (childrens[i].name != areaType) {
                areaNodes[j++] = childrens[i]
            }
        }
        let stepDelay = 0.1 / areaNodes.length
        for (let i = 0; i < areaNodes.length; i++) {
            let x = Math.random() * targetAreaNode.width - targetAreaNode.width / 2
            let y = Math.random() * targetAreaNode.height - targetAreaNode.height / 2
            let targetPos = this.chipsProductAreaNode.convertToNodeSpaceAR(
                targetAreaNode.convertToWorldSpaceAR(targetAreaNode.getPosition().add(cc.v2(x, y))))
            areaNodes[i].active = true
            areaNodes[i].setSiblingIndex(childrens.length - 1)
            cc.tween(areaNodes[i]).delay(stepDelay * i).parallel(
                cc.tween().to(0.5, { scale: 0.6 }, { easing: 'sineInOut' }),
                cc.tween().to(0.5, { position: targetPos }, { easing: 'sineInOut' })
            ).start()
        }
    }


    /**
    * 飞向筹码产生源
    * @param areaType 
    */
    flyChipsProductSource() {
        SoundMgr.playEffect('audio/collectchips')
        function moveAnim(node, targetPos, delay) {
            cc.tween(node).delay(delay).parallel(
                cc.tween().to(0.5, { scale: 0.6 }, { easing: 'sineInOut' }),
                cc.tween().to(0.5, { position: targetPos }, { easing: 'sineInOut' })
            ).call(function () {
                PoolMgr.setNode(node)
            }).start()
        }
        let childrens: cc.Node[] = this.chipsProductAreaNode.children
        let stepDelay = 0.1 / childrens.length
        for (let i = 0; i < childrens.length; i++) {
            let targetPos = this.chipsSourceNode.getPosition()
            moveAnim(childrens[i], targetPos, stepDelay * i)
        }
        cc.tween(this.node).delay(0.5).call(() => {
            this.getChipsSkel.node.active = true
            this.getChipsSkel.setAnimation(0, "get", false)
        }).delay(childrens.length * 0.01 + 0.5).call(() => {
            this.getChipsSkel.node.active = false
        }).start()
    }

    /**
     * 展示等待提示动画
     */
    showWaitingTipAnim() {
        if (this.waitingAction != null) this.waitingAction.stop()
        this.statusWaitingSkel.node.active = true
        this.waitingAction = cc.tween(this.node).delay(2).call(() => {
            this.statusWaitingSkel.node.active = false
        }).start()
    }


    /**
     * 下注
     * @param areaType 
     * @param multi 
     * @returns 
     */
    async buyBetChips(areaType: string, selfBetLabel: cc.Label, chipsLabel: cc.Label) {
        let chips = this.betNums[this.betIndex]
        if (chips > UserData.userInfo.walletInfo.totalCashBalance) {
            // if (StorageMgr.clickAddCashTimes < 2) {
            //     StorageMgr.clickAddCashTimes++;
            // }
            UIMgr.showToast(LangMgr.sentence("e0055"))
            return;
        }
        if (!this.isBetTime || this.curTime == 0) {
            this.showWaitingTipAnim()
            return;
        }
        this.optData.betCoins = this.numberToLong(chips * 100);
        this.optData.gameNum = this.gameNum;
        this.optData.betId = +areaType
        this.optData.optType = 18;
        let result: any = await SendMgr.sendBet(this.optData, this.gameCmd);
        if (result != null) {
            EventMgr.emit(REPORT_EVT.CLICK, {
                element_id: "btn_bet",
                element_name: "成功下注",
                element_type: "button",
                element_position: '',
                element_content: 'diceThree',
            });
            SoundMgr.playEffect('audio/betchips')
            this.flyChips(true, areaType, chips)
            let selfBetLbNum: number = Number(selfBetLabel.string)
            if (!selfBetLbNum) selfBetLbNum = 0;
            selfBetLabel.string = `${selfBetLbNum + chips}`;
            let chipsLbNum: number = Number(chipsLabel.string)
            if (!chipsLbNum) chipsLbNum = 0;
            chipsLabel.string = `${chipsLbNum + chips}`;
        }
    }

    updateChipsCircleSkel() {
        let btn: cc.Button
        for (let i = 0; i < this.betChoiceList.length; i++) {
            btn = this.betChoiceList[i]
            btn.node.getChildByName("circleSkel").active = (this.isBetTime && i == this.betIndex)
        }
        this.drawTimeBetMask.active = !this.isBetTime
    }

    //====================点击事件=================

    onBetChipClick(e: cc.Event.EventTouch) {
        let target: cc.Node = e.target as cc.Node;
        this.betIndex = (+target.name.substring("chipsBtn".length)) - 1
        this.updateChipsCircleSkel()
    }

    onAddCashClick(e: cc.Event.EventTouch) {
        FixedMgr.open(UIConfig.AddCash.prefab)
        EventMgr.emit(REPORT_EVT.CLICK, {
            element_id: "btn_addcash_byGame",
            element_name: "游戏房间中间充值按钮",
            element_type: "button",
            element_position: '',
            element_content: 'diceThree',
        });
    }


    onDestroy(): void {
        UIBundleMgr.hideAll();
        BundleUtil.clearAllBundle();
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
