import SysConfig from "../../../scripts/data/SysConfig";
import { HALL_EVT } from "../../../scripts/enum/DeskEnum";
import { SocketEvent } from "../../../scripts/enum/SocketEnum";
import EventMgr from "../../../scripts/mgr/EventMgr";
import LangMgr from "../../../scripts/mgr/LangMgr";
import PoolMgr from "../../../scripts/mgr/PoolMgr";
import SoundMgr from "../../../scripts/mgr/SoundMgr";
import { SocketPushConfig } from "../../../scripts/model/ServerConfig";
import { LuckyBallCmd, Push_GameCmd, Push_Game_BetCmd, Push_Game_EndCmd, Push_Game_SelfBetCmd, Push_Game_StartCmd, Push_Game_TackOutCmd, Push_LuckyBallCmd } from "../../../scripts/net/CmdData";
import CmdMgr from "../../../scripts/net/CmdMgr";
import { NotifyLBBeginBetVO, ResponseLBEnterRoomVO, NotifyLBDrawVO, LBWinVO, NotifyBetVO, decodeNotifyLBBeginBetVO, decodeResponseLBEnterRoomVO, decodeNotifyLBDrawVO, decodeNotifyBetVO, decodeAreaPointBetCoinsVO } from "../../../scripts/net/proto/room";
import UIBundleMgr from "../../../scripts/uiform/UIBundleMgr";
import UIGame from "../../../scripts/uiform/UIGame";
import CocosUtil from "../../../scripts/utils/CocosUtil";
import CommonUtil from "../../../scripts/utils/CommonUtil";
import HistoryBallSlkel from "./HistoryBallSlkel";


const { ccclass, property } = cc._decorator;

@ccclass
export default class LuckyBall extends UIGame {

    @property({ tooltip: '挂载到球上的数字预制', type: cc.Prefab })
    ballTextPrefab: cc.Prefab = null;

    ballTextNode: cc.Node = null;

    @property({ tooltip: '历史记录球预制', type: cc.Prefab })
    historyBallPrefab: cc.Prefab = null;

    @property({ tooltip: '历史记录节点', type: cc.Node })
    historyNode: cc.Node = null;
    @property({ tooltip: '球池子动画', type: sp.Skeleton })
    colorBallSkel: sp.Skeleton = null;

    @property({ tooltip: '自己赢了，筹码生成区域', type: cc.Node })
    selfChipsProductAreaNode: cc.Node = null;

    colorBallSkelArr: string[] = ['Colorball0', 'Colorball1', 'Colorball2', 'Colorball3', 'Colorball4']
    /**摇奖结束后出球的颜色编号 1：红 3：黄 5：蓝 */
    colorBallSkelColorArr: any[] = [{ index: 1, color: '#74262a' }, { index: 3, color: '#953d22' }, { index: 5, color: '#1a4870' }]
    historyBallPosArr: cc.Vec2[] = [
        cc.v2(197, -33),
        cc.v2(168, -77),
        cc.v2(119, -106),
        cc.v2(60, -122),
        cc.v2(0, -128),
        cc.v2(-60, -122),
        cc.v2(-119, -106),
        cc.v2(-168, -77),
        cc.v2(-197, -33)
    ]

    /**球的数字对应的图片序号 */
    ballValueToSprite: number[] = [0, 2, 2, 2, 2, 0, 1, 1, 1, 1];

