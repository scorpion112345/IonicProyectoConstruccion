"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const autenticacion_1 = require("../middlewares/autenticacion");
const vestidoRoutes = express_1.Router();
const pool = require('../database');
// Crear un nuevo vestido
vestidoRoutes.post('/create/:idCliente', [autenticacion_1.verificaToken], (req, res) => {
    const body = req.body;
    const idCliente = req.params.idCliente;
    const newVestido = {
        modelo: body.modelo,
        color: body.color,
        tela: body.tela,
        talla: body.talla,
        complementos: body.complementos || '',
        estado: body.estado,
        observaciones: body.observaciones || ''
    };
    console.log(parseInt(idCliente));
    pool.query('INSERT INTO vestidos set ?', [newVestido])
        .then((resp) => {
        console.log(parseInt(resp.insertId));
        if (resp.affectedRows == 1) {
            pool.query('UPDATE cliente set id_vestido = ? WHERE id = ? ', [parseInt(resp.insertId), parseInt(idCliente)])
                .then((cliente) => {
                res.json({
                    ok: true,
                    mensaje: "Vestido y cliente creado correctamente"
                });
                console.log(cliente);
            }).catch((err) => {
                res.json(err);
            });
        }
        else {
            res.json({
                ok: false,
                mensaje: "No se pudo crear el vestido"
            });
        }
    }).catch((err) => {
        res.json(err);
    });
});
// Actualizar vestidos
vestidoRoutes.post('/update/:id', [autenticacion_1.verificaToken], (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const newVestido = {
        modelo: body.modelo,
        color: body.color,
        tela: body.tela,
        talla: body.talla,
        complementos: body.complementos,
        estado: body.estado,
        observaciones: body.observaciones
    };
    console.log(id);
    pool.query('UPDATE vestidos set ? WHERE id = ? ', [newVestido, id])
        .then((resp) => {
        if (resp.affectedRows != 0) {
            res.json({
                ok: true,
                mensaje: "Actualizado correctamente correctamente"
            });
        }
        else {
            res.json({
                ok: false,
                mensaje: "Ocurrio un error al actualizar"
            });
        }
        console.log(resp);
    }).catch((err) => {
        res.json(err);
    });
});
// Obtener vestidos 
vestidoRoutes.get('/', (req, res) => {
    pool.query('SELECT * FROM vestidos ORDER BY id DESC')
        .then((vestidos) => {
        res.json({
            ok: true,
            vestidos,
            mensaje: "Actualizado correctamente correctamente"
        });
    }).catch((err) => {
        res.json(err);
    });
});
// Obtener vestido por id 
vestidoRoutes.get('/:id', (req, res) => {
    const id = req.params.id;
    pool.query('SELECT * FROM vestidos WHERE id = ?', [id])
        .then((vestido) => {
        res.json({
            ok: true,
            vestidos: vestido
        });
    }).catch((err) => {
        res.json(err);
    });
});
exports.default = vestidoRoutes;
