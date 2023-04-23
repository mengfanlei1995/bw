import SysConfig from "../../../scripts/data/SysConfig";
import { HALL_EVT, REPORT_EVT } from "../../../scripts/enum/DeskEnum";
import { SocketEvent } from "../../../scripts/enum/SocketEnum";
import EventMgr from "../../../scripts/mgr/EventMgr";
import PoolMgr from "../../../scripts/mgr/PoolMgr";
import { SocketPushConfig } from "../../../scripts/model/ServerConfig";
import { Push_Game_TackOutCmd } from "../../../scripts/net/CmdData";
import { Push_Game_BetCmd } from "../../../scripts/net/CmdData";
import { Push_Game_StartCmd } from "../../../scripts/net/CmdData";
import { Push_LuckyDiceCmd } from "../../../scripts/net/CmdData";
import { Push_GameCmd } from "../../../scripts/net/CmdData";
import { Push_Game_EndCmd } from "../../../scripts/net/CmdData";
import { LuckyDiceCmd } from "../../../scripts/net/CmdData";
import CmdMgr from "../../../scripts/net/CmdMgr";
import { decodeNotifyLDBeginBetVO } from "../../../scripts/net/proto/room";
import { decodeNotifyLDDrawVO } from "../../../scripts/net/proto/room";
import { NotifyLDDrawVO } from "../../../scripts/net/proto/room";
import { NotifyLDBeginBetVO } from "../../../scripts/net/proto/room";
import { LDWinVO } from "../../../scripts/net/proto/room";
import { NotifyBetVO } from "../../../scripts/net/proto/room";
import { decodeNotifyBetVO } from "../../../scripts/net/proto/room";
import { ResponseLDEnterRoomVO, decodeResponseLDEnterRoomVO } from "../../../scripts/net/proto/room";
import UIBundleMgr from "../../../scripts/uiform/UIBundleMgr";
import UIGame from "../../../scripts/uiform/UIGame";


const { ccclass, property } = cc._decorator;

@ccclass
export default class LuckyDice extends UIGame {

    @property({ tooltip: '骰子动画', type: sp.Skeleton })
    diceSkel: sp.Skeleton = null;

    @property({ tooltip: "绿色", type: cc.SpriteFrame })
    greenSpriteFrame: cc.SpriteFrame = null
    @property({ tooltip: "红色", type: cc.SpriteFrame })
    redSpriteFrame: cc.SpriteFrame = null
    @property({ tooltip: "黄色", type: cc.SpriteFrame })
    yellowSpriteFrame: cc.SpriteFrame = null

    @property({ tooltip: "绿色", type: cc.Font })
    greenFont: cc.Font = null
    @property({ tooltip: "红色", type: cc.Font })
    redFont: cc.Font = null
    @property({ tooltip: "黄色", type: cc.Font })
    yellowFont: cc.Font = null

    start(): void {
        this.gameId = SysConfig.GameIDConfig.LuckyDice;
        this.gameCmd = LuckyDiceCmd;
        this.gameName = 'LuckyDice';
        this.historyName = 'LuckyDiceHistory';
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
        let data: ResponseLDEnterRoomVO = decodeResponseLDEnterRoomVO(info);
        this._initRoomInfo(data);
    }

    //初始化房间信息
    _initRoomInfo(info: ResponseLDEnterRoomVO) {
        this.initRoomInfo(info);
        this.initRecordHistroy(info.gameInfo.gameResultList);
    }

    /**初始化历史记录 */
    private initRecordHistroy(gameResultList: LDWinVO[]) {
        this.recordLayoutNode.removeAllChildren()
        if (gameResultList.length > 13) gameResultList = gameResultList.slice(gameResultList.length - 13, gameResultList.length)
        for (let i = 0; i < gameResultList.length; i++) {
            let node = this.productBallNode(gameResultList[i].dices)
            this.recordLayoutNode.addChild(node)
            if (i == gameResultList.length - 1) {
                let array = gameResultList[i].dices
                let skin: string = `D${array[0]}_${array[1]}`;
                this.diceSkel.setSkin(skin)
            }
        }
    }

    /**添加开奖记录 */
    async addAwardRecord(array) {
        if (this.recordLayoutNode.childrenCount >= 13) {
            this.lastNode.active = false;
            this.recordLayoutNode.getComponent(cc.Layout).enabled = false;
            this.recordLayoutNode.children[0].destroy();
            for (let i = 0; i < this.recordLayoutNode.childrenCount; i++) {
                let box: cc.Node = this.recordLayoutNode.children[i];
                let x = box.x - 40;
                cc.tween(box).to(1, { x: x }).start()
            }
        }
        let sum: number = array[0] + array[1]
        let tailGas: cc.Node = cc.instantiate(this.tailGasPrefab);
        tailGas.name = "tailGas";
        this.recordLayoutNode.addChild(tailGas)
        let node = this.productBallNode(array)
        this.recordLayoutNode.addChild(node)

        let pos;
        let time = 1.5;
        if (sum == 7) {
            pos = cc.v3(0, -155, 0)
        } else if (sum < 7) {
            pos = cc.v3(-170, -450, 0)
            time = 2.5
        } else {
            time = 2;
            pos = cc.v3(170, -450, 0)
        }
        node.position = pos;
        tailGas.position = pos;
        cc.tween(node).to(time, { position: cc.v3(230, 0, 0) }, { easing: 'sineInOut' })
            .call(() => {
                if (!cc.isValid(this.node)) return;
                this.recordLayoutNode.getComponent(cc.Layout).enabled = true;
                this.lastNode.active = true;
            })
            .start()

        cc.tween(tailGas).to(time, { position: cc.v3(230, 0, 0) }, { easing: 'sineInOut' })
            .call(() => {
                if (!cc.isValid(this.node)) return;
                cc.find("tailGas", this.recordLayoutNode).destroy();
            })
            .start()
    }

