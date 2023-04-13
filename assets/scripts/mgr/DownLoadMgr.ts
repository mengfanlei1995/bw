

/**下载回调类型 */
export enum DownLoadType {
    /**不是原生平台 不可以下载 */
    NO_jsb = -1,
    /**文件已存在 */
    FILE_IS_EXIT = 0,
    /**下载成功 */
    SUCCESS = 1,
    /**下载中 */
    PROGRESS = 2,
    /**下载失败 */
    FAIL = 3
}

/**
 * @param type 回调类型
 * @param task 下载任务
 * @param bytesReceived 进行中参数 本次大小
 * @param totalBytesReceived 进行中参数 当前下载大小
 * @param totalBytesExpected 进行中参数 下载文件总大小
 * @param errorCode 下载失败错误码
 * @param errorStr 下载失败错误信息
 */
export type DownLoadFunc = (type: DownLoadType, task?: jsb.DownloaderTask | null, bytesReceived?: number, totalBytesReceived?: number, totalBytesExpected?: number, errorCode?: number, errorStr?: string) => void;

class DownLoadMgr {

    /**下载任务存储集合 */
    private downLoadMap: Map<string, DownLoadFunc> = new Map<string, DownLoadFunc>();

    private downloader: jsb.Downloader = null;

    constructor() {
        if (cc.sys.isNative && jsb.Downloader) {
            this.downloader = new jsb.Downloader();
            this.downloader.setOnFileTaskSuccess(this.onSucceed.bind(this));
            this.downloader.setOnTaskProgress(this.onProgress.bind(this));
            this.downloader.setOnTaskError(this.onError.bind(this));
        }
    }


    /**
     * @param requestURL 文件请求地址
     * @param folderName 文件夹名
     * @param fileName 文件名
     * @param callFunc 回调函数
     * @returns 
     */
    public createNewTask(requestURL: string, folderName: string, fileName: string, callFunc?: DownLoadFunc) {
        //不是原生平台 不能下载 直接回调
        if (!jsb.Downloader) {
            callFunc && callFunc(DownLoadType.NO_jsb);
            return;
        }

        if (this.downLoadMap.get(requestURL)) {
            //文件已在下载列表中
            return;
        }

        let path: string = jsb.fileUtils.getWritablePath() + `${folderName}/`;
        if (!jsb.fileUtils.isDirectoryExist(path))
            jsb.fileUtils.createDirectory(path);
        let storagePath: string = path + fileName
        //文件已存在 直接回调
        if (jsb.fileUtils.isFileExist(storagePath)) {
            let task: jsb.DownloaderTask = {
                requestURL: requestURL,
                storagePath: storagePath,
                identifier: ""
            }
            callFunc && callFunc(DownLoadType.FILE_IS_EXIT, task);
            return;
        }

        this.downLoadMap.set(requestURL, callFunc);
        this.downloader.createDownloadFileTask(requestURL, storagePath);
    }

    /**下载成功 */
    private onSucceed(task: jsb.DownloaderTask) {
        let requestURL: string = task.requestURL;
        let callFunc: DownLoadFunc = this.downLoadMap.get(requestURL);
        callFunc && callFunc(DownLoadType.SUCCESS, task);
        this.downLoadMap.delete(requestURL);
    }

    /**下载中 */
    private onProgress(task: jsb.DownloaderTask, bytesReceived: number, totalBytesReceived: number, totalBytesExpected: number) {
        let requestURL: string = task.requestURL;
        let callFunc: DownLoadFunc = this.downLoadMap.get(requestURL);
        callFunc && callFunc(DownLoadType.PROGRESS, task, bytesReceived, totalBytesReceived, totalBytesExpected);
    }

    /**下载失败 */
    private onError(task: jsb.DownloaderTask, errorCode: number, errorCodeInternal: number, errorStr: string) {
        let requestURL: string = task.requestURL;
        let callFunc: DownLoadFunc = this.downLoadMap.get(requestURL);
        callFunc && callFunc(DownLoadType.FAIL, task, 0, 0, 0, errorCode, errorStr);
        this.downLoadMap.delete(requestURL);
    }

}

export default new DownLoadMgr();

