import { HALL_EVT } from "../enum/DeskEnum";
import EventMgr from "../mgr/EventMgr";
import StorageMgr from "../mgr/StorageMgr";
import { LoginWalletVO, VipUpgradeNotifyVO } from "../net/proto/hall";
import { LoginVO } from "../net/proto/hall";
import UIMgr from "../uiform/UIMgr";
import LongUtil from "../utils/LongUtil";
import SysConfig from "./SysConfig";
class UserData {

    /**玩家信息 */
    userInfo: UserInfo = {};

    /**vip升级之前的等级 */
    public beforeVipLevel: number = 0;

    /**vip等级 */
    private _vipLevel: number = 0;

    /**俱乐部等级 */
    public clubLevel: number = 0;

    /**vip当前等级 */
    set vipLevel(_vipLevel: number) {
        this._vipLevel = _vipLevel;
        EventMgr.emit(HALL_EVT.UPDATE_VIP);
    }
    /**vip当前等级 */
    get vipLevel(): number {
        return this._vipLevel
    }

    /**
     * 升级vip
     * @param vipInfo 
     */
    public vipUpgrade(vipInfo: VipUpgradeNotifyVO) {
        let { beforeLevel, currentLevel } = vipInfo;
        this._vipLevel = currentLevel;
        this.beforeVipLevel = beforeLevel;
        EventMgr.emit(HALL_EVT.UPDATE_VIP);
        UIMgr.show('prefab/hall/VipUp', 'VipUp');
    }

    initUserInfo(userInfo: LoginVO) {
        let { userId, nickName, headPic, phone, accountType, firstDay, first, walletVO, green, sessionId } = userInfo;
        this.userInfo.userId = userId;
        this.userInfo.nickName = nickName;
        this.userInfo.headPic = headPic;
        this.userInfo.phone = phone;
        this.userInfo.accountType = accountType;
        this.userInfo.firstDay = LongUtil.longToNumber(firstDay);
        this.userInfo.first = first;
        StorageMgr.phone = phone;
        StorageMgr.userId = userId;
        SysConfig.isGreen = green;
        sessionId && (StorageMgr.sessionId = sessionId);
        this.initWalletInfo(walletVO);
    }

    initWalletInfo(walletVO: LoginWalletVO) {
        let { depositBalance, withdrawBalance, totalCashBalance, freeBalance } = walletVO;
        let walletInfo: WalletInfo = {};
        walletInfo.depositBalance = LongUtil.longToNumber(depositBalance);
        walletInfo.withdrawBalance = LongUtil.longToNumber(withdrawBalance);
        walletInfo.totalCashBalance = LongUtil.longToNumber(totalCashBalance);
        walletInfo.freeBalance = LongUtil.longToNumber(freeBalance);
        this.userInfo.walletInfo = walletInfo;
        EventMgr.emit(HALL_EVT.GOLD_CHANGE);
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
