import Long from "../libs/Long";

export interface LongType {
    low: number;
    high: number;
    unsigned: boolean;
}

class LongUtil {

    /**Long  to number*/
    public longToNumber(data: LongType): number {
        let long = new Long(data?.low || 0, data?.high || 0, data?.unsigned || false);
        return long.toNumber();
    }

    /**Long  to string*/
    public longToString(data: LongType): string {
        let long = new Long(data?.low || 0, data?.high || 0, data?.unsigned || false);
        return long.toString();
    }

    /**number to Long */
    public numberToLong(value: number): LongType {
        return new Long(value || 0, 0, false);
    }

}

export default new LongUtil();
