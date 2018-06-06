var http = require('http');
var app = require('./config/express.js')();
var db = require('./config/database.js');

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express Server running at port ' + app.get('port') + '...');
});

db('mongodb://localhost:3000');