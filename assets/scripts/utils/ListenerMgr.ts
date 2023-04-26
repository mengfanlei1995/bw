import CommonUtil from "./CommonUtil";

export default class ListenerMgr {

    private static cbMap: Map<string, Function> = new Map<string, Function>();
    private static keySuff: number = 1;

    public static create(callback: Function, key: string = ''): string {
        let _realKey: string = `${key || this.keySuff}`;
        let _callback = this.cbMap.get(_realKey)
        if (!_callback) {
            this.cbMap.set(_realKey, callback);
            this.keySuff++;
        }
        return _realKey
    }

    /**客户端调用注册的回调函数用 */
    public static callListener(key: string, params: string) {
        let _callback = this.cbMap.get(key)
        _callback && _callback(CommonUtil.isJsonString(params) ? JSON.parse(params) : params);
        this.clearCb(key)
    }

    /**客户端调用注册的回调函数用 */
    public static callListenerByKey(key: string) {
        let _callback = this.cbMap.get(key)
        _callback && _callback();
    }

    /**客户端调用注册的回调函数用 */
    public static callListenerByKeyParams(key: string, params: string) {
        let _callback = this.cbMap.get(key)
        _callback && _callback(CommonUtil.isJsonString(params) ? JSON.parse(params) : params);
    }


    public static clearCb(key: string) {
        let _callback = this.cbMap.get(key)
        _callback && this.cbMap.delete(key)
    }
}

window['ListenerMgr'] = ListenerMgr;