    private betSelfCoinMap = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
        12: 0,
        13: 0
    };

    start(): void {
        this.gameId = SysConfig.GameIDConfig.LuckyBall;
        this.gameCmd = LuckyBallCmd;
        this.gameName = 'LuckyBall';
        this.historyName = 'LuckyBallHistory';
        this.singleAreaMaxChipsNum = 0;
        this.renderHistoryBalls();
        this._start();
        this._enterRoom();
    }

    onEnable(): void {
        EventMgr.on(HALL_EVT.DESK_RELOAD, this.onEventShow, this);
        EventMgr.on(SocketEvent.WS_MSG_PUSH, this.onRecvGameData, this)
    }

    onDisable(): void {
        this._onDisable();
        EventMgr.off(HALL_EVT.DESK_RELOAD, this.onEventShow, this);
        EventMgr.off(SocketEvent.WS_MSG_PUSH, this.onRecvGameData, this)
    }

    async _enterRoom(): Promise<void> {
        let info: Uint8Array = await this.enterRoom();
        if (!info) return;
        let data: ResponseLBEnterRoomVO = decodeResponseLBEnterRoomVO(info);
        this._initRoomInfo(data);
    }

    //初始化房间信息
    _initRoomInfo(info: ResponseLBEnterRoomVO) {
        let { betSelfCoinMap } = info;
        if (betSelfCoinMap) {
            for (let key in betSelfCoinMap) {
                this.betSelfCoinMap[key] = this.longToNumber(betSelfCoinMap[key]) / 100;
            }
        }
        this.initRoomInfo(info);
        this.initRecordHistroy(info.gameInfo.gameResultList);
    }

    /**初始化历史记录 */
    private initRecordHistroy(gameResultList: LBWinVO[]) {
        gameResultList = gameResultList.slice(gameResultList.length - 9, gameResultList.length);
        if (!cc.isValid(this.node)) return;
        gameResultList.reverse();
        this.historyNode.children.forEach(
            (node: cc.Node, index: number) => {
                let skel: HistoryBallSlkel = node.getComponent(HistoryBallSlkel);
                let item: LBWinVO = gameResultList[index];
                if (item) {
                    skel.init(item.ball, index);
                    skel.playBallSkel(1, false)
                }
            }
        )
    }

    resetAllChipsAreaNumber() {
        this.chipsNumLabel.forEach(
            lbl => {
                lbl.string = `0`
            }
        )
    }

    /**
     * 收集筹码到自己头像
     * @param chips 
     */
    flySelfAvatarArea(chips: number[], areaIndex: number) {
        let moveAnim = (node, targetPos, delay, isLat) => {
            cc.tween(node).delay(delay).parallel(
                cc.tween().to(0.5, { scale: 0.6 }, { easing: 'sineInOut' }),
                cc.tween().to(0.5, { position: targetPos }, { easing: 'sineInOut' })
            ).call(() => {
                PoolMgr.setNode(node)
                if (isLat) {
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
            }).start()
        }

        let areaNode: cc.Node = this.getChipsAreaNode(`${areaIndex + 1}`);
        let startPos = this.selfChipsProductAreaNode.convertToNodeSpaceAR(areaNode.convertToWorldSpaceAR(areaNode.getPosition()))

        let areaNodes: cc.Node[] = []
        for (let i = 0; i < chips.length; i++) {
            let x = Math.random() * areaNode.width - areaNode.width / 2
            let y = Math.random() * areaNode.height - areaNode.height / 2
            let chipNode = this.productChipsNode(chips[i], `${areaIndex}`, this.betNums);
            areaNodes.push(chipNode)
            let pos = startPos.add(cc.v2(x, y))
            chipNode.parent = this.selfChipsProductAreaNode
            chipNode.setPosition(pos)
        }
        let targetPos = this.selfChipsSourcePos;
        let stepDelay = 0.1 / areaNodes.length
        for (let i = 0; i < areaNodes.length; i++) {
            moveAnim(areaNodes[i], targetPos, stepDelay * i, i == areaNodes.length - 1)
        }
    }

    /**
    * 筹码飞向点亮的中奖区域
    * @param areaIndex 
    * @param areaType 
    */
    flyActiveArea(areaIndex: number) {
        SoundMgr.playEffectByBundle('common', 'audio/collectchips');
        let startNode = this.colorBallSkel.node;
        let startPost = this.chipsProductAreaNode.convertToNodeSpaceAR(
            startNode.convertToWorldSpaceAR(startNode.getPosition()))

        let targetAreaNode: cc.Node = this.getChipsAreaNode(`${areaIndex + 1}`);

        let areaNodes: cc.Node[] = []
        for (let i = 0; i < 50; i++) {
            let chipNode = this.productChipsNode(this.betNums[CommonUtil.randomInt(0, 5)], `${areaIndex}`, this.betNums);
            areaNodes.push(chipNode)
        }
        let stepDelay = 0.1 / areaNodes.length

        for (let i = 0; i < areaNodes.length; i++) {
            areaNodes[i].parent = this.chipsProductAreaNode
            areaNodes[i].setPosition(startPost)
            let x = Math.random() * targetAreaNode.width - targetAreaNode.width / 2
            let y = Math.random() * targetAreaNode.height - targetAreaNode.height / 2
            let targetPos = this.chipsProductAreaNode.convertToNodeSpaceAR(
                targetAreaNode.convertToWorldSpaceAR(targetAreaNode.getPosition().add(cc.v2(x, y))))
            cc.tween(areaNodes[i]).delay(stepDelay * i).parallel(
                cc.tween().to(0.5, { scale: 0.6 }, { easing: 'sineInOut' }),
                cc.tween().to(0.5, { position: targetPos }, { easing: 'sineInOut' })
            ).start()
        }
    }

    private chipsArray: number[] = [];
    private checkChipsNum(num: number) {
        if (num < 2) return [];
        let array: number[] = [5000, 1000, 500, 100, 10, 2]
        let currIndex: number = -1
        for (let i = 0; i < array.length; i++) {
            if (num >= array[i]) {
                currIndex = i;
                break;
            }
        }

        let currChip: number = array[currIndex]
        let maxCount: number = Math.floor(num / currChip);
        for (let i = 0; i < maxCount; i++) {
            this.chipsArray.push(currChip)
        }
        let leftChips: number = num - maxCount * currChip;
        if (leftChips >= 2) {
            this.checkChipsNum(leftChips)
        }
    }

    /**
     * 显示/隐藏 中码区域 激活动画时
     * @param awardCode 中奖号码
     */
    activeWinAreaAnim(awardIndex: number, show: boolean = true) {
        this.awardNode[awardIndex].active = show;
    }

    _reset() {
        this.winBonus = 0;
        this.playColorBallSkel(0, false);
        this.betSelfCoinMap = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
            10: 0,
            11: 0,
            12: 0,
            13: 0
        };
        SysConfig.settling = false;
        this.resetAllChipsAreaNumber();
        for (let i = 0; i < this.awardNode.length; i++) {
            this.activeWinAreaAnim(i, false);
        }
        let chipsProductAreaNode: cc.Node = this.chipsProductAreaNode;
        if (chipsProductAreaNode.childrenCount > 0) {
            chipsProductAreaNode.children.forEach((node) => {
                node.destroy();
            })
        }
        this.statusWaitingSkel.node.active = !this.isBetTime;
    }

    _gameStart(data: Uint8Array) {
        let info: NotifyLBBeginBetVO = decodeNotifyLBBeginBetVO(data);
        this.isBetTime = true;
        this._reset();
        this.gameStart(info);
    }

    _gameBet(data: Uint8Array) {
        if (!this.isBetTime || this.curTime <= 0) return;
        let info: NotifyBetVO = decodeNotifyBetVO(data);
        this.gameBet(info);
    }

    async _gameEnd(data: Uint8Array) {
        let info: NotifyLBDrawVO = decodeNotifyLBDrawVO(data);
        let { gameResult } = info;
        this.gameEnd(info);
        let { ball, id } = gameResult
        this.isBetTime = false
        //如果抽奖结果出现，则播放出奖动画a
        this.playColorBallSkel(2, true)
        let gameNum = this.gameNum;
        await CocosUtil.sleepSync(3)
        if (gameNum != this.gameNum || !cc.isValid(this.node) || this.colorBallSkel.animation == 'Colorball0') return;
        this.playColorBallSkel(3, false)
        this.shakeBallOver(ball)
        await CocosUtil.sleepSync(1)
        if (gameNum != this.gameNum || !cc.isValid(this.node) || this.colorBallSkel.animation == 'Colorball0') return;
        //1秒后，点亮中奖区
        for (let i = 0; i < id.length; i++) {
            this.activeWinAreaAnim(id[i] - 1)
        }
        await CocosUtil.sleepSync(2.3)
        if (gameNum != this.gameNum || !cc.isValid(this.node) || this.colorBallSkel.animation == 'Colorball0') return;
        //2.3秒后，更新9个最新的历史中奖记录
        this.initRecordHistroy(this.gameResultList);
        await CocosUtil.sleepSync(0.7)
        if (gameNum != this.gameNum || !cc.isValid(this.node) || this.colorBallSkel.animation == 'Colorball0') return;
        //剩余4秒时，开始播放筹码放入点亮的中奖区域，并且
        //飞到range激活块
        for (let i = 0; i < id.length; i++) {
            this.flyActiveArea(id[i] - 1)
        }
        await CocosUtil.sleepSync(1.2)
        if (gameNum != this.gameNum || !cc.isValid(this.node) || this.colorBallSkel.animation == 'Colorball0') return;
        let selfBuyChipsData = this.betSelfCoinMap;
        if (this.winBonus > 0) {
            for (let key in selfBuyChipsData) {
                if ((+key == id[0] || +key == id[1]) && selfBuyChipsData[key] > 0) {
                    this.chipsArray = [];
                    this.checkChipsNum(this.winBonus);
                    if (this.chipsArray.length)
                        this.flySelfAvatarArea(Object.assign([], this.chipsArray), +key - 1);
                }
            }
        }
        this.flyChipsProductSource();
    }

    /**
     * 服务器推送消息
     * @param data 
     */
    onRecvGameData(info: SocketPushConfig) {
        if (SysConfig.isHide) return;
        let { mergeCmd, code, data } = info;
        let cmd: number = CmdMgr.getCmd(mergeCmd);
        let subCmd: number = CmdMgr.getSubCmd(mergeCmd);
        if (cmd == Push_GameCmd && subCmd == Push_Game_TackOutCmd) {
            this.tackOut();
            return;
        }
        if (cmd == Push_GameCmd && subCmd == Push_Game_SelfBetCmd) {
            this.selfBetChips(data ? decodeAreaPointBetCoinsVO(data) : null);
            return;
        }
        if (cmd != Push_LuckyBallCmd) {
            return;
        }
        switch (subCmd) {
            case Push_Game_BetCmd:
                this._gameBet(data);
                break;
            case Push_Game_StartCmd:
                this._gameStart(data);
                break;
            case Push_Game_EndCmd:
                this._gameEnd(data);
                break;
        }
    }

    onEventShow() {
        this._reset();
        this.isReload = true;
        this._enterRoom();
    }

    renderHistoryBalls() {
        for (let i = 0; i < 9; i++) {
            let histBall: cc.Node = cc.instantiate(this.historyBallPrefab);
            histBall.parent = this.historyNode
            histBall.setPosition(this.historyBallPosArr[i])
        }
    }

    shakeBallOver(ballValue: number) {
        this.playColorBallSkel(3, false);
        this.colorBallShakeOver(this.colorBallSkelColorArr[this.ballValueToSprite[ballValue]], ballValue)
    }

    /**
     * 播放摇奖动画
     * @param step - 摇奖的某个阶段 0 - 4 共五个阶段
     * @param loop - 当前阶段的动画是否循环播放
     */
    playColorBallSkel(step: number, loop: boolean) {
        //0 - 初始静止阶段
        //1 - 摇动后会暂停一会（目前感觉这个动画没用）
        //2 - 快速摇奖阶段
        //3 - 摇奖结果出来后出球动画
        //4 - 这个整个装球的盒子都消失的状态（目前感觉这个动画没用）
        this.colorBallSkel.setAnimation(0, this.colorBallSkelArr[step], loop);
        this.colorBallSkel.setCompleteListener(() => {
            if (step == 3) {
                //第三个阶段在动画结束后，需要特殊处理
                let attachUtil = this.colorBallSkel['attachUtil'];
                attachUtil.destroyAllAttachedNodes();
            }
        })
    }

    /**
     * 摇奖结束，出球时，设置出球信息
     * @param ballColor 出球颜色
     * @param ballValue 出球号码
     */
    colorBallShakeOver(ballColor: any, ballValue: number) {
        this.colorBallSkel.setAttachment('tex/Ball_x1', `tex/Ball_x${ballColor.index}`)
        let attachUtil = this.colorBallSkel[`attachUtil`];
        attachUtil.generateAllAttachedNodes();
        // 因为同名骨骼可能不止一个，所以需要返回数组
        let boneNodes = attachUtil.getAttachedNodes('text');
        // 取第一个骨骼作为挂点
        let boneNode = boneNodes[0];

        this.ballTextNode = cc.instantiate(this.ballTextPrefab)
        boneNode.addChild(this.ballTextNode)
        const attLbl: cc.Label = this.ballTextNode.getComponent(cc.Label);
        attLbl.string = `${ballValue}`
        this.ballTextNode.color = cc.color().fromHEX(ballColor.color)

        this.scheduleOnce(() => {
            this.colorBallSkel.setAttachment('tex/Ball_x1', `tex/Ball_empty`)
            this.ballTextNode.removeFromParent()
            this.ballTextNode.destroy()
        }, 1.9)
    }

    onAreaClick(e: cc.Event.EventTouch, type: string) {
        let chips = this.betNums[this.betIndex];
        if (!this.betSelfCoinMap[type]) this.betSelfCoinMap[type] = 0;
        this.betSelfCoinMap[type] = this.betSelfCoinMap[type] + chips;
        this.buyBetChips(type);
    }

}
