var PostDB = require('../model/post.js');
var UserDB = require('../model/user');
let jwt = require('jsonwebtoken');

module.exports.getAllPosts = function(req, res) {
    let promise = PostDB.find().exec();

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

module.exports.getPost = function(req, res) {
    let id = req.params.id;
    let promise = PostDB.findById(id).exec();

    promise.then(
        function(posts) {
            if (posts) {
                res.status(200).json(posts);
            } else {
                res.status(404).send("Post not found");
            }
        }
    ).catch(
        function(error) {
            res.status(500).json(error);
        }
    );
};

module.exports.createPost = function(req, res) {
    let token = req.headers['token'];
    let user_id = jwt.decode(token).user._id;

    let post = new PostDB({
        text: req.body.text,
        likes: req.body.likes,
        user: user_id
    });

    let promise = PostDB.create(post);

    promise.then(
        function(post) {
            res.status(201).json(post);
        }
    ).catch(
        function(error) {
            res.status(500).json(error);
        }
    );
};


module.exports.updatePost = function(req, res) {
    let token = req.headers['token'];
    let user_id = jwt.decode(token).user._id;

    let id = req.params.id;

    let post = new PostDB({
        text: req.body.text,
        likes: req.body.likes,
        user: user_id,
        _id: req._id
    });

    let promise = PostDB.findByIdAndUpdate(id, req.body).exec();

    promise.then(
        function(post) {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).send("Post not found");
            }
        }
    ).catch(
        function(error) {
            res.status(500).json(error);
        }
    );
};


module.exports.deletePost = function(req, res) {
    let token = req.headers['token'];
    let user_id = jwt.decode(token).user._id;

    let id = req.params.id;
    let promise = PostDB.findByIdAndRemove(id).exec();

    promise.then(
        function(post) {
            if (post) {
                if (user_id != post.user) {
                    res.status(401).send('Not Authenticated for');
                } else {
                    res.status(200).json(post);
                }
            } else {
                res.status(404).send("Post not found")
            }
        }
    ).catch(
        function(error) {
            res.status(500).json(error);
        }
    );
};


module.exports.getUserfromPost = function(req, res) {
    let id = req.params.id;
    let promise = UserDB.findById(id).exec();

    promise.then(
        function(user) {
            res.status(200).json(user);
        }
    ).catch(
        function(error) {
            res.status(500).json(error);
        }
    );
};