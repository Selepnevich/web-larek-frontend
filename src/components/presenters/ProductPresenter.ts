import { IProduct } from "../../types";
import { ProductView } from "../views/ProductView";
import { Api } from "../base/api";


export class ProductPresenter {
    private view: ProductView;
    private api: Api; // Добавляем API в Presenter

    constructor(view: ProductView, api: Api) {
        this.view = view;
        this.api = api;
    }

    async fetchProducts() {
        try {
            await this.api.get("/product")
            .then((data: { items: IProduct[] }) => {
                data.items.forEach(product =>{
                    return (this.view.renderProduct(product));
                })
            })
        } catch (error) {
            console.error("Ошибка загрузки продуктов:", error);
        }
    }
}