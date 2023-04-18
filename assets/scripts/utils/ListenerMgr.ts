import CommonUtil from "./CommonUtil";

class ListenerMgr {

    private cbMap: Map<string, Function> = new Map<string, Function>();
    private keySuff: number = 1;

    public create(callback: Function, key: string = ''): string {
        let _realKey: string = `${key || this.keySuff}`;
        let _callback = this.cbMap.get(_realKey)
        if (!_callback) {
            this.cbMap.set(_realKey, callback);
            this.keySuff++;
        }
        return _realKey
    }

    /**客户端调用注册的回调函数用 */
    public callListener(key: string, params: string) {
        let _callback = this.cbMap.get(key)
        _callback && _callback(CommonUtil.isJsonString(params) ? JSON.parse(params) : params);
        this.clearCb(key)
    }

    /**客户端调用注册的回调函数用 */
    public callListenerByKey(key: string) {
        let _callback = this.cbMap.get(key)
        _callback && _callback();
    }

    /**客户端调用注册的回调函数用 */
    public callListenerByKeyParams(key: string, params: string) {
        let _callback = this.cbMap.get(key)
        _callback && _callback(CommonUtil.isJsonString(params) ? JSON.parse(params) : params);
    }


    public clearCb(key: string) {
        let _callback = this.cbMap.get(key)
        _callback && this.cbMap.delete(key)
    }
}

export default new ListenerMgr();