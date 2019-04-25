"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
var moment = require('moment');
const pagosRoutes = express_1.Router();
const pool = require('../database');
pagosRoutes.post('/create/:idCliente', (req, res) => {
    const body = req.body;
    const idCliente = req.params.idCliente;
    let fecha = moment().format('YYYY-MM-DD');
    const newPago = {
        id_cliente: idCliente,
        monto: body.monto,
        total: body.total,
        estado: body.estado,
        fecha
    };
    pool.query('INSERT INTO pago set ?', [newPago])
        .then((resp) => {
        if (resp.affectedRows > 0) {
            res.json({
                ok: true,
                newPago,
                mensaje: "Pago creado correctamente"
            });
        }
        else {
            res.json({
                ok: false,
                mensaje: "Ocurrio un error"
            });
        }
        console.log(resp);
    }).catch((err) => {
        res.json(err);
    });
});
// Obtener Pagos 
pagosRoutes.get('/getpagos/:idCliente', (req, res) => {
    const idCliente = req.params.idCliente;
    pool.query('SELECT * FROM pago WHERE id_cliente = ? ', [idCliente])
        .then((pagos) => {
        res.json({
            ok: true,
            pagos,
        });
        console.log(pagos);
    }).catch((err) => {
        res.json(err);
    });
});
exports.default = pagosRoutes;
