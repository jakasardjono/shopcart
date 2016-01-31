var express     =   require("express");
var app         =   express();
var bodyParser  =   require("body-parser");
var router      =   express.Router();
var mongoose    =   require("mongoose");
mongoose.connect('mongodb://localhost:27017/shopCart');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

router.get("/",function(req,res){
    res.json({"error" : false,"message" : "Welcome to Shopping Cart"});
});

app.use('/products', require('./products'))
app.use('/customers', require('./customers'))
app.use('/coupons', require('./coupons'))
app.use('/carts', require('./carts'))
     
app.use('/',router);

app.listen(3000);
console.log("Listening to PORT 3000");