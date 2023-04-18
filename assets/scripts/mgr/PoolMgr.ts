
class PoolMgr {

    public handle = new Map<string, cc.Node[]>()

    public getNode(prefab: cc.Prefab, parent: cc.Node = null) {
        const name = prefab.data.name
        //cc.log(`当前预制体名称：${name}`)
        let node: cc.Node = null
        if (this.handle.has(name) && this.handle.get(name).length) {
            node = this.handle.get(name).pop()
            //cc.log(`当前预制体${name}从对象池获取`)
        } else {
            node = cc.instantiate(prefab) as cc.Node
        }
        parent && (node.parent = parent)
        node.active = true
        return node
    }

    public setNode(target: cc.Node) {
        if (!target) {
            //cc.log('target has been recycled .......')
            return
        }

        target.active = false;
        if (target.parent) {
            target.removeFromParent();
        }
        target.active = true

        const name = target.name
        if (this.handle.has(name)) {
            this.handle.get(name).push(target)
        } else {
            this.handle.set(name, [target])
        }
    }

    public clearNode(name: string) {
        //cc.log(`当前预制体${name}从对象次清除`)
        if (this.handle.has(name)) this.handle.delete(name)
    }

    /**清楚对象池全部对象 */
    public clear() {
        //console.log(`清除对象池`)
        this.handle.clear()
        //console.log(`对象池内容：`, this.handle)
    }
}

export default new PoolMgr();
