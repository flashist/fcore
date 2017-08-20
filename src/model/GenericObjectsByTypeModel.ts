import {IGenericObjectChangeVO} from "./IGenericObjectChangeVO";
import {IDefaultGenericObjectsModel} from "./GenericObjectsModel";
import {AssociativeArray} from "../datastructure/associativearray/AssociativeArray";

export class GenericObjectsByTypeModel {
    protected modelsToTypeMap:AssociativeArray<IDefaultGenericObjectsModel> = new AssociativeArray<IDefaultGenericObjectsModel>();

    public commitItems(items:IGenericObjectChangeVO[]):void {
        let tempModel:IDefaultGenericObjectsModel;
        for (let sourceItem of items) {
            tempModel = this.getModelForType(sourceItem.type);
            tempModel.parseSource(sourceItem);
        }
    }

    protected getModelForType(type:string):IDefaultGenericObjectsModel {
        let result:IDefaultGenericObjectsModel = this.modelsToTypeMap.getItem(type);
        if (!result) {
            result = new IDefaultGenericObjectsModel();
            this.mapModelToType(result, type);
        }

        return result;
    }

    public mapModelToType(model:IDefaultGenericObjectsModel, type:string):void {
        this.modelsToTypeMap.push(model, type);
    }
}