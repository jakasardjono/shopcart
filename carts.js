var express     =   require("express");
var router      =   express.Router();
var carts    =   require("./models/carts");
var productsDb    =   require("./models/products");
router.route("/")
    .get(function(req,res){
        var response = {};
        carts.find({},function(err,data){
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
        var db = new carts();
        var response = {};
        db.purchaseDate = new Date(); 
        db.customer = req.body.customer;
		db.discCode = req.body.discCode;
		
				
        db.save(function(err){
            if(err) {
                response = {"error" : true,"message" : "Error adding cart"};
            } else {
                response = {"error" : false,"message" : " added"};
            }
            res.json(response);
			});
		});
	
router.route("/:id")
    .get(function(req,res){
        var response = {};
        carts.findById(req.params.id,function(err,data){
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
        carts.findById(req.params.id,function(err,data){
        
        data.customer = req.body.customer; 
        data.discCode = req.body.discCode;
		data.percentage = req.body.percentage;
		if(data.percentage>0||data.percentage<=100)
				data.totalPrice=data.totalPrice-((data.percentage/100)*data.totalPrice);
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
	
	.post(function(req,res){
		var response = {};
		carts.findById(req.params.id,function(err,data){
			switch(req.query.action){
			case "add":
				data.products.push({
					prod_id:req.body.prod_id,
					qty:req.body.qty,
					prod_name:req.body.prod_name,
					price:req.body.price});
				break;
			case "remove":
				data.products.pull(req.body.itemId);
				break;
			}
			data.totalPrice=0;
			if(data.products.length>0)
					data.products.forEach(function(item) { data.totalPrice +=item.price*item.qty})
			
			if(data.percentage>0&&data.percentage<=100)
				data.totalPrice=data.totalPrice-((data.percentage/100)*data.totalPrice);
			
			data.save(function(err){
						if(err)
						{response = {"error" : true,"message" : "Error adding data"};
						} else {response = {"error" : false,"message" : "Data updated"};}
						res.json(response);
					});
		});
		
	})
	.delete(function(req, res) {
	   carts.remove({_id: req.params.id}, function(err, data) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });	
	
	module.exports = router