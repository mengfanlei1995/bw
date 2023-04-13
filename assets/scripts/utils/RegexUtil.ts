/**
 * 正则工具
 */
 class RegexUtil {
    /**
     * 判断字符是否为双字节字符（如中文字符）
     * @param string 原字符串
     */
    public  isDWORD(string: string): boolean {
        return /[^\x00-\xff]/.test(string);
    }
    /**是否为当地合法手机号，每个国家的应用根据当地特点写正则 */
     isValidPhoneNumber(phone: string): boolean {
        return /^(6|7|8|9)[0-9]{9}$/.test(phone);
    }

    /**是否为合法的RealName */
     isValidRealName(realName: string): boolean {
        return /^([A-Za-z]+\s?)*[A-Za-z]$/.test(realName)
    }

    /**是否为合法格式的 印度ifsc */
     isValidIFSC(ifsc: string): boolean {
        if (!ifsc) return false;
        return /^[A-Za-z]{4}0[A-Z0-9a-z]{6}$/.test(ifsc)
    }

}

export default new RegexUtil();