var mongoose    =   require("mongoose");
var mongoSchema =   mongoose.Schema;

var cartSchema  = {
	purchaseDate:{ type: Date },
	customer: { type: mongoSchema.ObjectId, required: true },
    discCode: { type: mongoSchema.ObjectId },
	percentage: { type: Number, default: 0 },
    totalPrice: { type: Number, default: 0 },
	status: { type: String, default: "pending" },
	products : [
    {
		prod_id:{type:mongoSchema.ObjectId, required:true},
        prod_name: String, 
        price: { type: Number, required:true },
		qty : { type: Number, default: 1 },
    }],
};

module.exports = mongoose.model('carts',cartSchema);