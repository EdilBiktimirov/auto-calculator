document.addEventListener("DOMContentLoaded", function () {
    const personalCheckbox = document.querySelector('.checkbox');
    const submitBtn = document.querySelector('.submit_btn');
    const radioNew = document.getElementById('radioBtn1');
    const creditPercentNew = document.getElementById('infoPercentNew');
    const creditPercentOld = document.getElementById('infoPercentOld');
    const radios = document.querySelectorAll('.radio-btn');
    const iin = document.querySelector('.iin');
    const phone = document.querySelector('.phone');
    const progress = document.querySelector('.progress');
    const probabilityPercent = document.getElementById('probabilityPercent');

    // Маска для ввода телефона
    [].forEach.call(document.querySelectorAll('.phone'), function (input) {
        let keyCode;

        function mask(event) {
            event.keyCode && (keyCode = event.keyCode);
            const pos = this.selectionStart;
            if (pos < 5) event.preventDefault();
            const matrix = "+7 (___) ___ - __ - __";
            let i = 0;
            const def = matrix.replace(/\D/g, "");
            const val = this.value.replace(/\D/g, "");
            let new_value = matrix.replace(/[_\d]/g, function (a) {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
            });
            i = new_value.indexOf("_");
            if (i !== -1) {
                i < 6 && (i = 5);
                new_value = new_value.slice(0, i);
            }
            const reg = matrix.substring(0, this.value.length).replace(/_+/g, function (a) {
                return "\\d{1," + a.length + "}";
            }).replace(/[+()]/g, "\\$&");
            const regex = new RegExp("^" + reg + "$");
            if (!regex.test(this.value) || this.value.length < 6 || keyCode > 47 && keyCode < 58) {
                this.value = new_value;
            }
            if (event.type === "blur" && this.value.length < 6) {
                this.value = "";
            }
        }

        // Добавление слушателей событий для маскирования
        input.addEventListener("input", mask, false);
        input.addEventListener("focus", mask, false);
        input.addEventListener("blur", mask, false);
        input.addEventListener("keydown", mask, false);
    });

    // Запрещаем ввод в поле ИИН любых символов кроме цифр
    document.getElementById('iin').addEventListener('input',
        function () {
            this.value = this.value.replace(/[^\d.]/g, '');
        });

    // Активация кнопки при нажатии на чекбокс
    personalCheckbox.addEventListener('change', function () {
        if (personalCheckbox.checked) {
            submitBtn.removeAttribute('disabled');
            submitBtn.classList.add("btn_active");
        } else {
            submitBtn.setAttribute('disabled', '');
            submitBtn.classList.remove("btn_active");
        }
    });

    // Выводим Номинальную ставку в зависимости от выбранного типа машин
    creditPercentNew.style.visibility = 'hidden';
    radios.forEach(radio => radio.addEventListener('change', () => {
            if (radioNew.checked) {
                creditPercentNew.style.visibility = 'visible';
                creditPercentOld.style.visibility = 'hidden';
            } else {
                creditPercentOld.style.visibility = 'visible';
                creditPercentNew.style.visibility = 'hidden';
            }
        }
    ));

    // Анимация графического отображения вероятности получения персональной ставки
    const iinProbabilityBonus = 37;
    const phoneProbabilityBonus = 20;
    let counter = 10;
    let isInn = false;
    let isPhone = false;

    iin.addEventListener('input', () => {
        if (iin.value.length === 12) {
            counter = counter + iinProbabilityBonus;
            probabilityPercent.innerText = counter + '%';
            progress.style.width = counter.toString() + '%';
            isInn = true;
        } else if (iin.value.length < 12 && isInn) {
            counter = counter - iinProbabilityBonus;
            probabilityPercent.innerText = counter + '%';
            progress.style.width = counter.toString() + '%';
            isInn = false;
        }
    });

    phone.addEventListener('input', () => {
        if (phone.value.length === 22) {
            counter = counter + phoneProbabilityBonus;
            probabilityPercent.innerText = counter + '%';
            progress.style.width = counter.toString() + '%';
            isPhone = true;
        } else if (phone.value.length < 22 && isPhone) {
            counter = counter - phoneProbabilityBonus;
            probabilityPercent.innerText = counter + '%';
            progress.style.width = counter.toString() + '%';
            isPhone = false;
        }
    });

});





