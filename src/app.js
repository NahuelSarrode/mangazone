const http = require('http');
const app = require('express')();
const bodyParser = require('body-parser');
const compression = require('compression');
const config = require('./config/config'); 
const logger = require('./common/logger');
const router = require('./router');

app.use(compression());
app.use(bodyParser.json({
    limit: '50mb'
}));

app.use(bodyParser.urlencoded({
    limit: true, 
    extended: true
}))

app.use(router);

// @TODO manejo de errores express
logger.info(`Starting app on port ${config.port}`);
http.createServer(app).listen(config.port);