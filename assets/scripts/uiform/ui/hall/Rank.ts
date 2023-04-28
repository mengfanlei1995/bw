import { REPORT_EVT } from "../../../enum/DeskEnum";
import EventMgr from "../../../mgr/EventMgr";
import SendMgr from "../../../net/SendMgr";
import { ReferInvitationMapUrlVO } from "../../../net/proto/hall";
import JsbUitl from "../../../utils/JsbUitl";
import UIScreen from "../../UIScreen";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Rank extends UIScreen {

    @property({ tooltip: '主tab内容节点', type: cc.Node })
    tabContent: cc.Node = null;

    private facebook: shareInfo = {
        url: "",
        title: ""
    }

    private native: shareInfo = {
        url: "",
        title: ""
    }

    private whatsApp: shareInfo = {
        url: "",
        title: ""
    }

    protected start(): void {
        this.node.zIndex = 1;
        EventMgr.emit(REPORT_EVT.SCENE, { page_name: `makeMoney` })
        this.getShareUrl();
    }

    async getShareUrl() {
        let info: ReferInvitationMapUrlVO = await SendMgr.sendReferInvitationLink();
        if (!info || !cc.isValid(this.node)) return;
        let { facebook, native, whatsApp } = info.urlMap;
        this.facebook.url = decodeURIComponent(facebook.url);
        this.facebook.title = decodeURIComponent(facebook.title).replace(/\+/g, ' ');
        this.native.url = decodeURIComponent(native.url);
        this.native.title = decodeURIComponent(native.title).replace(/\+/g, ' ');
        this.whatsApp.url = decodeURIComponent(whatsApp.url);
        this.whatsApp.title = decodeURIComponent(whatsApp.title).replace(/\+/g, ' ');
    }

    acitveTab(e: cc.Event.EventTouch) {
        let target: cc.Node = e.target as cc.Node;
        target.parent.children.forEach(
            node => {
                node.children[0].active = node.name === target.name;
                node.children[1].active = node.name !== target.name;
            }
        )
        this.tabContent.children.forEach(
            node => {
                node.active = node.name === target.name;
            }
        )
    }

    onShareFacebookClick() {
        JsbUitl.shareLink({
            platform: 'facebook',
            title: this.facebook.title,
            url: this.facebook.url
        })
    }

    onShareWhatsAppClick() {
        JsbUitl.shareLink({
            platform: 'whatsapp',
            title: `${this.whatsApp.title} ${this.whatsApp.url}`,
            url: `${this.whatsApp.title} ${this.whatsApp.url}`
        })
    }

    onShareSystemClick() {
        JsbUitl.shareLink({
            platform: 'system',
            title: `${this.native.title} ${this.native.url}`,
            url: `${this.native.title} ${this.native.url}`
        })
    }

}
interface shareInfo {
    url: string
    title: string
}