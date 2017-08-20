export class MixinTools {
    static applyMixin(copyTo: any, getFrom: any): void {

        Object.getOwnPropertyNames(getFrom.prototype).forEach(name => {
            if (name !== 'constructor') {
                copyTo.prototype[name] = getFrom.prototype[name];
            }
        });
    }

}
