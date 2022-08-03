export class AngleTools {
    static getSafeRadians(radians: number): number {
        let result: number = radians;

        result = result % (Math.PI * 2);
        if (result < 0) {
            result = (Math.PI * 2) + result;
        }

        return result;
    }

    static getSafeAngle(angle: number): number {
        let result: number = angle;

        result = result % 360;
        if (result < 0) {
            result = 360 + result;
        }

        return result;
    }
}