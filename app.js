var express=require("express"); 
var bodyParser=require("body-parser"); 

//importing scemas/models
const User = require('./models/User');
const User_role = require('./models/User_role');

//configuring and connecting mongodb with db name "register"
const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost:27017/register'); 
var db=mongoose.connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
	console.log("connection succeeded"); 
}) 

var app=express() 


app.use(bodyParser.json()); 
app.use(express.static(__dirname + '/../public')); 
app.use(bodyParser.urlencoded({ 
	extended: true
})); 

//creating user and user_role
app.post('/sign_up', function(req,res){ 
	
	let user = new User();
	let user_role = new User_role();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.phone = req.body.phone;
   

    user.save(function(err){
        if(err){
			if(err.code == 11000){
				console.log(err);
            res.json({msg: "Cannot create existing/duplicate user name!"})
			}
			else{
				console.log(err);
				res.json({msg: "failed"})
			}
           
        }
        else{
			console.log("User inserted Successfully"); 
			User.find().countDocuments(function(err, count){
				console.log("Number of users: ", count );
				if(count == 1){
					user_role.user_name = req.body.name;
				}
				else{
					user_role.user_name = req.body.name;
					user_role.role_name = "employee";
				}
				user_role.save(function(err){
					if(err){
						console.log(err);
						res.json({msg: "failed"})
					}
					else{
						
						res.render('signup_success.ejs'); 
						console.log("User role inserted Successfully"); 
					}
				});
			});
        }
	});
	
	
}) 

//rendering signup form using node
app.get('/',function(req,res){ 
res.set({ 
	'Access-control-Allow-Origin': '*'
	}); 
return res.render('index.ejs'); 
}).listen(3001)


console.log("server listening at port 3000"); 
