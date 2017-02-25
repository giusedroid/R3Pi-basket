'use strict';

function standard(qty, price){
    return qty*price;
}

function xForY(x,y){
    return function(qty, price){
        return (qty%x)*price + y*price*Math.floor(qty/x);
    }
}

const threeForTwo = xForY(3,2);

function makePercentageDiscount (percentage){
    return function(qty, price){
        return qty * price * percentage;
    }
}

const tenPercent = makePercentageDiscount(0.10);

function ignore(qty, price){
    return 0.00;
}

module.exports = {
    standard,
    threeForTwo,
    ignore,
    tenPercent
};