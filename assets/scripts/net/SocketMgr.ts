import SysConfig from "../data/SysConfig";
import CocosUtil from "../utils/CocosUtil";
import { NetCallFunc } from "./ws/NetInterface";
import SocketClient from "./ws/SocketClient";

class SocketMgr {

    /**建立ws连接 */
    public connect(): void {
        SocketClient.connect();
    }

    /**关闭连接 */
    public close(autoConnect: boolean = true, code?: number, reason?: string): void {
        SocketClient.close(autoConnect, code, reason);
    }

    /**发送消息 */
    public send(mergeCmd: number, pbBuff: Uint8Array, callFunc: NetCallFunc): boolean {
        return SocketClient.send(mergeCmd, pbBuff, callFunc);
    }

    /**
     * 从后台切回APP时，将切后台之后的消息全部丢弃
     */
    public async clearHistoryMsgPool() {
        //当前帧及当前帧之前的所有消息全部丢弃
        await CocosUtil.sleepSync(0.013);
        SysConfig.isHide = false;
    }

}

export default new SocketMgr();
