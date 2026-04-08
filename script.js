window.onload = function() {
    let a = '';
    let b = '';
    let selectedOperation = null;
    let finish = false;
    let memoryValue = 0; // Память для M+ и M-

    const outputElement = document.getElementById("result");
    const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]');

    function clearAll() {
        a = ''; b = ''; selectedOperation = null; finish = false;
        outputElement.innerHTML = '0';
        outputElement.style.color = '#ffffff'; // Сброс цвета
    }

    function updateDisplay() {
        let display = a || '0';
        if (selectedOperation) display += ' ' + selectedOperation;
        if (b) display += ' ' + b;

        outputElement.innerHTML = display;

        // Плавный автоматический скролл в конец при вводе
        outputElement.scrollTo({
            left: outputElement.scrollWidth,
            behavior: 'smooth'
        });
    }

    // Вспомогательная функция для математики (применяет функцию к текущему активному числу)
    function modifyActiveNumber(modifierFunction) {
        if (!selectedOperation) {
            let val = a === '' ? '0' : a;
            a = String(modifierFunction(val));
        } else {
            let val = b === '' ? '0' : b;
            b = String(modifierFunction(val));
        }
        updateDisplay();
    }

    // 1. ИДЕАЛЬНЫЙ ВВОД ЦИФР И ТОЧЕК
    digitButtons.forEach(button => {
        button.onclick = function() {
            let digit = button.innerHTML;

            // Сброс после '=' при вводе нового числа
            if (finish) {
                clearAll();
            }

            // Логика для первого числа (A)
            if (!selectedOperation) {
                // Обработка точки
                if (digit === '.') {
                    if (a.includes('.')) return; // Запрет второй точки
                    if (a === '') a = '0'; // Если пусто, начинаем с 0.
                }
                // Обработка нулей (в том числе 000)
                if ((digit === '0' || digit === '000') && a === '0') return;

                if (digit !== '.' && a === '0') a = digit; // Замена нуля цифрой
                else a += digit;
            }
            // Логика для второго числа (B)
            else {
                if (digit === '.') {
                    if (b.includes('.')) return;
                    if (b === '') b = '0';
                }
                if ((digit === '0' || digit === '000') && b === '0') return;

                if (digit !== '.' && b === '0') b = digit;
                else b += digit;
            }
            updateDisplay();
        }
    });

    // БАЗОВЫЕ ОПЕРАЦИИ
    document.getElementById("btn_op_plus").onclick = () => { if(a) { selectedOperation = '+'; finish = false; updateDisplay(); } }
    document.getElementById("btn_op_minus").onclick = () => { if(a) { selectedOperation = '-'; finish = false; updateDisplay(); } }
    document.getElementById("btn_op_mult").onclick = () => { if(a) { selectedOperation = '×'; finish = false; updateDisplay(); } }
    document.getElementById("btn_op_div").onclick = () => { if(a) { selectedOperation = '/'; finish = false; updateDisplay(); } }
    document.getElementById("btn_op_clear").onclick = clearAll;

    document.getElementById("btn_op_equal").onclick = function() {
        if (a === '' || b === '' || !selectedOperation) return;

        let numA = parseFloat(a);
        let numB = parseFloat(b);
        let res = 0;

        switch(selectedOperation) {
            case '+': res = numA + numB; break;
            case '-': res = numA - numB; break;
            case '×': res = numA * numB; break;
            case '/': res = (numB === 0) ? 'Error' : numA / numB; break;
        }

        finish = true;
        a = res.toString();
        b = '';
        selectedOperation = null;
        updateDisplay();
    }

    // --- ФУНКЦИОНАЛ ИЗ МЕТОДИЧКИ ЛР 2 ---

    // 1. Смена знака +/-
    document.getElementById("btn_op_sign").onclick = () => modifyActiveNumber(v => Number(v) * -1);

    // 2. Процент %
    document.getElementById("btn_op_percent").onclick = () => modifyActiveNumber(v => Number(v) / 100);

    // 3. Backspace (Удаление последней цифры)
    document.getElementById("btn_op_backspace").onclick = function() {
        if (!selectedOperation) {
            a = a.slice(0, -1);
            if (a === '' || a === '-') a = '0';
        } else {
            b = b.slice(0, -1);
            if (b === '' || b === '-') b = '0';
        }
        updateDisplay();
    }

    // 4. Смена цвета фона
    document.getElementById("btn_bg_color").onclick = () => {
        document.body.style.backgroundImage = 'none';
        document.body.style.backgroundColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    }

    // 5. Квадратный корень √
    document.getElementById("btn_op_sqrt").onclick = () => modifyActiveNumber(v => Number(v) >= 0 ? Math.sqrt(Number(v)) : "Error");

    // 6. Возведение в квадрат x²
    document.getElementById("btn_op_square").onclick = () => modifyActiveNumber(v => Math.pow(Number(v), 2));

    // 7. Факториал x!
    document.getElementById("btn_op_fact").onclick = () => modifyActiveNumber(v => {
        let n = Math.round(Number(v));
        if (n < 0) return "Error";
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) result *= i;
        return result;
    });

    // 9. Память: M+
    document.getElementById("btn_mem_plus").onclick = () => {
        // Запоминаем текущий результат на экране
        let currentDisplay = outputElement.innerHTML.split(' ').pop();
        memoryValue += Number(currentDisplay);
    }

    // 10. Память: M-
    document.getElementById("btn_mem_minus").onclick = () => {
        let currentDisplay = outputElement.innerHTML.split(' ').pop();
        memoryValue -= Number(currentDisplay);
    }

    // Память: MR (Recall)
    document.getElementById("btn_mem_recall").onclick = () => {
        if (!selectedOperation) a = String(memoryValue);
        else b = String(memoryValue);
        updateDisplay();
    }

    // 11. Смена цвета окна вывода
    document.getElementById("btn_color_out").onclick = () => {
        const colors = ['#00ffff', '#ff2a6d', '#05d5ff', '#ff9f0a', '#32d74b', '#ffffff'];
        outputElement.style.color = colors[Math.floor(Math.random() * colors.length)];
    }

    // 12. Индивидуальная операция (Случайное число)
    document.getElementById("btn_custom_rnd").onclick = () => {
        let rnd = Math.floor(Math.random() * 100) + 1;
        if (!selectedOperation) a = String(rnd);
        else b = String(rnd);
        updateDisplay();
    }
    // --- МАГИЯ DRAG-TO-SCROLL (ПЕРЕТАСКИВАНИЕ МЫШЬЮ) ---

    let isDown = false;
    let startX;
    let scrollLeft;

    // Когда нажали кнопку мыши на окне результата
    outputElement.addEventListener('mousedown', (e) => {
        isDown = true;

        // ВАЖНО: Останавливаем стандартную реакцию браузера на клик
        e.preventDefault();

        // Меняем курсор на "сжатую руку" (если ты добавлял это в CSS)
        outputElement.style.cursor = 'grabbing';

        // Запоминаем координаты
        startX = e.pageX - outputElement.offsetLeft;
        scrollLeft = outputElement.scrollLeft;
    });

    // Когда мышь ушла за пределы окна
    outputElement.addEventListener('mouseleave', () => {
        isDown = false;
        outputElement.style.cursor = 'grab';
    });

    // Когда отпустили кнопку мыши
    outputElement.addEventListener('mouseup', () => {
        isDown = false;
        outputElement.style.cursor = 'grab';
    });

    // Когда двигаем мышью
    outputElement.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();

        const x = e.pageX - outputElement.offsetLeft;
        const walk = (x - startX) * 1.5; // 1.5 - это скорость скролла

        outputElement.scrollLeft = scrollLeft - walk;
    });
};
