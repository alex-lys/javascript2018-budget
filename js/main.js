let buttonStart = document.querySelector('#start'),
    divResult = document.querySelector('.result'),
    divNameValue = document.querySelectorAll('.budget-value, .daybudget-value, .level-value, .expenses-value, .optionalexpenses-value, .income-value, .monthsavings-value, .yearsavings-value'),
    inputExpenses = document.querySelectorAll('input.expenses-item'),
    buttonExpensesApprove = document.querySelector('button.expenses-item-btn'),
    buttonOptExpensesApprove = document.querySelector('button.optionalexpenses-btn'),
    buttonBudgetСalculate = document.querySelector('button.count-budget-btn'),
    inputOptExpenses = document.querySelectorAll('input.optionalexpenses-item'),
    inputIncome = document.querySelector('input.choose-income'),
    inputSavings = document.querySelector('#savings'),
    inputSum = document.querySelector('#sum'),
    inputPercent = document.querySelector('#percent'),
    inputYear = document.querySelector('input.year-value'),
    inputMonth= document.querySelector('input.month-value'),
    inputDay = document.querySelector('input.day-value');

let money, time;

buttonExpensesApprove.setAttribute('disabled', 'disabled');
buttonOptExpensesApprove.setAttribute('disabled', 'disabled');
buttonBudgetСalculate.setAttribute('disabled', 'disabled');

buttonStart.addEventListener('click', function() {
    time = prompt('Введите дату в формате YYYY-MM-DD', ''),
    money = +prompt('Ваш бюджет на месяц?', '');

    while (Number.isNaN(money) || money == '' || money == null) {
        money = +prompt('Ваш бюджет на месяц?', '');
    }
    appData.budget = money;
    appData.timeData = time;

    divNameValue[0].textContent = money.toFixed();
    inputYear.value = new Date(Date.parse(time)).getFullYear();
    inputMonth.value = new Date(Date.parse(time)).getMonth() + 1;
    inputDay.value = new Date(Date.parse(time)).getDate();

    buttonExpensesApprove.removeAttribute('disabled');
    buttonOptExpensesApprove.removeAttribute('disabled');
    buttonBudgetСalculate.removeAttribute('disabled');
});


buttonExpensesApprove.addEventListener('click', function() {
    let sum = 0;
    for (let i = 0; i < inputExpenses.length; i += 1) {
        let expName = inputExpenses[i].value,
            expValue = inputExpenses[i += 1].value;
        
        if ((typeof(expName) === 'string') && (typeof(expName) != null) && (typeof(expValue) != null) && (expName != '') && (expValue != '') && (expName.length < 50)) {
            appData.expenses[expName] = expValue;
            sum += +expValue;
        } else {
            alert('Вы не указали данные или указали их неверно');
            i -= 1;
        }
    }
    divNameValue[3].textContent = sum;
});

buttonOptExpensesApprove.addEventListener('click', function() {
    for(let i = 0; i < inputOptExpenses.length; i += 1) {
        let opt = inputOptExpenses[i].value;
        appData.optionalExpenses[i] = opt;
        divNameValue[4].textContent += appData.optionalExpenses[i] + ' ';
    }
});

buttonBudgetСalculate.addEventListener('click', function(){
    if (appData.budget != undefined && Object.keys(appData.expenses).length != 0) {
        appData.moneyPerDay = ((appData.budget - +divNameValue[3].textContent) / 30).toFixed();
        divNameValue[1].textContent = appData.moneyPerDay;
    
    } else {
        if (Object.keys(appData.expenses).length == 0) {
            divNameValue[1].textContent = 'Произошла ошибка, укажите обязательные расходы';
        } else {
            divNameValue[1].textContent = 'Произошла ошибка, нажмите "Начать расчет"';
        }          
    }

    if (appData.moneyPerDay < 100) {
        divNameValue[2].textContent = 'Минимальный уровень достатка';
    } else if (appData.moneyPerDay > 100 && appData.moneyPerDay <= 2000) {
        divNameValue[2].textContent = 'Средний уровень достатка';
    } else if (appData.moneyPerDay > 2000) {
        divNameValue[2].textContent = 'Высокий уровень достатка';
    } else {
        divNameValue[2].textContent = 'Произошла ошибка';
    }
});

inputIncome.addEventListener('input', function() {
    let items = inputIncome.value;
    appData.income = items.split(', ');
    divNameValue[5].textContent = appData.income.join(', ');
});

inputSavings.addEventListener('click', function(){
    if (appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

inputSum.addEventListener('input', function() {
    if (appData.savings == true) {
        let sum = +inputSum.value,
            percent = +inputPercent.value;

        appData.monthIncome = sum / 100 / 12 * percent;
        appData.yearIncome = sum / 100 * percent;

        divNameValue[6].textContent = appData.monthIncome.toFixed(1);
        divNameValue[7].textContent = appData.yearIncome.toFixed(1);
    }
});

inputPercent.addEventListener('input', function() {
    if (appData.savings == true) {
        let sum = +inputSum.value,
            percent = +inputPercent.value;

        appData.monthIncome = sum / 100 / 12 * percent;
        appData.yearIncome = sum / 100 * percent;

        divNameValue[6].textContent = appData.monthIncome.toFixed(1);
        divNameValue[7].textContent = appData.yearIncome.toFixed(1);
    }
});

let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false
};
    
    // function appDataContent() {
    //     for (let key in appData) {
    //         alert('Наша программа включает в себя данные: ' + key + ': ' + appData[key]);
    //     }
    // }
    
    // appDataContent();