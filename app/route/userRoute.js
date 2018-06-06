var controller = require("../controller/userController.js");
let auth = require('../controller/authController.js');

module.exports = function(app) {
    app.post("/api/users/singin", auth.login);
    app.post('/api/users', controller.createUser);
    app.get("/api/users", controller.getAllUsers);
    app.get("/api/users/:id", controller.getUser);
    app.get("/api/users/:id/posts", controller.getAllPostsFromUser);
    app.use('/api/users/', auth.check);
    app.delete('/api/users/', controller.deleteUser);
    app.put('/api/users/', controller.updateUser);


}