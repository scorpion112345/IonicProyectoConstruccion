"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
var moment = require('moment');
const citasRoutes = express_1.Router();
const pool = require('../database');
exports.default = citasRoutes;
citasRoutes.post('/create/:idCliente', (req, res) => {
    const body = req.body;
    const id_cliente = req.params.idCliente;
    let fecha = moment().format('YYYY-MM-DD');
    const newCita = {
        id_cliente: id_cliente,
        fecha,
        hora: body.hora,
        tipo_cita: body.tipo_cita
    };
    pool.query('INSERT INTO cita set ?', [newCita])
        .then((resp) => {
        if (resp.affectedRows > 0) {
            res.json({
                ok: true,
                newCita,
                mensaje: "Cita creada correctamente"
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
