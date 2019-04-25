import { Router, Response } from 'express';
var moment = require('moment');

const pagosRoutes = Router();
const pool = require('../database');

pagosRoutes.post('/create/:idCliente', (req: any, res: Response) => {
    const body = req.body;
    const idCliente = req.params.idCliente;

    let fecha = moment().format('YYYY-MM-DD');
    const newPago = {
        id_cliente: idCliente,
        monto: body.monto,
        total: body.total,
        estado: body.estado,
        fecha
    }

    pool.query('INSERT INTO pago set ?', [newPago])
        .then((resp: any) => {
            if (resp.affectedRows > 0) {
                res.json({
                    ok: true,
                    newPago,
                    mensaje: "Pago creado correctamente"
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
})


// Obtener Pagos 

pagosRoutes.get('/getpagos/:idCliente', (req: any,res: Response) => {

    const idCliente = req.params.idCliente;

    pool.query('SELECT * FROM pago WHERE id_cliente = ? ', [idCliente])
        .then((pagos: any) => {
            res.json({
                ok: true,
                pagos,
            })
            console.log(pagos);
            
            
        }).catch((err: any) => {
            res.json(err);
        });
})





export default pagosRoutes;