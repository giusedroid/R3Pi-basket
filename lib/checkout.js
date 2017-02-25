'use strict';

function Checkout(inventory, payments){
    this.inventory = inventory;
    this.payments = payments;
    this.rowTemplate = (what, qty, price, subtotal, promotion) => `${what}\tx${qty}\t${price}\n\t\t\t${subtotal}\n`  + (promotion ? `PROMOTION\t\t${promotion}\n`:"");
}

Checkout.prototype.bill = function(basket){
    let bill = "\n\n     WELCOME TO R3PI SHOP\n----------------------------\n";
    let total = 0.0;

    const histogram = this.histogram(basket);
    for(let productName in histogram){
        const qty = histogram[productName];
        const product = this.inventory.search( productName );
        const subtotal = this.payments[product.payment](qty, product.price);

        if(product.payment != "ignore"){
            total += subtotal;
            bill += this.rowTemplate(productName, qty, product.price, subtotal, product.promotion);
        }

        const debug = {productName, qty, product, subtotal};
        //console.log(debug);
        
    }

    bill += `----------------------------\nTOTAL:\t\t\t${total}`;
    bill += "\nTHANK YOU FOR SHOPPING AT R3PI";
    return bill;
};

Checkout.prototype.histogram = function(basket){
    const histogram = {};
    basket.forEach( x => histogram[x]= ++histogram[x] || 1 );
    return histogram;
};

module.exports = (inventory, payments) => {
    return new Checkout(inventory, payments);
};