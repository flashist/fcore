export interface IConstructor<T extends new (...args: any) => any> {
    // we can use built-in InstanceType to infer instance type from class type
    type: new (...args: ConstructorParameters<T>) => InstanceType<T>;
}