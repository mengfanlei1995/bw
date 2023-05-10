import SysConfig from "../../../data/SysConfig";
import LangMgr from "../../../mgr/LangMgr";
import JsbUitl from "../../../utils/JsbUitl";
import UIMgr from "../../UIMgr";
import UIWindow from "../../UIWindow";


const { ccclass, property } = cc._decorator;

@ccclass
export default class Customer extends UIWindow {

    onClickClose() {
        this.hide();
    }

    /**拉起小飞机 */
    onClickTelegram() {
        if (!SysConfig.telegram) {
            return;
        }
        let result = JsbUitl.chatInTelegram(SysConfig.telegram);
        if (!result) {
            cc.sys.openURL(SysConfig.telegram);
        }
    }

    onClickCopy() {
        JsbUitl.ClipBoard('');
        UIMgr.showToast(LangMgr.sentence('e0078'));
    }

}
