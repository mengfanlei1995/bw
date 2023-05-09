import SysConfig from "../../../scripts/data/SysConfig";
import { HALL_EVT, REPORT_EVT } from "../../../scripts/enum/DeskEnum";
import { SocketEvent } from "../../../scripts/enum/SocketEnum";
import EventMgr from "../../../scripts/mgr/EventMgr";
import PoolMgr from "../../../scripts/mgr/PoolMgr";
import SoundMgr from "../../../scripts/mgr/SoundMgr";
import { SocketPushConfig } from "../../../scripts/model/ServerConfig";
import { JhandiMundaCmd, Push_GameCmd, Push_Game_BetCmd, Push_Game_EndCmd, Push_Game_SelfBetCmd, Push_Game_StartCmd, Push_Game_TackOutCmd, Push_JhandiMundaCmd } from "../../../scripts/net/CmdData";
import CmdMgr from "../../../scripts/net/CmdMgr";
import { NotifyJMBeginBetVO, ResponseJMEnterRoomVO, NotifyBetVO, JMWinVO, JMWinIdRateVO, decodeNotifyJMBeginBetVO, decodeResponseJMEnterRoomVO, decodeNotifyBetVO, NotifyJMDrawVO, decodeNotifyJMDrawVO, decodeAreaPointBetCoinsVO } from "../../../scripts/net/proto/room";
import UIBundleMgr from "../../../scripts/uiform/UIBundleMgr";
import UIGame from "../../../scripts/uiform/UIGame";


const { ccclass, property } = cc._decorator;

@ccclass
export default class JhandiMunda extends UIGame {

    @property({ tooltip: '骰子动画', type: sp.Skeleton })
    diceSkel: sp.Skeleton = null;

    @property({ tooltip: '骰子生成区域', type: cc.Node })
    diceProductAreaNode: cc.Node = null;

    @property({ tooltip: '赢几倍动画', type: cc.Node })
    winRate: cc.Node[] = [];

    @property({ tooltip: '游戏记录图片', type: cc.SpriteFrame })
    recordSpf: cc.SpriteFrame[] = [];

    @property({ tooltip: '骰子图片', type: cc.SpriteFrame })
    diceSpf: cc.SpriteFrame[] = [];

    @property({ tooltip: '游戏记录', type: cc.Node })
    recordsLayoutNode: cc.Node[] = [];


    start(): void {
        this.gameId = SysConfig.GameIDConfig.JhandiMunda;
        this.gameCmd = JhandiMundaCmd;
        this.singleAreaMaxChipsNum = 20;
        this.diceProductAreaNode.zIndex = 2;
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
        let data: ResponseJMEnterRoomVO = decodeResponseJMEnterRoomVO(info);
        this._initRoomInfo(data);
    }

    //初始化房间信息
    _initRoomInfo(info: ResponseJMEnterRoomVO) {
        this.initRoomInfo(info);
        this.initRecordHistroy(info.gameInfo.gameResultList);
    }

    /**初始化历史记录 */
    private initRecordHistroy(gameResultList: JMWinVO[]) {
        for (let i = 0; i < this.recordsLayoutNode.length; i++) {
            this.recordsLayoutNode[i].removeAllChildren()
            if (gameResultList.length > 12) gameResultList = gameResultList.slice(gameResultList.length - 12, gameResultList.length)
            for (let j = 0; j < gameResultList.length; j++) {
                let count = 0;
                let idRates = gameResultList[j].idRates;
                if (idRates && idRates.length > 0) {
                    for (let k = 0; k < idRates.length; k++) {
                        if (idRates[k].id - 1 == i) {
                            count = idRates[k].count;
                            break;
                        }
                    }
                }
                let node = this.getRecordNode(count);
                this.recordsLayoutNode[i].addChild(node)
            }
        }
    }

    /**添加开奖记录 */
    async addAwardRecord(idRates: JMWinIdRateVO[]) {
        let array: number[] = [0, 0, 0, 0, 0, 0];
        for (let i = 0; i < idRates.length; i++) {
            array[idRates[i].id - 1] = idRates[i].count;
        }
        for (let i = 0; i < this.recordsLayoutNode.length; i++) {
            if (this.recordsLayoutNode[i].childrenCount >= 12) {
                this.recordsLayoutNode[i].children[0].destroy();
            }
            let node = this.getRecordNode(array[i]);
            this.recordsLayoutNode[i].addChild(node);
        }
    }

