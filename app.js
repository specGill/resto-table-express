var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

const { initialize } = require('express-openapi');
const swaggerUi = require('swagger-ui-express');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

initialize({
    app,
    apiDoc: require("./api/api-doc"),
    paths: "./api/paths"
});

app.use(
    '/',
    swaggerUi.serve,
    swaggerUi.setup(null, {
        swaggerOptions: {
            url: '/api-docs'
        }
    })
)

module.exports = app;
