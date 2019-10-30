// #region constants

var ruLong = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
var ruShort = ['Янв', 'Февр', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сент', 'Окт', 'Нояб', 'Дек'];

var enLong = ['January', 'February', 'March', 'Aplril', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var enShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

var emoji = ['😃', '🤓', '😁', '😂', '😞', '😃', '🤓', '😁', '😂', '😞', '😃', '🤓'];

var localizations = {
    'ru': {
        long: ruLong,
        short: ruShort
    },
    'en': {
        long: enLong,
        short: enShort
    },
    'emoji': {
        long: emoji,
        short: emoji
    }
};

var errorMessages = {
    localozationsPrefix: 'Please use one of avalable localizations: ',
    dateIncomplete: 'Date is not filled. Please fill it completely!'
}

// #endregion

// #region helpers

var addZero = function (number) {
    return number <= 9 ? '0' + number : number;
}

function formatsFactory(localization) {
    return {
        'yyyy': this.getFullYear(),
        'yy': this.getFullYear().toString().substring(2, 4),
        'dd': addZero(this.getDate()),
        'd': this.getDate(),
        'HH': addZero(this.getHours()),
        'H': this.getHours(),
        'hh': addZero(this.getHours() % 12 || 12),
        'h': this.getHours() % 12 || 12,
        'mm': addZero(this.getMinutes()),
        'm': this.getMinutes(),
        'ss': addZero(this.getSeconds()),
        's': this.getSeconds(),
        'MMMM': this.customLocaleMonth('long', localization || 'en'),
        'MMM': this.customLocaleMonth('short', localization || 'en'),
        'MM': addZero(this.getMonth() + 1),
        'M': this.getMonth() + 1
    };
};

// #endregion

// #region extensions

Date.prototype.customLocaleMonth = function (length, localization) {
    return localizations[localization || 'en'][length][this.getMonth()];
};

Date.prototype.format = function (formatString, localization) {
    var avalableLocalizations = Object.keys(localizations);
    if (localization && !avalableLocalizations.includes(localization)) return errorMessages.localozationsPrefix + avalableLocalizations.join(", ");

    var formatsMap = formatsFactory.call(this, localization);

    return formatString.replace(
        /y{4}|y{2}|M{1,4}|d{1,2}|H{1,2}|h{1,2}|m{1,2}|s{1,2}/g,
        function (key) { return formatsMap[key]; }
    );
};

// #endregion

// #region DOM handling

function formatHandler() {
    var rawDate = document.getElementsByClassName("date-input")[0],
        dateFormat = document.getElementsByClassName("date-format-input")[0],
        dateLocalization = document.getElementsByClassName("localization-selector")[0],
        resultElem = document.getElementsByClassName("date-output")[0];

    if (rawDate.value.length === 0) {
        resultElem.innerHTML = errorMessages.dateIncomplete;
        return;
    }

    if (dateFormat.value.length === 0) {
        resultElem.innerHTML = '';
        return;
    }

    var date = new Date(rawDate.value),
        result = date.format(dateFormat.value, dateLocalization.value);

    resultElem.innerHTML = result;
}

document.getElementsByClassName("date-formater-button")[0].addEventListener('click', formatHandler);

// #endregion