import { HALL_EVT } from "../../../enum/DeskEnum";
import EventMgr from "../../../mgr/EventMgr";
import UIMgr from "../../UIMgr";
import UIScreen from "../../UIScreen";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Menu extends UIScreen {

    @property(cc.Toggle)
    toggle_menu: cc.Toggle[] = [];

    private curIndex: number = 0;

    protected onEnable(): void {
        EventMgr.on(HALL_EVT.CHANGE_MENU_ACTIVE, this.setMenuIndex, this);
    }

    protected onDisable(): void {
        EventMgr.off(HALL_EVT.CHANGE_MENU_ACTIVE, this.setMenuIndex, this);
    }

    start() {
        this.node.zIndex = 2;
    }

    onClickMenu(e: cc.Toggle, index: string) {
        this.setMenuIndex(+index);
    }

    async setMenuIndex(index: number) {
        if (index == this.curIndex) return;
        let color: cc.Color[] = [new cc.Color(255, 193, 147, 255), new cc.Color(147, 183, 255, 255)];
        this.toggle_menu[index].isChecked = true;
        for (let i = 0; i < this.toggle_menu.length; i++) {
            let text: cc.Node = this.toggle_menu[i].node.children[2];
            text.color = color[i == index ? 0 : 1];
        }
        let uiName: string[] = ['Home', 'DaliyBonus', 'Rank', 'Email', 'Mine'];
        if (!uiName[index]) return;
        await UIMgr.show(`prefab/hall/${uiName[index]}`, uiName[index]);
        UIMgr.hide(uiName[this.curIndex]);
        this.curIndex = index;
    }

}
