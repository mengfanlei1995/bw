import LogUtil from "./LogUtil";

/**
 * 对象工具
 */
class ObjectUtil {
    /**
     * 判断指定的值是否为对象
     * @param value 值
     */
    public isObject(value: any): boolean {
        return Object.prototype.toString.call(value) === '[object Object]';
    }

    /**
     * 深拷贝
     * @param target 目标
     */
    public deepCopy(target: any): any {
        if (target == null || typeof target !== 'object') {
            return target;
        }

        let result = null;

        if (target instanceof Date) {
            result = new Date();
            result.setTime(target.getTime());
            return result;
        }

        if (target instanceof Array) {
            result = [];
            for (let i = 0, length = target.length; i < length; i++) {
                result[i] = this.deepCopy(target[i]);
            }
            return result;
        }

        if (target instanceof Object) {
            result = {};
            for (const key in target) {
                if (target.hasOwnProperty(key)) {
                    result[key] = this.deepCopy(target[key]);
                }
            }
            return result;
        }

        LogUtil.warn(`不支持的类型：${result}`);
    }

    /**
     * 拷贝对象
     * @param target 目标
     */
    public copy(target: object): object {
        return Object.assign({}, target)
    }
}

export default new ObjectUtil();