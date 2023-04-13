/**
 * https://github.com/nodeca/pako
 */

class PakoUtil {
    /**
     * 压缩
     * @param str 压缩字符串
     * @returns 压缩后字符串
     */
    public  zip(str: string): string {
        // escape(str)  --->压缩前编码，防止中文乱码
        var binaryString: string = pako.gzip(str, { to: 'string' });
        return btoa(binaryString);
    }

    /**
     * 解压
     * @param key 解压字符串
     * @returns 解压后字符串
     */
    public  unzip(key: string): string {
        var strData = atob(key)
        var charData = strData.split('').map(function (x) { return x.charCodeAt(0) })
        var binData = new Uint8Array(charData)
        var data = pako.inflate(binData)
        strData = String.fromCharCode.apply(null, new Uint16Array(data))
        //  var restored = pako.ungzip(key, { to: 'string' });
        return strData;
    }
}

export default new PakoUtil();