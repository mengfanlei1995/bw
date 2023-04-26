import UserData from "../../../data/UserData";
import { HALL_EVT } from "../../../enum/DeskEnum";
import EventMgr from "../../../mgr/EventMgr";
import LangMgr from "../../../mgr/LangMgr";
import SendMgr from "../../../net/SendMgr";
import UIMgr from "../../UIMgr";
import UIWindow from "../../UIWindow";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ChangeName extends UIWindow {

    @property({ tooltip: '昵称输入框', type: cc.EditBox })
    ed_nickName: cc.EditBox = null;

    onClickClose() {
        this.hide();
    }

    /**提交修改昵称 */
    async onClickSubmit() {
        let nickName: string = this.ed_nickName.string;
        if (!nickName) {
            UIMgr.showToast(LangMgr.sentence("e0045"));
            return;
        }
        let result = await SendMgr.sendChangeNickName(nickName);
        if (result) {
            UIMgr.showToast(LangMgr.sentence("e0030"));
            UserData.userInfo.nickName = nickName;
            EventMgr.emit(HALL_EVT.UPDATE_HALL_NICKNAME);
            this.hide();
        }
    }

}
