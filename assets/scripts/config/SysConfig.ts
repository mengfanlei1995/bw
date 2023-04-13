
class SysConfig {
    /**调试模式 */
    readonly isDebug: number = 1;
    /**带有af统计的默认渠道值 */
    readonly defaultChannel: string = 'Organic';
    /**是否是测试环境 */
    readonly isTest: number = 0;
    /**包的时区，根据包运营的国家，配置相应的值 */
    readonly pkgTimeZone: string = 'Asia/Kolkata';
    /**包名，也就是网络请求的主域名 */
    readonly pkgName: string = 'luckywinner.website';
    /**当前最新版本 */
    readonly version: string = '1.2.1';
    /**app名字 */
    readonly appName: string = "Lucky Winner";
    /**ISO货币编号 356印度卢比 */
    readonly currencyCode: string = '356';

}

export default new SysConfig();
