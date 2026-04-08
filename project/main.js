import { MainPage } from "./pages/main/index.js";
import { runAnalyticsDemo } from "./core/siri-analytics.js";     // ??? дз часть1 либо в консоли либо в браузере

const root = document.getElementById('root');
const mainPage = new MainPage(root);

mainPage.render();

document.getElementById('logo-link').addEventListener('click', (e) => {
    e.preventDefault();
    mainPage.render();
});

runAnalyticsDemo();
