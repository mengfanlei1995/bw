import SysConfig from "../../../scripts/data/SysConfig";
import { HALL_EVT, REPORT_EVT } from "../../../scripts/enum/DeskEnum";
import { SocketEvent } from "../../../scripts/enum/SocketEnum";
import EventMgr from "../../../scripts/mgr/EventMgr";
import LangMgr from "../../../scripts/mgr/LangMgr";
import { SocketPushConfig } from "../../../scripts/model/ServerConfig";
import { Push_GameCmd, Push_Game_BetCmd, Push_Game_EndCmd, Push_Game_StartCmd, Push_Game_TackOutCmd, Push_WhellOfForuneCmd, WhellOfForuneCmd } from "../../../scripts/net/CmdData";
import CmdMgr from "../../../scripts/net/CmdMgr";
import { NotifyBetVO, NotifyRYBBeginBetVO, ResponseRYBEnterRoomVO, NotifyRYBDrawVO, RYBWinVO, decodeNotifyBetVO, decodeNotifyRYBBeginBetVO, decodeResponseRYBEnterRoomVO, decodeNotifyRYBDrawVO } from "../../../scripts/net/proto/room";
import UIBundleMgr from "../../../scripts/uiform/UIBundleMgr";
import UIGame from "../../../scripts/uiform/UIGame";
import CocosUtil from "../../../scripts/utils/CocosUtil";


const { ccclass, property } = cc._decorator;

@ccclass
export default class WhellOfForunce extends UIGame {


    @property({ tooltip: '核心内容区域', type: cc.Node })
    contentNode: cc.Node = null;
    @property({ tooltip: '转盘', type: cc.Node })
    wheelNode: cc.Node = null;
    @property({ tooltip: '转盘遮罩', type: cc.Node })
    wheelMaskNode: cc.Node = null;
    @property({ tooltip: '指针动画', type: sp.Skeleton })
    pointerSkel: sp.Skeleton = null;
    @property({ tooltip: '中奖动画', type: sp.Skeleton })
    awardSkel: sp.Skeleton = null;
    @property({ tooltip: '中奖指针指向动画', type: sp.Skeleton })
    awardPointSkel: sp.Skeleton = null;

    @property({ tooltip: "蓝色球", type: cc.SpriteFrame })
    bludSpriteFrame: cc.SpriteFrame = null
    @property({ tooltip: "红色球", type: cc.SpriteFrame })
    redSpriteFrame: cc.SpriteFrame = null
    @property({ tooltip: "黄色球", type: cc.SpriteFrame })
    yellowSpriteFrame: cc.SpriteFrame = null

    private stepAngle = 18;
    //转盘动画
    private wheelAction: cc.Tween = null;

    // 是否正在转轮
    private isWheeling: boolean = false

    start(): void {
        let visibleSize = cc.view.getVisibleSize();
        let resolutionSize = cc.view.getDesignResolutionSize();
        let topDiff = (visibleSize.height * resolutionSize.width / visibleSize.width - resolutionSize.height) / 2;
        this.contentNode.getComponent(cc.Widget).top = topDiff;
        this.gameId = SysConfig.GameIDConfig.WheelofForune;
        this.gameCmd = WhellOfForuneCmd;
        this.gameName = 'WheelofForune';
        this.historyName = 'WheelHistory';
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
        let data: ResponseRYBEnterRoomVO = decodeResponseRYBEnterRoomVO(info);
        this._initRoomInfo(data);
    }

    //初始化房间信息
    _initRoomInfo(info: ResponseRYBEnterRoomVO) {
        this.initRoomInfo(info);
        this.initRecordHistroy(info.gameInfo.gameResultList);
    }

    /**初始化历史记录 */
    private initRecordHistroy(gameResultList: RYBWinVO[]) {
        this.recordLayoutNode.removeAllChildren()
        if (gameResultList.length > 20) gameResultList = gameResultList.slice(gameResultList.length - 20, gameResultList.length)
        for (let i = 0; i < gameResultList.length; i++) {
            let node = this.productBallNode(`${gameResultList[i].id}`);
            this.recordLayoutNode.addChild(node)
        }
    }

    onEventShow() {
        this._reset();
        this.isReload = true;
        this._enterRoom();
    }

    /**
     * 模拟旋转
     */
    async rotateWheelSkel() {
        let gameNum = this.gameNum;
        if (this.isReturn(gameNum)) return;
        this.wheelNode.angle = 0
        this.wheelAction = cc.tween(this.wheelNode).to(7, { angle: -360 * 8 }, { easing: 'sineInOut' }).start()
        this.pointerSkel.setAnimation(0, "turntable_1", false)
        await CocosUtil.sleepSync(0.5)
        if (this.isReturn(gameNum)) return;
        this.pointerSkel.setAnimation(0, "turntable_2", true)
        await CocosUtil.sleepSync(1.5)
        if (this.isReturn(gameNum)) return;
        this.pointerSkel.setAnimation(0, "turntable_3", true)
        // await CocosUtil.sleepSync(1.5)
        // if (this.isReturn(gameNum)) return;
        // this.pointerSkel.setAnimation(0, "turntable_4", false)
    }

