
/**
 * @param totalBytesReceived 进行中参数 当前解压大小
 * @param totalBytesExpected 进行中参数 解压文件总大小
 */
export type UnZipOnProgress = (totalBytesReceived: number, totalBytesExpected: number) => void;

class JSZipUtil {
    /**
     * 解压bundle.bin
     * @param dataBinArray 需要解压的文件 下载到本地
     * @param rootPath 解压路径
     * @param onProgress 进度回调
     */
    public UnZipBundle(dataBinArray: ArrayBuffer, rootPath: string, onProgress?: UnZipOnProgress): Promise<boolean> {
        return new Promise(resolve => {
            let unzipCall = (zip: JSZip) => {
                if (zip && zip.hasOwnProperty("files")) {
                    let names: string[] = Object.keys(zip.files);
                    if (names) {
                        names.forEach((name: string, index: number) => {
                            onProgress && onProgress(index, names.length);
                            let path: string = rootPath + name;
                            if (zip.files[name].dir) {
                                //目录
                                if (!jsb.fileUtils.isDirectoryExist(path))
                                    jsb.fileUtils.createDirectory(path);
                            } else {
                                //文件
                                zip.file(name).async('uint8array').then((data: Uint8Array) => {
                                    // jsb.fileUtils.writeDataToFile(data, path);
                                    jsb.fileUtils.writeValueMapToFile(data, path)
                                });
                            }
                        })
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                } else {
                    resolve(false);
                }
            };
            JSZip.loadAsync(dataBinArray).then(unzipCall);
        });
    }
}

export default new JSZipUtil();