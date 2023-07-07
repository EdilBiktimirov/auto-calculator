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
    const rangeSum = document.getElementById('rangeSum');
    const progress_bar = document.getElementById('progress_bar');
    const progress_bar2 = document.getElementById('progress_bar2');
    const rangeYear = document.getElementById('rangeYear');
    const sumAmount = document.querySelector('.sum-amount');
    const termAmount = document.querySelector('.term-amount');
    const creditSum = document.querySelector('.info-box-sum');
    const overpayment = document.querySelector('.statistics-numbers');
    const bid = document.getElementById('bid');
    const modalBtn = document.querySelector('.modal-btn');
    const modal = document.querySelector('.modal');

    const annualRate = 0.27; // Годовая эффективная ставка 27%

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
            console.log(probabilityPercent.innerText)
            if (probabilityPercent.innerText > '47%') {
                // probabilityPercent.classList.add('color-white');
                probabilityPercent.style.color = '#fff'
            }
        } else if (iin.value.length < 12 && isInn) {
            counter = counter - iinProbabilityBonus;
            probabilityPercent.innerText = counter + '%';
            progress.style.width = counter.toString() + '%';
            isInn = false;
            if (probabilityPercent.innerText <= '47%') {
                // probabilityPercent.classList.add('color-white');
                probabilityPercent.style.color = '#7A89A8'
            }
        }
    });

    phone.addEventListener('input', () => {
        if (phone.value.length === 22) {
            counter = counter + phoneProbabilityBonus;
            probabilityPercent.innerText = counter + '%';
            progress.style.width = counter.toString() + '%';
            isPhone = true;
            if (probabilityPercent.innerText > '47%') {
                // probabilityPercent.classList.add('color-white');
                probabilityPercent.style.color = '#fff'
            }
        } else if (phone.value.length < 22 && isPhone) {
            counter = counter - phoneProbabilityBonus;
            probabilityPercent.innerText = counter + '%';
            progress.style.width = counter.toString() + '%';
            isPhone = false;
            if (probabilityPercent.innerText <= '47%') {
                // probabilityPercent.classList.add('color-white');
                probabilityPercent.style.color = '#7A89A8'
            }
        }
    });


    // Функция конвертирования месяцев в года с месяцами
    function convertMonthsToYears(months) {
        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;

        let yearsString = years === 0 ? "" : (years + " год");
        let monthsString = remainingMonths + " месяц";

        if (months === 0) {
            return "0 месяцев";
        }

        if (remainingMonths >= 5 && remainingMonths <= 12) {
            monthsString += "ев";
        } else {
            monthsString += (remainingMonths !== 1 ? "а" : "");
        }

        if (years === 0) {
            return monthsString;
        }

        if (years >= 5 && years <= 20) {
            yearsString = years + " лет";
        } else {
            const lastDigit = years % 10;
            yearsString += (lastDigit === 1 ? "" : (lastDigit >= 2 && lastDigit <= 4 ? "а" : "ов"));
        }

        return yearsString + (remainingMonths === 0 ? "" : " " + monthsString);
    }


    //Функция расчета размера кредита
    function calculateAnnuityPayment(creditSum, annualInterestRate, termMonth, isNumber) {
        const monthlyInterestRate = annualInterestRate / 12;
        const exponent = Math.pow(1 + monthlyInterestRate, termMonth);
        const annuityPayment = ((creditSum * 1000000) * monthlyInterestRate * exponent) / (exponent - 1);
        if (isNumber) return Math.round(annuityPayment);
        return Math.round(annuityPayment).toLocaleString() + ' ₸';
    }

    //Функция расчета переплаты по кредиту
    function calculateOverpayment(annuityPayment, termMonth, creditSum) {
        const totalPayment = annuityPayment * termMonth;
        const overpayment = totalPayment - (creditSum * 1000000);
        return overpayment.toLocaleString() + ' ₸';
    }


    // Устанавливаем значения суммы, переплаты, срока кредита
    termAmount.innerText = convertMonthsToYears(rangeYear.value);

    creditSum.innerText = calculateAnnuityPayment(
        parseInt(rangeSum.value),
        annualRate,
        parseInt(rangeYear.value));

    overpayment.innerText = calculateOverpayment(
        calculateAnnuityPayment(
            parseInt(rangeSum.value),
            annualRate,
            parseInt(rangeYear.value),
            true),
        parseInt(rangeYear.value),
        parseInt(rangeSum.value)
    );

    // Подключаем вывод значений range input
    rangeSum.addEventListener('input', () => {
        sumAmount.innerText = rangeSum.value + ' млн.';
        const percentage = ((rangeSum.value - 1) / (51 - 1)) * 100;
        progress_bar.style.width = percentage + '%';

        creditSum.innerText = calculateAnnuityPayment(
            parseInt(rangeSum.value),
            annualRate,
            parseInt(rangeYear.value));

        overpayment.innerText = calculateOverpayment(
            calculateAnnuityPayment(
                parseInt(rangeSum.value),
                annualRate,
                parseInt(rangeYear.value),
                true),
            parseInt(rangeYear.value),
            parseInt(rangeSum.value)
        );
    });

    rangeYear.addEventListener('input', () => {
        termAmount.innerText = convertMonthsToYears(rangeYear.value);
        const percentage = ((rangeYear.value - 1) / (85 - 1)) * 100;
        progress_bar2.style.width = percentage + '%';

        creditSum.innerText = calculateAnnuityPayment(
            parseInt(rangeSum.value),
            annualRate,
            parseInt(rangeYear.value));

        overpayment.innerText = calculateOverpayment(
            calculateAnnuityPayment(
                parseInt(rangeSum.value),
                annualRate,
                parseInt(rangeYear.value),
                true),
            parseInt(rangeYear.value),
            parseInt(rangeSum.value)
        );
    });

    // Изменить текст при ширине экрана < 650px
    if (window.innerWidth < 650) {
        bid.innerText = 'ГЭСВ';
    }

    window.addEventListener('resize', function () {
        if (window.innerWidth < 650) {
            bid.innerText = 'ГЭСВ';
        } else {
            bid.innerText = 'Годовая Эффективная Ставка';
        }
    });

    //Закрываем модалку при нажатии на кнопку "Вернуться"
    modalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

});





