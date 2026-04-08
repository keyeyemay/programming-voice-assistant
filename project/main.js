import { MainPage } from "./pages/main/index.js";
import { AnalyticsPage } from "./pages/analytics/index.js"; // Импортируем новую страницу

const root = document.getElementById('root');
const mainPage = new MainPage(root);
const analyticsPage = new AnalyticsPage(root);

// Рендерим главную страницу при запуске
mainPage.render();

// Клик по логотипу (Домой)
document.getElementById('logo-link').addEventListener('click', (e) => {
    e.preventDefault();
    mainPage.render();
});

// Клик по кнопке "Аналитика" в шапке
document.getElementById('nav-analytics').addEventListener('click', (e) => {
    e.preventDefault();
    analyticsPage.render();
});