    /**
     * 开奖
     * @returns 
     */
    openAward(gameResult: JMWinVO) {
        if (this.diceSkel.animation != "JhandiMunda_dice2") return;
        let gameNum = this.gameNum;
        let { dices, idRates } = gameResult;
        EventMgr.emit(REPORT_EVT.CLICK, {
            element_id: "gameResult",
            element_name: "结算",
            element_type: "event",
            element_position: '',
            element_content: 'JhandiMunda',
        });
        let track = this.diceSkel.setAnimation(0, "JhandiMunda_dice3", false)
        this.diceSkel.setTrackEventListener(track, (trackIdx, evt) => {
            let nodeArray: cc.Node[] = [];
            let json: any = {};
            let awardFunc = () => {
                if (this.isReturn(gameNum)) return;
                let idArray: string[] = [];
                for (let i = 0; i < idRates.length; i++) {
                    idArray.push(`${idRates[i].id}`);
                    this.awardNode[idRates[i].id - 1].active = true;
                    json[idRates[i].id] = idRates[i].count;
                    cc.tween(this.node).delay(0.5).call(() => {
                        this.playWinRateAni(this.winRate[idRates[i].id - 1], idRates[i].rate);
                    }).start()
                }
                let array = [0, 0, 0, 0, 0, 0, 0];
                let width = 100;
                let height = 100;
                let array2 = [{ x: -width / 2, y: 0 }, { x: width / 2, y: 0 }];
                let array3 = [{ x: -width, y: 0 }, { x: 0, y: 0 }, { x: width, y: 0 }];
                let array4 = [{ x: -width / 2, y: height / 2 }, { x: width / 2, y: height / 2 }, { x: -width / 2, y: -height / 2 }, { x: width / 2, y: -height / 2 }];
                let array5 = [{ x: -width / 2, y: height / 2 }, { x: width / 2, y: height / 2 }, { x: -width, y: -height / 2 }, { x: 0, y: -height / 2 }, { x: width, y: -height / 2 }];
                let array6 = [{ x: -width, y: height / 2 }, { x: 0, y: height / 2 }, { x: width, y: height / 2 }, { x: -width, y: -height / 2 }, { x: 0, y: -height / 2 }, { x: width, y: -height / 2 }];
                let posArray = [0, 0, array2, array3, array4, array5, array6];
                //把骰子移动到中奖区域
                nodeArray.forEach((node: cc.Node, index: number) => {
                    let targetAreaNode: cc.Node = this.getChipsAreaNode(`${(+node.name)}`)
                    let length: number = json[+node.name];
                    let x = 0;// Math.random() * targetAreaNode.width - targetAreaNode.width / 2
                    let y = 0;// Math.random() * targetAreaNode.height / 2 - targetAreaNode.height / 2
                    if (length) {
                        let index = array[+node.name];
                        x += posArray[length][index]["x"];
                        y += posArray[length][index]["y"];
                        index++;
                        array[+node.name] = index;
                    }
                    let targetPos = this.chipsProductAreaNode.convertToNodeSpaceAR(
                        targetAreaNode.convertToWorldSpaceAR(targetAreaNode.getPosition().add(cc.v2(x, y))))
                    cc.tween(node).parallel(
                        cc.tween().to(0.5, { scale: 0.7 }, { easing: 'sineInOut' }),
                        cc.tween().to(0.5, { position: targetPos }, { easing: 'sineInOut' })
                    ).start()

                })
                //收集筹码
                cc.tween(this.node).delay(0.5).call(() => {
                    for (let i = 1; i < 7; i++) {
                        let boo: boolean = true;
                        for (let j = 0; j < idArray.length; j++) {
                            if (+idArray[j] == i) {
                                boo = false;
                                break;
                            }
                        }
                        if (boo) {
                            this.flyCenterArea(`${i}`);
                        }
                    }
                }).start()
                cc.tween(this.node).delay(1.5).call(() => {
                    if (this.isReturn(gameNum)) return;
                    if (idArray.length > 0) this._flyWinArea(idArray)
                }).start()
                cc.tween(this.node).delay(2.8).call(() => {
                    if (this.isReturn(gameNum)) return;
                    this.addAwardRecord(idRates);
                    if (idArray.length > 0) {
                        if (this.winBonus > 0) {
                            this._flyPlayerArea(idRates);
                        } else {
                            this.flyChipsProductSource()
                            SysConfig.settling = false;
                        }
                    }
                }).start()
            }

            //生成6个骰子
            let pos: cc.Vec3[] = [cc.v3(-49.138, 119.031, 0), cc.v3(-74.72, -24.411, 0), cc.v3(102.825, -20.677, 0), cc.v3(-185.057, -130.436, 0), cc.v3(-15.064, -163.305, 0), cc.v3(179.541, -167.672, 0)];
            for (let i = 0; i < dices.length; i++) {
                let node = this.getDiceNode(dices[i] - 1);
                this.diceProductAreaNode.addChild(node);
                node.position = cc.v3(210, 350, 0);
                node.name = `${dices[i]}`;
                node.scale = 0;
                nodeArray.push(node);
                cc.tween(node)
                    .to(0.1, { scale: 1 }, { easing: 'sineOut' })
                    .to(0.5, { position: pos[i] }, { easing: 'sineInOut' })
                    .delay(1)
                    .call(() => {
                        if (i == dices.length - 1) {
                            awardFunc();
                        }
                    })
                    .start();
            }
        })
    }

