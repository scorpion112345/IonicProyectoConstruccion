"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clienteRoutes = express_1.Router();
const pool = require('../database');
clienteRoutes.post('/create', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const body = req.body;
    const newCliente = {
        nombre: body.nombre,
        apellidos: body.apellidos,
        telefono: body.telefono
    };
    pool.query('INSERT INTO cliente set ?', [newCliente])
        .then((resp) => {
        res.json({
            ok: true,
            mensaje: "Creado correctamente"
        });
        console.log(resp);
    }).catch((err) => {
        res.json(err);
    });
}));
clienteRoutes.get('/', (req, res) => {
    pool.query('SELECT * FROM cliente ORDER BY id DESC')
        .then((clientes) => {
        res.json({
            ok: true,
            clientes,
        });
    }).catch((err) => {
        res.json(err);
    });
    ;
});
clienteRoutes.get('/:id', (req, res) => {
    const id = req.params.id;
    pool.query('SELECT cliente.id, id_vestido, nombre, apellidos, telefono, modelo, estado from cliente INNER JOIN vestidos ON cliente.id_vestido = vestidos.id WHERE cliente.id =  ? ', [id])
        .then((cliente) => {
        //console.log(cliente);
        if (cliente.length > 0) {
            res.json({
                ok: true,
                clientes: cliente[0],
            });
        }
        else {
            pool.query('SELECT * from cliente WHERE id =  ? ', [id])
                .then((cliente) => {
                // console.log(cliente);
                if (cliente.length > 0) {
                    res.json({
                        ok: true,
                        clientes: cliente[0],
                        mensaje: 'Se ha encontrado el cliente'
                    });
                }
                else {
                    res.json({
                        ok: true,
                        mensaje: 'No se encontro el cliente',
                    });
                }
            }).catch((err) => {
                res.json(err);
            });
        }
    }).catch((err) => {
        res.json(err);
    });
});
clienteRoutes.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    pool.query(' DELETE cliente, vestidos from cliente JOIN vestidos ON cliente.id_vestido = vestidos.id WHERE cliente.id = ?', [id])
        .then((cliVest) => {
        console.log(cliVest);
        if (cliVest.affectedRows > 0) {
            res.json({
                ok: true,
                mensaje: "Cliente y vestido borrado correctamente"
            });
        }
        else {
            pool.query(' DELETE FROM cliente WHERE cliente.id = ?', [id])
                .then((cliVest) => {
                console.log(cliVest);
                if (cliVest.affectedRows > 0) {
                    res.json({
                        ok: true,
                        mensaje: "Cliente borrado correctamente"
                    });
                }
                else {
                    res.json({
                        ok: true,
                        mensaje: "no se encontro nada"
                    });
                }
            }).catch((err) => {
                res.json(err);
            });
        }
    }).catch((err) => {
        res.json(err);
    });
});
exports.default = clienteRoutes;
