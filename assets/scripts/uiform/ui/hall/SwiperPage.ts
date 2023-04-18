import { HALL_EVT, REPORT_EVT } from "../../../enum/DeskEnum";
import EventMgr from "../../../mgr/EventMgr";
import AssetUtil from "../../../utils/AssetUtil";
import DownLoadUtil from "../../../utils/DownLoadUtil";
import JsbUitl from "../../../utils/JsbUitl";
import MD5 from "../../../utils/MD5";
import { SwiperData } from "./Swiper";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SwiperPage extends cc.Component {
    @property(cc.Sprite)
    sp_pictrue: cc.Sprite = null;

    private swiperData: SwiperData = null;

    async init(data: SwiperData) {
        this.swiperData = data;
        let texture = null;
        if (data.pictureUrl) {
            let pictureUrl: string = data.pictureUrl;
            if (cc.sys.isNative) {
                pictureUrl = await DownLoadUtil.downLoadImage(data.pictureUrl, 'swiper', MD5.hashString(data.pictureUrl));
            }
            texture = await AssetUtil.loadRemoteSync(pictureUrl);
        }
        if (texture && cc.isValid(this.sp_pictrue)) this.sp_pictrue.spriteFrame = new cc.SpriteFrame(texture);
    }

    async onClickJump() {
        if (!this.swiperData) return;
        let { skipType, skipPage, skipParams, skipData, activityId } = this.swiperData;
        EventMgr.emit(REPORT_EVT.CLICK, {
            element_id: "swiper_click",
            element_name: "轮播图点击事件",
            element_type: "button",
            element_position: '',
            element_content: JSON.stringify(this.swiperData),
        });
        switch (skipType) {
            case 1:
                FixedMgr.open(UIConfig.AddCash.prefab);
                break;
            case 2:
                if (cc.sys.isNative) JsbUitl.openWebView(skipPage);
                else cc.sys.openURL(skipPage);
                break;
            case 3:
                WindowMgr.open(skipPage)
                break;
            case 4:
                SceneMgr.open(skipPage)
                if (skipData.skipIndex >= 0) EventMgr.emit(HALL_EVT.CHANGE_BOTTOM_UI, skipData.skipIndex);
                break;
        }
    }
}
