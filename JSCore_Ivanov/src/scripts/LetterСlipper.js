// #region main

function removeRepeatings(str) {
    var words = str.split(/[\.\?,;:!\s]/).filter(x => !!x);
    if (!words.length) return str;

    if (words.length === 1) return str.replace(words[0], '');

    var sorted = words.sort(function (x, y) { return x.length <= y.length; }),
        repeatings = [],
        checked = [],
        smallest = sorted[0];

    for (var i = 0; i < smallest.length; i++) {
        var letter = smallest[i].toLowerCase();
        var regex = new RegExp(letter, 'i');
        if (checked.includes(letter)) continue;

        checked.push(letter);
        sorted.every(function (x) { return regex.test(x); }) && repeatings.push(letter);
    }

    var replacer = new RegExp('[' + repeatings.join('') + ']', 'ig');
    return str.replace(replacer, '');
};

// #endregion

// #region DOM handling

function hendleCleaning() {
    var expression = document.getElementsByClassName('repeat-cleaner-input')[0],
        resultElem = document.getElementsByClassName('repeat-cleaner-output')[0],
        result = removeRepeatings(expression.value);

    resultElem.innerHTML = result;
}

document.getElementsByClassName('repeat-cleaner-button')[0].addEventListener('click', hendleCleaning);

// #endregion