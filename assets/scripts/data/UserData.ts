import StorageMgr from "../mgr/StorageMgr";
import { BaseUserInfoVO } from "../net/proto/core";
import LongUtil from "../utils/LongUtil";

class UserData {

    /**玩家信息 */
    userInfo: UserInfo = {};

    initUserInfo(userInfo: BaseUserInfoVO) {
        let { userId, nickName, headPic, phone, walletVO } = userInfo;
        let { depositBalance, withdrawBalance, totalCashBalance, freeBalance } = walletVO;
        this.userInfo.userId = userId;
        this.userInfo.nickName = nickName;
        this.userInfo.headPic = headPic;
        this.userInfo.phone = phone;
        StorageMgr.phone = phone;
        StorageMgr.userId = userId;
        let walletInfo: WalletInfo = {};
        walletInfo.depositBalance = LongUtil.longToNumber(depositBalance);
        walletInfo.withdrawBalance = LongUtil.longToNumber(withdrawBalance);
        walletInfo.totalCashBalance = LongUtil.longToNumber(totalCashBalance);
        walletInfo.freeBalance = LongUtil.longToNumber(freeBalance);
        this.userInfo.walletInfo = walletInfo;
        console.log(this.userInfo)
    }

}

export default new UserData();

interface UserInfo {
    userId?: string;
    nickName?: string;
    headPic?: string;
    phone?: string;
    walletInfo?: WalletInfo;
}

interface WalletInfo {
    depositBalance?: number;
    withdrawBalance?: number;
    totalCashBalance?: number;
    freeBalance?: number;
}

