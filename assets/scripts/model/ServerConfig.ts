export default interface ServerConfig {
    /**更新包url路径，不包含包的文件名 */
    packageUrl: string;
    /**白名单更新配置 */
    whiteConfig: WhiteConfig;
    /**正常更新配置 */
    commonConfig: ChannelConfig;
}

export interface WhiteConfig {
    /**白名单设备号数组 */
    users: string[]
    /**白名单下更新配置 */
    config: ChannelConfig
}

export class ChannelConfig {
    /**渠道要更新到的目标版本号 */
    ver: string
    /**更新开关 1开/0关 */
    switch: number
    /**更新模式 0热更/1整包 */
    mode: number
    /**是否强制更新 1强制/0非强制 */
    force: number

    constructor(ver: string) {
        this.ver = ver
        this.switch = 0
        this.mode = 0
        this.force = 0
    }
}