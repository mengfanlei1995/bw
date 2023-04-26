import SysConfig from "../data/SysConfig";
import StorageMgr from "../mgr/StorageMgr";
import { sendRequest } from "./Http";

class NetMgr {

    public async getIp(): Promise<string> {
        let url: string = `${SysConfig.HttpUrl}/ip/client/address`;
        let params = {
            devId: StorageMgr.devId
        }
        let ip: string = await sendRequest(url, params);
        return ip;
    }

}
export default new NetMgr();