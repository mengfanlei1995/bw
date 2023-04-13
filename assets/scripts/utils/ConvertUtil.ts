/**
 * 坐标转换工具类
 */
class ConvertUtil {
    /**
     * 得到一个节点的世界坐标
     * node的原点在中心
     * @param {*} node 
     */
    public  localConvertWorldPointAR(node: cc.Node) {
        if (node) {
            return node.parent.convertToWorldSpaceAR(node.getPosition());
        }
        return null;
    }

    /**
     * 得到一个节点的世界坐标
     * node的原点在左下边
     * @param {*} node 
     */
    public  localConvertWorldPoint(node: cc.Node) {
        if (node) {
            return node.convertToWorldSpace(cc.v2(0, 0));
        }
        return null;
    }

    /**
     * 把一个世界坐标的点，转换到某个节点下的坐标
     * 原点在node中心
     * @param {*} node 
     * @param {*} worldPoint 
     */
    public  worldConvertLocalPointAR(node: cc.Node, worldPoint: cc.Vec2) {
        if (node) {
            return node.convertToNodeSpaceAR(worldPoint);
        }
        return null;
    }

    /**
     * 把一个世界坐标的点，转换到某个节点下的坐标
     * 原点在node左下角
     * @param {*} node 
     * @param {*} worldPoint 
     */
    public  worldConvertLocalPoint(node: cc.Node, worldPoint: cc.Vec2) {
        if (node) {
            return node.convertToNodeSpace(worldPoint);
        }
        return null;
    }

    /**
     *  * 把一个节点的本地坐标转到另一个节点的本地坐标下
     * @param {*} node 
     * @param {*} targetNode 
     */
    public  convertOtherNodeSpace(node: cc.Node, targetNode: cc.Node) {
        if (!node || !targetNode) {
            return null;
        }
        //先转成世界坐标
        let worldPoint = this.localConvertWorldPoint(node);
        return this.worldConvertLocalPoint(targetNode, worldPoint);
    }

    /**
    *  * 把一个节点的本地坐标转到另一个节点的本地坐标下
    * @param {*} node 
    * @param {*} targetNode 
    */
    public  convertOtherNodeSpaceAR(node: cc.Node, targetNode: cc.Node) {
        if (!node || !targetNode) {
            return null;
        }
        //先转成世界坐标
        let worldPoint = this.localConvertWorldPointAR(node);
        let worldPos = this.worldConvertLocalPointAR(targetNode, worldPoint);
        //let result = cc.v2(worldPos.x - node.width/2, worldPos.y + node.height/2)
        return worldPos
    }

    /**
     * 坐标是否在目标节点范围内
     * @param pos 坐标
     * @param target 目标节点
     */
    public  isPosOnNodeRect(pos: cc.Vec2, target: cc.Node): boolean {
        const rect = target.getBoundingBoxToWorld();
        return rect.contains(pos);
    }

    /**
     * 两个节点是否重叠
     * @param node1 节点 1
     * @param node2 节点 2
     * @param contains 是否完全包含
     */
    public  areNodesOverlap(node1: cc.Node, node2: cc.Node, contains: boolean = false): boolean {
        const rect1 = node1.getBoundingBoxToWorld(),
            rect2 = node2.getBoundingBoxToWorld();
        return contains ? rect1.containsRect(rect2) : rect1.intersects(rect2);
    }
}

export default new ConvertUtil();