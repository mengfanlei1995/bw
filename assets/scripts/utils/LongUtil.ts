import Long from "../libs/Long";

export interface LongType {
    low: number;
    high: number;
    unsigned: boolean;
}

class LongUtil {

    /**Long  to number*/
    public longToNumber(data: LongType): number {
        let { low, high, unsigned } = data;
        let long = new Long(low, high, unsigned);
        return long.toNumber();
    }

    /**Long  to string*/
    public longToString(data: LongType): string {
        let { low, high, unsigned } = data;
        let long = new Long(low, high, unsigned);
        return long.toString();
    }

    /**number to Long */
    public numberToLong(value: number): LongType {
        return new Long(value, 0, false);
    }

}

export default new LongUtil();
