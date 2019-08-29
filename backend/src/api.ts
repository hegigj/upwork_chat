import express, { Application } from 'express';
import morgan from 'morgan';

import signIn from './routers/auth.router';

export class Api{
    private api: Application;

    constructor(private port?: number) {
        this.api = express();
        this.settings();
        this.headers();
        this.middleware();
        this.routers();
    }

    private settings() {
        this.api.set('port', this.port);
    }

    private headers() {
        this.api.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Accept-Language, Authorization');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
            next();
        });
    }

    private middleware() {
        this.api.use(morgan('dev'));
        this.api.use(express.json());
    }

    private routers() {
        this.api.use('/svc/auth', signIn);
    }

    async listen() {
        await this.api.listen(this.api.get('port'));
    }
}