import SysConfig from "../../../scripts/data/SysConfig";
import UserData from "../../../scripts/data/UserData";
import { HALL_EVT, REPORT_EVT } from "../../../scripts/enum/DeskEnum";
import { SocketEvent } from "../../../scripts/enum/SocketEnum";
import EventMgr from "../../../scripts/mgr/EventMgr";
import LangMgr from "../../../scripts/mgr/LangMgr";
import PoolMgr from "../../../scripts/mgr/PoolMgr";
import SoundMgr from "../../../scripts/mgr/SoundMgr";
import StorageMgr from "../../../scripts/mgr/StorageMgr";
import { SocketPushConfig } from "../../../scripts/model/ServerConfig";
import { Dice3Cmd, Push_Dice3Cmd, Push_Game_BetCmd, Push_Game_EndCmd, Push_Game_StartCmd, Push_GameCmd, Push_Game_TackOutCmd } from "../../../scripts/net/CmdData";
import CmdMgr from "../../../scripts/net/CmdMgr";
import SendMgr from "../../../scripts/net/SendMgr";
import { ResponseD3EnterRoomVO, NotifyD3BeginBetVO, NotifyD3DrawVO, D3WinVO, NotifyBetVO, decodeResponseD3EnterRoomVO, decodeNotifyD3BeginBetVO, decodeNotifyD3DrawVO, decodeNotifyBetVO } from "../../../scripts/net/proto/room";
import UIBundleMgr from "../../../scripts/uiform/UIBundleMgr";
import UIGame from "../../../scripts/uiform/UIGame";
import UIMgr from "../../../scripts/uiform/UIMgr";
import { DialogType } from "../../../scripts/uiform/ui/common/DiaLog";
import LogUtil from "../../../scripts/utils/LogUtil";


const { ccclass, property } = cc._decorator;

@ccclass
export default class DiceThree extends UIGame {

    @property({ tooltip: '骰子动画', type: sp.Skeleton })
    diceSkel: sp.Skeleton = null;
    @property({ tooltip: "绿色", type: cc.SpriteFrame })
    greenSpriteFrame: cc.SpriteFrame = null;
    @property({ tooltip: "红色", type: cc.SpriteFrame })
    indiumSpriteFrame: cc.SpriteFrame = null;
    @property({ tooltip: "黄色", type: cc.SpriteFrame })
    yellowSpriteFrame: cc.SpriteFrame = null;

    start(): void {
        this.gameId = SysConfig.GameIDConfig.Dice3;
        this.gameCmd = Dice3Cmd;
        this.gameName = 'DiceThree';
        this.historyName = 'DiceThreeHistory';
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
        let data: ResponseD3EnterRoomVO = decodeResponseD3EnterRoomVO(info);
        this._initRoomInfo(data);
    }

    //初始化房间信息
    _initRoomInfo(info: ResponseD3EnterRoomVO) {
        this.initRoomInfo(info);
        this.initRecordHistroy(info.gameInfo.gameResultList);
    }

    /**初始化历史记录 */
    private initRecordHistroy(gameResultList: D3WinVO[]) {
        this.recordLayoutNode.removeAllChildren()
        if (gameResultList.length > 15) gameResultList = gameResultList.slice(gameResultList.length - 15, gameResultList.length)
        for (let i = 0; i < gameResultList.length; i++) {
            let node = this.productBallNode(gameResultList[i].dices)
            this.recordLayoutNode.addChild(node)
            if (i == gameResultList.length - 1) {
                let array = gameResultList[i].dices
                this.diceSkel.setAttachment('tex/dice1', `tex/ds000${array[0]}`);
                this.diceSkel.setAttachment('tex/dice2', `tex/ds000${array[1]}`);
                this.diceSkel.setAttachment('tex/dice3', `tex/ds000${array[2]}`);
            }
        }
    }

    onEventShow() {
        this._reset();
        this._enterRoom();
    }

