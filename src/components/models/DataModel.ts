import { IProduct } from "../../types";
import { IEvents } from '../base/events';


export class DataModel {
    private previewItem: IProduct | null = null;

    constructor(protected events: IEvents){}

    setPreview(item: IProduct) {
        this.previewItem = item;
        this.events.emit('preview:change', this.previewItem);
    }
}