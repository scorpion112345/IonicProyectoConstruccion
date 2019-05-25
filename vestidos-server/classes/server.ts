import express from 'express';

export default class Server {
    public app: express.Application;
    public  port: number = 3000;

    constructor() {
        this.app = express();
        this.app.set('port', process.env.PORT || this.port);
    }

    start( callback: Function) {
        this.app.listen( this.app.get('port'), callback );
    }
}