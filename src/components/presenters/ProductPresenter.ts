import { IProduct } from "../models/IProduct";
import { ProductListView } from "../views/ProductListView";
import { Api } from "../base/api";

function validPrice(price: number | null): number {
    return price === null ? 0 : price;
}
export class ProductPresenter {
    private view: ProductListView;
    private api: Api; // Добавляем API в Presenter

    constructor(view: ProductListView, api: Api) {
        this.view = view;
        this.api = api;
    }

    async fetchProducts() {
        try {
            await this.api.get("/product")
            .then((data: { items: IProduct[] }) => {
                const productsValid = data.items.map(product => ({
                    ...product,
                    price: validPrice(product.price)
                }));
                console.log(productsValid)
                this.view.renderProducts(data.items);
            })
        } catch (error) {
            console.error("Ошибка загрузки продуктов:", error);
        }
    }
}