import SysConfig from "../../../scripts/data/SysConfig";
import { HALL_EVT, REPORT_EVT } from "../../../scripts/enum/DeskEnum";
import { SocketEvent } from "../../../scripts/enum/SocketEnum";
import EventMgr from "../../../scripts/mgr/EventMgr";
import { SocketPushConfig } from "../../../scripts/model/ServerConfig";
import { Push_GameCmd, Push_Game_BetCmd, Push_Game_EndCmd, Push_Game_SelfBetCmd, Push_Game_StartCmd, Push_Game_TackOutCmd, Push_TigerVsElephantCmd, TigerVsElephantCmd } from "../../../scripts/net/CmdData";
import CmdMgr from "../../../scripts/net/CmdMgr";
import { NotifyDTBeginBetVO, ResponseDTEnterRoomVO, NotifyDTDrawVO, DTPokerResultVO, NotifyBetVO, decodeNotifyDTBeginBetVO, decodeResponseDTEnterRoomVO, decodeNotifyDTDrawVO, decodeNotifyBetVO, decodeAreaPointBetCoinsVO } from "../../../scripts/net/proto/room";
import UIBundleMgr from "../../../scripts/uiform/UIBundleMgr";
import UIGame from "../../../scripts/uiform/UIGame";
import CocosUtil from "../../../scripts/utils/CocosUtil";


const { ccclass, property } = cc._decorator;

@ccclass
export default class TigerVsElephant extends UIGame {

    @property({ tooltip: '核心内容区域', type: cc.Node })
    contentNode: cc.Node = null;
    @property({ tooltip: '卡牌动画', type: sp.Skeleton })
    card1Skel: sp.Skeleton = null;
    @property({ tooltip: '卡牌动画', type: sp.Skeleton })
    card2Skel: sp.Skeleton = null;
    @property({ tooltip: '牌1', type: cc.Node })
    pokerNode1: cc.Node = null;
    @property({ tooltip: '牌2', type: cc.Node })
    pokerNode2: cc.Node = null;
    @property({ tooltip: 'VS动画', type: sp.Skeleton })
    teVSSkel: sp.Skeleton = null;

    @property({ tooltip: "Tie方块", type: cc.SpriteFrame })
    tieSpriteFrame: cc.SpriteFrame = null
    @property({ tooltip: "T方块", type: cc.SpriteFrame })
    tSpriteFrame: cc.SpriteFrame = null
    @property({ tooltip: "E方块", type: cc.SpriteFrame })
    eSpriteFrame: cc.SpriteFrame = null

    @property({ tooltip: "红色牌", type: cc.SpriteFrame })
    redPokerSpriteList: cc.SpriteFrame[] = Array<cc.SpriteFrame>()
    @property({ tooltip: "黑色牌", type: cc.SpriteFrame })
    blackPokerSpriteList: cc.SpriteFrame[] = Array<cc.SpriteFrame>()
    @property({ tooltip: "花色", type: cc.SpriteFrame })
    huaSeSpriteList: cc.SpriteFrame[] = Array<cc.SpriteFrame>()
    @property({ tooltip: "JQK人物", type: cc.SpriteFrame })
    JQKSpriteList: cc.SpriteFrame[] = Array<cc.SpriteFrame>()


    // 是否正在播中奖动画
    private isPlayOpenAwardAnim: boolean = false;


    start(): void {
        let visibleSize = cc.view.getVisibleSize();
        let resolutionSize = cc.view.getDesignResolutionSize();
        let topDiff = (visibleSize.height * resolutionSize.width / visibleSize.width - resolutionSize.height) / 2;
        this.contentNode.getComponent(cc.Widget).top = topDiff;
        this.gameId = SysConfig.GameIDConfig.TigerVSElephant;
        this.gameCmd = TigerVsElephantCmd;
        this.gameName = 'TigerVSElephant';
        this.historyName = 'TigerElephantHistory';
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
        let data: ResponseDTEnterRoomVO = decodeResponseDTEnterRoomVO(info);
        this._initRoomInfo(data);
    }

    //初始化房间信息
    _initRoomInfo(info: ResponseDTEnterRoomVO) {
        this.initRoomInfo(info);
        this.initRecordHistroy(info.gameInfo.gameResultList);
    }

