import CmdMgr from "./CmdMgr";
import { NetCallFunc } from "./ws/NetInterface";

class HandleMgr {

    private handlers: Map<number, NetCallFunc> = new Map<number, NetCallFunc>();

    /**注册回调*/
    public addHandler(mergeCmd: number, callFunc: NetCallFunc): void {
        this.handlers.set(mergeCmd, callFunc);
    }

    /**获取回调接口*/
    public getHandler(mergeCmd: number): NetCallFunc {
        let callFunc: NetCallFunc = null;
        if (this.handlers.get(mergeCmd)) {
            callFunc = this.handlers.get(mergeCmd);
            this.deleteHandler(mergeCmd);
        }
        return callFunc;
    }

    /**删除回调*/
    public deleteHandler(mergeCmd: number): void {
        if (this.handlers.get(mergeCmd)) {
            this.handlers.delete(mergeCmd);
        }
    }

    //消息分发
    public packageHandler(mergeCmd: number, code: number, data: Uint8Array): NetCallFunc {
        let callFunc = this.getHandler(mergeCmd);
        callFunc && callFunc(code, data);
        return callFunc;
    }

    /**清除回调*/
    public clearHandler(): void {
        //全部按超时回调
        this.handlers.forEach((callFunc: NetCallFunc) => {
            callFunc && callFunc(504, null);
        })
        this.handlers.clear();
    }

}

export default new HandleMgr();
