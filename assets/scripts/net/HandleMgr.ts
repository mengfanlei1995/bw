import CmdMgr from "./CmdMgr";
import { NetCallFunc } from "./ws/NetInterface";

class HandleMgr {

    private handlers: Map<string, NetCallFunc> = new Map<string, NetCallFunc>();

    /**注册回调*/
    public addHandler(msgId: number, mergeCmd: number, callFunc: NetCallFunc): void {
        this.handlers.set(`${msgId}+${mergeCmd}`, callFunc);
    }

    /**获取回调接口*/
    public getHandler(msgId: number, mergeCmd: number): NetCallFunc {
        let callFunc: NetCallFunc = null;
        if (this.handlers.get(`${msgId}+${mergeCmd}`)) {
            callFunc = this.handlers.get(`${msgId}+${mergeCmd}`);
            this.deleteHandler(msgId, mergeCmd);
        }
        return callFunc;
    }

    /**删除回调*/
    public deleteHandler(msgId: number, mergeCmd: number): void {
        if (this.handlers.get(`${msgId}+${mergeCmd}`)) {
            this.handlers.delete(`${msgId}+${mergeCmd}`);
        }
    }

    //消息分发
    public packageHandler(msgId: number, mergeCmd: number, code: number, data: Uint8Array): NetCallFunc {
        let callFunc = this.getHandler(msgId, mergeCmd);
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
