import { IProduct } from "../models/IProduct";
import { createElement } from "../../utils/utils";

export class ProductListView {
    private container: HTMLElement;
  
    constructor(containerId: string) {
        this.container = createElement("div", { id: "product-list" });
    }

    renderProducts(products: IProduct[]) {
        // this.container.innerHTML = "";  // Очищаем контейнер перед обновлением

        products.forEach(product => {
            // const img = createElement("img", { className: "card__image"});
            // img.setAttribute("src", product.image);
            // img.setAttribute("alt", product.title);
            const card = createElement("div", { className: "card" }, [
                createElement("h2", { className: "card__title", textContent: product['title'] }),
                // img,
                createElement("p", { className: "card__text", textContent: product['description'] }),
                createElement("div", { className: "card__row" }, [
                    createElement("span", { className: "card__category", textContent: product["category"] }),
                    createElement("span", { className: "card__price", textContent: `${product["price"]} синапсов` })
                ])
            ]);


            this.container.appendChild(card);
        });
        document.body.appendChild(this.container);
    }

}