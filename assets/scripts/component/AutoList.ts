const { ccclass, property } = cc._decorator;
@ccclass

/**
 *  ((      /|_/| 
 *   \\.._.'  , ,\
 *   /\ | '.__ v /
 *  (_ .   /   "  
 *   ) _)._  _ /  
 *  '.\ \|( / (   
 *    '' ''\\ \\  
 * 说明:本组件需要同时搭配ScrollView使用
 * 需要一个预制体作为item,目前只支持固定宽高的item
 * 支持多行多列显示
 * v1.0支持垂直模式固定高度item
 * v1.1支持自定义padding
 * v1.2支持横向模式固定宽度item
 * v1.3支持多行多列的垂直滚动模式
 * v1.4updateDate会强制更新所有可视区已有的data
 * v1.5新增flushItemData 用来刷新已有的可视化item数据
 */
export class AutoList extends cc.Component {
    @property({ tooltip: "预制体", type: cc.Prefab })
    private itemPrefab: cc.Prefab = null;

    @property({ tooltip: "约定单向item之间的间距" })
    private spacing: number = 22.5;

    @property({ tooltip: "节点距离ScrollView边缘的距离" })
    private padding: number = 22.5;

    @property({ tooltip: "多行多列模式" })
    private multiple: boolean = false;

    @property({ tooltip: "多行多列模式 item之间的间距" })
    private multipleSpacing: number = 22.5;

    @property({ tooltip: "多行多列模式,节点距离ScrollView边缘的距离,注意:该模式中每一行中的item间距自动计算" })
    private multiplePadding: number = 22.5;


    /**检测阀值,由 计算最小可视区数量 计算得来 */
    private checkRange: number = 0;

    /**额外加载 */
    private extraLoad: number = 1;

    /**ScrollView 节点 */
    private scrollView: cc.ScrollView = null;
    private content: cc.Node = null;
    private view: cc.Node = null;
    /**是否开启水平滚动 */
    private horizontal: boolean = false;

    /**prefab节点池 */
    private pool: cc.NodePool = null;

    /**
     * 自动高度修复
     * 支持单节点自由高度,所以需要修复高度滚动条的高度
     * 设置或者更新列表数据后:
     * 1.获取列表长度,获得默认单个节点默认高度,将数值赋值为单个
     */
    /**默认节点高度/宽度 */
    private defaultHeight: number = -1;
    private defaultWidth: number = -1;
    /**自动高度修复差值 */
    /**自动高度修复个数 */

    /** ScoreView默认可视区存放数量 */
    private itemsVisible: number = -1;

    /** 多行多列模式 */
    private multipleItemsVisible: number = 0;

    /**数据内容 */
    private data: Array<any> = null;

    onLoad() {
        this.scrollView = this.node.getComponent(cc.ScrollView);
        if (!this.scrollView) {
            console.error("AutoList need cc.ScrollView Component with together");
            return;
        }
        this.pool = new cc.NodePool();

        this.content = this.scrollView.content;
        this.content.anchorX = 0.5
        this.content.anchorY = 0.5;
        this.horizontal = this.scrollView.horizontal;

        this.view = this.content.parent;
        /**设置view节点大小和本节点大小一致 */
        this.view.height = this.node.height;
        this.view.width = this.node.width;
        if (!this.itemPrefab) {
            console.error("AutoList can not set item prefab");
            return;
        }
        /**获取prefab默认宽高 */
        this.defaultHeight = this.itemPrefab.data.height;
        this.defaultWidth = this.itemPrefab.data.width;
        /**计算最小可视区数量 */
        if (this.horizontal) {
            this.scrollView.vertical = false
            this.itemsVisible = Math.ceil(this.view.width / this.defaultWidth);

            this.checkRange = this.defaultWidth + this.spacing * 2;
        } else {
            this.scrollView.vertical = true;
            this.itemsVisible = Math.ceil(this.view.height / this.defaultHeight);

            this.checkRange = this.defaultHeight + this.spacing * 2;
        }


        /** 多行多列模式计算每行可以存放多少个 */
        if (this.multiple) {
            if (this.horizontal) {
                this.content.height = this.view.height;
            } else {
                this.content.width = this.view.width;
            }
            let contentSize = (this.horizontal ? this.content.height : this.content.width)
                - 2 * this.multiplePadding + this.multipleSpacing;
            let itemSize = this.horizontal ? this.defaultHeight : this.defaultWidth;
            this.multipleItemsVisible = Math.floor(contentSize / (itemSize + this.multipleSpacing));

            this.multipleSpacing = 0//((this.horizontal ? this.content.height : this.content.width) - 2 * this.multiplePadding - this.multipleItemsVisible * this.defaultWidth) / (this.multipleItemsVisible - 1)
        }
    }