    lastRotateWheel(awardCode: string, reelIndex: number) {
        let gameNum = this.gameNum;
        let extraAngle = reelIndex * this.stepAngle
        if (this.wheelAction != null) this.wheelAction.stop()
        this.wheelNode.angle = 0
        cc.tween(this.wheelNode).to(1.5, { angle: extraAngle - 360 * 2 }, { easing: 'sineOut' }).call(() => {
            if (cc.isValid(this.node) && gameNum == this.gameNum && !this.isReload) {
                this.openAward(awardCode);
                this.pointerSkel.setAnimation(0, "turntable_1", false)
            }

        }).start()
    }


    /**添加开奖记录 */
    async addAwardRecord(awardCode) {
        if (this.recordLayoutNode.childrenCount >= 20) {
            this.recordLayoutNode.getComponent(cc.Layout).enabled = false;
            this.recordLayoutNode.children[0].destroy();
            for (let i = 0; i < this.recordLayoutNode.childrenCount; i++) {
                let box: cc.Node = this.recordLayoutNode.children[i];
                let x = box.x - 34;
                cc.tween(box).to(1, { x: x }).start()
            }
        }
        await CocosUtil.sleepSync(1)
        if (!cc.isValid(this.node)) return;
        this.recordLayoutNode.getComponent(cc.Layout).enabled = true;
        let node = this.productBallNode(awardCode)
        this.recordLayoutNode.addChild(node)
        node.opacity = 0;
        node.scale = 0;
        cc.tween(node).to(0.5, { opacity: 255, scale: 1 })
            .start()
    }

    /**
     * 开奖
     * @returns 
     */
    async openAward(awardCode: string) {
        let gameNum = this.gameNum;
        EventMgr.emit(REPORT_EVT.CLICK, {
            element_id: "gameResult",
            element_name: "结算",
            element_type: "event",
            element_position: '',
            element_content: 'fortuneWhell',
        });
        this.isWheeling = false
        this.wheelMaskNode.active = true
        this.awardSkel.node.active = true
        this.awardSkel.setAnimation(0, "turntable_fx", false)
        this.awardPointSkel.node.active = true
        for (var i = 1; i < 4; i++) {
            if (i.toString() != awardCode) {
                this.flyCenterArea(i.toString())
            }
        }
        await CocosUtil.sleepSync(1.3)
        if (this.isReturn(gameNum)) return;
        this.flyWinArea(awardCode)
        await CocosUtil.sleepSync(1.2)
        if (this.isReturn(gameNum)) return;
        this.awardPointSkel.node.active = false
        this.addAwardRecord(awardCode)
        if (this.winBonus > 0) {
            this._flyPlayerArea(awardCode);
        } else {
            this.flyChipsProductSource()
            SysConfig.settling = false;
        }
    }

    /**筹码飞向玩家动画 */
    _flyPlayerArea(id: string) {
        let posArray: cc.Vec3[] = [cc.v3(-250, -300, 0), cc.v3(250, -300, 0), cc.v3(0, -300, 0)];
        this.flyPlayerArea(id, posArray);

    }

    _reset() {
        if (this.wheelAction != null) this.wheelAction.stop()
        this.pointerSkel.setAnimation(0, "turntable_1", false)
        this.isReload = false;
        this.wheelMaskNode.active = false;
        this.reset();
    }

    _gameStart(data: Uint8Array) {
        let info: NotifyRYBBeginBetVO = decodeNotifyRYBBeginBetVO(data);
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
        let info: NotifyRYBDrawVO = decodeNotifyRYBDrawVO(data);
        let { gameResult } = info;
        this.gameEnd(info);
        let { reelIndex, id } = gameResult
        if (this.gameResultList.length >= 50) this.gameResultList.shift();
        this.gameResultList.push(gameResult)
        this.rotateWheelSkel()
        this.updateChipsCircleSkel()
        let gameNum = this.gameNum;
        await CocosUtil.sleepSync(3)
        if (!cc.isValid(this.node) || gameNum != this.gameNum || this.isReload) return;
        this.lastRotateWheel(`${id}`, reelIndex)
        this.isWheeling = true
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
        if (cmd != Push_WhellOfForuneCmd) {
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

    /**
     * 生产红黄蓝球
     * @param value 
     * @returns 
     */
    public productBallNode(value: string): cc.Node {
        let node = new cc.Node();
        node.name = "ball" + value;
        let sp = node.addComponent(cc.Sprite);
        let spriteFrame: cc.SpriteFrame = null;
        switch (value) {
            case '1':
                spriteFrame = this.bludSpriteFrame;
                break;
            case '3':
                spriteFrame = this.redSpriteFrame;
                break;
            case '2':
                spriteFrame = this.yellowSpriteFrame;
                break;
        }
        sp.spriteFrame = spriteFrame;
        return node;
    }

}
