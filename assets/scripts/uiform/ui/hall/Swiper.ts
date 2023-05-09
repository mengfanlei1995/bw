import { HALL_EVT } from "../../../enum/DeskEnum";
import EventMgr from "../../../mgr/EventMgr";
import { PictureVO } from "../../../net/proto/hall";
import SwiperPage from "./SwiperPage";

// export interface SwiperData {
//     /**图片地址*/
//     pictureUrl: string
//     /**事件类型 - 0 纯展示不做任何互动 1 大厅内跳转 2 打开网页 3 弹窗 4 跳其它场景scene*/
//     skipType: number

//     //以上2个参数必传，以下4项可不传
//     /**网页地址url，预制体名称，弹窗名称，场景scene名称*/
//     skipPage: string
//     /**需要设置的DataMgr里的变量名称*/
//     skipData: any;
//     /**业务参数，例如弹窗就是弹窗的参数 json字符串更加灵活和可扩展*/
//     skipParams: string;
//     /**活动id*/
//     activityId: string;
//     /**跳转下标 */
//     skipIndex: number
// }

const { ccclass, property } = cc._decorator;

@ccclass
export default class Swiper extends cc.Component {
    @property({ displayName: '单个页面的预制', type: cc.Prefab })
    pagePrefab: cc.Prefab = null;
    private pageview: cc.PageView = null;
    private pages: number = 0;
    private data: any[] = [];

    private isLoad: boolean = false;

    onLoad() {
        this.pageview = this.node.getComponent(cc.PageView);
    }

    onEnable() {
        EventMgr.on(HALL_EVT.INIT_ROTATIONPICTRUES, this.init, this)
    }

    onDisable() {
        EventMgr.off(HALL_EVT.INIT_ROTATIONPICTRUES, this.init, this)
    }

    init(data: PictureVO[], callback: Function) {
        this.data = data
        let total = data ? data.length : 0;
        this.pages = total
        if (total) {
            this.pageview.removeAllPages();
            for (let i = 0; i < total; i++) {
                let page = cc.instantiate(this.pagePrefab)
                let _swiper: cc.Node = cc.instantiate(page);
                _swiper.getComponent(SwiperPage).init(data[i]);
                this.pageview.addPage(_swiper);
            }
            this.pageview.node.scale = 1.1;
            this.pageview.node.children[0].width = this.pageview.content.width / this.pageview.content.childrenCount;
        }
        if (!this.isLoad) {
            this.schedule(this.pageviewAutoScroll.bind(this), 1)
            this.pageview.scrollToLeft();
            this.isLoad = true;
        }
        callback && callback()

    }

    private time: number = 1;

    onPageviewScrollToRightClick() {
        this.time = 0;
        let pageview: cc.PageView = this.pageview
        if (!pageview) return;
        let currIndex: number = pageview.getCurrentPageIndex();
        let total: number = this.pages;
        currIndex++;
        pageview.scrollToPage(currIndex % total, pageview.pageTurningSpeed)
    }

    onPageviewScrollToLeftClick() {
        this.time = 0;
        let pageview: cc.PageView = this.pageview
        if (!pageview) return;
        let currIndex: number = pageview.getCurrentPageIndex();
        let total: number = this.pages;
        currIndex !== 0 ? currIndex-- : (currIndex = total - 1);
        pageview.scrollToPage(currIndex % total, pageview.pageTurningSpeed)
    }

    pageviewAutoScroll() {
        if (this.time < 5) {
            this.time++;
            return;
        }
        this.time = 0;
        let pageview: cc.PageView = this.pageview
        if (!pageview) return;
        if (!pageview.isAutoScrolling() && !pageview.isScrolling()) {
            let currIndex: number = pageview.getCurrentPageIndex();
            let total: number = this.pages;
            currIndex++;
            pageview.scrollToPage(currIndex % total, pageview.pageTurningSpeed)
        }
    }

    pageviewEvent(e: cc.PageView) {
        this.time = 0;
    }
}
