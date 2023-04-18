
/**大厅 */
export const HALL_EVT = cc.Enum({
    /**检测GPS是否授权获取 */
    CHECKGPS: 'HE_01',
    /**获取GPS失败 */
    GET_GPS_FAIL: "HE_02",
    /**更新大厅头像 */
    UPDATE_HALL_HEAD: 'HE_03',
    /**牌桌loading控制 */
    LOADING_CTRL: 'HE_04',
    /**网络重连后，桌面重载 */
    DESK_RELOAD: 'DESK_RELOAD',
    /**金币变动 */
    GOLD_CHANGE: "HE_5",
    /**加载轮播图 */
    INIT_ROTATIONPICTRUES: "HE_6",
    /**刷新邮件 */
    UPDATE_EMAIL: "HE_7",
    /**刷新vip等级 */
    UPDATE_VIP: "HE_8",
    /**切换横竖屏 */
    SETORIENTATION: "HE_9",
    /**更换昵称 */
    UPDATE_HALL_NICKNAME: "HE_10",
    /**更改大厅底部UI显示状态 */
    CHANGE_MENU_ACTIVE: "HE_11",
    /** 查询KFC信息*/
    SELECT_KFC_INFO: "HE_12",
    /**切换大厅底部UI */
    CHANGE_BOTTOM_UI: "HE_13",
    /**刷新邮件红点 */
    UPDATE_EMAIL_RED: "HE_14",
    /**刷新BONUS红点 */
    UPDATE_BONUS_RED: "HE_15",
    /**打开弹窗 */
    OPEN_WINDOWS: "HE_16"
})

/**手指动画，显示隐藏事件 */
export const FINGER_TIPS = cc.Enum({
    HIDE: 'FNGT_01',
    SHOW: 'FNGT_02'
})

export const REPORT_EVT = cc.Enum({
    /**上报界面 */
    SCENE: "RPTE_01",
    /**点击事件上报 */
    CLICK: "RPTE_02",
    /**安装APP上报 */
    INSTALL: "RPTE_03",
    /**切到后台 */
    BACKGROUND: "RPTE_04",
    /**在线时长 */
    STARTONLINE: "RPTE_05",
    LAUNCH: 'RPTE_06'
})


/**af事件 */
export const APPS_FLYER = cc.Enum({
    SDK_INITED: 'AF_01'
})

