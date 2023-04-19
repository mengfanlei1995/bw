import SysConfig from "../../../scripts/data/SysConfig";
import UserData from "../../../scripts/data/UserData";
import { HALL_EVT, REPORT_EVT } from "../../../scripts/enum/DeskEnum";
import EventMgr from "../../../scripts/mgr/EventMgr";
import LangMgr from "../../../scripts/mgr/LangMgr";
import PoolMgr from "../../../scripts/mgr/PoolMgr";
import SoundMgr from "../../../scripts/mgr/SoundMgr";
import StorageMgr from "../../../scripts/mgr/StorageMgr";
import { Dice3Cmd } from "../../../scripts/net/CmdData";
import SendMgr from "../../../scripts/net/SendMgr";
import { Dice3DoEnterRoomVO, decodeDice3DoEnterRoomVO } from "../../../scripts/net/proto/room";
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
    //=============== 红黄蓝组件=====================
    @property({ tooltip: '绿色筹码区域', type: cc.Node })
    greenChipsAreaNode: cc.Node = null;
    @property({ tooltip: '绿色筹码总数', type: cc.Label })
    greenChipsNumLabel: cc.Label = null;
    @property({ tooltip: '绿色中奖框', type: cc.Node })
    greenAwardNode: cc.Node = null;
    @property({ tooltip: 'green自己下注筹码数', type: cc.Label })
    greenSelfBetChipsNumLabel: cc.Label = null;
    @property({ tooltip: '紫色筹码区域', type: cc.Node })
    indiumChipsAreaNode: cc.Node = null;
    @property({ tooltip: '紫色筹码总数', type: cc.Label })
    indiumChipsNumLabel: cc.Label = null;
    @property({ tooltip: '紫色中奖框', type: cc.Node })
    indiumAwardNode: cc.Node = null;
    @property({ tooltip: '紫色自己下注筹码数', type: cc.Label })
    indiumSelfBetChipsNumLabel: cc.Label = null;
    @property({ tooltip: '黄色筹码区域', type: cc.Node })
    yellowChipsAreaNode: cc.Node = null;
    @property({ tooltip: '黄色筹码总数', type: cc.Label })
    yellowChipsNumLabel: cc.Label = null;
    @property({ tooltip: '黄色中奖框', type: cc.Node })
    yellowAwardNode: cc.Node = null;
    @property({ tooltip: 'yellow自己下注筹码数', type: cc.Label })
    yellowSelfBetChipsNumLabel: cc.Label = null;
    @property({ tooltip: "绿色", type: cc.SpriteFrame })
    greenSpriteFrame: cc.SpriteFrame = null
    @property({ tooltip: "红色", type: cc.SpriteFrame })
    indiumSpriteFrame: cc.SpriteFrame = null
    @property({ tooltip: "黄色", type: cc.SpriteFrame })
    yellowSpriteFrame: cc.SpriteFrame = null

    private readonly INDIUM_ID: string = "1";
    private readonly GREEN_ID: string = "2";
    private readonly YELLOW_ID: string = "3";

    onLoad(): void {
        this.gameId = SysConfig.GameIDConfig.Dice3;
        this.gameCmd = Dice3Cmd;
        this.selfChipsSourcePos = this.chipsProductAreaNode.convertToNodeSpaceAR(
            this.avatarNode.convertToWorldSpaceAR(this.avatarNode.getPosition()))
        this.chipsSourcePos = this.chipsSourceNode.getPosition();
        this.initAreaPos();
        this.timeLeftLabel.string = "--";
        this._enterRoom();
    }

    onEnable(): void {
        EventMgr.on(HALL_EVT.DESK_RELOAD, this.onEventShow, this);
    }

    onDisable(): void {
        EventMgr.off(HALL_EVT.DESK_RELOAD, this.onEventShow, this);
        SysConfig.settling = false;
        PoolMgr.clear();
    }

    async _enterRoom(): Promise<void> {
        let info: Uint8Array = await this.enterRoom();
        if (!info) return;
        let data: Dice3DoEnterRoomVO = decodeDice3DoEnterRoomVO(info);
        console.log(data)
        if (this.isFirstInto) UIBundleMgr.showGameHead({ gameId: +this.gameId, roomId: data.roomInfo.roomId, gameCmd: this.gameCmd });
        this.initRoomInfo(data);
    }

    initAreaPos() {
        for (let i = 1; i <= 3; i++) {
            let targetAreaNode: cc.Node = this.getChipsAreaNode(`${i}`);
            let targetPos = this.chipsProductAreaNode.convertToNodeSpaceAR(
                targetAreaNode.convertToWorldSpaceAR(targetAreaNode.getPosition()));
            this.areaPosMap[`${i}`] = targetPos;
        }
    }

    //初始化房间信息
    initRoomInfo(info: Dice3DoEnterRoomVO) {
        let { betCoinList, betCoinMap, betList, betSelfCoinMap, gameInfo, roomInfo, onlinePlayers } = info;
        if (betCoinList) this.initChipsNum(betCoinList);
        let { gameNum, gameResultList, leftOptSeconds } = gameInfo;
        let { roomId, roomState } = roomInfo;
        this.gameResultList = gameResultList;
        this.initRecordHistroy(gameResultList);
        if (betCoinMap) {
            if (betCoinMap["1"] != null && Number(this.indiumChipsNumLabel.string) < this.longToNumber(betCoinMap["1"]) / 100) this.indiumChipsNumLabel.string = `${this.longToNumber(betCoinMap["1"]) / 100}`;
            if (betCoinMap["2"] != null && Number(this.greenChipsNumLabel.string) < this.longToNumber(betCoinMap["2"]) / 100) this.greenChipsNumLabel.string = `${this.longToNumber(betCoinMap["2"]) / 100}`;
            if (betCoinMap["3"] != null && Number(this.yellowChipsNumLabel.string) < this.longToNumber(betCoinMap["3"]) / 100) this.yellowChipsNumLabel.string = `${this.longToNumber(betCoinMap["3"]) / 100}`;
        }
        if (betSelfCoinMap) {
            if (betSelfCoinMap["1"] != null) this.indiumSelfBetChipsNumLabel.string = `${this.longToNumber(betSelfCoinMap["1"]) / 100}`;
            if (betSelfCoinMap["2"] != null) this.greenSelfBetChipsNumLabel.string = `${this.longToNumber(betSelfCoinMap["2"]) / 100}`;
            if (betSelfCoinMap["3"] != null) this.yellowSelfBetChipsNumLabel.string = `${this.longToNumber(betSelfCoinMap["3"]) / 100}`;
        }
        this.optData.roomId = roomId;
        this.gameNum = gameNum;
        this.curTime = leftOptSeconds;
        this.isBetTime = roomState == 3;
        this.unschedule(this.countDownTime);
        this.countDownTime();
        this.schedule(this.countDownTime, 1);
        if (this.isBetTime) {
            if (this.isFirstInto) this.statusTipSkel.setAnimation(0, "start", false);
            this.timeTipLabel.string = LangMgr.sentence("e0320");
        } else {
            this.timeTipLabel.string = LangMgr.sentence("e0321");
        }
        this.statusWaitingSkel.node.active = !this.isBetTime;
        this.updateChipsCircleSkel();
        this.isFirstInto = false;
        this.setOnLineNumber(onlinePlayers);
    }

    /**初始化历史记录 */
    private initRecordHistroy(gameResultList: GameResultInfo[]) {
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
        this.reset();
        this._enterRoom();
    }

    /**添加开奖记录 */
    async addAwardRecord(array: number[]) {
        let recordNode: cc.Node = this.recordLayoutNode
        let childCount: number = recordNode.childrenCount
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
        let sum: number = array[0] + array[1] + array[2]
        let tailGas: cc.Node = cc.instantiate(this.tailGasPrefab);
        tailGas.name = "tailGas";
        recordNode.addChild(tailGas)
        let node = this.productBallNode(array)
        recordNode.addChild(node)
        let pos;
        let time = 1;
        if (array[0] == array[1] && array[0] == array[2]) {
            pos = cc.v3(30, -220, 0)
        } else {
            if (sum <= 10) {
                pos = cc.v3(-130, -485, 0)
                time = 2.5
            } else {
                time = 2;
                pos = cc.v3(200, -485, 0)
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

    isReturn(gameNum) {
        return !cc.isValid(this.node) || gameNum != this.gameNum;
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
                if (id == this.GREEN_ID) {
                    this.greenAwardNode.active = true;
                } else if (id == this.INDIUM_ID) {
                    this.indiumAwardNode.active = true;
                } else {
                    this.yellowAwardNode.active = true;
                }
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
                            this.flyPlayerArea(id);
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
    flyPlayerArea(id) {
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
        for (let i = 0; i < chipsArray.length; i++) {
            let pos;
            if (id == this.GREEN_ID) {
                let x = Math.random() * this.greenChipsAreaNode.width - this.greenChipsAreaNode.width / 2
                let y = Math.random() * this.greenChipsAreaNode.height - this.greenChipsAreaNode.height / 2
                pos = cc.v3(0 + x, -20 + y, 0)
            } else {
                if (id == this.INDIUM_ID) {
                    let x = Math.random() * this.indiumChipsAreaNode.width - this.indiumChipsAreaNode.width / 2
                    let y = Math.random() * this.indiumChipsAreaNode.height - this.indiumChipsAreaNode.height / 2
                    pos = cc.v3(-165 + x, -300 + y, 0)
                } else {
                    let x = Math.random() * this.yellowChipsAreaNode.width - this.yellowChipsAreaNode.width / 2
                    let y = Math.random() * this.yellowChipsAreaNode.height - this.yellowChipsAreaNode.height / 2
                    pos = cc.v3(165 + x, -300 + y, 0)
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


    getChipsAreaNode(areaType: string) {
        let targetAreaNode: cc.Node
        if (areaType == this.GREEN_ID) {
            targetAreaNode = this.greenChipsAreaNode
        } else if (areaType == this.INDIUM_ID) {
            targetAreaNode = this.indiumChipsAreaNode
        } else {
            targetAreaNode = this.yellowChipsAreaNode
        }
        return targetAreaNode
    }

    reset() {
        SysConfig.settling = false;
        this.recordLayoutNode.getComponent(cc.Layout).enabled = true;
        this.diceSkel.setAnimation(0, "dice_0", false);
        this.winBonus = 0;
        this.greenAwardNode.active = false;
        this.indiumAwardNode.active = false;
        this.yellowAwardNode.active = false;
        this.greenSelfBetChipsNumLabel.string = LangMgr.sentence("e0319");;
        this.indiumSelfBetChipsNumLabel.string = LangMgr.sentence("e0319");;
        this.yellowSelfBetChipsNumLabel.string = LangMgr.sentence("e0319");;
        this.greenChipsNumLabel.string = "0";
        this.indiumChipsNumLabel.string = "0";
        this.yellowChipsNumLabel.string = "0";
        let chipsProductAreaNode: cc.Node = this.chipsProductAreaNode;
        if (chipsProductAreaNode.childrenCount > 0) {
            chipsProductAreaNode.children.forEach((node) => {
                node.destroy();
            })
        }
        this.statusWaitingSkel.node.active = !this.isBetTime
    }



    onRecordClick(e: cc.Event.EventTouch) {
        WindowMgr.open(UIConfig.DiceThreeHistory.prefab, this.gameResultList)
    }

    onGreenAreaClick(e: cc.Event.EventTouch) {
        this.buyBetChips(this.GREEN_ID, this.greenSelfBetChipsNumLabel, this.greenChipsNumLabel)
    }

    onIndiumAreaClick(e: cc.Event.EventTouch) {
        this.buyBetChips(this.INDIUM_ID, this.indiumSelfBetChipsNumLabel, this.indiumChipsNumLabel)
    }

    onYellowAreaClick(e: cc.Event.EventTouch) {
        this.buyBetChips(this.YELLOW_ID, this.yellowSelfBetChipsNumLabel, this.yellowChipsNumLabel)
    }

    onPlayerListClick() {
        //WindowMgr.open(UIConfig.WinningList.prefab);
    }

    /**
     * 生产红黄蓝球
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
