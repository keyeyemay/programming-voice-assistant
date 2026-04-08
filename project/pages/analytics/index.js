import { eraseFailedVoiceLogs, compressCommandIds, processVoiceStream } from "../../core/siri-analytics.js";

export class AnalyticsPage {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        // Подготавливаем тестовые данные
        const rawLogs = ["Включи свет", "", undefined, false, "Погода на завтра", null];
        const cleanLogs = eraseFailedVoiceLogs(rawLogs);

        const successIds = [1, 2, 3, 5, 6, 7, 10, 11, 12, 14, 16, 17, 18];
        const compressedIds = compressCommandIds(successIds);

        const stream = [
            { id: 101, text: "Какая погода?" },
            { id: 102, text: "Установи таймер" },
            { id: 103, text: "Siri, хватит" },
            { id: 104, text: "Включи музыку" }
        ];
        const processedStream = processVoiceStream(stream);

        // Верстаем страницу с результатами
        return `
            <div class="container mt-4" style="max-width: 800px;">
                <h2 class="fw-bold mb-4 text-center">Аналитика Siri <span class="badge bg-primary text-white fs-6 align-middle">Часть 1 ДЗ</span></h2>

                <div class="card siri-card mb-4 p-4">
                    <h5 class="fw-bold text-primary">1. Очистка логов микрофона (Задание 1.10)</h5>
                    <p class="text-muted small">Удаляем программный мусор (undefined, false, пустые строки) из массива.</p>
                    <div class="bg-light p-3 rounded mb-2"><strong>До:</strong> <code>${JSON.stringify(rawLogs)}</code></div>
                    <div class="bg-light p-3 rounded border-start border-primary border-4"><strong>После:</strong> <code>${JSON.stringify(cleanLogs)}</code></div>
                </div>

                <div class="card siri-card mb-4 p-4">
                    <h5 class="fw-bold text-primary">2. Сжатие ID команд (Задание 2.2)</h5>
                    <p class="text-muted small">Сворачиваем соседние числа успешных команд в диапазоны с помощью Set и циклов.</p>
                    <div class="bg-light p-3 rounded mb-2"><strong>До:</strong> <code>[${successIds.join(', ')}]</code></div>
                    <div class="bg-light p-3 rounded border-start border-primary border-4"><strong>После:</strong> <code class="text-success">${compressedIds}</code></div>
                </div>

                <div class="card siri-card mb-4 p-4">
                    <h5 class="fw-bold text-primary">3. Обработка потока (Цикл с постусловием)</h5>
                    <p class="text-muted small">Слушаем команды до тех пор, пока не встретим стоп-слово "Siri, хватит". Последняя команда в массиве игнорируется.</p>
                    <div class="bg-light p-3 rounded">
                        <pre class="m-0" style="font-size: 0.85rem;"><code>${JSON.stringify(processedStream, null, 2)}</code></pre>
                    </div>
                </div>
            </div>
        `;
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
    }
}
