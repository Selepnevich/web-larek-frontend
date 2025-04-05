import { IProduct } from "../../types";
import { IEvents } from "../base/events";

export class BasketView {
    protected _basketTemplate: HTMLTemplateElement;
    protected _basketContainer: HTMLElement;
    title: HTMLElement;
    basketList: HTMLElement;
    button: HTMLButtonElement;
    basketPrice: HTMLElement;
    headerBasketButton: HTMLButtonElement;
    headerBasketCounter: HTMLElement;
    items: IProduct[] = []; // Список товаров в корзине

    constructor(template: HTMLTemplateElement, protected events: IEvents) {
        this._basketTemplate = template;
        this._basketContainer = this._basketTemplate.content.querySelector('.basket').cloneNode(true) as HTMLElement;

        this.title = this._basketContainer.querySelector('.modal__title');
        this.basketList = this._basketContainer.querySelector('.basket__list');
        this.button = this._basketContainer.querySelector('.basket__button');
        this.basketPrice = this._basketContainer.querySelector('.basket__price');
        this.headerBasketButton = document.querySelector('.header__basket');
        this.headerBasketCounter = document.querySelector('.header__basket-counter');

        this.button.addEventListener('click', () => { this.events.emit('order:open') });
        this.headerBasketButton.addEventListener('click', () => { this.events.emit('basket:open') });

        this.events.on('basket:add', (product: IProduct) => this.addToBasket(product));
    }

    addToBasket(product: IProduct) {
        this.items.push(product);
        console.log(this.items)
        this.renderBasket();
    }

    renderBasket() {
    this.basketList.innerHTML = ""; // Очищаем список

    this.items.forEach((product, index) => {
        const itemTemplate = document.getElementById('card-basket') as HTMLTemplateElement;
        const itemElement = itemTemplate.content.cloneNode(true) as HTMLElement;

        const titleElement = itemElement.querySelector('.card__title') as HTMLElement;
        const priceElement = itemElement.querySelector('.card__price') as HTMLElement;
        const deleteButton = itemElement.querySelector('.basket__item-delete') as HTMLButtonElement;
        const indexElement = itemElement.querySelector('.basket__item-index') as HTMLElement;

        titleElement.textContent = product.title;
        if (product.price === null){
            priceElement.textContent = `Бесценно`;
        } else{
            priceElement.textContent = `${product.price} синапсов`;
        }

        indexElement.textContent = String(index + 1); // Нумерация товаров в корзине
        deleteButton.addEventListener('click', () => {
            this.removeFromBasket(product); // Метод для удаления товара из корзины
        });
        this.basketList.appendChild(itemElement);
    });
    this.renderSumAllProducts(this.items.reduce((sum, product) => sum + product.price, 0));
    this.renderHeaderBasketCounter(this.items.length);
}

    renderHeaderBasketCounter(value: number) {
        this.headerBasketCounter.textContent = String(value);
    }

    renderSumAllProducts(sumAll: number) {
        this.basketPrice.textContent = `${sumAll} синапсов`;
    }

    render() {
        this.title.textContent = 'Корзина';
        return this._basketContainer;
    }
    
    removeFromBasket(product: IProduct) {
    this.items = this.items.filter(item => item !== product);
    this.renderBasket();
}
}
