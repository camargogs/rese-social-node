 var UserDB = require('../model/user');
 var PostDB = require('../model/post.js');
 var bcrypt = require('bcrypt');
 let jwt = require('jsonwebtoken');

 module.exports.getAllUsers = function(req, res) {
     let promise = UserDB.find().exec();

     promise.then(
         function(users) {
             res.status(200).json(users);
         }
     ).catch(
         function(error) {
             res.status(500).json(error);
         }
     );
 };

 module.exports.getUser = function(req, res) {
     let id = req.params.id;
     let promise = UserDB.findById(id).exec();

     promise.then(
         function(user) {
             if (user) {
                 res.status(200).json(user);
             } else {
                 res.status(404).send("User not found");
             }
         }
     ).catch(
         function(error) {
             res.status(500).json(error);
         }
     );
 };

 module.exports.createUser = function(req, res) {

     let user = new UserDB({
         name: req.body.name,
         email: req.body.email,
         password: bcrypt.hashSync(req.body.password, 10)
     });

     let promise = UserDB.create(user);

     promise.then(
         function(user) {

             res.status(201).json(user._id);
         }
     ).catch(
         function(error) {
             res.status(500).json(error);
         }
     );
 };


 module.exports.updateUser = function(req, res) {
     let token = req.headers['token'];
     let id = jwt.decode(token).user._id;

     let user = new UserDB({
         name: req.body.name,
         email: req.body.email,
         password: bcrypt.hashSync(req.body.password, 10),
         _id: req._id
     });

     let promise = UserDB.findByIdAndUpdate(id, req.body).exec();

     promise.then(
         function(user) {
             if (user) {
                 res.status(200).json(user.email);
             } else {
                 res.status(404).send("User not found");
             }
         }
     ).catch(
         function(error) {
             res.status(500).json(error);
         }
     );
 };


 module.exports.deleteUser = function(req, res) {
     let token = req.headers['token'];
     let id = jwt.decode(token).user._id;

     let promise = UserDB.findByIdAndRemove(id).exec();

     promise.then(
         function(user) {
             if (user) {
                 res.status(200).json(user.email);
             } else {
                 res.status(404).send("User not found");
             }
         }
     ).catch(
         function(error) {
             res.status(500).json(error);
         }
     );
 };


 module.exports.getAllPostsFromUser = function(req, res) {
     let id = req.params.id;
     let promise = PostDB.find({ "user": id }).exec();

     promise.then(
         function(posts) {
             res.status(200).json(posts);
         }
     ).catch(
         function(error) {
             res.status(500).json(error);
         }
     );
 };