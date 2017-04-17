var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db= mongojs('contactlist',['contactlist']);
var bodyParser = require('body-parser');

app.use (express.static(__dirname  + '/public')); 
app.use(bodyParser.json());


  

app.get('/contactlist',function(req,res){

   console.log('I recived a get request');
  
            db.contactlist.find(function(err,docs){

           console.log(docs);
             res.json(docs);

             });

  

});

app.post('/contactlist',function(req,res){

    
       db.contactlist.findOne({email:req.body.email},function(err,user){
         		if(user){
            
           					 res.json({message:"email already exists"});
            				 console.log(res.json);
           
                }
         	
         	    else{
	        				console.log("email doesn't exist");
	        				console.log(req.body);


	         				db.contactlist.findOne({number:req.body.number},function(err,user){
         		
         						if(user){
          
          			  			          res.json({message:"number already exists"});
         						
         						}
        		 
        						 else{
									        console.log("number does not exists");
									        console.log(req.body);
										    db.contactlist.insert(req.body,function(err,doc){
										         res.json(doc);
										         console.log("333333333333"); 
										         console.log(doc);
						                    });
                     			}
             
            				 });

        		 }
               
      });

});

app.delete('/contactlist/:id',function(req,res){

  var id= req.params.id;
  console.log(id);
  db.contactlist.remove({_id: mongojs.ObjectId(id)},function(err,doc){

     res.json(doc);
  })

});

app.get ('/contactlist/:id',function(req,res){
     var id=req.params.id;
     console.log(id);
     db.contactlist.findOne({
     	_id: mongojs.ObjectId(id)
     }, function(err,doc){
       res.json(doc);

     });
    
});
app.put('/contactlist/:id', function(req,res){
  var id = req.params.id;
  console.log(req.body.name);
  db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
  	update: {
  		$set: 
  			{
  				name: req.body.name,
  				email: req.body.email, 
  				number:req.body.number
  			}
  		},
    new:true}, function(err,doc){
    	res.json(doc);
    });
  
});

/*var r = require('rethinkdbdash')();
function getUserByEmailAddress(emailAddress) {
  return r.db('test').table('user')
    .getAll(emailAddress, {index: 'emailAddress'}).run();
}

app.post('/contactlist', function(req, res) {
  // User already has a session. Not allowed to log in.
  
    if(req.email)
    if(!validateEmail(req.body.email)) {
         
         return res.status(500).send('Not a valid email address'); 
    }
    }); 

   

  getUserByEmailAddress(req.body.email).then(function(user) {
    if(user) {
      res.status(500).send('User with given email address already exists');
    } else {
      // New email address! Encrypt password, add to db, etc.
    }
  })
  */





app.listen(3000);
console.log('Server running on port 3000');