interface pako {
    /**
     * 压缩 
     * @param str 压缩字符串
     * @param type 压缩类型 
     */
    gzip(str: string, type: ZipType): string;

    /**
     * 
     * @param data 
     */
    inflate(data: Uint8Array): Uint16Array;
}

/**
 * 压缩类型
 */
interface ZipType {
    to: string
}

declare var pako: pako