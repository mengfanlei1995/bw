import SysConfig from "../../../data/SysConfig";
import EventMgr from "../../../mgr/EventMgr";
import SendMgr from "../../../net/SendMgr";
import { VipLevelV2VO } from "../../../net/proto/hall";
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

    private info: VipLevelV2VO;

    //初始化UI
    init(info: VipLevelV2VO) {
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
        let data = {
            productId: 0,
            amount: giftInfo.pay / 100,
            activityId: giftInfo.activityId
        }
        let result = await SendMgr.sendPay(data)
        if (result) {
            this.openUrl(result.url);
        }
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
