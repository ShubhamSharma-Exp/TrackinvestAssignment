import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import cors from 'cors';
import logging from './config/logging';
import config from './config/config';
import employeeRoutes from './routes/employeeRoutes';
import departmentRoutes from './routes/departmentRoutes';

const NAMESPACE = 'Server';
const router = express();

// Logging requests

router.use((req, res, next) => {
    logging.info(NAMESPACE, `Method - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        logging.info(NAMESPACE, `Method - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
    });

    next();
});

//Parse the request
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.use(cors());
// Rules of our API

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT ');
        return res.status(200).json();
    }
    next();
});

// Routes
router.use('/employees', employeeRoutes);
router.use('/department', departmentRoutes);
router.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
router.use('*', function (req, res) {
    res.status(404).send({ message: "Page not found!!" });
});


// Error Handling
router.use((req, res, next) => {
    const error = new Error('Not Found');

    return res.status(404).json({
        message: error.message
    });
});

//Create the Server
const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server running on ${config.server.hostname}:${config.server.port}`));