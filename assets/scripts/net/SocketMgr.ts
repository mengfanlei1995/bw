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

}

export default new SocketMgr();
