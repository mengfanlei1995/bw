import UIMgr from "../../UIMgr";
import UIScreen from "../../UIScreen";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Support extends UIScreen {

    closeSelf() {
        this.hide();
    }

    onClickCustomer(){
        UIMgr.show('prefab/hall/Customer', 'Customer');
    }

}
