var express     =   require("express");
var router      =   express.Router();
var products    =   require("./models/products");

router.route("/")
    .get(function(req,res){
        var response = {};
        products.find({},function(err,data){
        // Mongo command to fetch all data from collection.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
		})
	.post(function(req,res){
        var db = new products();
        var response = {};
        db.prod_name = req.body.prod_name; 
        db.description = req.body.description;
		db.price = req.body.price;
		db.stock = req.body.stock;
        db.save(function(err){
        // save() will run insert() command of MongoDB.
        // it will add new data in collection.
            if(err) {
                response = {"error" : true,"message" : "Error adding product"};
            } else {
                response = {"error" : false,"message" : "Product: "+db.prod_name+" added"};
            }
            res.json(response);
			});
		});
	
router.route("/:id")
    .get(function(req,res){
        var response = {};
        products.findById(req.params.id,function(err,data){
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
        products.findById(req.params.id,function(err,data){
        data.prod_name = req.body.prod_name; 
        data.description = req.body.description;
		data.price = req.body.price;
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
	   products.remove({_id: req.params.id}, function(err, data) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });	
	
	module.exports = router