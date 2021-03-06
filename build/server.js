"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var swagger_json_1 = __importDefault(require("./swagger.json"));
var cors_1 = __importDefault(require("cors"));
var logging_1 = __importDefault(require("./config/logging"));
var config_1 = __importDefault(require("./config/config"));
var employeeRoutes_1 = __importDefault(require("./routes/employeeRoutes"));
var departmentRoutes_1 = __importDefault(require("./routes/departmentRoutes"));
var NAMESPACE = 'Server';
var router = express_1.default();
// Logging requests
router.use(function (req, res, next) {
    logging_1.default.info(NAMESPACE, "Method - [" + req.method + "], URL - [" + req.url + "], IP - [" + req.socket.remoteAddress + "]");
    res.on('finish', function () {
        logging_1.default.info(NAMESPACE, "Method - [" + req.method + "], URL - [" + req.url + "], IP - [" + req.socket.remoteAddress + "], STATUS - [" + res.statusCode + "]");
    });
    next();
});
//Parse the request
router.use(body_parser_1.default.urlencoded({ extended: false }));
router.use(body_parser_1.default.json());
router.use(cors_1.default());
// Rules of our API
router.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT ');
        return res.status(200).json();
    }
    next();
});
// Routes
router.use('/employees', employeeRoutes_1.default);
router.use('/department', departmentRoutes_1.default);
router.use('/swagger', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
// Error Handling
router.use(function (req, res, next) {
    var error = new Error('Not Found');
    return res.status(404).json({
        message: error.message
    });
});
//Create the Server
var httpServer = http_1.default.createServer(router);
httpServer.listen(config_1.default.server.port, function () { return logging_1.default.info(NAMESPACE, "Server running on " + config_1.default.server.hostname + ":" + config_1.default.server.port); });
