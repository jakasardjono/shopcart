var mongoose    =   require("mongoose");


var mongoSchema =   mongoose.Schema;

var customerSchema  = {
    name : String,
    address : String
	};

module.exports = mongoose.model('customers',customerSchema);var mongoose    =   require("mongoose");
