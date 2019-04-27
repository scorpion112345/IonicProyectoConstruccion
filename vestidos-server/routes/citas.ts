import { Router, Response } from 'express';
import { verificaToken } from '../middlewares/autenticacion';
var moment = require('moment');


const citasRoutes = Router();
const pool = require('../database');


export default citasRoutes;

citasRoutes.post( '/create/:idCliente', (req: any, res: Response) => {
    const body = req.body;
    const id_cliente = req.params.idCliente;

    let fecha = moment().format('YYYY-MM-DD');
    const newCita = {
        id_cliente: id_cliente,
        fecha,
        hora: body.hora,
        tipo_cita: body.tipo_cita
    }

    pool.query('INSERT INTO cita set ?', [newCita])
        .then((resp: any) => {
            if (resp.affectedRows > 0) {
                res.json({
                    ok: true,
                    newCita,
                    mensaje: "Cita creada correctamente"
                })    
            } else {
                res.json({
                    ok: false,
                    mensaje: "Ocurrio un error"
                })  
            }
            console.log(resp);
            
        }).catch((err: any) => {
            res.json(err);
        });
} )
