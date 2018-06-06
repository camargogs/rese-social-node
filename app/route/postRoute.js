var controller = require("../controller/postController.js");
let auth = require('../controller/authController.js');

module.exports = function(app) {
    app.get("/api/posts", controller.getAllPosts);
    app.get("/api/posts/:id", controller.getPost);
    app.get("/api/posts/:id/user", controller.getUserfromPost);
    app.use('/api/posts/', auth.check);
    app.post('/api/posts', controller.createPost);
    app.put('/api/posts/:id', controller.updatePost);
    app.delete('/api/posts/:id', controller.deletePost);
}