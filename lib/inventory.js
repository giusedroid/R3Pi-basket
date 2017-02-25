'use strict';
const fs = require('fs');

function Inventory( source ){
    this.source = source;
    this.products = {};
    this.default = {name:"Not Found", price:0.0, payment:"ignore"};

    this.init();
}

Inventory.prototype.init = function(){
    let rawProducts;

    try{
        rawProducts = require(this.source).data;
    }catch( error ){
        console.log(`FATAL ERROR: Could not load products from ${this.source}`);
        console.log(error);
        process.exit(1);
    }

    rawProducts.forEach( x => this.products[x.name] = x);
};

Inventory.prototype.search = function (key){
    let output = this.products[key];

    if(!output){
        output = this.default;
    }

    return output;
};

module.exports = function( source ){
    return new Inventory(source);
}