    /**添加开奖记录 */
    async addAwardRecord(array: number[]) {
        let recordNode: cc.Node = this.recordLayoutNode;
        let childCount: number = recordNode.childrenCount;
        if (childCount >= 15) {
            this.lastNode.active = false;
            recordNode.getComponent(cc.Layout).enabled = false;
            recordNode.children[0].destroy();
            for (let i = 0; i < childCount; i++) {
                let box: cc.Node = recordNode.children[i];
                let x = box.x - 35;
                cc.tween(box).to(1, { x: x }).start()
            }
        }
        let sum: number = array[0] + array[1] + array[2];
        let tailGas: cc.Node = cc.instantiate(this.tailGasPrefab);
        tailGas.name = "tailGas";
        recordNode.addChild(tailGas);
        let node = this.productBallNode(array);
        recordNode.addChild(node);
        let pos;
        let time = 1;
        if (array[0] == array[1] && array[0] == array[2]) {
            pos = cc.v3(30, -220, 0);
        } else {
            if (sum <= 10) {
                pos = cc.v3(-130, -485, 0);
                time = 2.5;
            } else {
                time = 2;
                pos = cc.v3(200, -485, 0);
            }
        }
        node.position = pos;
        tailGas.position = pos;
        cc.tween(node).to(time, { position: cc.v3(236, 0, 0) }, { easing: 'sineInOut' })
            .call(() => {
                if (!cc.isValid(this.node)) return;
                recordNode.getComponent(cc.Layout).enabled = true;
                this.lastNode.active = true;
            })
            .start()

        cc.tween(tailGas).to(time, { position: cc.v3(236, 0, 0) }, { easing: 'sineInOut' })
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
    openAward(array: number[], id: string) {
        if (this.diceSkel.animation != "dice_2") return;
        EventMgr.emit(REPORT_EVT.CLICK, {
            element_id: "gameResult",
            element_name: "结算",
            element_type: "event",
            element_position: '',
            element_content: 'diceThree',
        });
        this.diceSkel.setAttachment('tex/dice1', `tex/ds000${array[0]}`)
        this.diceSkel.setAttachment('tex/dice2', `tex/ds000${array[1]}`)
        this.diceSkel.setAttachment('tex/dice3', `tex/ds000${array[2]}`)
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
                    }
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
        let posArray: cc.Vec3[] = [cc.v3(-165, -300, 0), cc.v3(0, -20, 0), cc.v3(165, -300, 0)];
        this.flyPlayerArea(id, posArray);
    }

    _reset() {
        this.diceSkel.setAnimation(0, "dice_0", false);
        this.reset();
    }

    _gameStart(data: Uint8Array) {
        let info: NotifyD3BeginBetVO = decodeNotifyD3BeginBetVO(data);
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
        let info: NotifyD3DrawVO = decodeNotifyD3DrawVO(data);
        let { gameInfo, gameResult } = info;
        let { dices, id } = gameResult;
        this.diceSkel.node.zIndex = 2;
        let gameNum = this.gameNum;
        this.diceSkel.setAnimation(0, "dice_1", false)
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
        if (cmd != Push_Dice3Cmd) {
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

    onPlayerListClick() {
        //WindowMgr.open(UIConfig.WinningList.prefab);
    }

    /**
     * 创建记录节点
     * @param value 
     * @returns 
     */
    public productBallNode(array: number[]): cc.Node {
        let node = new cc.Node();
        let sum: number = array[0] + array[1] + array[2]
        let sp = node.addComponent(cc.Sprite);
        if (array[0] == array[1] && array[0] == array[2]) {
            sp.spriteFrame = this.greenSpriteFrame;
        } else {
            if (sum <= 10) {
                sp.spriteFrame = this.indiumSpriteFrame;
            } else {
                sp.spriteFrame = this.yellowSpriteFrame;
            }

        }
        return node;
    }

}
