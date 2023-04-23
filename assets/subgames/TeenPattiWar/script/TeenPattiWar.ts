import SysConfig from "../../../scripts/data/SysConfig";
import { HALL_EVT, REPORT_EVT } from "../../../scripts/enum/DeskEnum";
import { SocketEvent } from "../../../scripts/enum/SocketEnum";
import EventMgr from "../../../scripts/mgr/EventMgr";
import PoolMgr from "../../../scripts/mgr/PoolMgr";
import SoundMgr from "../../../scripts/mgr/SoundMgr";
import { SocketPushConfig } from "../../../scripts/model/ServerConfig";
import { Push_GameCmd, Push_Game_BetCmd, Push_Game_EndCmd, Push_Game_StartCmd, Push_Game_TackOutCmd, Push_TPWarCmd, TPWarCmd } from "../../../scripts/net/CmdData";
import CmdMgr from "../../../scripts/net/CmdMgr";
import { NotifyBetVO, NotifyTPWBeginBetVO, ResponseTPEnterRoomVO, NotifyTPWDrawVO, TPWWinVO, decodeNotifyBetVO, decodeNotifyTPWBeginBetVO, decodeResponseTPEnterRoomVO, decodeNotifyTPWDrawVO } from "../../../scripts/net/proto/room";
import UIBundleMgr from "../../../scripts/uiform/UIBundleMgr";
import UIGame from "../../../scripts/uiform/UIGame";
import Poker from "../../common/script/Poker";
import TPRecordItem from "./TPRecordItem";


const { ccclass, property } = cc._decorator;

@ccclass
export default class TeenPattiWar extends UIGame {

    @property({ tooltip: '扑克动画', type: sp.Skeleton })
    pokerSkel: sp.Skeleton = null;
    @property({ tooltip: '赢家动画K', type: sp.Skeleton })
    winKSkel: sp.Skeleton = null;
    @property({ tooltip: '牌型动画K', type: sp.Skeleton })
    cardTypeKSkel: sp.Skeleton = null;
    @property({ tooltip: '赢家动画Q', type: sp.Skeleton })
    winQSkel: sp.Skeleton = null;
    @property({ tooltip: '牌型动画Q', type: sp.Skeleton })
    cardTypeQSkel: sp.Skeleton = null;
    @property({ tooltip: '扑克', type: cc.Node })
    poker: cc.Node[] = [];
    @property({ tooltip: '流水预制', type: cc.Prefab })
    recordPrefab: cc.Prefab = null;

    public readonly LUCKYHIT_ID: string = "1";
    public readonly KING_ID: string = "2";
    public readonly QUEEN_ID: string = "3";

    start(): void {
        this.gameId = SysConfig.GameIDConfig.TeenPattiWar;
        this.gameCmd = TPWarCmd;
        this.gameName = 'TeenPattiWar';
        this.historyName = 'TeenPattiWarHistory';
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
        let data: ResponseTPEnterRoomVO = decodeResponseTPEnterRoomVO(info);
        this._initRoomInfo(data);
    }

    //初始化房间信息
    _initRoomInfo(info: ResponseTPEnterRoomVO) {
        this.initRoomInfo(info);
        this.initRecordHistroy(info.gameInfo.gameResultList);
    }

    /**初始化历史记录 */
    private initRecordHistroy(gameResultList: TPWWinVO[]) {
        this.recordLayoutNode.removeAllChildren();
        if (gameResultList.length > 15) gameResultList = gameResultList.slice(gameResultList.length - 15, gameResultList.length);
        for (let i = 0; i < gameResultList.length; i++) {
            let node = this.productRecordNode(gameResultList[i].id);
            this.recordLayoutNode.addChild(node);
        }
    }

    onEventShow() {
        this._reset();
        this.isReload = true;
        this._enterRoom();
    }

    /**添加开奖记录 */
    async addAwardRecord(id: number[]) {
        let recordNode: cc.Node = this.recordLayoutNode
        let childCount: number = recordNode.childrenCount
        if (childCount >= 15) {
            this.lastNode.active = false;
            recordNode.getComponent(cc.Layout).enabled = false;
            recordNode.children[0].destroy();
            for (let i = 0; i < childCount; i++) {
                let box: cc.Node = recordNode.children[i];
                let x = box.x - 34;
                cc.tween(box).to(1, { x: x }).start()
            }
        }
        let tailGas: cc.Node = cc.instantiate(this.tailGasPrefab);
        tailGas.name = "tailGas";
        recordNode.addChild(tailGas)
        let node = this.productRecordNode(id)
        recordNode.addChild(node)

        let pos;
        let time = 1.5;
        let result = id[0] > 1 ? id[0] : id[1];
        if (`${result}` == this.KING_ID) {
            pos = cc.v3(-150, -440, 0)
        } else {
            time = 2;
            pos = cc.v3(210, -440, 0)
        }
        node.position = pos;
        tailGas.position = pos;
        cc.tween(node).to(time, { position: cc.v3(222, 0, 0) }, { easing: 'sineInOut' })
            .call(() => {
                if (!cc.isValid(this.node)) return;
                recordNode.getComponent(cc.Layout).enabled = true;
                this.lastNode.active = true;
            })
            .start()

        cc.tween(tailGas).to(time, { position: cc.v3(222, 0, 0) }, { easing: 'sineInOut' })
            .call(() => {
                if (!cc.isValid(this.node)) return;
                cc.find("tailGas", recordNode).destroy();
            })
            .start()
    }

