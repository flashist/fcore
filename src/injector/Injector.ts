import {Dictionary} from "../datastructure/Dictionary";
import {IConstructor} from "../other/IConstructor";
export class Injector {

    private static injectionsMap: Dictionary<IConstructor, IInjection> = new Dictionary<IConstructor, IInjection>();

    static add(item: IConstructor, toSubstitute?: IConstructor, config?: ICreateConfig): void {
        let tempInjection: IInjection = Injector.getInjection(item);

        if (toSubstitute) {
            tempInjection.toSubstitute = toSubstitute;

            let toSubstituteInjection: IInjection = Injector.getInjection(tempInjection.toSubstitute);
            toSubstituteInjection.substitution = item;
        }

        if (config) {
            tempInjection.config = config;

        } else {
            if (toSubstitute) {
                let toSubstituteInjection: IInjection = Injector.getInjection(tempInjection.toSubstitute);

                // If there is no config for the item, but there is a config for the item which should be substituted,
                // then use the item-to-be-substituted config.
                if (toSubstituteInjection.config) {
                    tempInjection.config = toSubstituteInjection.config;
                }
            }
        }
    }

    static getInstance<Type extends any>(item: IConstructor, ...args): Type {

        let result: Type;

        let tempInjection: IInjection = Injector.getInjection(item);
        if (tempInjection.config && tempInjection.config.isSingletone) {
            if (!tempInjection.singletoneInstance) {
                tempInjection.singletoneInstance = (new tempInjection.item(args) as Type);
            }

            result = tempInjection.singletoneInstance;

        } else {
            result = (new tempInjection.item(args) as Type);
        }

        return result;
    }

    private static getInjection(item: IConstructor): IInjection {
        // Create if not created yet
        if (!Injector.injectionsMap.getItem(item)) {
            Injector.injectionsMap.addItem(
                item,
                {
                    item: item
                }
            );
        }

        let result: IInjection = Injector.injectionsMap.getItem(item);
        if (result.substitution) {
            result = Injector.getInjection(result.substitution);
        }

        return result;
    }
}

interface IInjection {
    item: IConstructor;
    config?: ICreateConfig;

    substitution?: IConstructor;
    toSubstitute?: IConstructor;

    singletoneInstance?: any;
}

export interface ICreateConfig {
    isSingletone?: boolean;
}

// Shortcuts
// export const add = Injector.add;
export const getInstance: typeof Injector.getInstance = Injector.getInstance;