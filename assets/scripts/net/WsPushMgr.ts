import UserData from "../data/UserData";
import { HALL_EVT } from "../enum/DeskEnum";
import { SocketEvent } from "../enum/SocketEnum";
import EventMgr from "../mgr/EventMgr";
import StorageMgr from "../mgr/StorageMgr";
import { Push_WalletCmd, Push_Wallet_ChangeCmd } from "./CmdData";
import CmdMgr from "./CmdMgr";
import { ExternalMessage } from "./proto/ExternalMessage";
import { GameUserWalletNotifyVO, decodeGameUserWalletNotifyVO } from "./proto/core";
import { LoginWalletVO } from "./proto/hall";

class WsPushMgr {

    public push(data: ExternalMessage) {
        if (data.cmdMerge == CmdMgr.getMergeCmd(Push_WalletCmd, Push_Wallet_ChangeCmd)) {
            let info: GameUserWalletNotifyVO = decodeGameUserWalletNotifyVO(data.data);
            if (info.userId == StorageMgr.userId) {
                let params: LoginWalletVO = {
                    depositBalance: info.deposit,
                    withdrawBalance: info.withdraw,
                    totalCashBalance: info.balance,
                    freeBalance: info.free
                }
                UserData.initWalletInfo(params);
            }
        } else {
            EventMgr.emit(SocketEvent.WS_MSG_PUSH, { mergeCmd: data.cmdMerge, code: data.responseStatus, data: data.data });
        }
    }

}

export default new WsPushMgr();
