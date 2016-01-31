var mongoose    =   require("mongoose");
var mongoSchema =   mongoose.Schema;

var discCodeSchema  = {
	discCode:String,
	percentage : { type: Number, default: 0 },
};

module.exports = mongoose.model('discCodes',discCodeSchema);