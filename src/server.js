const app = require('./app');
const http = require('http');

const port = '3030';
app.set('port', port);

const server = http.createServer(app);
server.listen(port);