var express     =   require("express");
var router      =   express.Router();
var coupons    =   require("./models/coupons");

router.route("/")
    .get(function(req,res){
        var response = {};
        coupons.find({},function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
		})
	.post(function(req,res){
        var db = new coupons();
        var response = {};
        db.discCode = req.body.discCode; 
        db.expired = req.body.expired;
		db.percentage = req.body.percentage;
		db.save(function(err){
        // save() will run insert() command of MongoDB.
        // it will add new data in collection.
            if(err) {
                response = {"error" : true,"message" : "Error adding coupon"};
            } else {
                response = {"error" : false,"message" : "coupon: "+db.discCode+" added"};
            }
            res.json(response);
			});
		});
	
router.route("/:id")
    .get(function(req,res){
        var response = {};
        coupons.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    })
	.put(function(req,res){
        var response = {};
        coupons.findById(req.params.id,function(err,data){
        data.discCode = req.body.discCode; 
        data.expired = req.body.expired;
		data.percentage = req.body.percentage;
        data.save(function(err){
            if(err) {
                response = {"error" : true,"message" : "Error adding data"};
            } else {
                response = {"error" : false,"message" : "Data updated"};
            }
            res.json(response);
			});
			});
	})
	.delete(function(req, res) {
	   coupons.remove({_id: req.params.id}, function(err, data) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });	
	
	module.exports = router