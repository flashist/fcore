export interface IConstructor<InstanceType extends any> {
    new (...args: any[]): InstanceType;
}
