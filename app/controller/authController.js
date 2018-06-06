var UserDB = require('../model/user');
var bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
//TODO implementar a autenticação dos posts

module.exports.login = function(req, res) {
    function login(user) {
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            fail();

        } else {
            let token = jwt.sign({ user: user }, 'secret');
            res.status(200).json({
                message: "Acess granted!",
                token: token,
                _id: user._id
            })
        }
    }

    function fail() {
        res.status(401).send('Invalid login!');
    }

    UserDB.findOne({ email: req.body.email }).exec().then(login, fail);
}

module.exports.check = function(req, res, next) {
    let token = req.headers['token'];
    jwt.verify(token, 'secret',
        function(error, decoded) {
            if (error) {
                return res.status(401).json({
                    title: 'Not Authenticated',
                    error: error
                });
            }
            next();
        });
}