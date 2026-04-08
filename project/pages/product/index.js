import { ProductComponent } from "../../components/product/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { ModelViewerComponent } from "../../components/model-viewer/index.js";
import { MainPage } from "../main/index.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = parseInt(id);
    }

    getData() {
        const db = {
            1: { title: "Умный дом", icon: "🏠", description: "Управляйте устройствами HomeKit.", accordion: [ { target: "a1", title: "Свет", body: "«Siri, включи свет»." } ] },
            2: { title: "Планирование", icon: "📅", description: "Организация вашего дня.", accordion: [ { target: "a1", title: "Будильники", body: "«Siri, разбуди в 7»." } ] },
            3: { title: "Медиа", icon: "🎵", description: "Музыка и подкасты.", accordion: [ { target: "a1", title: "Apple Music", body: "«Включи мой плейлист»." } ] },
            4: { title: "Погода", icon: "🌤️", description: "Актуальный прогноз.", accordion: [ { target: "a1", title: "Осадки", body: "«Нужен ли сегодня зонт?»." } ] },
            5: { title: "Сообщения", icon: "💬", description: "Диктовка текста.", accordion: [ { target: "a1", title: "Отправка", body: "«Напиши маме, что я опоздаю»." } ] },
            6: { title: "Навигация", icon: "🗺️", description: "Apple Maps.", accordion: [ { target: "a1", title: "Маршрут", body: "«Проложи маршрут домой»." } ] },
            7: { title: "Заметки", icon: "📝", description: "Быстрые списки.", accordion: [ { target: "a1", title: "Списки", body: "«Добавь молоко в список покупок»." } ] },
            8: { title: "Телефон", icon: "📞", description: "Звонки без рук.", accordion: [ { target: "a1", title: "Громкая связь", body: "«Позвони Ивану по громкой связи»." } ] },
        };
        return db[this.id];
    }

    get pageRoot() { return document.getElementById('product-page'); }
    getHTML() {
        return `
            <div class="row" id="product-page">
                <div class="col-md-8" id="accordion-container"></div>
                <div class="col-md-4">
                    <h5 class="fw-bold mb-3 text-center">3D Визуализация</h5>
                    <div id="3d-container" class="shadow-sm"></div>
                </div>
            </div>
        `;
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const backButton = new BackButtonComponent(this.parent);
        backButton.render(this.clickBack.bind(this));

        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const data = this.getData();

        const accordionContainer = document.getElementById('accordion-container');
        const product = new ProductComponent(accordionContainer);
        product.render(data);

        const modelContainer = document.getElementById('3d-container');
        const viewer = new ModelViewerComponent(modelContainer);
        viewer.render('../../models/iphone.glb');
    }
}
