'use strict';

/**
 * Created by sfliu on 2016/1/7.
 */
var basket = {
    count: 'this is a test var'
};

document.getElementById("result").innerHTML = '\n  There are <b>' + basket.count + '</b> items\n   in your basket, <em>' + basket.onSale + '</em>\n  are on sale!\n';

//conditional
var conditional = {
    has: true,
    content: 'THIS IS SHOW BY HAS IS TRUE'
};

document.getElementById('conditional').innerHTML = '\n    IF hash is true, is will be show, but has is <b> ' + conditional.has + ' </b>;\n    ' + (conditional.has ? conditional.content : '') + '\n    ' + (conditional.has ? '<p>能否显示html呢</p>' : '');

//iterators
var iterators = [{
    dt: 'Multi-line strings',
    dd: 'Any new line characters inserted in the source are part of the template string.'
}, {
    dt: 'Expression interpolation',
    dd: 'Template strings can contain placeholders. These are indicated by dollar sign and curly braces.'
}];

document.getElementById('iterators').innerHTML = '' + iterators.map(function (i) {
    return '\n    <p>' + i.dt + '</p>\n    <p>' + i.dd + '</p>\n  ';
}).join('');

function testTemp(tmpl, iterators) {
    var data = iterators;
    tmpl = '' + data.map(function (i) {
        return '\n        <p>' + i.dt + '</p>\n        <p>' + i.dd + '</p>\n      ';
    }).join('');
    return tmpl;
}

console.log(testTemp('123', iterators), 'test');

//# sourceMappingURL=lang-compiled.js.map