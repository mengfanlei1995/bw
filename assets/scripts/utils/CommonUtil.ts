/**
 * 通用基础功能性函数的工具类
 */
class CommonUtil {
    /**
     * 判断value是否为null
     * @param value 
     * @returns 
     */
    public  isNull(value: any) {
        return value === null;
    }
    /**
     * 判断value是否为undefined
     * @param value 
     * @returns 
     */
    public  isUndef(value: any) {
        return value === undefined;
    }

    /**
     * 判断val是否为数组
     * @param val 
     * @returns 
     */
    public  isArray(val: any) {
        return !!val && typeof val === 'object' && typeof val.pop === 'function'
    }

    /**
     * 获取随机整数 getRandomInt(3,6)返回3~6之间的任意整数
     * @param start 起始值
     * @param end 终止值
     * @returns 随机整数
     */
    public  randomInt(start: number, end: number) {
        return (Math.round(Math.random() * (end - start)) + start);
    }

    /**
     * 获取一个伪随机整数
     * @param seed 随机种子
     * @param key key
     */
    public  pseudoRandomInt(seed: number, key: number): number {
        return Math.ceil((((seed * 9301 + 49297) % 233280) / 233280) * key);
    }

    /**
     * 随机取数组的某个元素
     * @param _arr 
     */
    public  randomFromArray(_arr: any[] = []) {
        return _arr.length ? _arr[Math.floor(Math.random() * _arr.length)] : null
    }

    /**
     * 获取字符串长度，中文、大写字母占2， 其他占1 (Egret中文英文字符都是占1)
     * @param str 字符串
     * @return 长度
     */
    public  randomStr(len: number = 0, str: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz012345678"): string {
        let randomStr: string = ""
        const total: number = str.length
        for (let i = 0; i < len; i++) {
            const index = Math.floor(Math.random() * len);
            randomStr += str[index];
        }
        return randomStr;
    }

