import './scss/styles.scss';
import { ProductListView, ProductView } from "./components/views/ProductView";
import { ModalView } from './components/views/ModalView';
import { BasketView } from './components/views/BasketView';
import { Api } from "./components/base/api";
import { API_URL, CDN_URL } from "./utils/constants"; // API_URL из .env
import { cloneTemplate, ensureElement } from "./utils/utils";
import { IProduct } from "./types";
import { CdnApi } from "./components/models/ApiModel";
import { EventEmitter } from './components/base/events';

const api = new CdnApi( API_URL, CDN_URL);
// Шаблоны
const cardCatalogTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;
const cardCatalogPreview = document.querySelector('#card-preview') as HTMLTemplateElement;
const basketTemplate = document.querySelector('#basket') as HTMLTemplateElement;
// const modalWindow = document.querySelector('#modal__content') as HTMLTemplateElement;

const catalog = ensureElement<HTMLElement>('.gallery');
const events = new EventEmitter();

// Представления
const viewProductList = new ProductListView(cardCatalogTemplate);

const basketView = new BasketView(basketTemplate, events);

// const viewModelProduct = new ProductView(modalWindow);


const modalTemplate = document.querySelector('#modal__content') as HTMLTemplateElement;
const modalView = new ModalView();

// Отображение списка продуктов
api.getListProducts()
    .then((products) => {
        products.forEach(product => {
            const productElement = viewProductList.renderProduct(product);
            productElement.addEventListener('click', () => {
                events.emit('card:select', product);
            });
            catalog.appendChild(productElement);
        });
    })
    .catch(error => console.error("Ошибка загрузки продуктов:", error));


// Модальное окно для одного продукта
events.on('card:select', (product) => {
    const viewProduct = new ProductView(cardCatalogPreview, product as IProduct, events);
    const item = viewProduct.renderProduct(product as IProduct);
    modalView.setContent(item);
    modalView.open();
});

// Взаимодействие с корзиной
events.on('basket:open', () => {
    modalView.setContent(basketView.render());
    modalView.open();
});
events.on('order:open', () => {
    // modalView.setContent(basketView.render());
    modalView.open();
});