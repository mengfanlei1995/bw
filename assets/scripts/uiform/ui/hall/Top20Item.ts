import LangMgr from "../../../mgr/LangMgr";
import { ReferTop20VO } from "../../../net/proto/hall";
import AssetUtil from "../../../utils/AssetUtil";
import LongUtil from "../../../utils/LongUtil";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Top20Item extends cc.Component {
    @property({ tooltip: '排名', type: cc.Label })
    lblSort: cc.Label = null;
    @property({ tooltip: '头像', type: cc.Sprite })
    spAvatar: cc.Sprite = null;
    @property({ tooltip: '昵称', type: cc.Label })
    lblNick: cc.Label = null;
    @property({ tooltip: '奖励金额', type: cc.Label })
    lblAward: cc.Label = null;
    @property({ tooltip: '奖励比例', type: cc.Label })
    lbRate: cc.Label = null;

    async init(data: ReferTop20VO, rank: number) {
        let { reward, headPic, nickName, rate } = data;
        this.lblSort.string = `${rank}`;
        this.lblNick.string = `${nickName}`;
        this.lblAward.string = `₹${LongUtil.longToNumber(reward) / 100}`;
        this.lbRate.string = `+${rate}% ${LangMgr.sentence("e0329")}`;
        let avatarIndex: number = 0;
        if (!isNaN(+headPic) && cc.js.isNumber(+headPic)) avatarIndex = +headPic
        let texture: cc.Texture2D = await AssetUtil.loadResSync<cc.Texture2D>(`avatar/${avatarIndex || '1'}`, false);
        let spriteFrame: cc.SpriteFrame = new cc.SpriteFrame(texture);
        this.spAvatar.spriteFrame = spriteFrame;
    }
}
