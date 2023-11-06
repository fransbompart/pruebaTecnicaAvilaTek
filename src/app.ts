import express, { Router } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { UserRoute } from './routes/userRoutes';
import cookieParser from 'cookie-parser';

export class App{
    public express: express.Application = express();
    constructor(){
        this.express = express();

        this.express.set('port', process.env.PORT);
        this.middleware();
        this.routes();
    }

    private middleware():void{
        this.express.use(cors());
        this.express.use(morgan('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended: false}));
        this.express.use(cookieParser());
    }

    private routes(): void{
        this.express.use('/', new UserRoute().router);
    }

}