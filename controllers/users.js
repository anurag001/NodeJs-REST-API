const userModel = require('../models/users');
const bcrypt = require('bcryptjs');	
const jwt = require('jsonwebtoken');				

module.exports = {
	signup:function(req,res){
		res.status(200).render("signup");
	},
	signin:function(req,res){
		res.status(200).render("signin");
	},
	create: function(req, res, next) {
		let user = {
			email: req.body.email, 
			password: req.body.password
		}
		return new Promise((resolve,reject)=>{
            userModel.create(user, function (err, result) {
                if (err) {
                    reject(400);
                }else{
                    resolve(200); 
                }
            });  
        })
        .then(resp=>{
        	delete user.password;
	        res.status(201).json({status:"success",	message:"User created successfully",data:user});
	    })
	    .catch(err=>{
	        console.log(err);
	        res.status(400);
	    })
	},
	authenticate: function(req, res, next) {
		return new Promise((resolve,reject)=>{
			userModel.findOne({email:req.body.email}, function(err, userInfo){
				if (err) {
					reject(err);
				} else {
					resolve(userInfo);
				}
			});
		})
		.then(resp=>{
			const userInfo = resp;
			if(userInfo != null && bcrypt.compareSync(req.body.password, userInfo.password)) {
				const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '1h' }); 
				res.status(200).json({data:{user: userInfo.email, token:token}});
			}else{
				res.status(404).json({status:"error", message: "Invalid email/password!!!", data:null});
			}
	        
	    })
	    .catch(err=>{
	        console.log(err);
	        res.status(400);
	    })
	},
	getUserList: function(req, res, next) {
		let usersList = [];
		let skip_result = (req.params.page)?(req.params.page-1)*5:0;
		return new Promise((resolve,reject)=>{
			userModel.find({}, function(err, users){
				if (err){
					reject(err);
				} else{
					resolve(users);
				}
			}).skip(skip_result);
		})
		.then(resp=>{
			const users = resp;
			for (let user of users) {
				usersList.push({id: user._id, email:user.email});
			}
			res.status(200).json({status:"success", message: "Users list found", data:{users: usersList}});
	    })
	    .catch(err=>{
	        next(err);
	    })
	},
	deleteUser: function(req, res, next) {
		let id=req.params.id;
		return new Promise((resolve,reject)=>{
			userModel.findByIdAndRemove(id, function(err, user){
				if (err){
					next(err);
				} else{
					resolve(user);
				}
			});
		})
		.then(resp=>{
			console.log("Deleted",user);
			res.status(204).send("Deleted successfully");
	    })
	    .catch(err=>{
	    	next(err);
	    })
	}

}					
