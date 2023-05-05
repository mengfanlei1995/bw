import { HallPopVO } from "../net/proto/core";
import CommonUtil from "../utils/CommonUtil";

class MarqueeData {

    /**跑马灯数据 根据播放场景及优先级存2维数组 */
    marqueeData: any = {};
    /**当前已知的跑马灯会出现的场景 */
    private sceneArr: string[] = ['', 'Hall', 'Game'];

    /**更新跑马灯信息 */
    refresh(marqueeData: HallPopVO) {
        if (!marqueeData) return;
        let { popLevel, templateType, playTimes, templateContent, templateParams, playInterval } = marqueeData;
        //目前暂时按模板类型来判断，后面如果场景多了，需要增加marqueeData显示场景的scene字段来控制
        let _scene: string = this.sceneArr[+templateType];
        if (!this.marqueeData[_scene]) {
            this.marqueeData[_scene] = [];
            this.marqueeData[_scene][popLevel] = [];
        }
        for (let i = 0; i < playTimes; i++) {
            let msg: string = '';
            switch (+templateType) {
                case 1:
                case 2:
                    msg = CommonUtil.format(templateContent, `<color=#00ffae>${templateParams[0]}</c>`, `<color=#f6e495>${templateParams[1]}</c>`, `<color=#ffe15a>${templateParams[2]}</c>`);
                    break;
            }
            let info: any = { msg, playInterval };
            this.marqueeData[_scene][popLevel].push(info);
        }
    }

    /**
     * 根据当前ui的名称，转换为跑马灯数据的key
     * @param uiName 
     * @returns 
     */
    scene(uiName: string): string {
        let _scene: number = 0;
        switch (uiName) {
            case 'UIHall':
                _scene = 1
                break;
            default:
                _scene = 2
                break;
        }
        return this.sceneArr[_scene];
    }

}

export default new MarqueeData();
