import SysConfig from "../../../data/SysConfig";
import { REPORT_EVT } from "../../../enum/DeskEnum";
import EventMgr from "../../../mgr/EventMgr";
import CommonUtil from "../../../utils/CommonUtil";
import JsbUitl from "../../../utils/JsbUitl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class VipItem extends cc.Component {

    @property({ tooltip: 'buy按钮', type: cc.Node })
    btnBuy: cc.Node = null;

    @property({ tooltip: 'vipbg', type: cc.Node })
    vipBg: cc.Node = null;

    @property({ tooltip: '正常材质', type: cc.Material })
    material: cc.Material = null;

    @property({ tooltip: '灰色材质', type: cc.Material })
    materialGray: cc.Material = null;

    @property({ tooltip: 'deposit', type: cc.Label })
    lb_deposit: cc.Label = null;

    @property({ tooltip: 'bonus', type: cc.Label })
    lb_bonus: cc.Label = null;

    @property({ tooltip: 'price', type: cc.Label })
    lb_price1: cc.Label = null;

    @property({ tooltip: 'price', type: cc.Label })
    lb_price2: cc.Label = null;

    grayLabel(root: cc.Node, show: boolean) {
        root.getComponent(cc.Label).setMaterial(0, !show ? this.materialGray : this.material)
    }

    graySprite(root: cc.Node, show: boolean) {
        root.getComponent(cc.Sprite).setMaterial(0, !show ? this.materialGray : this.material)
    }

    private info;

    //初始化UI
    init(info) {
        this.info = info;
        for (let i = 0; i < this.vipBg.childrenCount; i++) {
            let node: cc.Node = this.vipBg.children[i];
            let title: cc.Label = cc.find("title", node).getComponent(cc.Label);
            let content: cc.Label = cc.find("content", node).getComponent(cc.Label);
            let data = info.privilegeList;
            let show: boolean = false;
            if (data) {
                title.string = data[i].title;
                content.string = data[i].content;
                show = data[i].show;
            }
            this.graySprite(node, show);
            node.children.forEach((child: cc.Node) => {
                if (child.getComponent(cc.Label)) {
                    this.grayLabel(child, show);
                } else {
                    this.graySprite(child, show);
                }
            })
        }
        if (info.giftBag) {
            let giftInfo = info.giftBag;
            this.lb_bonus.string = `${giftInfo.bonus / 100}`;
            this.lb_deposit.string = `${giftInfo.deposit / 100}`;
            this.lb_price1.string = `₹${(giftInfo.bonus + giftInfo.deposit) / 100}`;
            this.lb_price2.string = `₹${giftInfo.pay / 100}`;
            this.graySprite(this.btnBuy, giftInfo.canPay);
            this.btnBuy.getChildByName("mask").active = !giftInfo.canPay;
            this.btnBuy.getChildByName("skeleton").active = giftInfo.canPay;
            this.btnBuy.children[0].children.forEach((child: cc.Node) => {
                if (child.getComponent(cc.Label)) {
                    this.grayLabel(child, giftInfo.canPay);
                } else {
                    this.graySprite(child, giftInfo.canPay);
                }
            })
        } else {
            this.btnBuy.parent.children.forEach(child => {
                child.active = false;
            })
        }
    }

    /**购买vip礼包 */
    async onClickBuy() {
        let giftInfo = this.info.giftBag;
        if (!giftInfo.canPay) return;
        EventMgr.emit(REPORT_EVT.CLICK, {
            element_id: "btn_addcash_byVip",
            element_name: "vip充值按钮",
            element_type: "button",
            element_position: '',
            element_content: '',
        });
        let data = {
            productId: 0,
            amount: giftInfo.pay / 100,
            activityId: giftInfo.activityId
        }
        EventMgr.emit(REPORT_EVT.CLICK, {
            element_id: "api_addcash",
            element_name: "调用充值接口",
            element_type: "button",
            element_position: '',
            element_content: '',
        });
        let result = await NetMgr.inst.recharge(data)
        if (result) {
            this.openUrl(result.url);
        }
        EventMgr.emit(REPORT_EVT.CLICK, {
            element_id: result ? "api_addcash_success" : "api_addcash_fail",
            element_name: "调用充值接口" + result ? "成功" : "失败",
            element_type: "button",
            element_position: '',
            element_content: '',
        });
    }

    /**打开充值链接 */
    openUrl(url: string = "") {
        if (cc.sys.isBrowser) {
            cc.sys.openURL(url)
        } else {
            JsbUitl.openWebView(url);
        }
    }

}
