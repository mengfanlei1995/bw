import DownLoadMgr, { DownLoadFunc, DownLoadType } from "../mgr/DownLoadMgr";


/**下载结果 */
export interface DownLoadResult {
    type: DownLoadType,
    task: jsb.DownloaderTask
}

/**
 * @param totalBytesReceived 进行中参数 当前下载大小
 * @param totalBytesExpected 进行中参数 下载文件总大小
 */
export type downLoadOnProgress = (totalBytesReceived: number, totalBytesExpected: number) => void;

class DownLoadUtil {

    /**
     * 下载图片
     * @param requestURL 图片地址
     * @param folderName 文件夹名字
     * @param fileName 文件名 带后缀 .png
     */
    public async downLoadImage(requestURL: string, folderName: string, fileName: string, onProgress?: downLoadOnProgress): Promise<string> {
        let result: DownLoadResult = await this.downLoadFile(requestURL, folderName, fileName, onProgress);
        if (result) {
            let { type, task } = result;
            if (type == 1 || type == 0) {
                return task.storagePath;
            } else {
                return null;
            }
        }
        return null;
    }

    /**
     * 下载文件
     * @param requestURL 文件请求地址
     * @param folderName 文件夹名
     * @param fileName 文件名
     * @param callFunc 回调函数
     * @returns 
     */
    public async downLoadFile(requestURL: string, folderName: string, fileName: string, onProgress?: downLoadOnProgress): Promise<DownLoadResult> {
        return new Promise(resolve => {
            let callFunc: DownLoadFunc = (type: DownLoadType, task?: jsb.DownloaderTask | null, bytesReceived?: number, totalBytesReceived?: number, totalBytesExpected?: number, errorCode?: number, errorStr?: string) => {
                if (type == DownLoadType.PROGRESS) {
                    onProgress && onProgress(totalBytesReceived, totalBytesExpected);
                } else {
                    resolve({ type, task });
                }
            }
            DownLoadMgr.createNewTask(requestURL, folderName, fileName, callFunc);
        })
    }

}

export default new DownLoadUtil();