    /**初始化历史记录 */
    private initRecordHistroy(gameResultList: number[]) {
        this.recordLayoutNode.removeAllChildren();
        if (gameResultList.length > 14) gameResultList = gameResultList.slice(gameResultList.length - 14, gameResultList.length);
        for (let i = 0; i < gameResultList.length; i++) {
            let node = this.productETTNode(`${gameResultList[i]}`);
            this.recordLayoutNode.addChild(node);
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
    rotateCardSkel() {
        this.card1Skel.setAnimation(0, "Cards_z6", true)
        this.card2Skel.setAnimation(0, "Cards_y6", true)
    }


    /**添加开奖记录 */
    async addAwardRecord(awardCode) {
        if (this.recordLayoutNode.childrenCount >= 14) {
            this.recordLayoutNode.getComponent(cc.Layout).enabled = false;
            this.recordLayoutNode.children[0].destroy();
            for (let i = 0; i < this.recordLayoutNode.childrenCount; i++) {
                let box: cc.Node = this.recordLayoutNode.children[i];
                let x = box.x - 46;
                cc.tween(box).to(1, { x: x }).start()
            }
        }
        await CocosUtil.sleepSync(1)
        if (!cc.isValid(this.node)) return;
        this.recordLayoutNode.getComponent(cc.Layout).enabled = true;
        let node = this.productETTNode(awardCode)
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
    async openAward(awardCode: DTPokerResultVO[], result: string) {
        let gameNum = this.gameNum;
        if (this.isReturn(gameNum)) return;
        EventMgr.emit(REPORT_EVT.CLICK, {
            element_id: "gameResult",
            element_name: "结算",
            element_type: "event",
            element_position: '',
            element_content: 'tigerElephant',
        });
        this.card1Skel.setAnimation(0, "Cards_z2", false)
        this.card2Skel.setAnimation(0, "Cards_y2", false)
        await CocosUtil.sleepSync(0.3)
        if (this.isReturn(gameNum)) return;
        this.setCard(this.pokerNode1, awardCode[0].point)
        this.pokerNode1.active = true
        this.card1Skel.setAnimation(0, "Cards_z1", false)
        this.card1Skel.node.active = false
        await CocosUtil.sleepSync(0.5)
        if (this.isReturn(gameNum)) return;
        this.setCard(this.pokerNode2, awardCode[1].point)
        this.pokerNode2.active = true
        this.card2Skel.setAnimation(0, "Cards_y1", false)
        this.card2Skel.node.active = false
        let ids: string[] = ["1", "2", "3"];
        await CocosUtil.sleepSync(0.5)
        if (this.isReturn(gameNum)) return;
        this.awardNode[+result - 1].active = true;
        for (let i = 0; i < ids.length; i++) {
            if (result != ids[i]) {
                this.flyCenterArea(ids[i])
            }
        }
        await CocosUtil.sleepSync(0.7)
        if (this.isReturn(gameNum)) return;
        this.flyWinArea(result)
        await CocosUtil.sleepSync(1)
        if (this.isReturn(gameNum)) return;
        this.addAwardRecord(result)
        if (this.winBonus > 0) {
            this._flyPlayerArea(result);
        } else {
            this.flyChipsProductSource()
            SysConfig.settling = false;
        }
    }

    /**筹码飞向玩家动画 */
    _flyPlayerArea(id: string) {
        let posArray: cc.Vec3[] = [cc.v3(-170, -300, 0), cc.v3(170, -300, 0), cc.v3(0, -35, 0)];
        this.flyPlayerArea(id, posArray);
    }

    /**
     * 获取中奖Id
     * @param caward 
     * @returns 
     */
    getAwardResult(caward: string) {
        if (caward == null || caward == "") return;
        let result = caward.split(",");
        if (+result[1] == +result[3]) return '3';
        else if (+result[1] > +result[3]) return '1';
        else return '2';
    }

    _reset() {
        this.card1Skel.setAnimation(0, "Cards_z1", false);
        this.card2Skel.setAnimation(0, "Cards_y1", false);
        this.pokerNode1.active = false;
        this.pokerNode2.active = false;
        this.card1Skel.node.active = true;
        this.card2Skel.node.active = true;
        this.isPlayOpenAwardAnim = false;
        this.reset();
    }


    _gameStart(data: Uint8Array) {
        let info: NotifyDTBeginBetVO = decodeNotifyDTBeginBetVO(data);
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
        let info: NotifyDTDrawVO = decodeNotifyDTDrawVO(data);
        let { gameInfo, gameResult } = info;
        this.gameEnd(info);
        this.rotateCardSkel()
        this.scheduleOnce(this.openAward.bind(this, gameInfo.pokerResultList, `${gameResult}`), 3);
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
        if (cmd != Push_TigerVsElephantCmd) {
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

    getCard(ponits: string) {
        let huaSe: number = 0;
        let value: number = 0;
        huaSe = Math.floor(+ponits / 13) + 1
        value = +ponits % 13 + 1
        return { huaSe, value }
    }

    /**
     * 设置牌
     * @param card 
     * @param huaSe 
     * @param value 
     */
    public setCard(card: cc.Node, points: string): void {
        let { huaSe, value } = this.getCard(points)
        card.getChildByName("typeSprite1").getComponent(cc.Sprite).spriteFrame = this.huaSeSpriteList[huaSe - 1]
        let isRed = huaSe == 2 || huaSe == 4
        card.getChildByName("cardSprite").getComponent(cc.Sprite).spriteFrame = isRed ? this.redPokerSpriteList[value - 1] : this.blackPokerSpriteList[value - 1]
        if (value > 10) {
            card.getChildByName("typeSprite2").active = false
            card.getChildByName("typeSprite3").active = true
            card.getChildByName("typeSprite3").getComponent(cc.Sprite).spriteFrame = this.JQKSpriteList[value - 11]
        } else {
            card.getChildByName("typeSprite3").active = false
            card.getChildByName("typeSprite2").active = true
            card.getChildByName("typeSprite2").getComponent(cc.Sprite).spriteFrame = this.huaSeSpriteList[huaSe - 1]
        }
    }

    /**
     * 生产ETTie
     * @param value 
     * @returns cc.Node
     */
    public productETTNode(value: string): cc.Node {
        let node = new cc.Node();
        node.name = "square" + value;
        let sp = node.addComponent(cc.Sprite);
        if (value == '3') {
            sp.spriteFrame = this.tieSpriteFrame;
        } else if (value == '1') {
            sp.spriteFrame = this.tSpriteFrame;
        } else {
            sp.spriteFrame = this.eSpriteFrame;
        }
        return node;
    }

}
