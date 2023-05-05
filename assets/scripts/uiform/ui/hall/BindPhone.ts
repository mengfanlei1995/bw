import { REPORT_EVT } from "../../../enum/DeskEnum";
import EventMgr from "../../../mgr/EventMgr";
import LangMgr from "../../../mgr/LangMgr";
import StorageMgr from "../../../mgr/StorageMgr";
import { Login_PhoneCmd } from "../../../net/CmdData";
import SendMgr from "../../../net/SendMgr";
import RegexUtil from "../../../utils/RegexUtil";
import UIMgr from "../../UIMgr";
import UIScene from "../../UIScene";
import UIScreen from "../../UIScreen";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BindPhone extends UIScreen {

    /**登录手机号 */
    @property(cc.EditBox)
    ed_loginPhoneNumber: cc.EditBox = null;

    /**密码 */
    @property(cc.EditBox)
    ed_password: cc.EditBox = null;

    /**验证码 */
    @property(cc.EditBox)
    ed_code: cc.EditBox = null;

    /**倒计时 */
    @property(cc.Label)
    lb_second: cc.Label = null;

    /**验证码按钮 */
    @property(cc.Button)
    btn_otp: cc.Button = null;

    @property(cc.Sprite)
    sp_pass: cc.Sprite = null;

    @property(cc.SpriteFrame)
    spf_passYes: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    spf_passNo: cc.SpriteFrame = null;

    //验证码倒计时
    private second: number = 60;

    private isShowPass: boolean = false;

    onClickShowHidePass() {
        if (this.isShowPass) {
            this.isShowPass = false;
            this.sp_pass.spriteFrame = this.spf_passNo;
            this.ed_password.inputFlag = cc.EditBox.InputFlag.PASSWORD;
        } else {
            this.isShowPass = true;
            this.sp_pass.spriteFrame = this.spf_passYes;
            this.ed_password.inputFlag = cc.EditBox.InputFlag.DEFAULT;
        }
    }

    async onClickSubmit(e: cc.Event.EventTouch) {
        let mobile: string = this.ed_loginPhoneNumber.string;
        if (!RegexUtil.isValidPhoneNumber(mobile)) {
            UIMgr.showToast(LangMgr.sentence('e0006'));
            return
        }
        let code = this.ed_code.string;
        if (code && code.length == 4) {
            let result = await SendMgr.sendBindPhone({ mobile, code });
            if (result) {
                StorageMgr.phone = mobile;
                this.hide();
            }
        } else {
            UIMgr.showToast(LangMgr.sentence('e0053'));
        }
    }

    async onCodeOTP(e: cc.Event.EventTouch) {
        let mobile: string = this.ed_loginPhoneNumber.string;
        if (RegexUtil.isValidPhoneNumber(mobile)) {
            let result = await SendMgr.sendBindSms({ mobile });
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

    onClearLoginPhone(e: cc.Event.EventTouch) {
        this.ed_loginPhoneNumber.string = "";
    }

    /**修改倒计时时间 */
    _updateSecond() {
        if (this.second > 1) {
            this.second--;
            this.lb_second.string = `(${this.second}S)`;
        } else {
            this.unschedule(this._updateSecond);
            this.btn_otp.interactable = true;
            this.lb_second.string = 'OTP';
            // this.lb_second.node.parent.active = false;
        }
    }

    onClickBack() {
        this.hide();
    }

}
