var app = require('../app');
var http = require('http');
var config = require('../config/config');
let port = config.app.port;

/**
 * Get port from environment and store in Express.
 */
app.set('port', port);

/**
 * Create HTTP server.
 */
var server = http.createServer(app);
server.listen(port, function(){
    console.log(`Server running on port ${port}`);
});

//app.listen(port, console.log(`Server running on port ${port}`));
