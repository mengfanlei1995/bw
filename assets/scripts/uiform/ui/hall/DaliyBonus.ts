import { AutoList } from "../../../component/AutoList";
import { HALL_EVT } from "../../../enum/DeskEnum";
import EventMgr from "../../../mgr/EventMgr";
import LangMgr from "../../../mgr/LangMgr";
import SendMgr from "../../../net/SendMgr";
import { DailyBonusEventVO } from "../../../net/proto/hall";
import CocosUtil from "../../../utils/CocosUtil";
import LongUtil from "../../../utils/LongUtil";
import UIMgr from "../../UIMgr";
import UIScreen from "../../UIScreen";
import TaskItem from "./TaskItem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class DaliyBonus extends UIScreen {

    autoList: AutoList;

    @property({ tooltip: '任务列表', type: cc.ScrollView })
    scrollView: cc.ScrollView = null;

    @property({ tooltip: '星期', type: cc.Label })
    lb_week: cc.Label = null;

    @property({ tooltip: '日期', type: cc.Label })
    lb_date: cc.Label = null;

    @property({ tooltip: '时间', type: cc.Label })
    lb_time: cc.Label = null;

    @property({ tooltip: '签到Node', type: [cc.Node] })
    node_sign: cc.Node[] = [];

    private todaySignIn: boolean = false;
    private weekSignInDay: number = 0;
    private isLoad: boolean = false;

    protected onEnable(): void {
        this.node.zIndex = 1;
        EventMgr.on(HALL_EVT.DESK_RELOAD, this._initSign, this);
        this._initSign();
    }

    protected onDisable(): void {
        EventMgr.off(HALL_EVT.DESK_RELOAD, this._initSign, this);
    }

    //更新签到信息
    async _initSign() {
        let result = await SendMgr.sendDailyBonusInfo();
        if (!result || !cc.isValid(this.node)) return;
        if (this.isLoad) return;
        this.isLoad = true;
        let { events, timeStamp, todaySignIn, weekSignInDay, signInTitles } = result;
        this.todaySignIn = todaySignIn;
        this.weekSignInDay = LongUtil.longToNumber(weekSignInDay);
        this.lb_week.string = getWeekDate(LongUtil.longToNumber(timeStamp));
        this.lb_date.string = getNowFormatDate(LongUtil.longToNumber(timeStamp));

        //刷新今日剩余时间
        let updateTime = () => {
            let { hour, minute, second } = getNowTimeDate();
            this.lb_time.string = `${hour < 10 ? "0" + hour : hour}    ${minute < 10 ? "0" + minute : minute}    ${second < 10 ? "0" + second : second}`;
        }
        updateTime();
        this.schedule(updateTime, 1);
        this._initTask(events);
        //启动动画
        await CocosUtil.sleepSync(0.3);
        if (!cc.isValid(this.node)) return;
        cc.tween(this.lb_time.node)
            .to(0.8, { scale: 1 }, { easing: 'backOut' })
            .start();

        await CocosUtil.sleepSync(0.3);
        if (!cc.isValid(this.node)) return;
        for (let i = 0; i < this.node_sign.length; i++) {
            let node: cc.Node = this.node_sign[i];
            cc.tween(node)
                .to(0.8, { opacity: 255 })
                .start();
            let bonusLabel: cc.Label = cc.find("bonusLabel", node)?.getComponent(cc.Label);
            bonusLabel!.string = signInTitles[i] && signInTitles[i];
            let received: cc.Node = cc.find("received", node);
            received!.active = i <= this.weekSignInDay - 1;
            if (!todaySignIn && i == this.weekSignInDay) {
                let lightFX: cc.Node = cc.find("lightFX", node);
                lightFX.active = true;
            }
        }

        await CocosUtil.sleepSync(0.5);
        if (!cc.isValid(this.node)) return;
        cc.tween(this.lb_week.node)
            .to(0.8, { scale: 1 }, { easing: 'backOut' })
            .start();

        await CocosUtil.sleepSync(0.4);
        if (!cc.isValid(this.node)) return;
        cc.tween(this.lb_date.node)
            .to(0.8, { scale: 1 }, { easing: 'backOut' })
            .start();

    }


    //更新任务信息
    async _initTask(events: DailyBonusEventVO[]) {
        let list: DailyBonusEventVO[] = events;
        this.autoList = this.scrollView.getComponent(AutoList)
        this.autoList.updateItemData = this.updateItemData.bind(this)
        this.autoList.updateData(list)
        this.scrollView.scrollToTop();
    }

    private index = 0;

    private updateItemData(node: cc.Node, data: DailyBonusEventVO) {
        if (data) {
            node.getComponent(TaskItem).init(data, this.index);
            this.index++;
        }
    }

    /**签到 */
    async onClickSign() {
        if (!this.todaySignIn) {
            let result = await SendMgr.sendDailyBonusSign();
            //播放签到完成动画
            if (result && cc.isValid(this.node)) {
                this.todaySignIn = true;
                let node: cc.Node = this.node_sign[this.weekSignInDay];
                let received: cc.Node = cc.find("received", node);
                received!.active = true;
                let lightFX: cc.Node = cc.find("lightFX", node);
                lightFX!.active = false;
                this.weekSignInDay++;
                let clickFX: cc.Node = cc.find("clickFX", node);
                clickFX!.active = true;
                await CocosUtil.sleepSync(0.5)
                if (!cc.isValid(this.node)) return;
                clickFX!.active = false;
                let receive: cc.Node = cc.find("receive", node);
                receive!.active = true;
                await CocosUtil.sleepSync(1)
                if (!cc.isValid(this.node)) return;
                receive!.active = false;
                UIMgr.show('prefab/hall/SignWindows', 'SignWindows', result);
                // let bonus: cc.Node = cc.find("bonus", node);
                // bonus.getComponent(cc.Label)!.string = `+₹${result.normalAmount / 100}`
                // cc.tween(bonus)
                //     .to(0.5, { scale: 1, position: cc.v3(bonus.x, bonus.y + 30, 0) })
                //     .start();
                // cc.tween(bonus)
                //     .delay(1)
                //     .to(0.5, { opacity: 0 })
                //     .start();
            }
        } else {
            UIMgr.showToast(LangMgr.sentence("e0037"));
        }
    }

    onClickBack() {
        this.hide();
    }

}
/**
* 获取当前星期
*
*/
function getWeekDate(time) {
    let now = new Date(time);
    let day = now.getDay();
    let weeks = new Array(LangMgr.sentence("e0322"), LangMgr.sentence("e0323"), LangMgr.sentence("e0324"), LangMgr.sentence("e0325"), LangMgr.sentence("e0326"), LangMgr.sentence("e0327"), LangMgr.sentence("e0328"));
    let week = weeks[day];
    return week;
}

/**
 * 
 * @returns 获取当前日期
 */
function getNowFormatDate(time) {
    let date = new Date(time);
    let year = date.getFullYear();
    let month: any = date.getMonth() + 1;
    let strDate: any = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    let currentdate = `${strDate}/${month}/${year}`;
    return currentdate;
}

/**获取当天剩余时间 */
function getNowTimeDate() {
    let date = new Date();
    let hour: number = 23 - date.getHours();
    let minute: number = 60 - date.getMinutes();
    let second: number = 60 - date.getSeconds();
    return { hour, minute, second };
}