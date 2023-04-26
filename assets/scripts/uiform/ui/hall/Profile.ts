import UserData from "../../../data/UserData";
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
            // SceneMgr.open(UIConfig.BindPhone.prefab, 2)
        } else {
            // SceneMgr.open(UIConfig.BindPhone.prefab, 1)
        }
    }

}
