import { ResponseRoomRecordVO } from "../../../scripts/net/proto/room";
import CommonUtil from "../../../scripts/utils/CommonUtil";
import LongUtil from "../../../scripts/utils/LongUtil";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameRecordItem extends cc.Component {

    private data: ResponseRoomRecordVO = null;

    private gameName: string = '';

    init(info: ResponseRoomRecordVO, gameName: string) {
        this.data = info;
        this.gameName = gameName;
        let node: cc.Node = this.node;
        let lb_time: cc.Label = cc.find("lb_time", node).getComponent(cc.Label);
        let lb_id: cc.Label = cc.find("lb_id", node).getComponent(cc.Label);
        let lb_amount: cc.Label = cc.find("lb_amount", node).getComponent(cc.Label);
        let lb_winnings: cc.Label = cc.find("lb_winnings", node).getComponent(cc.Label);
        lb_time.string = CommonUtil.getDate(LongUtil.longToNumber(info.gameTime));
        lb_amount.string = `${LongUtil.longToNumber(info.amount) / 100}`;
        lb_id.string = gameName;
        lb_winnings.string = info.winnings == 1 ? `${LongUtil.longToNumber(info.winAmount) / 100}` : `-${LongUtil.longToNumber(info.amount) / 100}`;
        lb_winnings.node.color = info.winnings == 1 ? cc.color(207, 114, 83, 255) : cc.color(138, 154, 169, 255)
    }

}