    /**
     * 开奖
     * @returns 
     */
    openAward(array: number[], id: string) {
        if (this.diceSkel.animation != "dice_2") return;
        EventMgr.emit(REPORT_EVT.CLICK, {
            element_id: "gameResult",
            element_name: "结算",
            element_type: "event",
            element_position: '',
            element_content: 'luckyDice',
        });
        let skin: string = `D${array[0]}_${array[1]}`;
        this.diceSkel.setSkin(skin)
        this.diceSkel.setAnimation(0, "dice_3", false)
        let gameNum = this.gameNum;
        this.diceSkel.setCompleteListener(() => {
            if (this.isReturn(gameNum)) return;
            if (this.diceSkel.animation == "dice_3") {
                this.awardNode[+id - 1].active = true;
                for (let i = 1; i < 4; i++) {
                    if (i.toString() != id) {
                        this.flyCenterArea(i.toString())
                    }
                }
                cc.tween(this.node).delay(1.3).call(() => {
                    if (this.isReturn(gameNum)) return;
                    if (this.diceSkel.animation == "dice_3") {
                        this.flyWinArea(id)
                        this.diceSkel.setAnimation(0, "dice_4", false)
                    };
                }).start()
                cc.tween(this.node).delay(2.5).call(() => {
                    if (this.isReturn(gameNum)) return;
                    if (this.diceSkel.animation == "dice_4") {
                        this.addAwardRecord(array);
                        if (this.winBonus > 0) {
                            this._flyPlayerArea(id);
                        } else {
                            this.flyChipsProductSource()
                            SysConfig.settling = false;
                        }
                    }
                }).start()
            } else if (this.diceSkel.animation == "dice_4") {
                this.chipsProductAreaNode.zIndex = 2;
                this.diceSkel.node.zIndex = 1;
            }
        })
    }

    /**筹码飞向玩家动画 */
    _flyPlayerArea(id: string) {
        let posArray: cc.Vec3[] = [cc.v3(-170, -450, 0), cc.v3(0, -155, 0), cc.v3(170, -450, 0)];
        this.flyPlayerArea(id, posArray);
    }

    _reset() {
        this.diceSkel.setAnimation(0, "dice_0", false);
        this.reset();
    }

    _gameStart(data: Uint8Array) {
        let info: NotifyLDBeginBetVO = decodeNotifyLDBeginBetVO(data);
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
        let info: NotifyLDDrawVO = decodeNotifyLDDrawVO(data);
        let { gameInfo, gameResult } = info;
        let { dices, id } = gameResult;
        this.diceSkel.node.zIndex = 2;
        let gameNum = this.gameNum;
        this.diceSkel.setAnimation(0, "dice_1", false);
        this.diceSkel.setCompleteListener(() => {
            if (this.diceSkel.animation == "dice_1" && gameInfo.gameNum == gameNum) {
                this.diceSkel.setAnimation(0, "dice_2", true)
            }
        })
        this.scheduleOnce(this.openAward.bind(this, dices, `${id}`), 3);
        this.gameEnd(info);
    }

    /**
     * 服务器推送消息
     * @param data 
     */
    onRecvGameData(info: SocketPushConfig) {
        let { mergeCmd, code, data } = info;
        let cmd: number = CmdMgr.getCmd(mergeCmd);
        let subCmd: number = CmdMgr.getSubCmd(mergeCmd);
        if (cmd == Push_GameCmd && subCmd == Push_Game_TackOutCmd) {
            this.tackOut();
            return;
        }
        if (cmd != Push_LuckyDiceCmd) {
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
        this._enterRoom();
    }

    /**
     * 生产记录
     * @param value 
     * @returns 
     */
    public productBallNode(array: number[]): cc.Node {
        let node = new cc.Node();
        let sum: number = array[0] + array[1];
        let sp = node.addComponent(cc.Sprite);
        let lbNode = new cc.Node();
        lbNode.y = -3;
        let lb: cc.Label = lbNode.addComponent(cc.Label);
        node.addChild(lbNode);
        lb.string = `${sum}`;
        lb.fontSize = 24;
        if (sum == 7) {
            sp.spriteFrame = this.greenSpriteFrame;
            lb.font = this.greenFont;
        } else if (sum < 7) {
            sp.spriteFrame = this.redSpriteFrame;
            lb.font = this.redFont;
        } else {
            sp.spriteFrame = this.yellowSpriteFrame;
            lb.font = this.yellowFont;
        }
        return node;
    }

}
