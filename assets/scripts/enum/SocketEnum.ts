export const SocketEvent = cc.Enum({
    WS_CONNECTED: 'WSE_01',
    WS_MSG_PUSH: 'WSE_02',
    WS_MSG_RESPONSE: 'WSE_03',

    /**响应 */
    RESPONSE_EVT: 'WSE_04',
    /**推送 */
    PUSH_EVT: 'WSE_05',
    /**出错了 */
    ERR_EVT: 'WSE_06',

    /**服务器向游戏推送数据 */
    SERVE_PUSH_MSG: 'WS_SERVER_PUSH_MSG',
})

/**
 * 响应类型
 */
export const RespType = cc.Enum({
    /**请求直接响应 */
    RESPONSE: 2,
    /**建立连接 */
    CONNECTION: 1,
    /**消息推送：房间 */
    PUSH_ROOM: 3,
    /**消息推送：跑马灯 */
    PUSH_POP: 4,
    /**消息推送：当前玩家 */
    PUSH_PLAYER: 5,
    /**消息推送：全局 */
    PUSH_COMMON: 6,
    /**心跳包 */
    HEART_BEAT: 0
})

