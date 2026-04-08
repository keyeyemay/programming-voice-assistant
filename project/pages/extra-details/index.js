import { ProductPage } from "../product/index.js";
import { MainPage } from "../main/index.js";
import { ExtraDetailsComponent } from "../../components/extra-details/index.js";

export class ExtraDetailsPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = parseInt(id);
    }

    // База данных для самой глубокой страницы
    getData() {
        const db = {
            1: { title: "Умный дом: Полный контроль", text: "Интеграция с протоколом Matter позволяет управлять светом, замками и термостатами." },
            2: { title: "Планирование без усилий", text: "Создавайте цепочки напоминаний и синхронизируйте календарь с устройствами Apple." },
            3: { title: "Медиа и мультирум", text: "Используйте AirPlay 2 для воспроизведения подкастов во всех комнатах одновременно." },
            4: { title: "Точная погода", text: "Интеграция с Apple Weather дает точный прогноз осадков с точностью до минуты." },
            5: { title: "Сообщения за рулем", text: "Siri автоматически зачитывает входящие сообщения через CarPlay." },
            6: { title: "Навигация в городе", text: "Получайте 3D-маршруты и оповещения о радарах в реальном времени." },
            7: { title: "Совместные заметки", text: "Диктуйте списки покупок, которые мгновенно появятся на телефонах вашей семьи." },
            8: { title: "Телефон и FaceTime", text: "Запускайте групповые видеозвонки просто назвав имена контактов." },
        };
        return db[this.id] || { title: "Дополнительная информация", text: "Скоро здесь появится больше деталей." };
    }

    getHTML() {
        return `<div id="extra-page-root"></div>`;
    }

    // Навигация 1: Назад к карточке
    clickBackToProduct() {
        const productPage = new ProductPage(this.parent, this.id);
        productPage.render();
    }

    // Навигация 2: Домой на главную
    clickHome() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const container = document.getElementById('extra-page-root');
        const data = this.getData();

        // Рендерим компонент и передаем ему ОБА обработчика
        const component = new ExtraDetailsComponent(container);
        component.render(data, this.clickBackToProduct.bind(this), this.clickHome.bind(this));
    }
}
