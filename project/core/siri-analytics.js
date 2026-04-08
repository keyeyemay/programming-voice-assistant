
export function eraseFailedVoiceLogs(rawLogs) {
    return rawLogs.filter(Boolean);
}

export function compressCommandIds(idsArray) {
    if (!idsArray || idsArray.length === 0) return '';

    let sortedIds = [...new Set(idsArray)].sort((a, b) => a - b);
    let result = [];
    let start = sortedIds[0];
    let prev = sortedIds[0];

    for (let i = 1; i <= sortedIds.length; i++) {
        if (sortedIds[i] === prev + 1) {
            prev = sortedIds[i];
        } else {
            // Работа со строками
            if (start === prev) result.push(`${start}`);
            else result.push(`${start}-${prev}`);

            start = sortedIds[i];
            prev = sortedIds[i];
        }
    }
    return result.join(','); // Строка
}

export function processVoiceStream(commandStream) {
    let processedCommands = [];
    let isSleeping = false;

    do {
        // Забираем первую команду из потока
        let currentCommand = commandStream.shift();

        if (!currentCommand) break; // Если поток пуст

        processedCommands.push(currentCommand);

        if (currentCommand.text === "Siri, хватит") {
            isSleeping = true;
        }
    } while (!isSleeping);

    return processedCommands;
}

export function runAnalyticsDemo() {
    console.log("--- Запуск аналитики Siri ---");

    const rawLogs = ["Включи свет", "", undefined, false, "Погода на завтра", null];
    console.log("1.10 Очищенные логи:", eraseFailedVoiceLogs(rawLogs));

    const successIds = [1, 2, 3, 5, 6, 7, 10, 11, 12, 14, 16, 17, 18];
    console.log("2.2 Сжатые ID команд:", compressCommandIds(successIds));

    // Массив объектов
    const stream = [
        { id: 101, text: "Какая погода?" },
        { id: 102, text: "Установи таймер" },
        { id: 103, text: "Siri, хватит" },
        { id: 104, text: "Включи музыку" } // Это уже не обработается
    ];
    console.log("Постусловие (Обработанный поток):", processVoiceStream(stream));
}
