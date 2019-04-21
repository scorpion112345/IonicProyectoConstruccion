import { Router, Response } from 'express';
import { verificaToken } from '../middlewares/autenticacion';

const citasRoutes = Router();
const pool = require('../database');


export default citasRoutes;

citasRoutes.get( '/', (req: any, res: Response) => {
    res.json({
        ok:true
    })
} )
