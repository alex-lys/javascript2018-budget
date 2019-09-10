'use strict';
let money, time;

function start() {
    money = +prompt('Ваш бюджет на месяц?', ''),
    time = prompt('Введите дату в формате YYYY-MM-DD', '');

    while (Number.isNaN(money) || money == '' || money == null) {
        money = +prompt('Ваш бюджет на месяц?', '');
    }
}

start();

let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: true
};

function chooseExpenses() {
    for (let i = 0; i < 2; i += 1) {
        let a = prompt('Введите обязательную статью расходов в этом месяце', ''),
            b = prompt('Во сколько обойдется?', '');
        
        if ((typeof(a) === 'string') && (typeof(a) != null) && (typeof(b) != null) && (a != '') && (b != '') && (a.length < 50)) {
            appData.expenses[a] = b;
        } else {
            alert('Вы не указали данные или указали их неверно');
            i -= 1;
        }
    }
}

chooseExpenses();

function detectDayBudget() {
    appData.moneyPerDay = (appData.budget / 30).toFixed();
    alert('Ежедневный бюджет: ' + appData.moneyPerDay);
}

detectDayBudget();

function detectLevel() {
    if (appData.moneyPerDay < 100) {
        console.log('Минимальный уровень достатка');
    } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
        console.log('Средний уровень достатка');
    } else if (appData.moneyPerDay > 2000) {
        console.log('Высокий уровень достатка');
    } else {
        console.log('Произошла ошибка');
    }
}

detectLevel();

function checkSavings() {
    if (appData.savings == true) {
        let save = +prompt('Какова сумма накоплений?'),
            percent = +prompt('под какой процент?');

        appData.monthIncome = save / 100 / 12 * percent;
        alert('Доход в месяц вашего депозита: ' + appData.monthIncome);
    }
}

checkSavings();

function chooseOptExpenses() {
    for(let i = 1; i < 4; i += 1) {
        let a = prompt('Статья необязательных расходов?');

        if ((typeof(a) === 'string') && (typeof(a) != null) && (a != '') && (a.length < 50)) {
            appData.optionalExpenses[i] = a;
        } else {
            alert('Вы не указали данные или указали их неверно');
            i -= 1;
        }
    }
}

chooseOptExpenses();