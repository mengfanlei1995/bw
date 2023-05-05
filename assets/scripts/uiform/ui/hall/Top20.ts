import SendMgr from "../../../net/SendMgr";
import { ReferRankVO, ReferTop20VO } from "../../../net/proto/hall";
import AssetUtil from "../../../utils/AssetUtil";
import LongUtil from "../../../utils/LongUtil";
import UIMgr from "../../UIMgr";
import { DialogType } from "../common/DiaLog";
import Top20Item from "./Top20Item";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Top20 extends cc.Component {
    @property({ tooltip: '4-20名的预制体', type: cc.Prefab })
    rankPrefab: cc.Prefab = null;

    @property({ tooltip: 'Prize Pool', type: cc.Label })
    lblPrizePool: cc.Label = null;

    @property({ tooltip: '前三名区域', type: cc.Node })
    top3Area: cc.Node = null;

    @property({ tooltip: '前3名头像', type: cc.Sprite })
    top3Avatars: cc.Sprite[] = [];

    @property({ tooltip: '前3名奖励', type: cc.Label })
    lblTop3Awards: cc.Label[] = [];

    @property({ tooltip: '前3名奖励比例', type: cc.Label })
    lblTop3Rate: cc.Label[] = [];

    @property({ tooltip: '前3名昵称', type: cc.Label })
    lblTop3Nicks: cc.Label[] = [];

    @property({ tooltip: '4-20名节点容器', type: cc.Node })
    othersRankParent: cc.Node = null;

    @property({ tooltip: '自己分数', type: cc.Label })
    lbMyScore: cc.Label = null;

    @property({ tooltip: '没有数据', type: cc.Node })
    noRecords: cc.Node = null;

    awardPercent: number[] = [
        .25,
        .15,
        .1,
        .07,
        .06,
        .05,
        .04,
        .04,
        .04,
        .03,
        .03,
        .03,
        .02,
        .02,
        .02,
        .01,
        .01,
        .01,
        .01,
        .01
    ]

    protected start(): void {
        this.renderList(0);
    }

    protected onEnable(): void {
        this.top3Area.opacity = 0;
        cc.tween(this.top3Area).to(1.45, { opacity: 255 }, { easing: 'backOut' }).start()
    }

    public acitveTab(e: cc.Event.EventTouch, type: string) {
        let target: cc.Node = e.target as cc.Node;
        target.parent.children.forEach(
            node => {
                node.children[0].active = node.name === target.name;
                node.children[1].active = node.name !== target.name;
            }
        )
        this.renderList(+type);
    }

    private rule = null;

    private async renderList(type: number) {
        let info: ReferRankVO = await SendMgr.sendTop20({ type: type });
        if (!info || !cc.isValid(this.node)) {
            if (cc.isValid(this.node)) this.noRecords.active = true;
            return;
        }
        let { top20, prizePool, rule, yourScore } = info;
        this.rule = rule;
        if (LongUtil.longToNumber(yourScore) >= 0) this.lbMyScore.string = `₹${LongUtil.longToNumber(yourScore) / 100}`
        else this.lbMyScore.node.parent.active = false;
        this.lblPrizePool.string = `₹${LongUtil.longToNumber(prizePool) / 100}`;
        let list: ReferTop20VO[] = top20;
        if (list && list.length > 0) {
            this.noRecords.active = false;
            this.othersRankParent.parent.active = true;
            let top3: ReferTop20VO[] = list.splice(0, 3);
            for (let i = 0; i < 3; i++) {
                let data: ReferTop20VO = top3[i];
                let { rate, reward, headPic, nickName } = data;
                this.lblTop3Awards[i].string = `${LongUtil.longToNumber(reward) / 100}`
                this.lblTop3Nicks[i].string = `${nickName}`
                this.lblTop3Rate[i].string = `${rate}%`
                let avatarIndex: number = 0;
                if (!isNaN(+headPic) && cc.js.isNumber(+headPic)) avatarIndex = +headPic;
                let texture: cc.Texture2D = await AssetUtil.loadResSync<cc.Texture2D>(`avatar/${avatarIndex || '1'}`, false);
                let spriteFrame: cc.SpriteFrame = new cc.SpriteFrame(texture);
                if (!cc.isValid(this.node)) return;
                this.top3Avatars[i].spriteFrame = spriteFrame;
            }
            this.othersRankParent.removeAllChildren();
            list.forEach(
                (rankData: ReferTop20VO, index: number) => {
                    if (index < 17) {
                        let rankNode: cc.Node = cc.instantiate(this.rankPrefab);
                        rankNode.getComponent(Top20Item).init(rankData, 4 + index);
                        rankNode.parent = this.othersRankParent;
                    }
                }
            )
        } else {
            this.othersRankParent.parent.active = false;
            this.noRecords.active = true;
        }
    }

    onRulesClick() {
        UIMgr.show('prefab/hall/RankRules', 'RankRules', this.rule);
    }
}
