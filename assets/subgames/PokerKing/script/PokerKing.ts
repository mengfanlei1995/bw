import SysConfig from "../../../scripts/data/SysConfig";
import { HALL_EVT, REPORT_EVT } from "../../../scripts/enum/DeskEnum";
import { SocketEvent } from "../../../scripts/enum/SocketEnum";
import EventMgr from "../../../scripts/mgr/EventMgr";
import PoolMgr from "../../../scripts/mgr/PoolMgr";
import SoundMgr from "../../../scripts/mgr/SoundMgr";
import { SocketPushConfig } from "../../../scripts/model/ServerConfig";
import { PokerKingCmd, Push_GameCmd, Push_Game_BetCmd, Push_Game_EndCmd, Push_Game_SelfBetCmd, Push_Game_StartCmd, Push_Game_TackOutCmd, Push_PokerKingCmd } from "../../../scripts/net/CmdData";
import CmdMgr from "../../../scripts/net/CmdMgr";
import { NotifyBetVO, NotifyPKBeginBetVO, ResponsePKEnterRoomVO, NotifyPKDrawVO, PKWinVO, decodeNotifyBetVO, decodeNotifyPKBeginBetVO, decodeResponsePKEnterRoomVO, decodeNotifyPKDrawVO, decodeAreaPointBetCoinsVO } from "../../../scripts/net/proto/room";
import UIBundleMgr from "../../../scripts/uiform/UIBundleMgr";
import UIGame from "../../../scripts/uiform/UIGame";
import Poker from "../../common/script/Poker";
import PokerSmall from "../../common/script/PokerSmall";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PokerKing extends UIGame {

    @property({ tooltip: '扑克动画', type: sp.Skeleton })
    pokerSkel: sp.Skeleton = null;

    @property({ tooltip: '记录预制体', type: cc.Prefab })
    recordPrefab: cc.Prefab = null;

    public readonly JOKER_ID: string = "1";
    public readonly BLACK_ID: string = "2";
    public readonly RED_ID: string = "3";
    public readonly HEITAO_ID: string = "4";
    public readonly HONGTAO_ID: string = "5";
    public readonly MEIHUA_ID: string = "6";
    public readonly FANGKUAI_ID: string = "7";

    start(): void {
        this.gameId = SysConfig.GameIDConfig.PokeKing;
        this.gameCmd = PokerKingCmd;
        this.gameName = 'PokerKing';
        this.historyName = 'PokerKingHistory';
        this.singleAreaMaxChipsNum = 20;
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
        let data: ResponsePKEnterRoomVO = decodeResponsePKEnterRoomVO(info);
        this._initRoomInfo(data);
    }

    //初始化房间信息
    _initRoomInfo(info: ResponsePKEnterRoomVO) {
        this.initRoomInfo(info);
        this.initRecordHistroy(info.gameInfo.gameResultList);
    }

    /**初始化历史记录 */
    private initRecordHistroy(gameResultList: PKWinVO[]) {
        this.recordLayoutNode.removeAllChildren()
        if (gameResultList.length > 11) gameResultList = gameResultList.slice(gameResultList.length - 11, gameResultList.length)
        for (let i = 0; i < gameResultList.length; i++) {
            let node = this.productRecordNode(gameResultList[i].poker)
            this.recordLayoutNode.addChild(node)
        }
    }

    /**添加开奖记录 */
    async addAwardRecord(awardCode) {
        let recordNode: cc.Node = this.recordLayoutNode
        let childCount: number = recordNode.childrenCount
        if (childCount >= 11) {
            this.lastNode.active = false;
            recordNode.getComponent(cc.Layout).enabled = false;
            recordNode.children[0].destroy();
            for (let i = 0; i < childCount; i++) {
                let box: cc.Node = recordNode.children[i];
                let x = box.x - 48;
                cc.tween(box).to(1, { x: x }).start()
            }
        }
        let array = awardCode.split(",")
        let huase = +array[0];
        let tailGas: cc.Node = cc.instantiate(this.tailGasPrefab);
        tailGas.name = "tailGas";
        recordNode.addChild(tailGas)
        let node = this.productRecordNode(awardCode)
        recordNode.addChild(node)

        let pos;
        let time = 1;
        if (huase == 4) {
            pos = cc.v3(0, -50, 0)
        } else {
            let is: boolean = false;
            if (!is) {
                if (huase == 0) {
                    pos = cc.v3(-275, -370, 0)
                    time = 2;
                } else if (huase == 1) {
                    pos = cc.v3(275, -370, 0)
                    time = 1.8;
                } else if (huase == 2) {
                    pos = cc.v3(-90, -370, 0)
                    time = 1.6;
                } else {
                    pos = cc.v3(90, -370, 0)
                    time = 1.5;
                }
            }
        }
        node.position = pos;
        tailGas.position = pos;
        cc.tween(node).to(time, { position: cc.v3(229, 0, 0) }, { easing: 'sineInOut' })
            .call(() => {
                if (!cc.isValid(this.node)) return;
                recordNode.getComponent(cc.Layout).enabled = true;
                this.lastNode.active = true;
            })
            .start()

        cc.tween(tailGas).to(time, { position: cc.v3(229, 0, 0) }, { easing: 'sineInOut' })
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
    openAward(awardCode: string) {
        EventMgr.emit(REPORT_EVT.CLICK, {
            element_id: "gameResult",
            element_name: "结算",
            element_type: "event",
            element_position: '',
            element_content: 'pokerKing',
        });
        let huase = awardCode.slice(0, 1)
        let card = awardCode.slice(1)
        let random = Math.ceil(Math.random() * 3)
        this.pokerSkel.setAnimation(0, `ShuffleTheCards${random}`, false);
        let gameNum = this.gameNum;
        this.pokerSkel.setCompleteListener(() => {
            if (this.isReturn(gameNum)) return;
            if (this.pokerSkel.animation != `ShuffleTheCards${random}`) return;
            let poker: cc.Node = this.pokerSkel.node.children[0]
            poker.active = true;
            poker.getComponent(Poker).init(huase, card, true);
            this.scheduleOnce(() => {
                poker.getComponent(Poker).init(huase, card, false);
            }, 0.25)
            cc.tween(poker)
                .to(0.5, { scaleX: -1 })
                .call(() => {
                    if (this.isReturn(gameNum)) return;
                    if (this.pokerSkel.animation != `ShuffleTheCards${random}`) return;
                    let idArray: string[] = [];
                    if (huase == "X" || huase == "D") {
                        idArray.push(this.JOKER_ID);
                        this.awardNode[0].active = true;
                        // this.jokerAwardNode.active = true;
                    } else {
                        idArray.push(+huase % 2 == 1 ? this.BLACK_ID : this.RED_ID)
                        if (huase == "1") {
                            idArray.push(this.HEITAO_ID);
                            this.awardNode[1].active = true;
                            this.awardNode[3].active = true;
                            // this.blackAwardNode.active = true;
                            // this.heitaoAwardNode.active = true;
                        } else if (huase == "2") {
                            idArray.push(this.HONGTAO_ID);
                            this.awardNode[2].active = true;
                            this.awardNode[4].active = true;
                            // this.redAwardNode.active = true;
                            // this.hongtaoAwardNode.active = true;
                        } else if (huase == "3") {
                            idArray.push(this.MEIHUA_ID);
                            this.awardNode[1].active = true;
                            this.awardNode[5].active = true;
                            // this.blackAwardNode.active = true;
                            // this.meihuaAwardNode.active = true;
                        } else {
                            idArray.push(this.FANGKUAI_ID);
                            this.awardNode[2].active = true;
                            this.awardNode[6].active = true;
                            // this.redAwardNode.active = true;
                            // this.fangkuaiAwardNode.active = true;
                        }
                    }
                    for (let i = 1; i < 8; i++) {
                        if (i.toString() != idArray[0] && i.toString() != idArray[1]) {
                            this.flyCenterArea(i.toString())
                        }
                    }
                    cc.tween(this.node).delay(1.3).call(() => {
                        if (this.isReturn(gameNum)) return;
                        if (this.pokerSkel.animation == `ShuffleTheCards${random}`) {
                            this._flyWinArea(idArray)
                        }
                    }).start()
                    cc.tween(this.node).delay(2.5).call(async () => {
                        if (this.isReturn(gameNum)) return;
                        if (this.pokerSkel.animation == `ShuffleTheCards${random}`) {
                            this.addAwardRecord(awardCode);
                            if (this.winBonus > 0) {
                                this._flyPlayerArea(awardCode);
                            } else {
                                this.flyChipsProductSource()
                                SysConfig.settling = false;
                            }
                        }
                    }).start()
                }).start()
        })
    }

    /**筹码飞向玩家动画 */
    _flyPlayerArea(awardCode) {
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
        let huase = awardCode.slice(0, 1);
        let card = awardCode.slice(1);
        for (let i = 0; i < chipsArray.length; i++) {
            let pos;
            let x;
            let y;
            if (huase == "X" || huase == "D") {
                x = Math.random() * this.chipsAreaNode[0].width - this.chipsAreaNode[0].width / 2
                y = Math.random() * this.chipsAreaNode[0].height - this.chipsAreaNode[0].height / 2
                pos = cc.v3(0 + x, -50 + y, 0)
            } else {
                let is: boolean = false;
                if (+huase % 2 == 0) {
                    if (+this.chipsNumLabel[2].string > 0) {
                        is = true;
                        x = Math.random() * this.chipsAreaNode[2].width - this.chipsAreaNode[2].width / 2
                        y = Math.random() * this.chipsAreaNode[2].height - this.chipsAreaNode[2].height / 2
                        pos = cc.v3(175 + x, -180 + y, 0)
                    }
                } else {
                    if (+this.chipsNumLabel[1].string > 0) {
                        is = true;
                        x = Math.random() * this.chipsAreaNode[1].width - this.chipsAreaNode[1].width / 2
                        y = Math.random() * this.chipsAreaNode[1].height - this.chipsAreaNode[1].height / 2
                        pos = cc.v3(-175 + x, -180 + y, 0)
                    }
                }

                if (!is) {
                    if (huase == "1") {
                        if (+this.chipsNumLabel[3].string > 0) {
                            x = Math.random() * this.chipsAreaNode[3].width - this.chipsAreaNode[3].width / 2
                            y = Math.random() * this.chipsAreaNode[3].height - this.chipsAreaNode[3].height / 2
                            pos = cc.v3(-275 + x, -370 + y, 0)
                        }
                    } else if (huase == "2") {
                        if (+this.chipsNumLabel[4].string > 0) {
                            x = Math.random() * this.chipsAreaNode[4].width - this.chipsAreaNode[4].width / 2
                            y = Math.random() * this.chipsAreaNode[4].height - this.chipsAreaNode[4].height / 2
                            pos = cc.v3(275 + x, -370 + y, 0)
                        }
                    } else if (huase == "3") {
                        if (+this.chipsNumLabel[5].string > 0) {
                            x = Math.random() * this.chipsAreaNode[5].width - this.chipsAreaNode[5].width / 2
                            y = Math.random() * this.chipsAreaNode[5].height - this.chipsAreaNode[5].height / 2
                            pos = cc.v3(-90 + x, -370 + y, 0)
                        }
                    } else {
                        if (+this.chipsNumLabel[6].string > 0) {
                            x = Math.random() * this.chipsAreaNode[6].width - this.chipsAreaNode[6].width / 2
                            y = Math.random() * this.chipsAreaNode[6].height - this.chipsAreaNode[6].height / 2
                            pos = cc.v3(90 + x, -370 + y, 0)
                        }
                    }
                }
            }
            let node = this.productChipsNode(chipsArray[i], "", this.betNums)
            this.chipsProductAreaNode.addChild(node)
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

    /**
    * 筹码飞向赢家区域
    * @param areaType 
    */
    _flyWinArea(areaType: string[]) {
        SoundMgr.playEffectByBundle('common', 'audio/collectchips');
        let targetAreaNode1: cc.Node
        let targetAreaNode2: cc.Node
        targetAreaNode1 = this.getChipsAreaNode(areaType[0])
        targetAreaNode2 = this.getChipsAreaNode(areaType[1])
        let childrens: cc.Node[] = this.chipsProductAreaNode.children
        let areaNodes: cc.Node[] = []
        let j = 0
        for (let i = 0; i < childrens.length; i++) {
            if (childrens[i].name != areaType[0] && childrens[i].name != areaType[1]) {
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

    _reset() {
        this.pokerSkel.setAnimation(0, "card_back", false);
        let poker = this.pokerSkel.node.children[0];
        if (poker.active && this.isBetTime) {
            this.scheduleOnce(() => {
                poker.getComponent(Poker).init("1", "2", true);
            }, 0.25)
            cc.tween(poker)
                .to(0.5, { scaleX: 1 })
                .call(() => {
                    poker.active = false;
                }).start()
        }
        this.isReload = false;
        SysConfig.settling = false;
        this.recordLayoutNode && (this.recordLayoutNode.getComponent(cc.Layout).enabled = true);
        this.winBonus = 0;
        for (let i = 0; i < this.awardNode.length; i++) {
            this.awardNode[i].active = false;
            this.selfBetChipsNumLabel[i].string = '0';
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

    _gameStart(data: Uint8Array) {
        let info: NotifyPKBeginBetVO = decodeNotifyPKBeginBetVO(data);
        this.isBetTime = true;
        this._reset();
        this.gameStart(info);
    }

    _gameBet(data: Uint8Array) {
        if (!this.isBetTime || this.curTime <= 0) return;
        let info: NotifyBetVO = decodeNotifyBetVO(data);
        this.gameBet(info);
    }

    _gameEnd(data: Uint8Array) {
        let info: NotifyPKDrawVO = decodeNotifyPKDrawVO(data);
        let { gameResult } = info;
        let { poker } = gameResult
        this.openAward(poker);
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
        if (cmd == Push_GameCmd && subCmd == Push_Game_SelfBetCmd) {
            this.selfBetChips(data ? decodeAreaPointBetCoinsVO(data) : null);
            return;
        }
        if (cmd != Push_PokerKingCmd) {
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

    /**
     * 记录
     * @param value 
     * @returns 
     */
    public productRecordNode(value: string) {
        let node = cc.instantiate(this.recordPrefab);
        let huase = value.slice(0, 1)
        let card = value.slice(1)
        node.getComponent(PokerSmall).init(huase, card)
        return node
    }

}
