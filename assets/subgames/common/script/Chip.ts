const { ccclass, property } = cc._decorator;

@ccclass
export default class Chip extends cc.Component {

    @property(cc.Label)
    lb_chip1: cc.Label = null;

    @property(cc.Label)
    lb_chip2: cc.Label = null;

    @property({ tooltip: "筹码资源列表", type: cc.SpriteFrame })
    chipsSpriteList: cc.SpriteFrame[] = Array<cc.SpriteFrame>()
    chipIndexArray: number[] = [2, 10, 100, 500, 1000, 5000]

    init(value: number, areaType: string, betNums: number[]) {
        this.chipIndexArray = betNums;
        this.node.name = areaType;
        this.node.opacity = 255
        this.node.scale = 0.6
        var sp = this.node.getComponent(cc.Sprite);
        let index = this.getChipByValue(value);
        sp.spriteFrame = this.chipsSpriteList[index];
        let color: cc.Color[] = [cc.color(160, 60, 4), cc.color(0, 120, 72), cc.color(160, 60, 4), cc.color(108, 28, 173), cc.color(110, 11, 23), cc.color(31, 31, 31)]
        this.lb_chip1.string = `${this.chipIndexArray[index]}`;
        this.lb_chip2.string = `${this.chipIndexArray[index]}`;
        this.lb_chip2.node.color = color[index];
    }

    /**
     * 根据值获取筹码帧图片
     * @param value 
     */
    public getChipByValue(value: number): number {
        for (let i = 0; i < this.chipIndexArray.length; i++) {
            if (this.chipIndexArray[i] == value) {
                return i;
            }
        }
        return 0
    }


}
