import {IConstructor} from "../other/IConstructor";

export class MixinTools {

    static applyMixins<ResultClassType extends IConstructor = IConstructor>(SourceClass: any, MixinClasses: IConstructor[]): ResultClassType {
        const ResultClass = (() => {
            return class extends SourceClass {
            }
        })();

        MixinClasses.forEach(
            (SingleMixinClass: IConstructor) => {
                Object.getOwnPropertyNames(SingleMixinClass.prototype).forEach(
                    (name: string) => {
                        ResultClass.prototype[name] = SingleMixinClass.prototype[name];
                    }
                );
            }
        );

        return ResultClass as any;
    }

}
