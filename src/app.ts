import * as express from "express";
import * as logger from "morgan";
import * as bodyParser from "body-parser";
import ProblemRouter from "./routes/problem-router";

class App {

    public express: express.Application;

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    private middleware(): void {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended: false}));
    }

    private routes(): void {
        let router = express.Router();

        router.get('/', (req, res, next) => {
            res.json({
                message: 'Hello World!'
            });
        });

        let corsMiddleware = express.Router();

        corsMiddleware.use(function (req, res, next) {

            // Website you wish to allow to connect
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Methods,Authorization,Access-Control-Allow-Headers,Access-Control-Allow-Origin,X-Requested-With,content-type,X-Auth-Token');

            if ('OPTIONS' == req.method) {
                res.send(200);
            } else {
                next();
            }

        });


        this.express.use('/', corsMiddleware, router);
        this.express.use('/api/problem', corsMiddleware, ProblemRouter);
    }

}

export default new App().express;
