var express = require('express');
var ObjectID = require('mongodb').ObjectID;
var passport = require('passport');
var router = express.Router();

var env = {
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', env: env });
});

router.get('/login',
  function(req, res){
    res.render('login', { env: env });
  });
  /* GET Userlist page. from my files*/
  router.get('/', function(req, res) {
      var db = req.db;
      var collection = db.get('usercollection');
      collection.find({},{},function(e,docs){
          res.render('index', {
              "userlist" : docs
          });
      });
  });

  /* GET New User Page mine*/
  router.get('/newuser',function(req,res){
  	res.render('newuser',{ title:'Add New User'});
  })/* till here*/
    /*GET email page*/
  router.get('/emailpage',function(req,res){
  	res.render('emailpage',{ title:'Email Pace'});
  })/*till here*/

  router.post('/adduser', function(req,res){
  variable
  	var db = req.db;

  	//get our form values, these rely on the "name attributes"
  	var userName = req.body.username;
  	var userEmail = req.body.useremail;
  	var userComment = req.body.usercomment;

  	//set our collection
  	var collection = db.get('usercollection');

  	//submit to the db
  	collection.insert({
  		"username" :userName,
  		"email": userEmail,
  		"comment": userComment

  	}, function(err,doc){
  		if(err){
  			//if it failed, return error
  			res.send("There was a problem adding the information to the database");
  		}
  		else{
  			//ad forward to sucess page
  			res.redirect("/");
  		}
  	});
  });

  //delete guest book entry
  router.get('/:id/', function(req,res){
  	var id = req.params.id;
  	var objectId = new ObjectID(id);

  	var db = req.db;
  	var collection = db.get('usercollection');
  	console.log(collection);
  	collection.remove({_id: objectId});
  	res.redirect('/');


  });

  router.get('/:id/usermessage', function(req,res){
  	var id = req.params.id;
  	var objectId = new ObjectID(id);

  	var db = req.db;
  	var collection = db.get('usercollection');
  	console.log(collection);
  	collection.find({_id: objectId}, function(err, result) {

  		if(err){
  			res.send("there was an error");
  		}
  		else{
  		res.render('message', {
  				"usermessage" : result
  			});
  		//res.json(result);
  		}
  	});
  });
/* up to here is mine*/


router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.get('/callback',
  passport.authenticate('auth0', { failureRedirect: '/url-if-something-fails' }),
  function(req, res) {
    res.redirect(req.session.returnTo || '/user');
  });


module.exports = router;
