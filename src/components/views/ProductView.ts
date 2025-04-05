import { IProduct } from "../../types";
import { createElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { ViewComponent } from "../base/viewComponent"

export class ProductListView{
    protected _productTemplate: HTMLTemplateElement;
    protected _productContainer: HTMLElement
    private categoryClassMap: Record<string, string> = {
        "дополнительное": "additional",
        "софт-скил": "soft",
        "кнопка": "button",
        "хард-скил": "hard",
        "другое": "other"
    };
    protected _button?: HTMLButtonElement;

    constructor(template: HTMLTemplateElement) {
        this._productTemplate = template
    }
    
    protected setPrice(price: number | null): string{
        if(price === null){
            return "Бесценно"
        }else{
            return String(price) + " синапсов"
        }
    }
    
    renderProduct(data: IProduct): HTMLElement{
        this._productContainer = this._productTemplate.content.querySelector('.card').cloneNode(true) as HTMLElement;
        const productCategory = this._productContainer.querySelector('.card__category');
        const productTitle = this._productContainer.querySelector('.card__title');
        const productImage = this._productContainer.querySelector('.card__image') as HTMLImageElement;
        const productPrice = this._productContainer.querySelector('.card__price');

        productTitle.textContent=data.title;
        productImage.src=data.image;
        productImage.alt=data.title;
        productPrice.textContent=this.setPrice(data.price);
        if(productCategory){
            const categoryKey = this.categoryClassMap[data.category] ? data.category : "другое";
            const categoryClass = this.categoryClassMap[categoryKey];

            productCategory.textContent = categoryKey;
            productCategory.classList.add(`card__category_${categoryClass}`);
        }
        return this._productContainer
    }
}

export class ProductView extends ProductListView {

    private data: IProduct;
    private events: IEvents;
    button: HTMLButtonElement;

    constructor(template: HTMLTemplateElement, product:IProduct, events: IEvents) {
        super(template);
        this.data = product
        this.events = events
        
        // this.button = template.content.querySelector('.card__button');
        this.button = template.content.querySelector('.card__button');
        if (this.button) {
            this.events.emit('basket:add', this.data);
            this.button.addEventListener('click', () => {
                console.log('Добавить товар в корзину:', this.data.title);
            })
        };
}
}
