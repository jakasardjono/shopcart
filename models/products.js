var mongoose    =   require("mongoose");


var mongoSchema =   mongoose.Schema;

var productSchema  = {
    prod_name : String,
    description : String,
	price: { type: Number, default: 0 },
	stock: { type: Number, default: 0 }
};

module.exports = mongoose.model('products',productSchema);