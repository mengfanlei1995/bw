import SysConfig from "../../data/SysConfig";
import { REPORT_EVT } from "../../enum/DeskEnum";
import { SYS_CONST } from "../../enum/SysEventEnum";
import EventMgr from "../../mgr/EventMgr";
import LangMgr from "../../mgr/LangMgr";
import StorageMgr from "../../mgr/StorageMgr";
import { Login_PhoneCmd, Login_PhoneRegisterCmd } from "../../net/CmdData";
import SendMgr from "../../net/SendMgr";
import CocosUtil from "../../utils/CocosUtil";
import JsbUitl from "../../utils/JsbUitl";
import LogUtil from "../../utils/LogUtil";
import RegexUtil from "../../utils/RegexUtil";
import UIMgr from "../UIMgr";
import UIScene from "../UIScene";
import { DialogType } from "../ui/common/DiaLog";


const { ccclass, property } = cc._decorator;

@ccclass
export default class Login extends UIScene {

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

    /**版本号 */
    @property(cc.Label)
    lb_version: cc.Label = null;

    /**验证码按钮 */
    @property(cc.Button)
    btn_otp: cc.Button = null;

    /**phone按钮 */
    @property(cc.Button)
    btn_phone: cc.Button = null;

    /**guest按钮 */
    @property(cc.Button)
    btn_guest: cc.Button = null;

    /**fb按钮 */
    @property(cc.Button)
    btn_fb: cc.Button = null;

    /**注册Toggle */
    @property(cc.Toggle)
    toggle_Register: cc.Toggle = null;

    /**登陆Toggle */
    @property(cc.Toggle)
    toggle_Login: cc.Toggle = null;

    @property(cc.Node)
    btn_forget: cc.Node = null;

    @property(cc.Sprite)
    sp_pass: cc.Sprite = null;

    @property(cc.SpriteFrame)
    spf_passYes: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    spf_passNo: cc.SpriteFrame = null;

    @property(cc.Layout)
    content: cc.Layout = null;

    //验证码倒计时
    private second: number = 60;

    private isShowPass: boolean = false;

    start(): void {
        this.resetContent();
        this._init();
    }

    _init() {
        this.lb_version.string = `ver:${SysConfig.isTest ? 'T-' : ''}${SysConfig.version}`;
        let isPhone: boolean = !!StorageMgr.phone;
        this.toggle_Register.isChecked = !isPhone;
        this.toggle_Login.isChecked = isPhone;
        this.ed_code.node.parent.active = !isPhone;
        this.btn_forget.active = isPhone;
        isPhone && (this.ed_loginPhoneNumber.string = StorageMgr.phone);
    }

    onClickRegister() {
        // if (this.toggle_Register.isChecked) return;
        this.ed_code.node.parent.active = true;
        this.btn_forget.active = false;
    }

    onClickLogin() {
        // if (this.toggle_Login.isChecked) return;
        this.ed_code.node.parent.active = false;
        this.btn_forget.active = true;
    }

    onClickForget() {
        UIMgr.show('prefab/login/ForgetPassWord', 'ForgetPassWord');
    }

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

    onClickPolicy() {

    }

    onClickTC() {

    }

    /**适配分辨率 */
    async resetContent() {
        this.content.node.opacity = 0;
        let spacing: number = 10;
        let height: number = 1001;
        await CocosUtil.sleepSync(0.01);
        let childCount: number = this.content.node.childrenCount;
        let realHeight: number = this.content.node.height;
        let padding: number = (realHeight - height) / (childCount + 1);
        spacing += padding;
        this.content.paddingTop = padding;
        this.content.paddingBottom = padding;
        this.content.spacingY = spacing;
        this.content.node.opacity = 255;
    }

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

    async onGuestLogin(e: cc.Event.EventTouch) {
        this._setButtonVaild(false);
        let result = await SendMgr.sendLogin();
        if (result) {
            this._loginSuccess();
        } else {
            this._setButtonVaild(true);
        }
    }

    async onCodeOTP(e: cc.Event.EventTouch) {
        let mobile: string = this.ed_loginPhoneNumber.string;
        if (RegexUtil.isValidPhoneNumber(mobile)) {
            this.btn_otp.interactable = false;
            let result = await SendMgr.sendSms({ mobile });
            if (result) {
                // this.lb_second.node.parent.active = true;
                this.second = 60;
                this.lb_second.string = `(${this.second}S)`;
                this.schedule(this._updateSecond, 1);
            } else {
                this.btn_otp.interactable = true;
            }
        } else {
            UIMgr.showToast(LangMgr.sentence('e0006'));
        }
    }

    async onPhoneLogin(e: cc.Event.EventTouch) {
        EventMgr.emit(REPORT_EVT.CLICK, {
            element_id: "btn_phoneLogin",
            element_name: "登录界面手机登录按钮",
            element_type: "button",
            element_position: '',
            element_content: 'luckyDice',
        });
        let mobile: string = this.ed_loginPhoneNumber.string;
        let mobilePassword: string = this.ed_password.string;
        if (!RegexUtil.isValidPhoneNumber(mobile)) {
            UIMgr.showToast(LangMgr.sentence('e0006'));
            return;
        }
        if (!mobilePassword) {
            UIMgr.showToast(LangMgr.sentence('e0345'));
            return;
        }
        let code = this.ed_code.string;
        if (this.toggle_Login.isChecked) {
            this._setButtonVaild(false);
            let result = await SendMgr.sendLogin({ mobile, mobilePassword }, Login_PhoneCmd);
            if (!result) {
                this._setButtonVaild(true);
            }
        } else {
            if (code && code.length == 4) {
                this._setButtonVaild(false);
                let result = await SendMgr.sendLogin({ mobile, code, mobilePassword }, Login_PhoneRegisterCmd);
                if (!result) {
                    this._setButtonVaild(true);
                }
            } else {
                UIMgr.showToast(LangMgr.sentence('e0053'));
            }
        }

    }

    _setButtonVaild(isValid: boolean) {
        this.btn_fb.interactable = isValid;
        this.btn_phone.interactable = isValid;
        this.btn_guest.interactable = isValid;
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

    _loginSuccess() {
        // UIMgr.goHall();
    }

    // protected onEnable(): void {
    //     EventMgr.on(SYS_CONST.BACK, this.onBackEvent, this);
    // }

    // protected onDisable(): void {
    //     EventMgr.off(SYS_CONST.BACK, this.onBackEvent, this)
    // }

    // onBackEvent() {
    //     UIMgr.showDialog({
    //         type: DialogType.OkCancelBtn,
    //         okCb: () => {
    //             cc.game.end();
    //         }
    //     });
    // }

}
