let express = require('express');
let userRouter = require('../app/route/userRoute.js');
let postRouter = require('../app/route/postRoute.js');
let bodyParser = require('body-parser');

module.exports = function() {
    let app = express();

    app.set('port', 3000);

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.static('./public'));

    userRouter(app);
    postRouter(app);

    return app;
};