    /**
     * &符号连接起来的参数字符串转换为 {key: value}
     * @param params eg: a=1&b=2
     * @returns 
     */
    public  paramsToJson(params: any = ''): any {
        var _result = {}, _pairs, _pair, _query, _key, _value;

        if (typeof (params) === 'object') { return params; }

        _query = params || window.location.search;
        _query = _query.replace(/['"<>;?]/g, '');
        _pairs = _query.split('&');

        _pairs.forEach((keyVal) => {
            _pair = keyVal.split('=');
            _key = _pair[0];
            _value = _pair.slice(1).join('=');
            _result[decodeURIComponent(_key)] = decodeURIComponent(_value);
        });

        return _result;
    }

    /**
     * 转换为 &连接的参数字符串
     * @param json eg: {key: value}
     * @param decodeUri 
     * @returns 
     */
    public  objectToParams(json: any, decodeUri?: boolean): string {
        var param = '';
        for (var o in json) {
            if (o) {
                var v = typeof (json[o]) === 'object' ? JSON.stringify(json[o]) : json[o];
                if (!param) param += o + '=' + v;
                else param += '&' + o + '=' + v;
            }
        }

        if (decodeUri) {
            param = decodeURIComponent(param);
        }
        return param;
    }

    /**判断字符串是否为JSON */
    public  isJsonString(str: string): boolean {
        let flag = false
        try {
            let o = JSON.parse(str)
            flag = typeof (o) === 'object'
        } catch (e) {
        }
        return flag
    }

    /** 时间戳(Timestamp) 转 时间 (Date) */
    public  dateYYYYMMDD(timestamp: number | string) {
        var now = timestamp ? new Date(timestamp) : new Date(),
            y = now.getFullYear(),
            m = now.getMonth() + 1,
            d = now.getDate();
        return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d);
    }

    /**
     * 获取两点间的角度
     * @param p1 点1
     * @param p2 点2
     */
    public  getAngle(p1: cc.Vec2, p2: cc.Vec2): number {
        return Math.atan((p2.y - p1.y) / (p2.x - p1.x));
    }

    /**
     * 获取两点间的距离
     * @param p1 点1
     * @param p2 点2
     */
    public  getDistance(p1: cc.Vec2, p2: cc.Vec2): number {
        return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    }

    /**
     * 将角度转为弧度
     * @param angle 角度
     */
    public  angleToRadian(angle: number): number {
        return angle * Math.PI / 180;
    }

    /**
     * ’{0}xxxxxxx{1}...‘ 类似的这种模板字符串的占位内容的动态替换
     * @param params 
     * @returns 
     */
    public  format(...params: any) {
        for (var a = arguments[0], b = 1; b < arguments.length; b++) a = a.replace(RegExp("\\{" + (b - 1) + "\\}", "ig"), arguments[b]);
        return a
    }

    /**
     * 对象数组 以某个属性为维度进行比较
     * @param property 比较的属性
     * @param desc 是否升序
     * @returns 
     */
    public  compare(property: string, desc: boolean) {
        return function (a, b) {
            var value1 = a[property];
            var value2 = b[property];
            if (desc) {
                // 升序排列
                return value1 - value2;
            } else {
                // 降序排列
                return value2 - value1;
            }
        }
    }

    /**
     * 版本比较
     * @param versionA 1.0.2
     * @param versionB 1.0.21
     * @returns 
     */
    public  versionCompare(versionA: string, versionB: string) {
        let vA = versionA.split('.');
        let vB = versionB.split('.');
        //长度相等时
        for (let i = 0; i < vA.length; ++i) {
            let a = +vA[i];
            let b = +(vB[i] || '0');
            if (a !== b) {
                return a - b;
            }
        }
        //目前暂时游戏未采用长度不等的方式
        if (vB.length > vA.length) {
            return -1;
        } else {
            return 0;
        }
    }

    public  splitStr(str: string, satrt: number = 0, end: number = 0) {
        return str.length > end ? str.slice(satrt, end) + "..." : str;
    }


    /**复制到剪切板 */
    public  pcopyClipBoard(str) {
        if (cc.sys.isBrowser) {
            let textArea = document.getElementById("clipBoard");
            if (textArea === null) {
                textArea = document.createElement("textarea");
                textArea.id = "clipBoard";
                textArea.textContent = str;
                document.body.appendChild(textArea);
            }
            textArea["select"]();
            try {
                const msg = document.execCommand('copy') ? 'successful' : 'unsuccessful';
                document.body.removeChild(textArea);
            } catch (err) {
                document.body.removeChild(textArea);
            }
        }
    }

    /**计算两个时间戳 相差 天 时 分 秒 */
    public  intervalTime(startTime, endTime) {
        let time = endTime - startTime;
        //计算相差天数
        let days = Math.floor(time / (24 * 3600 * 1000));
        //计算相差小时数
        let leave1 = time % (24 * 3600 * 1000);
        let hours = Math.floor(leave1 / (3600 * 1000));
        //计算相差分钟数
        let leave2 = leave1 % (3600 * 1000);
        let minutes = Math.floor(leave2 / (60 * 1000));
        //计算相差秒数
        let leave3 = leave2 % (60 * 1000);
        let seconds = Math.floor(leave3 / 1000);

        return { days, hours, minutes, seconds };
    }

    /**
     * 单词首字母大写
     * @param word 
     * @returns 
     */
    public  firstUpperCase(word: string) {
        return word.replace(/\b(\w)(\w*)/g, function ($0, $1, $2) {
            return $1.toUpperCase() + $2.toLowerCase();
        });
    }

    public  toThousands(num: number) {
        var numStr = `${num || 0}`
        var result = '';
        while (numStr.length > 3) {
            result = ',' + numStr.slice(-3) + result;
            numStr = numStr.slice(0, numStr.length - 3);
        }
        if (numStr) { result = numStr + result; }
        return result;
    }

    public  getDate(time) {
        let date = new Date(time);
        let year = date.getFullYear();
        let month = (date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : "0" + (date.getMonth() + 1);
        let day = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate();
        let hour = date.getHours() >= 10 ? date.getHours() : "0" + date.getHours();
        let minute = date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes();
        let second = date.getSeconds() >= 10 ? date.getSeconds() : "0" + date.getSeconds();
        // let monthEnglish = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Spt", "Oct", "Nov", "Dec"];
        // return day + " " + monthEnglish[month] + " " + year + " " + hour + ":" + minute;// + ":" + second;
        return `${day}.${month}.${year} ${hour}:${minute}:${second}`
    }

    public  getDateEnglish(time) {
        let date = new Date(time);
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate();
        let hour = date.getHours() >= 10 ? date.getHours() : "0" + date.getHours();
        let minute = date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes();
        let second = date.getSeconds() >= 10 ? date.getSeconds() : "0" + date.getSeconds();
        let monthEnglish = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Spt", "Oct", "Nov", "Dec"];
        return day + " " + monthEnglish[month] + " " + year + " " + hour + ":" + minute;// + ":" + second;
    }

    //获取默认当前日期-前七天
    public  getBeforeDate(curDay, curMonth, curYear) {
        let date = new Date(curYear + "/" + curMonth + "/" + curDay);
        let newDate = new Date(date.getTime() - (1000 * 60 * 60 * 24 * 6));
        let year = newDate.getFullYear();
        let month = newDate.getMonth() + 1;
        let day = newDate.getDate();
        return { day, month, year }
    }

    //获取默认当前日期-后七天
    public  getAfterDate(curDay, curMonth, curYear) {
        let date = new Date(curYear + "/" + curMonth + "/" + curDay);
        let newDate = new Date(date.getTime() + (1000 * 60 * 60 * 24 * 6));
        let year = newDate.getFullYear();
        let month = newDate.getMonth() + 1;
        let day = newDate.getDate();
        return { day, month, year }
    }


    //根据年月 获取当月天数
    public  getDaysInMonth(year, month) {
        let date = new Date(year, month, 0);
        return date.getDate();
    }

    //字符串转Bytes
    public  stringToBytes(str) {
        var bytes = new Array();
        var len, c;
        len = str.length;
        for (var i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if (c >= 0x010000 && c <= 0x10FFFF) {
                bytes.push(((c >> 18) & 0x07) | 0xF0);
                bytes.push(((c >> 12) & 0x3F) | 0x80);
                bytes.push(((c >> 6) & 0x3F) | 0x80);
                bytes.push((c & 0x3F) | 0x80);
            } else if (c >= 0x000800 && c <= 0x00FFFF) {
                bytes.push(((c >> 12) & 0x0F) | 0xE0);
                bytes.push(((c >> 6) & 0x3F) | 0x80);
                bytes.push((c & 0x3F) | 0x80);
            } else if (c >= 0x000080 && c <= 0x0007FF) {
                bytes.push(((c >> 6) & 0x1F) | 0xC0);
                bytes.push((c & 0x3F) | 0x80);
            } else {
                bytes.push(c & 0xFF);
            }
        }
        return bytes;
    }

    //byte转字符串
    public  byteToString(byte): string {
        if (typeof byte === 'string') {
            return byte;
        }
        var str = '',
            _arr = byte;
        for (var i = 0; i < _arr.length; i++) {
            var one = _arr[i].toString(2),
                v = one.match(/^1+?(?=0)/);
            if (v && one.length == 8) {
                var bytesLength = v[0].length;
                var store = _arr[i].toString(2).slice(7 - bytesLength);
                for (var st = 1; st < bytesLength; st++) {
                    store += _arr[st + i].toString(2).slice(2);
                }
                str += String.fromCharCode(parseInt(store, 2));
                i += bytesLength - 1;
            } else {
                str += String.fromCharCode(_arr[i]);
            }
        }
        return str;
    }

    /**
     * 判断该val是否为个位数
     * @param val 
     * @returns 
     */
     isSingleDigit(val) {
        if (val === null || val === undefined) return false;
        if (typeof val === 'string' && val.length === 1 && !isNaN(+val)) return true
        else {
            if (typeof val === 'number' && val < 10 && val >= 0) return true
            else return false
        }
    }

    /**
     * base64 编码
     * @param str 
     * @returns 
     */
     encodeBase64(str: string) {
        // first we use encodeURIComponent to get percent-encoded UTF-8,
        // then we convert the percent encodings into raw bytes which
        // can be fed into btoa.
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
            (match, p1) => {
                return String.fromCharCode(+`0x${p1}`);
            }));
    }

    /**
     * base64 解码
     * @param str 
     * @returns 
     */
     decodeBase64(str: string) {
        // Going backwards: from bytestream, to percent-encoding, to original string.
        return decodeURIComponent(atob(str).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }

    /**格式化日期 */
     formatDate(time, fmt) { // author: meizz
        var o = {
            "M+": new Date(time).getMonth() + 1, // 月份
            "d+": new Date(time).getDate(), // 日
            "h+": new Date(time).getHours(), // 小时
            "m+": new Date(time).getMinutes(), // 分
            "s+": new Date(time).getSeconds(), // 秒
            "q+": Math.floor((new Date(time).getMonth() + 3) / 3), // 季度
            "S": new Date(time).getMilliseconds() // 毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (new Date(time).getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
}

export default new CommonUtil();