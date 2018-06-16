export class NumberTools {

    /**
     * Polyfill for old browsers or IE.
     *
     * @type {number}
     */
    public static MAX_SAFE_INTEGER: number = (Number as any).MAX_SAFE_INTEGER ? (Number as any).MAX_SAFE_INTEGER : Math.pow(2, 53) - 1;

    public static getRandom(min:number, max:number, isFloor:boolean = false, isRound:boolean = false, isCeil:boolean = false):number {
        var result:number = min + Math.random() * (max - min);

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
}
