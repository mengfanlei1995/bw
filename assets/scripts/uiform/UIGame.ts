// import Chip from "../../subgames/common/script/Chip";
import SysConfig from "../data/SysConfig";
import UserData from "../data/UserData";
import EventMgr from "../mgr/EventMgr";
import LangMgr from "../mgr/LangMgr";
import PoolMgr from "../mgr/PoolMgr";
import SoundMgr from "../mgr/SoundMgr";
import StorageMgr from "../mgr/StorageMgr";
import { DialogType } from "../model/DialogOptions";
import { LuckyBallCmd, TPWarCmd } from "../net/CmdData";
import SendMgr from "../net/SendMgr";
import { AreaPointBetCoinsVO, PointBetCoinsVO, RoomBetDTO, RoomEnterDTO } from "../net/proto/room";
import BundleUtil from "../utils/BundleUtil";
import CocosUtil from "../utils/CocosUtil";
import LongUtil, { LongType } from "../utils/LongUtil";
import UIBundleMgr from "./UIBundleMgr";
import UIMgr from "./UIMgr";
import UIScene from "./UIScene";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UIGame extends UIScene {


    @property({ tooltip: '筹码区域', type: cc.Node })
    chipsAreaNode: cc.Node[] = [];
    @property({ tooltip: '筹码总数', type: cc.Label })
    chipsNumLabel: cc.Label[] = [];
    @property({ tooltip: '中奖框', type: cc.Node })
    awardNode: cc.Node[] = [];
    @property({ tooltip: '自己下注筹码数', type: cc.Label })
    selfBetChipsNumLabel: cc.Label[] = [];

    @property({ tooltip: '筹码预制', type: cc.Prefab })
    chipPrefab: cc.Prefab = null;
    @property({ tooltip: '在线人数', type: cc.Label })
    lbOnLine: cc.Label = null;
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
    protected isReload: boolean = false;
    protected gameName: string = '';
    protected historyName: string = '';
    protected roomId: string = '';

    protected numberToLong(value: number): LongType {
        return LongUtil.numberToLong(value);
    }

    protected longToNumber(long: LongType): number {
        return LongUtil.longToNumber(long);
    }

    _start(): void {
        SysConfig.sceneId = "fromGame";
        this.isBundle = 1;
        this.statusTipSkel.node.zIndex = 3;
        this.statusWaitingSkel.node.zIndex = 3;
        this.chipsSourcePos = this.chipsSourceNode.getPosition();
        this.initAreaPos();
        this.timeLeftLabel.string = "--";
        this.scheduleOnce(() => {
            this.selfChipsSourcePos = this.chipsProductAreaNode.convertToNodeSpaceAR(
                this.avatarNode.convertToWorldSpaceAR(this.avatarNode.getPosition()));
        }, 0.01)
    }

    _onDisable(): void {
        SysConfig.settling = false;
        PoolMgr.clear();
        UIBundleMgr.hideAll();
        BundleUtil.clearAllBundle();
    }

    async enterRoom(): Promise<Uint8Array> {
        let params: RoomEnterDTO = {
            roomType: 1,
            gameType: +this.gameId,
            roomLevel: 1
        }
        let info: Uint8Array = await SendMgr.sendEnterRoom(params, this.gameCmd);
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
        if (time <= 3 && time > 0 && this.isBetTime) {
            SoundMgr.playEffectByBundle('common', 'audio/seconds');
        }
        this.timeLeftLabel.string = `${time}`;
    }

    setOnLineNumber(onlinePlayers: number) {
        if (StorageMgr.isGreen) return;
        this.lbOnLine.string = `${onlinePlayers}`;
        this.lbOnLine.node.parent.active = onlinePlayers && onlinePlayers > 0;
    }

    initChipsNum(betCoinList) {
        for (let i = 0; i < this.betChoiceList.length; i++) {
            let node: cc.Node = this.betChoiceList[i].node.getChildByName('chipSprite');
            let lb_chips: cc.Label = cc.find("lb_chips", node).getComponent(cc.Label);
            lb_chips.string = `${this.longToNumber(betCoinList[i]) / 100}`;
            this.betNums[i] = this.longToNumber(betCoinList[i]) / 100;
        }
        if (!StorageMgr.isGreen && this.longToNumber(betCoinList[0]) > UserData.userInfo?.walletInfo?.totalCashBalance && !StorageMgr.openAddCashTimes) {
            StorageMgr.openAddCashTimes = 1;
            this.scheduleOnce(() => {
                this.onAddCashClick();
            }, 1)
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
    async flyChips(isSelf: boolean, areaType: string[], chipNum: number[]) {
        this.getChipsSkel.node.active = true;
        let moveTime: number = isSelf ? 0.2 : 0.4;
        let sourcePos = isSelf ? this.selfChipsSourcePos : this.chipsSourcePos;
        for (let i = 0; i < areaType.length; i++) {
            await CocosUtil.sleepSync(i * 0.01);
            if (!this.isBetTime) return;
            if (SysConfig.isHide) break;
            if (i % 5 == 0) SoundMgr.playEffectByBundle('common', 'audio/betchips');
            if (!isSelf) this.getChipsSkel.setAnimation(0, "chu", false);
            if (!cc.isValid(this.node) || this.curTime <= 0) return;
            let targetAreaNode: cc.Node = this.getChipsAreaNode(areaType[i]);
            let targetPos = this.areaPosMap[`${areaType[i]}`];
            let targetW: number = targetAreaNode.width;
            let targetH: number = targetAreaNode.height;
            let node = this.productChipsNode(chipNum[i], areaType[i], this.betNums);
            this.chipsProductAreaNode.addChild(node);
            node.position = cc.v3(sourcePos);
            let x = Math.random() * targetW - targetW / 2;
            let y = Math.random() * targetH - targetH / 2;
            targetPos = targetPos.add(cc.v2(x, y));
            cc.tween(node).parallel(
                cc.tween().to(moveTime, { scale: 0.6 }, { easing: 'sineInOut' }),
                cc.tween().to(moveTime, { position: targetPos }, { easing: 'sineInOut' })
            ).start()
            this.checkAreaChipNum(areaType[i], 1);
        }
    }

    initChips(betList: PointBetCoinsVO[]) {
        for (let i = 0; i < betList.length; i++) {
            let areaType: string = `${betList[i].betId}`;
            let chipNum: number = this.longToNumber(betList[i].betCoins);
            let node = this.productChipsNode(chipNum / 100, areaType, this.betNums);
            this.chipsProductAreaNode.addChild(node);
            let targetAreaNode: cc.Node = this.getChipsAreaNode(areaType);
            let targetPos = this.areaPosMap[`${areaType}`];
            let targetW: number = targetAreaNode.width;
            let targetH: number = targetAreaNode.height;
            let x = Math.random() * targetW - targetW / 2;
            let y = Math.random() * targetH - targetH / 2;
            targetPos = targetPos.add(cc.v2(x, y));
            node.position = cc.v3(targetPos);
            this.checkAreaChipNum(areaType, 1);
        }
    }


    /**
     * 检测区域筹码数量是否超限
     * @param areaType 
     */
    checkAreaChipNum(areaType: string, addNums: number) {
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
        SoundMgr.playEffectByBundle('common', 'audio/collectchips');
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
        SoundMgr.playEffectByBundle('common', 'audio/collectchips');
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
        SoundMgr.playEffectByBundle('common', 'audio/collectchips');
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

    /**延迟下注 */
    private isNotBet: boolean = false;

    betAniNode(root: cc.Node) {
        root.active = false;
    }

    /**
     * 下注
     * @param areaType 
     * @param multi 
     * @returns 
     */
    async buyBetChips(areaType: string) {
        if (this.isNotBet) return;
        let deleayTime: number = 0.1;
        this.isNotBet = true;
        this.scheduleOnce(() => {
            this.isNotBet = false;
        }, deleayTime)
        let chips = this.betNums[this.betIndex];
        let bonus: number = StorageMgr.isGreen ? UserData.userInfo.walletInfo.freeBalance : UserData.userInfo.walletInfo.totalCashBalance
        if (chips * 100 > bonus ) {
            if (!StorageMgr.isGreen && new Date().getTime() - StorageMgr.clickAddCashTimes > 5 * 60 * 1000) {
                StorageMgr.clickAddCashTimes = new Date().getTime();
                this.onAddCashClick();
                return;
            }
            UIMgr.showToast(LangMgr.sentence("e0055"))
            return;
        }
        if (!this.isBetTime || this.curTime == 0) {
            this.showWaitingTipAnim()
            return;
        }

        let awardNode: cc.Node = this.awardNode[+areaType - 1];
        awardNode.active = true;
        this.scheduleOnce(this.betAniNode.bind(this, awardNode), 0.1);
        let params: RoomBetDTO = {
            roomId: this.roomId,
            betCoins: this.numberToLong(chips * 100),
            betId: +areaType,
            gameNum: this.gameNum
        }
        SendMgr.sendBet(params, this.gameCmd);
    }

    selfBetChips(data: AreaPointBetCoinsVO) {
        if (data && cc.isValid(this.node)) {
            let betId = data.betId;
            let betCoins: number = this.longToNumber(data.areaCoins) / 100;
            let coins: number = this.longToNumber(data.coins) / 100;
            // SoundMgr.playEffectByBundle('audio/betchips');
            this.flyChips(true, [`${betId}`], [coins]);
            let selfBetLabel: cc.Label = this.selfBetChipsNumLabel[betId - 1];
            let chipsLabel: cc.Label = this.chipsNumLabel[betId - 1];
            if (selfBetLabel) {
                let selfBetLbNum: number = Number(selfBetLabel.string);
                if (!selfBetLbNum) selfBetLbNum = 0;
                if (selfBetLbNum < betCoins)
                    selfBetLabel.string = `${betCoins}`;
            }
            let chipsLbNum: number = Number(chipsLabel.string);
            if (!chipsLbNum) chipsLbNum = 0;
            chipsLabel.string = `${chipsLbNum + betCoins}`;
        }
    }

    updateChipsCircleSkel() {
        for (let i = 0; i < this.betChoiceList.length; i++) {
            let betChoice: cc.Node = this.betChoiceList[i].node;
            let chipSprite: cc.Node = betChoice.getChildByName("chipSprite");
            chipSprite.getChildByName("circleSkel").active = (this.isBetTime && i == this.betIndex);
            chipSprite.y = this.isBetTime && i == this.betIndex ? 4 : 0;
            chipSprite.scale = this.isBetTime && i == this.betIndex ? 1.2 : 1;
        }
        this.drawTimeBetMask.active = !this.isBetTime
    }

    isReturn(gameNum) {
        return !cc.isValid(this.node) || gameNum != this.gameNum || this.isReload;
    }

    initAreaPos() {
        for (let i = 1; i <= this.chipsAreaNode.length; i++) {
            let targetAreaNode: cc.Node = this.getChipsAreaNode(`${i}`);
            let targetPos = this.chipsProductAreaNode.convertToNodeSpaceAR(
                targetAreaNode.convertToWorldSpaceAR(targetAreaNode.getPosition()));
            this.areaPosMap[`${i}`] = targetPos;
        }
    }

    getChipsAreaNode(areaType: string): cc.Node {
        return this.chipsAreaNode[+areaType - 1];
    }

    initRoomInfo(info) {
        // console.log('_enterRoom', info)
        let { betCoinList, betCoinMap, betList, betSelfCoinMap, gameInfo, roomInfo, onlinePlayers } = info;
        if (betList && betList.length > 0 && this.gameCmd != LuckyBallCmd) {
            this.initChips(betList);
        }
        if (betCoinList) this.initChipsNum(betCoinList);
        let { gameNum, gameResultList, leftOptSeconds } = gameInfo;
        let { roomId, roomState } = roomInfo;
        this.gameResultList = gameResultList;
        for (let i = 1; i <= this.chipsNumLabel.length; i++) {
            if (this.chipsNumLabel[i - 1] && betCoinMap && betCoinMap[`${i}`] != null && Number(this.chipsNumLabel[i - 1].string) < this.longToNumber(betCoinMap[`${i}`]) / 100) this.chipsNumLabel[i - 1].string = `${this.longToNumber(betCoinMap[`${i}`]) / 100}`;
            if (this.selfBetChipsNumLabel[i - 1] && betSelfCoinMap && betSelfCoinMap[`${i}`] != null) this.selfBetChipsNumLabel[i - 1].string = `${this.longToNumber(betSelfCoinMap[`${i}`]) / 100}`;
        }
        this.roomId = roomId;
        this.gameNum = gameNum;
        this.curTime = leftOptSeconds;
        this.isBetTime = roomState == 3;
        this.unschedule(this.countDownTime);
        let time = parseInt(`${this.curTime / 1000}`);
        this.timeLeftLabel.string = `${time}`;
        this.schedule(this.countDownTime, 1);
        if (this.isBetTime) {
            this.isReload = false;
            if (this.isFirstInto) this.statusTipSkel.setAnimation(0, "start", false);
            this.timeTipLabel.string = LangMgr.sentence("e0320");
        } else {
            this.timeTipLabel.string = LangMgr.sentence("e0321");
        }
        this.statusWaitingSkel.node.active = !this.isBetTime;
        this.updateChipsCircleSkel();
        if (this.isFirstInto) UIBundleMgr.showGameHead({ gameId: +this.gameId, roomId: this.roomId, gameCmd: this.gameCmd, gameName: this.gameName });
        this.isFirstInto = false;
        this.setOnLineNumber(onlinePlayers);
    }

    /**筹码飞向玩家动画 */
    flyPlayerArea(id: string, posArray: cc.Vec3[]) {
        this.flyChipsProductSource();
        let chipsArray: number[] = [];
        function checkChipsNum(num: number) {
            if (num < 2) return;
            let array: number[] = [5000, 1000, 500, 100, 10, 2];
            for (let i = 0; i < array.length; i++) {
                if (num >= array[i]) {
                    chipsArray.push(array[i]);
                    return checkChipsNum(num - array[i]);
                }
            }
        }
        checkChipsNum(this.winBonus);
        if (chipsArray.length == 0) {
            SysConfig.settling = false;
            return;
        }
        for (let i = 0; i < chipsArray.length; i++) {
            let chipsAreaNode: cc.Node = this.chipsAreaNode[+id - 1];
            let x = Math.random() * chipsAreaNode.width - chipsAreaNode.width / 2;
            let y = Math.random() * chipsAreaNode.height - chipsAreaNode.height / 2;
            let pos: cc.Vec3 = posArray[+id - 1];
            pos.add(cc.v3(x, y, 0));
            let node = this.productChipsNode(chipsArray[i], "", this.betNums);
            this.chipsProductAreaNode.addChild(node);
            node.position = pos;
            cc.tween(node).to(0.6, { position: cc.v3(this.selfChipsSourcePos.x, this.selfChipsSourcePos.y, 0) }, { easing: 'sineInOut' })
                .call(() => {
                    PoolMgr.setNode(node)
                    if (i == chipsArray.length - 1) {
                        SysConfig.settling = false;
                        this.winBonusAni.string = `+${this.winBonus}`
                        let node: cc.Node = this.winBonusAni.node;
                        node.opacity = 0;
                        node.y = 0;
                        cc.tween(node).to(0.5, { opacity: 255, y: 70 }, { easing: 'sineInOut' })
                            .delay(0.3)
                            .to(0.5, { opacity: 0 })
                            .start()
                    }
                })
                .start()
        }
    }

    reset() {
        this.isReload = false;
        SysConfig.settling = false;
        this.recordLayoutNode && (this.recordLayoutNode.getComponent(cc.Layout)!.enabled = true);
        this.winBonus = 0;
        for (let i = 0; i < this.selfBetChipsNumLabel.length; i++) {
            if (this.awardNode[i]) this.awardNode[i].active = false;
            this.selfBetChipsNumLabel[i].string = LangMgr.sentence("e0319");
            this.chipsNumLabel[i].string = "0";
        }
        let chipsProductAreaNode: cc.Node = this.chipsProductAreaNode;
        if (chipsProductAreaNode.childrenCount > 0) {
            chipsProductAreaNode.children.forEach((node) => {
                node.destroy();
            })
        }
        this.statusWaitingSkel.node.active = !this.isBetTime;
    }

    gameStart(info) {
        // console.log('_gameStart', info);
        this.unschedule(this.countDownTime);
        this.schedule(this.countDownTime, 1);
        let { gameInfo } = info;
        this.curTime = gameInfo?.leftOptSeconds;
        this.gameNum = gameInfo?.gameNum;
        this.gameResultList = gameInfo.gameResultList;
        if (this.gameCmd != TPWarCmd) this.statusTipSkel.setAnimation(0, "start", false);
        this.timeTipLabel.string = LangMgr.sentence("e0320");
        this.updateChipsCircleSkel();
        let time = parseInt(`${this.curTime / 1000}`);
        this.timeLeftLabel.string = `${time}`;
        SoundMgr.playEffectByBundle('common', 'audio/start');
    }

    gameBet(info) {
        // betList betCoinMap
        let { betCoinMap, betList } = info;
        if (betCoinMap) {
            for (let i = 1; i <= this.chipsNumLabel.length; i++) {
                let betCoin: number = this.longToNumber(betCoinMap[`${i}`]) / 100;
                if (betCoinMap[`${i}`] && Number(this.chipsNumLabel[i - 1].string) < betCoin) this.betScaleAnim(this.chipsNumLabel[i - 1], betCoin);
            }
        }
        if (betList && betList.length > 0) {
            let betIds: string[] = [];
            let betCoins: number[] = [];
            for (let i = 0; i < betList.length; i++) {
                betIds.push(`${betList[i].betId}`);
                betCoins.push(this.longToNumber(betList[i].betCoins) / 100);
                // this.flyChips(false, `${betList[i].betId}`, this.longToNumber(betList[i].betCoins) / 100);
            }
            this.flyChips(false, betIds, betCoins);
        }
    }

    gameEnd(info) {
        // console.log('_gameEnd', info);
        this.unschedule(this.countDownTime);
        this.schedule(this.countDownTime, 1);
        let { gameInfo, gameResult, userInfoList } = info;
        this.curTime = gameInfo?.leftOptSeconds
        if (this.gameResultList.length >= 50) this.gameResultList.shift();
        this.gameResultList.push(gameResult)
        this.isBetTime = false;
        this.timeTipLabel.string = LangMgr.sentence("e0321");
        this.statusTipSkel.setAnimation(0, "stop", false)
        this.chipsProductAreaNode.zIndex = 1;
        if (userInfoList && userInfoList.length > 0) {
            for (let i = 0; i < userInfoList.length; i++) {
                if (userInfoList[i].userId == StorageMgr.userId) {
                    this.winBonus = this.longToNumber(userInfoList[i].winCoins) / 100;
                    break;
                }
            }
        }
        this.updateChipsCircleSkel()
        this.setOnLineNumber(gameInfo?.onlinePlayers);
        let time = parseInt(`${this.curTime / 1000}`);
        this.timeLeftLabel.string = `${time}`;
    }

    tackOut() {
        UIMgr.goHall();
        UIMgr.showDialog({
            word: LangMgr.sentence('e0056'),
            type: DialogType.OnlyOkBtn
        })
    }

    //====================点击事件=================

    onBetChipClick(e: cc.Event.EventTouch) {
        let target: cc.Node = e.target as cc.Node;
        this.betIndex = (+target.name.substring("chipsBtn".length)) - 1
        this.updateChipsCircleSkel()
    }

    onAreaClick(e: cc.Event.EventTouch, type: string) {
        this.buyBetChips(type);
    }

    onRecordClick() {
        UIBundleMgr.show(this.gameName, `prefab/${this.historyName}`, this.historyName, this.gameResultList);
    }

    onAddCashClick() {
        UIMgr.show('prefab/hall/AddCash', 'AddCash', { vipInto: false, vipLevel: 0 });
    }

    /**
     * 生产筹码
     * @param value 
     * @param areaType
     * @param betNums
     * @returns cc.Node
     */
    public productChipsNode(value: number, areaType: string, betNums: number[]): cc.Node {
        let node: cc.Node = PoolMgr.getNode(this.chipPrefab);
        node.getComponent('Chip').init(value, areaType, betNums);
        return node;
    }

}
