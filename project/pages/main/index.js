import { CarouselComponent } from "../../components/carousel/index.js";
import { ProductPage } from "../product/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    getData() {
        return [
            { id: 1, icon: "🏠", title: "Умный дом", text: "Освещение, климат, розетки." },
            { id: 2, icon: "📅", title: "Планирование", text: "Будильники и календари." },
            { id: 3, icon: "🎵", title: "Медиа", text: "Музыка, подкасты и радио." },
            { id: 4, icon: "🌤️", title: "Погода", text: "Прогноз погоды и осадки." },
            { id: 5, icon: "💬", title: "Сообщения", text: "Отправка и чтение SMS/iMessage." },
            { id: 6, icon: "🗺️", title: "Навигация", text: "Маршруты и пробки на дорогах." },
            { id: 7, icon: "📝", title: "Заметки", text: "Создание быстрых заметок." },
            { id: 8, icon: "📞", title: "Телефон", text: "Звонки контактам из книги." }
        ];
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return `
            <h1 class="text-center fw-bold mb-4" style="letter-spacing: -1px;">Что умеет <span class="siri-gradient">Siri</span>?</h1>
            <div id="main-page"></div>
        `;
    }

    clickCard(e) {
        const cardId = e.target.dataset.id;
        const productPage = new ProductPage(this.parent, cardId);
        productPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const data = this.getData();

        const carousel = new CarouselComponent(this.pageRoot);
        carousel.render(data, this.clickCard.bind(this));
    }
}
