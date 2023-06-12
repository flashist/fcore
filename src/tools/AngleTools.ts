export class AngleTools {
    static radiansToDegrees(radians: number): number {
        return radians * 180 / Math.PI;
    }

    static degreesToRadians(degrees: number): number {
        return degrees * Math.PI / 180;
    }

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