    onDisable() {
        this.pool.clear()
    }

    update(dt: number): void {
        this.updateView(this.checkNeedUpdate());
    }

    updateView(startIndex: number) {
        if (startIndex < 0) return;

        let hasList: object = this.removeMoveOutNode();

        let multipleShow = this.multiple ? this.multipleItemsVisible : 1;
        let size: number = multipleShow * this.itemsVisible +
            multipleShow * this.extraLoad;

        for (let i = 0; i < size; i++) {
            let waitAddIndex = startIndex * multipleShow + i;
            if (hasList[waitAddIndex]) continue;
            if (waitAddIndex > this.data?.length - 1) continue;
            let node = this.getItem(waitAddIndex);
            this.content.addChild(node);
        }
    }

    /**移除所有超出外部的节点,并返回所有可视区中已经存在的节点 */
    private removeMoveOutNode(): object {
        let contentSize: number = this.horizontal ? this.content.width : this.content.height;
        let viewTop: number = (this.horizontal ? this.content.x : this.content.y) - this.defaultPosition - this.checkRange;
        let viewBottom: number = viewTop + (this.horizontal ? this.view.width : this.view.height) + this.checkRange + this.padding;

        let tempNode: cc.Node = null;
        let needObject: object = {};
        for (let i = 0, size = this.content.children.length; i < size; i++) {
            tempNode = this.content.children[size - i - 1];
            let need: boolean = this.checkNodeMoveOut(tempNode, contentSize, viewTop, viewBottom);
            need && (needObject[tempNode['_autolist_posi']] = true) || this.pool.put(tempNode);
        }
        tempNode = null;
        return needObject;
    }


    /**检测一个节点是否超出屏幕 */
    private checkNodeMoveOut(node: cc.Node, contentSize: number, viewTop: number, viewBottom: number): boolean {
        let nodePosition: number = this.horizontal ? node.x : node.y;
        nodePosition = -nodePosition + contentSize / 2;
        let nodeSize: number = this.horizontal ? node.width : node.height;
        nodeSize /= 2;
        return viewTop < nodePosition + nodeSize && viewBottom > nodePosition - nodeSize;
    }

    /**最后一次移动的位置,用来检测师傅需要更新ui的基础判断 */
    private lastMovePosition: number = 0;
    /**默认初始位置,用来记录ScrollView最初的位置 */
    private defaultPosition: number = 0;
    /**可视区最上方的节点位置,当最上方节点位置不变时,可以不用更新 */
    private lastNodePosition: number = -1;
    // 检测是否需要更新UI.
    private checkNeedUpdate(): number {
        /**当这次content位置和上次相比没有变化 */
        if (this.lastMovePosition === (this.horizontal ? this.content.x : this.content.y)
            && this.data && this.data.length !== 0
            && this.lastNodePosition !== -1) return -1;
        /** 获取最后位置并记录*/
        this.lastMovePosition = this.horizontal ? this.content.x : this.content.y;
        // 整个Scroll移动的距离
        let moveSize = (this.lastMovePosition - this.defaultPosition) * (this.horizontal ? -1 : 1);

        let itmeSize = this.horizontal ? this.defaultWidth : this.defaultHeight;

        let topNodePosition = Math.floor((moveSize - this.padding) / (itmeSize + this.spacing));
        if (topNodePosition < 0) topNodePosition = 0;

        if (this.lastNodePosition === topNodePosition) return -1;
        this.lastNodePosition = topNodePosition;
        return topNodePosition;
    }

