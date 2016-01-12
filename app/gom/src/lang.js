/**
 * Created by sfliu on 2016/1/7.
 */
const basket = {
    count: 'this is a test var'
};

document.getElementById("result").innerHTML = `
  There are <b>${basket.count}</b> items
   in your basket, <em>${basket.onSale}</em>
  are on sale!
`;


//conditional
const conditional = {
    has: true,
    content: 'THIS IS SHOW BY HAS IS TRUE'
};

document.getElementById('conditional').innerHTML = `
    IF hash is true, is will be show, but has is <b> ${conditional.has} </b>;
    ${conditional.has ? conditional.content : ''}
    ${conditional.has ?
    `<p>能否显示html呢</p>`: ''}`;


//iterators
const iterators = [{
            dt: 'Multi-line strings',
            dd: 'Any new line characters inserted in the source are part of the template string.'
        }, {
            dt: 'Expression interpolation',
            dd: 'Template strings can contain placeholders. These are indicated by dollar sign and curly braces.'
        }];

document.getElementById('iterators').innerHTML = `${iterators.map(i => `
    <p>${i.dt}</p>
    <p>${i.dd}</p>
  `).join('')}`;


function testTemp(tmpl, iterators){
    const data = iterators;
    tmpl = `${data.map(i => `
        <p>${i.dt}</p>
        <p>${i.dd}</p>
      `).join('')}`;
    return tmpl;
}

console.log(testTemp('123', iterators), 'test');