    /**筹码飞向玩家动画 */
    _flyPlayerArea(idRates: JMWinIdRateVO[]) {
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
        for (let i = 0; i < idRates.length; i++) {
            let label: cc.Label = this.getSelfBetLabel(`${idRates[i].id - 1}`);
            if (!(+label.string > 0)) {
                idRates.splice(i, 1);
            }
        }

        for (let i = 0; i < chipsArray.length; i++) {
            let targetAreaNode: cc.Node = this.getChipsAreaNode(`${(idRates[i % idRates.length].id)}`);
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
                        this.playPlayerWinAni();
                    }
                })
                .start()
        }
    }

    /**播放筹码区域开奖几倍动画 */
    playWinRateAni(node: cc.Node, rate: number) {
        node.getComponent(cc.Label).string = `Win X ${rate}`;
        node.scale = 1.5;
        cc.tween(node)
            .to(0.1, { opacity: 255 })
            .to(0.5, { scale: 1 }, { easing: 'backOut' })
            .delay(1.5)
            .to(1, { opacity: 0 })
            .start();
    }

    /**筹码飞向玩家动画 */
    _flyWinArea(areaType: string[]) {
        SoundMgr.playEffectByBundle('common', 'audio/collectchips');
        for (let j = 0; j < areaType.length; j++) {
            let targetAreaNode: cc.Node = this.getChipsAreaNode(`${(+areaType[j])}`);
            let childrens: cc.Node[] = this.chipsProductAreaNode.children
            let areaNodes: cc.Node[] = []
            let index = 0;
            for (let i = 0; i < childrens.length; i++) {
                if (childrens[i].name != areaType[0] && childrens[i].name != areaType[1] && childrens[i].name != areaType[2]) {
                    if (i % areaType.length == 0) {
                        areaNodes[index++] = childrens[i]
                    }
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
    }

    playPlayerWinAni() {
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

    getSelfBetLabel(areaType: string) {
        let targetAreaLabel: cc.Label = this.selfBetChipsNumLabel[+areaType];
        return targetAreaLabel
    }

    /**
     * 骰子
     * @param value 
     * @returns 
     */
    public getDiceNode(index: number) {
        let node = new cc.Node();
        node.addComponent(cc.Sprite).spriteFrame = this.diceSpf[index];
        return node
    }


    /**
     * 历史记录
     * @param value 
     * @returns 
     */
    public getRecordNode(index: number) {
        let node = new cc.Node();
        node.addComponent(cc.Sprite).spriteFrame = this.recordSpf[index];
        return node
    }

    _reset() {
        this.diceSkel.setAnimation(0, "JhandiMunda_dice0", false)
        if (this.diceProductAreaNode.childrenCount > 0) {
            this.diceProductAreaNode.children.forEach((node) => {
                node.destroy();
            })
        }
        this.reset();
    }

    _gameStart(data: Uint8Array) {
        let info: NotifyJMBeginBetVO = decodeNotifyJMBeginBetVO(data);
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
        let info: NotifyJMDrawVO = decodeNotifyJMDrawVO(data);
        let { gameInfo, gameResult } = info;
        this.gameEnd(info);
        if (this.gameResultList.length >= 12) this.gameResultList.shift();
        this.gameResultList.push(gameResult)
        this.diceSkel.setAnimation(0, "JhandiMunda_dice1", false);
        let gameNum = this.gameNum;
        this.diceSkel.setCompleteListener(() => {
            if (cc.isValid(this.node), this.diceSkel.animation == "JhandiMunda_dice1" && gameInfo.gameNum == gameNum) {
                this.diceSkel.setAnimation(0, "JhandiMunda_dice2", true);
            }
        })
        this.scheduleOnce(this.openAward.bind(this, gameResult), 3);
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
        if (cmd != Push_JhandiMundaCmd) {
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

}
