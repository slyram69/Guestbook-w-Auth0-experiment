var express = require('express');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var router = express.Router();

/* GET user profile. */
router.get('/', ensureLoggedIn, function(req, res, next) {
  res.render('user', { user: req.user });
  res.send('respond with a resource');//this is my code
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

module.exports = router;
