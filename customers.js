var express     =   require("express");
var router      =   express.Router();
var customers    =   require("./models/customers");

router.route("/")
    .get(function(req,res){
        var response = {};
        customers.find({},function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
		})
	.post(function(req,res){
        var db = new customers();
        var response = {};
        db.name = req.body.name; 
        db.address = req.body.address;
		db.save(function(err){
        // save() will run insert() command of MongoDB.
        // it will add new data in collection.
            if(err) {
                response = {"error" : true,"message" : "Error adding customer"};
            } else {
                response = {"error" : false,"message" : "customer: "+db.name+" added"};
            }
            res.json(response);
			});
		});
	
router.route("/:id")
    .get(function(req,res){
        var response = {};
        customers.findById(req.params.id,function(err,data){
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
        customers.findById(req.params.id,function(err,data){
        data.name = req.body.name; 
        data.description= req.body.description;
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
	   customers.remove({_id: req.params.id}, function(err, data) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });	
	
	module.exports = router