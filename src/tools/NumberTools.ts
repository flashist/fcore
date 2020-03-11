export class NumberTools {

    /**
     * Polyfill for old browsers or IE.
     *
     * @type {number}
     */
    public static MAX_SAFE_INTEGER: number = (Number as any).MAX_SAFE_INTEGER ? (Number as any).MAX_SAFE_INTEGER : Math.pow(2, 53) - 1;

    public static getRandom(min: number, max: number, isFloor: boolean = false, isRound: boolean = false, isCeil: boolean = false): number {
        var result: number = min + Math.random() * (max - min);

        if (isFloor) {
            result = Math.floor(result);
        }
        if (isRound) {
            result = Math.round(result);
        }
        if (isCeil) {
            result = Math.ceil(result);
        }

        return result;
    }

    public static getListOfIntegers(from: number, to: number): number[] {
        let result: number[] = [];

        from = Math.floor(from);
        to = Math.floor(to);

        if (from < to) {
            for (let index: number = from; index <= to; index++) {
                result.push(index);
            }

        } else {
            console.error("NumberTools | GetListOfIntegers __ WARNING! variable 'from' is not less than 'to'");
        }

        return result;
    }

    public static roundTo(
        source: number,
        roundTo: number = 10,
        isFloor: boolean = false,
        isRound: boolean = true,
        isCeil: boolean = false): number {

        let result: number = source;

        let tempKoef: number = 1 / roundTo;
        if (isFloor) {
            result = Math.floor(source * tempKoef) / tempKoef;
        }
        if (isRound) {
            result = Math.round(source * tempKoef) / tempKoef;
        }
        if (isCeil) {
            result = Math.ceil(source * tempKoef) / tempKoef;
        }

        return result;
    }

    static getDeltaBetweenNums(minNum: number, maxNum: number, delta: number): number {
        if (delta < 0) {
            delta = 0;
        } else if (delta > 1) {
            delta = 1;
        }

        const result: number = minNum + delta * (maxNum - minNum);
        return result;
    }
}
