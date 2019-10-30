// #region constants

var errorMessages = {
    invalid: 'Your expression is invalid!',
    zeroDeviding: 'Dividing by zero!',
};

var actionsDictionary = {
    '/': function (x, n) { return x / n; },
    '*': function (x, n) { return x * n; },
    '+': function (x, n) { return x + n; },
    '-': function (x, n) { return x - n; },
};

// #endregion 

// #region helpers

function checker(stringForCheck) {
    var afterCheck = stringForCheck.match(/[^*=+/\d-]*[+-]?\d+(\.\d+)?[^*.+/\d-]*([+*/-][^.\d+*/-]*[+-]?\d+(\.\d+)?[^.\d+*/-]*)*=.*/g);
    return afterCheck && afterCheck[0].length === stringForCheck.length;
}

function isNumeric(number) {
    return !isNaN(parseFloat(number)) && isFinite(number);
}

// #endregion

// #region main

function calculate(mathString) {
    if (!checker(mathString)) return errorMessages.invalid;

    var content = mathString.match(/[+-]?\d+(\.\d+)?|([+*/=-])/g),
        i = 1,
        currentSign = '',
        sum = +content[0];

    while (content[i] !== '=') {
        if (isNumeric(content[i])) {
            if (actionsDictionary[currentSign]) {
                if (currentSign === '/' && +content[i] === 0) return errorMessages.zeroDeviding;
                
                sum = actionsDictionary[currentSign](sum, +content[i]);
            } else if (content[i][0] === '+' || content[i][0] === '-') {
                sum = actionsDictionary['+'](sum, +content[i])
            } else {
                return errorMessages.invalid;
            }

            currentSign = '';
        } else {
            currentSign = content[i];
        }

        i++;
    }

    return sum.toFixed(2);
}

// #endregion

// #region DOM handling

function hendleCalculation() {
    var expression = document.getElementsByClassName("calculator-input")[0],
        resultElem = document.getElementsByClassName("calculator-output")[0],
        result = calculate(expression.value);

    resultElem.innerHTML = result;
}

document.getElementsByClassName("calculator-button")[0].addEventListener('click', hendleCalculation);

// #endregion
