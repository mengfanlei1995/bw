import SysConfig from "../../../scripts/data/SysConfig";
import UserData from "../../../scripts/data/UserData";
import { REPORT_EVT } from "../../../scripts/enum/DeskEnum";
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
        this._enterRoom();
    }

    onEnable(): void {
        this.statusTipSkel.node.zIndex = 3;
        this.statusWaitingSkel.node.zIndex = 3;
    }

    async _enterRoom(): Promise<void> {
        let info: Uint8Array = await this.enterRoom(SysConfig.GameIDConfig.Dice3, Dice3Cmd);
        let data: Dice3DoEnterRoomVO = decodeDice3DoEnterRoomVO(info);
        if (this.isFirstInto) UIBundleMgr.showGameHead({ gameId: +this.gameId, roomId: data.roomInfo.roomId, gameCmd: Dice3Cmd })
    }

    initAreaPos() {
        for (let i = 1; i <= 3; i++) {
            let targetAreaNode: cc.Node = this.getChipsAreaNode(`${i}`)
            let targetPos = this.chipsProductAreaNode.convertToNodeSpaceAR(
                targetAreaNode.convertToWorldSpaceAR(targetAreaNode.getPosition()))
            this.areaPosMap[`${i}`] = targetPos;
        }
    }

    private countDownTime() {
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

    //初始化房间信息
    initRoomInfo(info) {
        let { betCoinList, betCoinMap, betList, betSelfCoinMap, gameInfo, roomInfo, onlinePlayers } = info;
        if (betCoinList) this.initChipsNum(betCoinList);
        let { bankerId, dealCardMilliseconds, gameNum, gameResultList, leftOptSeconds, leftPaiNum, oddsInfoList, totalOptSeconds, turnType, } = gameInfo;
        let { baseMultiple, currGameNum, currMsgId, gameType, lastMsgId, maxGameNum, playing, roomId, roomLevel, roomState, roomType, userId } = roomInfo;
        this.gameResultList = gameResultList;
        this.initRecordHistroy(gameResultList);
        if (betCoinMap) {
            if (betCoinMap["1"] != null && Number(this.indiumChipsNumLabel.string) < betCoinMap["1"] / 100) this.indiumChipsNumLabel.string = `${betCoinMap["1"] / 100}`
            if (betCoinMap["2"] != null && Number(this.greenChipsNumLabel.string) < betCoinMap["2"] / 100) this.greenChipsNumLabel.string = `${betCoinMap["2"] / 100}`
            if (betCoinMap["3"] != null && Number(this.yellowChipsNumLabel.string) < betCoinMap["3"] / 100) this.yellowChipsNumLabel.string = `${betCoinMap["3"] / 100}`
        }
        if (betSelfCoinMap) {
            if (betSelfCoinMap["1"] != null) this.indiumSelfBetChipsNumLabel.string = `${betSelfCoinMap["1"] / 100}`
            if (betSelfCoinMap["2"] != null) this.greenSelfBetChipsNumLabel.string = `${betSelfCoinMap["2"] / 100}`
            if (betSelfCoinMap["3"] != null) this.yellowSelfBetChipsNumLabel.string = `${betSelfCoinMap["3"] / 100}`
        }
        this.optData.roomId = roomId
        this.gameNum = gameNum;
        this.curTime = leftOptSeconds
        this.isBetTime = roomState == 3;
        this.unschedule(this.countDownTime)
        this.countDownTime()
        this.schedule(this.countDownTime, 1)
        if (this.isBetTime) {
            if (this.isFirstInto) this.statusTipSkel.setAnimation(0, "start", false)
            this.timeTipLabel.string = LangMgr.sentence("e0320");
        } else {
            this.timeTipLabel.string = LangMgr.sentence("e0321");
        }
        this.statusWaitingSkel.node.active = !this.isBetTime
        this.updateChipsCircleSkel()
        this.isFirstInto = false
        this.setOnLineNumber(onlinePlayers);
    }

    initChipsNum(betCoinList) {
        for (let i = 0; i < this.betChoiceList.length; i++) {
            let node: cc.Node = this.betChoiceList[i].node;
            let lb_chips: cc.Label = cc.find("lb_chips", node).getComponent(cc.Label);
            lb_chips.string = `${betCoinList[i] / 100}`
            this.betNums[i] = betCoinList[i] / 100
        }
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
                this.diceSkel.setAttachment('tex/dice1', `tex/ds000${array[0]}`)
                this.diceSkel.setAttachment('tex/dice2', `tex/ds000${array[1]}`)
                this.diceSkel.setAttachment('tex/dice3', `tex/ds000${array[2]}`)
            }
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
    private async buyBetChips(areaType: string, selfBetLabel: cc.Label, chipsLabel: cc.Label) {
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
        let result: any = await SendMgr.sendBet(this.optData, Dice3Cmd);
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
