export interface IConstructor<InstanceType extends any = any> {
    new (...args):InstanceType;
}