    /**
     * 开奖
     * @returns 
     */
    openAward(gameResult: TPWWinVO) {
        let { id, king, queen, gameNum } = gameResult;
        EventMgr.emit(REPORT_EVT.CLICK, {
            element_id: "gameResult",
            element_name: "结算",
            element_type: "event",
            element_position: '',
            element_content: 'TeenPattiWar',
        });
        this.setPokerSkel(true, "Cards_y1");
        this.pokerSkel.setCompleteListener(() => {
            let flag: boolean = gameNum != this.gameNum || this.isReload;
            if (flag) return;
            let currAnim: string = this.pokerSkel.animation
            if (currAnim == "Cards_y1") {
                this.setPokerSkel(true, "Cards_y3", gameResult);
            } else if (currAnim == "Cards_y3") {
                let win: number = id[0] > 1 ? id[0] : id[1];
                this.setCardTypeSkel(this.cardTypeKSkel, king.paisAttr);
                this.setCardTypeSkel(this.cardTypeQSkel, queen.paisAttr);
                cc.tween(this.node).delay(0.5).call(() => {
                    if (flag) return;
                    this.setWinSkel(win == 2 ? this.winKSkel : this.winQSkel);
                }).start()
                for (let i = 0; i < id.length; i++) {
                    this.awardNode[+id - 1].active = true;
                }
                for (let i = 1; i <= 3; i++) {
                    if (i != id[0] && i != id[1]) {
                        this.flyCenterArea(i.toString())
                    }
                }
                cc.tween(this.node).delay(1.3).call(() => {
                    if (flag) return;
                    this._flyWinArea(id);
                }).start()
                cc.tween(this.node).delay(2.5).call(() => {
                    if (flag) return;
                    this.addAwardRecord(id);
                    if (this.winBonus > 0) {
                        this._flyPlayerArea(id);
                    } else {
                        this.flyChipsProductSource()
                        SysConfig.settling = false;
                    }
                }).start()
            }
        })
    }

