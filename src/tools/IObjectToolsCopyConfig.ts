export interface IObjectToolsCopyConfig {
    ignoreExistedProperties?: boolean,
    ignoreNotExistedProperties?: boolean,
    // If there is already a property in the target object,
    // then this property would be overridden
    // (e.g. if it was an object, the object would be overridden, instead of copying separate properties into it)
    // Might be useful in cases when you need to override non-primitive objects
    overrideExistedProperties?: boolean
}