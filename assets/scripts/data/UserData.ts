import { HALL_EVT } from "../enum/DeskEnum";
import EventMgr from "../mgr/EventMgr";
import StorageMgr from "../mgr/StorageMgr";
import { LoginVO } from "../net/proto/hall";
import LongUtil from "../utils/LongUtil";

class UserData {

    /**玩家信息 */
    userInfo: UserInfo = {};

    initUserInfo(userInfo: LoginVO) {
        let { userId, nickName, headPic, phone, accountType, firstDay, first, walletVO, sessionId } = userInfo;
        let { depositBalance, withdrawBalance, totalCashBalance, freeBalance } = walletVO;
        this.userInfo.userId = userId;
        this.userInfo.nickName = nickName;
        this.userInfo.headPic = headPic;
        this.userInfo.phone = phone;
        this.userInfo.accountType = accountType;
        this.userInfo.firstDay = LongUtil.longToNumber(firstDay);
        this.userInfo.first = first;
        StorageMgr.phone = phone;
        StorageMgr.userId = userId;
        sessionId && (StorageMgr.sessionId = sessionId);
        let walletInfo: WalletInfo = {};
        walletInfo.depositBalance = LongUtil.longToNumber(depositBalance);
        walletInfo.withdrawBalance = LongUtil.longToNumber(withdrawBalance);
        walletInfo.totalCashBalance = LongUtil.longToNumber(totalCashBalance);
        walletInfo.freeBalance = LongUtil.longToNumber(freeBalance);
        this.userInfo.walletInfo = walletInfo;
        EventMgr.emit(HALL_EVT.GOLD_CHANGE);
        console.log(this.userInfo)
    }

}

export default new UserData();

interface UserInfo {
    userId?: string;
    nickName?: string;
    headPic?: string;
    sessionId?: string;
    phone?: string;
    accountType?: number;
    firstDay?: number;
    first?: boolean;
    walletInfo?: WalletInfo;
}

interface WalletInfo {
    depositBalance?: number;
    withdrawBalance?: number;
    totalCashBalance?: number;
    freeBalance?: number;
}
