import LangMgr from "../../../scripts/mgr/LangMgr";
import { TeenPattiWarWinDto } from "../../../scripts/net/proto/room";
import UIWindow from "../../../scripts/uiform/UIWindow";
import TPRecordItem from "./TPRecordItem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TeenPattiWarHistory extends UIWindow {

    @property({ tooltip: '内容区域', type: cc.Node })
    contentLayout: cc.Node = null;

    @property({ tooltip: '流水预制', type: cc.Prefab })
    recordPrefab: cc.Prefab = null;

    @property({ tooltip: 'KING数量', type: cc.Label })
    kNumLabel: cc.Label = null;
    @property({ tooltip: 'QUEEN数量', type: cc.Label })
    qNumLabel: cc.Label = null;

    @property({ tooltip: 'KING百分比', type: cc.Label })
    kRadioLabel: cc.Label = null;
    @property({ tooltip: 'QUEEN百分比', type: cc.Label })
    qRadioLabel: cc.Label = null;

    @property({ tooltip: 'KING百分比', type: cc.Node })
    kRadioNode: cc.Node = null;
    @property({ tooltip: 'QUEEN百分比', type: cc.Node })
    qRadioNode: cc.Node = null;

    @property({ tooltip: '特殊牌型', type: cc.Node })
    bottomLayout: cc.Node = null;

    public onShow(gameRecordInfo: TeenPattiWarWinDto[]): void {
        this.node.zIndex = 99;
        this.initRecordHistroy(gameRecordInfo);
    }

    /**
    * 初始化历史记录
    * @returns 
    */
    initRecordHistroy(gameRecordInfo: TeenPattiWarWinDto[]) {
        this.contentLayout.removeAllChildren()
        if (gameRecordInfo == null || gameRecordInfo.length <= 0) return;
        let k = 0, q = 0
        let cardType: number[] = [];
        for (let i = 0; i < gameRecordInfo.length; i++) {
            let { id, king, queen } = gameRecordInfo[i];
            let win: number = id[0] > 1 ? id[0] : id[1];
            if (win == 2) k++
            else q++;
            cardType.push(win == 2 ? king.paisAttr : queen.paisAttr);
            let node = this.productRecordNode(id);
            this.contentLayout.addChild(node);
        }
        cardType = cardType.slice(-9);
        let kRadio = Math.floor(k * 100 / gameRecordInfo.length);
        let qRadio = 100 - kRadio;
        this.kNumLabel.string = `${k}`;
        this.qNumLabel.string = `${q}`;
        this.kRadioLabel.string = `${kRadio}%`;
        this.qRadioLabel.string = `${qRadio}%`;
        this.kRadioNode.width = 5.8 * kRadio;
        this.qRadioNode.width = 5.8 * qRadio + 10;
        this.bottomLayout.children.forEach((node: cc.Node, index) => {
            let type = cardType[index];
            node.active = !!type;
            let str = this.getTPcardType(type);
            node.children[0].getComponent(cc.Label).string = str;
        })

    }

    /**获取tp牌型 */
    getTPcardType(type: number): string {
        let array = [" ", LangMgr.sentence("e0275"), LangMgr.sentence("e0276"), LangMgr.sentence("e0277"), LangMgr.sentence("e0278"), LangMgr.sentence("e0279"), LangMgr.sentence("e0280"), LangMgr.sentence("e0281")];
        return array[type] || "";
    }

    onClickClose() {
        this.hide();
    }

    /**
     * 生产记录
     * @param value 
     * @returns 
     */
    public productRecordNode(id: number[]) {
        let node = cc.instantiate(this.recordPrefab);
        node.getComponent(TPRecordItem).init(id);
        return node
    }

}
