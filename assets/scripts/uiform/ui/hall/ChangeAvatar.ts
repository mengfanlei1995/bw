import UserData from "../../../data/UserData";
import { HALL_EVT } from "../../../enum/DeskEnum";
import EventMgr from "../../../mgr/EventMgr";
import LangMgr from "../../../mgr/LangMgr";
import SendMgr from "../../../net/SendMgr";
import UIMgr from "../../UIMgr";
import UIScreen from "../../UIScreen";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ChangeAvatar extends UIScreen {

    onClickBack() {
        this.hide();
    }

    /**修改头像 */
    async onClickCheckAvatar(e: cc.Event.EventTouch, type: string) {
        if (type == UserData.userInfo.headPic) return;
        let result = await SendMgr.sendChangeHead(type);
        if (result) {
            UIMgr.showToast(LangMgr.sentence("e0030"));
            UserData.userInfo.headPic = type;
            EventMgr.emit(HALL_EVT.UPDATE_HALL_HEAD);
        }
    }

}
