import MarqueeData from "../data/MarqueeData";
import UserData from "../data/UserData";
import { HALL_EVT } from "../enum/DeskEnum";
import { SocketEvent } from "../enum/SocketEnum";
import EventMgr from "../mgr/EventMgr";
import StorageMgr from "../mgr/StorageMgr";
import UIMgr from "../uiform/UIMgr";
import { Push_ActivityCmd, Push_ActivityNextDayCmd, Push_BonusCmd, Push_BonusRechargeCmd, Push_BonusWithdrawCmd, Push_MarqueeCmd, Push_MarqueeSubCmd, Push_VipCmd, Push_VipUpgradeCmd, Push_WalletCmd, Push_Wallet_ChangeCmd } from "./CmdData";
import CmdMgr from "./CmdMgr";
import { ExternalMessage } from "./proto/ExternalMessage";
import { GameUserWalletNotifyVO, HallPopVO, decodeGameUserWalletNotifyVO, decodeHallPopVO } from "./proto/core";
import { ActNextDayNotifyVO, LoginWalletVO, VipUpgradeNotifyVO, decodeActNextDayNotifyVO, decodeVipUpgradeNotifyVO } from "./proto/hall";

class WsPushMgr {

    public push(data: ExternalMessage) {
        if (data.cmdMerge == CmdMgr.getMergeCmd(Push_WalletCmd, Push_Wallet_ChangeCmd)) {
            //钱包变化
            let info: GameUserWalletNotifyVO = decodeGameUserWalletNotifyVO(data.data);
            let params: LoginWalletVO = {
                depositBalance: info.deposit,
                withdrawBalance: info.withdraw,
                totalCashBalance: info.balance,
                freeBalance: info.free
            }
            UserData.initWalletInfo(params);
        } else if (data.cmdMerge == CmdMgr.getMergeCmd(Push_ActivityCmd, Push_ActivityNextDayCmd)) {
            //隔日充值通知
            let info: ActNextDayNotifyVO = decodeActNextDayNotifyVO(data.data);
            UIMgr.show('prefab/hall/RechargeIncome', 'RechargeIncome', { isClick: true, info: info.expand });
        } else if (data.cmdMerge == CmdMgr.getMergeCmd(Push_VipCmd, Push_VipUpgradeCmd)) {
            //vip升级
            let info: VipUpgradeNotifyVO = decodeVipUpgradeNotifyVO(data.data);
            UserData.vipUpgrade(info);
        } else if (data.cmdMerge == CmdMgr.getMergeCmd(Push_BonusCmd, Push_BonusRechargeCmd)) {
            //充值成功

        } else if (data.cmdMerge == CmdMgr.getMergeCmd(Push_BonusCmd, Push_BonusWithdrawCmd)) {
            //提现成功

        } else if (data.cmdMerge == CmdMgr.getMergeCmd(Push_MarqueeCmd, Push_MarqueeSubCmd)) {
            //跑马灯
            let info: HallPopVO = decodeHallPopVO(data.data);
            MarqueeData.refresh(info);
        } else {
            EventMgr.emit(SocketEvent.WS_MSG_PUSH, { mergeCmd: data.cmdMerge, code: data.responseStatus, data: data.data });
        }
    }

}

export default new WsPushMgr();
