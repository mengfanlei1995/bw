import SysConfig from "../config/SysConfig";

class LogUtil {

    public log(message?: any, ...optionalParams: any) {
        if (!SysConfig.isDebug) return;
        console.log(message, ...optionalParams);
    }

    public error(message?: any, ...optionalParams: any) {
        if (!SysConfig.isDebug) return;
        console.error(message, ...optionalParams);
    }
    public warn(message?: any, ...optionalParams: any) {
        if (!SysConfig.isDebug) return;
        console.warn(message, ...optionalParams);
    }
}

export default new LogUtil();