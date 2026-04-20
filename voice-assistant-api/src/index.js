const express = require('express');
const path = require('path');
const servicesRouter = require('./routes/services');
const servicesService = require('./services/servicesService');

const app = express();
const PORT = 3000;

// Определяем путь к файлу данных
const DATA_FILE_PATH = path.join(__dirname, 'data/services.json');

// Инициализируем сервис с путем к файлу данных
servicesService.init(DATA_FILE_PATH);

// Встроенный middleware для парсинга JSON
app.use(express.json());

// Логирующий middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Подключение маршрутов
app.use('/services', servicesRouter);

// Глобальная обработка 404
app.use((req, res) => {
    res.status(404).json({ error: 'Маршрут не найден' });
});

// Обработчик ошибок
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен по адресу http://localhost:${PORT}`);
});
