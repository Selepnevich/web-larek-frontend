import './scss/styles.scss';
import { ProductListView } from "./components/views/ProductListView";
import { ProductPresenter } from "./components/presenters/ProductPresenter";
import { Api } from "./components/base/api";
import { API_URL } from "./utils/constants"; // API_URL из .env

const api = new Api(API_URL);

document.addEventListener("DOMContentLoaded", () => {
    const view = new ProductListView("product-container");
    const presenter = new ProductPresenter(view, api);
    console.log(presenter)
    
    presenter.fetchProducts(); // Загружаем товары с API
});