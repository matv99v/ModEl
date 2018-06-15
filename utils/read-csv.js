const fs = require('fs');
const csv = require('fast-csv');


var prms = new Promise(function(resolve, reject) {
    var stream = fs.createReadStream("data/BD_s.csv");

    var options = {
        delimiter: ';',
        headers: true,
        quote: '"'
    };

    var res = [];

    var csvStream = csv(options)
        .on("data", function(data) {
            res.push(data);
        })
        .transform(function(item) {
            const newItem = Object.assign(item);
            newItem.QUANTITY = +newItem.QUANTITY;
            newItem.PRICE = +newItem.PRICE;
            newItem.CATEGORIES = newItem.CATEGORIES.split(/,\s*/);
            newItem.PHOTOS = newItem.PHOTOS.split(/,\s*/);
            return newItem;
        })
        .validate(function(item){
            // TODO: validation rules
            return item;
        })
        .on("data-invalid", function(item){
            console.error(item, 'is invalid');
            //do something with invalid row
        })
        .on("end", function() {
            // console.log("done");
            // console.log(res);
            resolve(res);
        });

    stream.pipe(csvStream);

});

module.exports = prms;
