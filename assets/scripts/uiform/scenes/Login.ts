import { REPORT_EVT } from "../../enum/DeskEnum";
import EventMgr from "../../mgr/EventMgr";
import LangMgr from "../../mgr/LangMgr";
import { Login_PhoneCmd } from "../../net/CmdData";
import SendMgr from "../../net/SendMgr";
import JsbUitl from "../../utils/JsbUitl";
import LogUtil from "../../utils/LogUtil";
import RegexUtil from "../../utils/RegexUtil";
import UIMgr from "../UIMgr";
import UIScene from "../UIScene";


const { ccclass, property } = cc._decorator;

@ccclass
export default class Login extends UIScene {

    /**登录手机号 */
    @property(cc.EditBox)
    ed_loginPhoneNumber: cc.EditBox = null;

    /**验证码 */
    @property(cc.EditBox)
    ed_code: cc.EditBox = null;

    /**倒计时 */
    @property(cc.Label)
    lb_second: cc.Label = null;

    /**版本号 */
    @property(cc.Label)
    lb_version: cc.Label = null;

    /**验证码按钮 */
    @property(cc.Button)
    btn_otp: cc.Button = null;

    //验证码倒计时
    private second: number = 60;

    onFacebookLogin(e: cc.Event.EventTouch) {
        EventMgr.emit(REPORT_EVT.CLICK, {
            element_id: "btn_facebookLogin",
            element_name: "登录界面Facebook登陆按钮",
            element_type: "button",
            element_position: '',
            element_content: '',
        });
        JsbUitl.loginFB({});
    }

    async onGuestLogin() {
        let result = await SendMgr.sendLogin();
        if (result) {
            this._loginSuccess();
        }
    }

    async onCodeOTP(e: cc.Event.EventTouch) {
        let phone: string = this.ed_loginPhoneNumber.string;
        if (RegexUtil.isValidPhoneNumber(phone)) {
            let result = await SendMgr.sendSms(phone);
            if (result) {
                this.btn_otp.interactable = false;
                // this.lb_second.node.parent.active = true;
                this.second = 60;
                this.lb_second.string = `(${this.second}S)`;
                this.schedule(this._updateSecond, 1);
            }
        } else {
            UIMgr.showToast(LangMgr.sentence('e0006'));
        }
    }

    async onLogin(e: cc.Event.EventTouch) {
        EventMgr.emit(REPORT_EVT.CLICK, {
            element_id: "btn_phoneLogin",
            element_name: "登录界面手机登录按钮",
            element_type: "button",
            element_position: '',
            element_content: 'luckyDice',
        });
        let mobile: string = this.ed_loginPhoneNumber.string;
        if (!RegexUtil.isValidPhoneNumber(mobile)) {
            UIMgr.showToast(LangMgr.sentence('e0006'));
            return
        }
        let code = this.ed_code.string;
        if (code && code.length == 4) {
            SendMgr.sendLogin({ mobile, code }, Login_PhoneCmd);
        } else {
            UIMgr.showToast(LangMgr.sentence('e0053'));
        }
    }

    onClearLoginPhone(e: cc.Event.EventTouch) {
        this.ed_loginPhoneNumber.string = "";
    }

    /**修改倒计时时间 */
    _updateSecond() {
        if (this.second > 1) {
            this.second--;
        } else {
            this.unschedule(this._updateSecond);
            this.btn_otp.interactable = true;
            // this.lb_second.node.parent.active = false;
        }
        this.lb_second.string = `(${this.second}S)`;
    }

    _loginSuccess() {
        UIMgr.goHall();
    }

}
