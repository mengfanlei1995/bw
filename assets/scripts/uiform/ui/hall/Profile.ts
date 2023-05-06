import UserData from "../../../data/UserData";
import { HALL_EVT } from "../../../enum/DeskEnum";
import EventMgr from "../../../mgr/EventMgr";
import UIMgr from "../../UIMgr";
import UIScreen from "../../UIScreen";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Profile extends UIScreen {

    @property({ tooltip: '绑定手机号', type: cc.Node })
    btnBonud: cc.Node = null;

    @property({ tooltip: '修改手机号', type: cc.Node })
    btnChange: cc.Node = null;

    @property({ tooltip: 'phone', type: cc.Label })
    phoneLabel: cc.Label = null;

    protected onEnable(): void {
        this.updatePhone();
        EventMgr.on(HALL_EVT.UPDATE_PHONE, this.updatePhone, this);
    }

    onDisable() {
        EventMgr.off(HALL_EVT.UPDATE_PHONE, this.updatePhone, this);
    }

    updatePhone() {
        this.phoneLabel.string = UserData.userInfo.phone ? UserData.userInfo.phone : "Not bound";
        this.btnBonud.active = !UserData.userInfo.phone;
        this.btnChange.active = !!UserData.userInfo.phone;
    }

    onClickBack() {
        this.hide();
    }

    onClickAvatar() {
        UIMgr.show('prefab/hall/ChangeAvatar', 'ChangeAvatar');
    }

    onClickNickName() {
        UIMgr.show('prefab/hall/ChangeName', 'ChangeName');
    }


    onClickPhone() {
        if (UserData.userInfo.phone) {
            UIMgr.show('prefab/hall/BindPhone', 'BindPhone', 2);
        } else {
            UIMgr.show('prefab/hall/BindPhone', 'BindPhone', 1);
        }
    }

}
