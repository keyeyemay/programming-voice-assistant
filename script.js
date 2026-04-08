window.onload = function() {
    // Инициализация переменных
    let a = '';           // Первое число
    let b = '';           // Второе число
    let expressionResult = '';  // Результат вычисления
    let selectedOperation = null;  // Выбранная операция

    // Переменная для хранения памяти (Задания 9, 10)
    let memoryValue = 0;

    const outputElement = document.getElementById("result");
    const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]'); // Находит и кнопку 000

    // Функция обработки нажатия на цифровые кнопки (Включая Задание 8: 000)
    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if ((digit !== '.') || (digit === '.' && !a.includes(digit))) {
                a += digit;
            }
            outputElement.innerHTML = a || '0';
        } else {
            if ((digit !== '.') || (digit === '.' && !b.includes(digit))) {
                b += digit;
                outputElement.innerHTML = b || '0';
            }
        }
    }

    // Устанавливаем обработчики на все цифры
    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML;
            onDigitButtonClicked(digitValue);
        }
    });

    // Настраиваем обработчики базовых операций
    document.getElementById("btn_op_mult").onclick = () => { if (a !== '') selectedOperation = 'x'; }
    document.getElementById("btn_op_plus").onclick = () => { if (a !== '') selectedOperation = '+'; }
    document.getElementById("btn_op_minus").onclick = () => { if (a !== '') selectedOperation = '-'; }
    document.getElementById("btn_op_div").onclick = () => { if (a !== '') selectedOperation = '/'; }

    // Очистка C
    document.getElementById("btn_op_clear").onclick = function() {
        a = ''; b = ''; selectedOperation = null; expressionResult = '';
        outputElement.innerHTML = 0;
    }

    // Вспомогательная функция: изменяет текущее активное число (a или b)
    function modifyActiveNumber(modifierFunction) {
        if (!selectedOperation) {
            if (a === '') a = '0';
            a = String(modifierFunction(a));
            outputElement.innerHTML = a;
        } else {
            if (b === '') b = '0';
            b = String(modifierFunction(b));
            outputElement.innerHTML = b;
        }
    }

    // --- ВЫПОЛНЕНИЕ ЗАДАНИЙ ИЗ МЕТОДИЧКИ ---

    // 1. Смена знака +/- (умножение на -1)
    document.getElementById("btn_op_sign").onclick = function() {
        modifyActiveNumber(val => Number(val) * -1);
    }

    // 2. Вычисление процента % (деление на 100)
    document.getElementById("btn_op_percent").onclick = function() {
        modifyActiveNumber(val => Number(val) / 100);
    }

    // 3. Backspace (метод slice)
    document.getElementById("btn_op_backspace").onclick = function() {
        modifyActiveNumber(val => val.length > 1 ? val.slice(0, -1) : '');
        if (outputElement.innerHTML === '') outputElement.innerHTML = '0';
    }

    // 4. Смена цвета фона (style.backgroundColor)
    document.getElementById("btn_bg_color").onclick = function() {
        // Генерируем случайный цвет в HEX формате
        const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
        document.body.style.backgroundImage = 'none'; // Убираем картинку
        document.body.style.backgroundColor = randomColor;
    }

    // 5. Квадратный корень (Math.sqrt)
    document.getElementById("btn_op_sqrt").onclick = function() {
        modifyActiveNumber(val => {
            let num = Number(val);
            return num >= 0 ? Math.sqrt(num) : "Error";
        });
    }

    // 6. Возведение в квадрат
    document.getElementById("btn_op_square").onclick = function() {
        modifyActiveNumber(val => Math.pow(Number(val), 2)); // умножение числа само на себя
    }

    // 7. Факториал (цикл)
    document.getElementById("btn_op_fact").onclick = function() {
        modifyActiveNumber(val => {
            let n = Math.round(Number(val));
            if (n < 0) return "Error";
            if (n === 0 || n === 1) return 1;
            let result = 1;
            for (let i = 2; i <= n; i++) result *= i;
            return result;
        });
    }

    // 9. Накапливаемое сложение (M+)
    document.getElementById("btn_mem_plus").onclick = function() {
        memoryValue += Number(outputElement.innerHTML);
    }

    // 10. Накапливаемое вычитание (M-)
    document.getElementById("btn_mem_minus").onclick = function() {
        memoryValue -= Number(outputElement.innerHTML);
    }

    // Кнопка MR (Memory Recall) - извлечение из памяти (дополнение к 9 и 10)
    document.getElementById("btn_mem_recall").onclick = function() {
        if (!selectedOperation) {
            a = String(memoryValue);
            outputElement.innerHTML = a;
        } else {
            b = String(memoryValue);
            outputElement.innerHTML = b;
        }
    }

    // 11. Смена цвета окна вывода
    document.getElementById("btn_color_out").onclick = function() {
        const colors = ['#00ffff', '#ff2a6d', '#05d5ff', '#5e5ce6', '#ff9f0a', '#ffffff'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        outputElement.style.color = randomColor;
    }

    // 12. Индивидуальная операция (Siri Randomizer)
    document.getElementById("btn_custom_rnd").onclick = function() {
        // Генерируем случайное число от 1 до 100 и подставляем его в текущий ввод
        const rnd = Math.floor(Math.random() * 100) + 1;
        if (!selectedOperation) {
            a = String(rnd);
            outputElement.innerHTML = a;
        } else {
            b = String(rnd);
            outputElement.innerHTML = b;
        }
    }

    // --- КНОПКА РАВНО (ОБРАБОТКА БАЗОВЫХ ОПЕРАЦИЙ) ---
    document.getElementById("btn_op_equal").onclick = function() {
        if (a === '' || b === '' || !selectedOperation) return;

        // Выполняем выбранную операцию через switch
        switch(selectedOperation) {
            case 'x': expressionResult = (+a) * (+b); break;
            case '+': expressionResult = (+a) + (+b); break;
            case '-': expressionResult = (+a) - (+b); break;
            case '/': expressionResult = (+b) === 0 ? "Error" : (+a) / (+b); break;
            default: break;
        }

        a = expressionResult.toString();
        b = '';
        selectedOperation = null;
        outputElement.innerHTML = a;
    }
};
