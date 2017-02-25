'use strict';

const inventory = require('./lib/inventory')('../config/products.json');
const payments = require('./lib/payments');
const checkout = require('./lib/checkout')(inventory,payments);

const basket = ['apples','apples','apples','oranges','garlic',
                'papayas','papayas','papayas','papayas','garlic',
                'apples','papayas','papayas','apples','oranges',
                'not in the inventory','stolen item', 'papayas','papayas'];

console.log( checkout.bill(basket) );