    /**
    * 筹码飞向赢家区域
    * @param areaType 
    */
    _flyWinArea(areaType: number[]) {
        SoundMgr.playEffectByBundle('common', 'audio/collectchips');
        let targetAreaNode1: cc.Node
        let targetAreaNode2: cc.Node
        targetAreaNode1 = this.getChipsAreaNode(`${areaType[0]}`)
        targetAreaNode2 = this.getChipsAreaNode(`${areaType[1]}`)
        let childrens: cc.Node[] = this.chipsProductAreaNode.children
        let areaNodes: cc.Node[] = []
        let j = 0
        for (let i = 0; i < childrens.length; i++) {
            if (childrens[i].name != `${areaType[0]}` && childrens[i].name != `${areaType[1]}`) {
                areaNodes[j++] = childrens[i]
            }
        }
        let stepDelay = 0.1 / areaNodes.length
        for (let i = 0; i < areaNodes.length; i++) {
            let targetAreaNode: cc.Node = areaType[1] ? i % 2 == 0 ? targetAreaNode1 : targetAreaNode2 : targetAreaNode1;
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

    /**筹码飞向玩家动画 */
    _flyPlayerArea(id: number[]) {
        this.flyChipsProductSource()
        let chipsArray: number[] = [];
        function checkChipsNum(num: number) {
            if (num < 2) return;
            let array: number[] = [5000, 1000, 500, 100, 10, 2]
            for (let i = 0; i < array.length; i++) {
                if (num >= array[i]) {
                    chipsArray.push(array[i])
                    return checkChipsNum(num - array[i])
                }
            }
        }
        checkChipsNum(this.winBonus);
        if (chipsArray.length == 0) {
            SysConfig.settling = false;
            return;
        }
        for (let i = 0; i < id.length; i++) {
            let label: cc.Label = this.selfBetChipsNumLabel[id[i] - 1];
            if (!(+label.string > 0)) {
                id.splice(i, 1);
            }
        }
        for (let i = 0; i < chipsArray.length; i++) {
            let targetAreaNode: cc.Node = this.getChipsAreaNode(`${(id[i % id.length])}`);
            let x = Math.random() * targetAreaNode.width - targetAreaNode.width / 2
            let y = Math.random() * targetAreaNode.height - targetAreaNode.height / 2
            let pos = this.chipsProductAreaNode.convertToNodeSpaceAR(
                targetAreaNode.convertToWorldSpaceAR(targetAreaNode.getPosition().add(cc.v2(x, y))))
            let node = this.productChipsNode(chipsArray[i], "", this.betNums)
            this.chipsProductAreaNode.addChild(node)
            node.position = cc.v3(pos.x, pos.y, 0);
            cc.tween(node).to(0.6, { position: cc.v3(this.selfChipsSourcePos.x, this.selfChipsSourcePos.y, 0) }, { easing: 'sineInOut' })
                .call(() => {
                    PoolMgr.setNode(node)
                    if (i == chipsArray.length - 1) {
                        SysConfig.settling = false;
                        this.winBonusAni.string = `+${this.winBonus}`;
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

    _reset() {
        this.winKSkel.node.active = false;
        this.winQSkel.node.active = false;
        this.cardTypeKSkel.node.active = false;
        this.cardTypeQSkel.node.active = false;
        this.reset();
    }

    _gameStart(data: Uint8Array) {
        let info: NotifyTPWBeginBetVO = decodeNotifyTPWBeginBetVO(data);
        this.isBetTime = true;
        this._reset();
        this.setPokerSkel();
        this.gameStart(info);
    }

    _gameBet(data: Uint8Array) {
        if (!this.isBetTime || this.curTime <= 0) return;
        let info: NotifyBetVO = decodeNotifyBetVO(data);
        this.gameBet(info);
    }

    _gameEnd(data: Uint8Array) {
        let info: NotifyTPWDrawVO = decodeNotifyTPWDrawVO(data);
        let { gameResult } = info;
        this.scheduleOnce(this.openAward.bind(this, gameResult), 1);
        this.gameEnd(info);
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
        if (cmd != Push_TPWarCmd) {
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


    /**设置牌型动画 */
    public setCardTypeSkel(skel: sp.Skeleton, index: number) {
        skel.node.active = true;
        let array = [" ", "tex/HighCard", "tex/2_8 Pair", "tex/9_APair", "tex/Color", "tex/Sequence", "tex/Pure Sequence", "tex/Set"];
        skel.setAttachment('tex', array[index]);
        skel.setAnimation(0, "text", false);
    }

    public setWinSkel(skel: sp.Skeleton) {
        skel.node.active = true;
        skel.setAnimation(0, "win", false);
    }

    /**设置扑克牌 动画 牌值等 */
    public setPokerSkel(active: boolean = false, name: string = "", gameResult: any = null) {
        let cardArray: string[] = [];
        if (gameResult) {
            let { king, queen } = gameResult;
            cardArray = king.pais.concat(queen.pais);
        }
        this.pokerSkel.node.active = active;
        let track;
        if (active) track = this.pokerSkel.setAnimation(0, name, false);
        if (name == "Cards_y3") {
            this.pokerSkel.setTrackEventListener(track, (trackIdx, evt) => {
                if (evt.data.name == "Lift") {
                    for (let i = 0; i < 3; i++) {
                        let huase = cardArray[i].slice(0, 1);
                        let card = cardArray[i].slice(1);
                        this.poker[i].active = true;
                        this.poker[i].getComponent(Poker).init(huase, card, false);
                    }
                } else {
                    for (let i = 3; i < 6; i++) {
                        let huase = cardArray[i].slice(0, 1);
                        let card = cardArray[i].slice(1);
                        this.poker[i].active = true;
                        this.poker[i].getComponent(Poker).init(huase, card, false);
                    }
                }
            })
        } else {
            for (let i = 0; i < this.poker.length; i++) {
                if (name == "Cards_y2") {
                    let huase = cardArray[i].slice(0, 1);
                    let card = cardArray[i].slice(1);
                    this.poker[i].active = true;
                    this.poker[i].getComponent(Poker).init(huase, card, false);
                } else {
                    this.poker[i].active = false;
                }
            }
        }
    }

    /**
     * 生产记录
     * @param value 
     * @returns cc.Node
     */
    public productRecordNode(id: number[]): cc.Node {
        let node = cc.instantiate(this.recordPrefab);
        node.getComponent(TPRecordItem).init(id);
        return node;
    }

}