    public init(data: Array<any>) {
        if (!data) return;
        this.data = data;
    }

    /**刷新设置数据 */
    public updateData(data: Array<any>, clear: boolean = true): void {
        if (!data) return;
        this.data = data;
        this.flushItemData(clear);
        /**计算content内容大小方块,以及重新定位content初始位置 */
        if (this.multiple) {
            let row = Math.ceil(data.length / this.multipleItemsVisible);
            if (this.horizontal) {
                this.content.width = row * this.defaultWidth + (row - 1) * this.spacing + this.padding * 2;
                this.defaultPosition = this.content.width / 2 - this.view.width / 2;
                this.content.x = this.defaultPosition;
            } else {
                this.content.height = row * this.defaultHeight + (row - 1) * this.spacing + this.padding * 2;
                this.defaultPosition = -(this.content.height / 2 - this.view.height / 2);
                this.content.y = this.defaultPosition;
            }
        } else {
            if (this.horizontal) {
                this.content.width = data.length * this.defaultWidth + (data.length - 1) * this.spacing + this.padding * 2;
                this.defaultPosition = this.content.width / 2 - this.view.width / 2;
                this.content.x = this.defaultPosition;
            } else {
                this.content.height = data.length * this.defaultHeight + (data.length - 1) * this.spacing + this.padding * 2;
                this.defaultPosition = -(this.content.height / 2 - this.view.height / 2);
                this.content.y = this.defaultPosition;
            }
        }

        clear && this.updateView(0)
    }

    /**获取单个节点,并设置item位置和内容 */
    private getItem(positionIndex: number): cc.Node {
        let node: cc.Node = this.pool.get(this.itemPrefab);
        if (!node) {
            // console.log("实例化+1")
            node = cc.instantiate(this.itemPrefab);
        }
        if (this.multiple) {
            let row = 0, col = 0;
            if (this.horizontal) {
                col = Math.floor(positionIndex / this.multipleItemsVisible);
                row = positionIndex % this.multipleItemsVisible;
            } else {
                row = Math.floor(positionIndex / this.multipleItemsVisible);
                col = positionIndex % this.multipleItemsVisible;
            }
            node.y = this.content.height / 2 - (row * this.defaultHeight + row * this.spacing + 0.5 * this.defaultHeight + this.padding);
            node.x = this.multiplePadding + this.defaultWidth * col + this.multipleSpacing * col - this.content.width / 2 + this.defaultWidth / 2;
        } else {
            if (this.horizontal) {
                node.x = -this.content.width / 2 + (positionIndex * this.defaultWidth + positionIndex * this.spacing + 0.5 * this.defaultWidth + this.padding);
            } else {
                node.y = this.content.height / 2 - (positionIndex * this.defaultHeight + positionIndex * this.spacing + 0.5 * this.defaultHeight + this.padding);
            }
        }
        node['_autolist_posi'] = positionIndex;
        this.updateItemData(node, this.data[positionIndex]);
        return node;
    }

    /**刷新所有节点内容 */
    public flushItemData(clear: boolean = true): void {
        if (!this.content) return;

        if (clear) {
            this.content.removeAllChildren()
            this.pool.clear()
        } else {
            this.content.children.forEach(v => {
                this.updateItemData(v, this.data[v['_autolist_posi']]);
            })
        }
    }

    /**更新节点内容 */
    public updateItemData: (node: cc.Node, data: any) => void = null;
}