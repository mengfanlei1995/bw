import { HALL_EVT } from "../../../enum/DeskEnum";
import EventMgr from "../../../mgr/EventMgr";
import { PictureVO } from "../../../net/proto/hall";
import AssetUtil from "../../../utils/AssetUtil";
import DownLoadUtil from "../../../utils/DownLoadUtil";
import JsbUitl from "../../../utils/JsbUitl";
import MD5 from "../../../utils/MD5";
import UIMgr from "../../UIMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SwiperPage extends cc.Component {
    @property(cc.Sprite)
    sp_pictrue: cc.Sprite = null;

    private swiperData: PictureVO = null;

    async init(data: PictureVO) {
        this.swiperData = data;
        let texture: cc.Texture2D = null;
        if (data.pictureUrl) {
            let pictureUrl: string = data.pictureUrl;
            if (cc.sys.isNative) {
                pictureUrl = await DownLoadUtil.downLoadImage(data.pictureUrl, 'swiper', `${MD5.hashString(data.pictureUrl)}.png`);
            }
            if (!pictureUrl) return;
            texture = await AssetUtil.loadRemoteSync<cc.Texture2D>(pictureUrl);
        }
        if (texture && cc.isValid(this.sp_pictrue)) this.sp_pictrue.spriteFrame = new cc.SpriteFrame(texture);
    }

    async onClickJump() {
        if (!this.swiperData) return;
        let { skipType, skipPage, skipParams, skipData, activityId } = this.swiperData;
        switch (skipType) {
            case 1:
                UIMgr.show('prefab/hall/AddCash', 'AddCash', { vipInto: false, vipLevel: 0 });
                break;
            case 2:
                cc.sys.openURL(skipPage);
                // if (cc.sys.isNative) JsbUitl.openWebView(skipPage);
                // else cc.sys.openURL(skipPage);
                break;
            case 3:
                UIMgr.show(`prefab/hall/${skipPage}`, skipPage);
                break;
            case 4:
                let data = JSON.parse(skipData);
                if (data && data?.skipIndex >= 0) EventMgr.emit(HALL_EVT.CHANGE_MENU_ACTIVE, data.skipIndex);
                else UIMgr.show(`prefab/hall/${skipPage}`, skipPage);
                break;
        }
    }
}
