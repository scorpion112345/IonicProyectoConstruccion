"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const token_1 = __importDefault(require("../classes/token"));
const userRoutes = express_1.Router();
const pool = require('../database');
userRoutes.post('/login', (req, res) => {
    const body = req.body;
    pool.query('SELECT * FROM users WHERE nombre = ?', [body.nombre])
        .then((usuario) => {
        console.log(usuario[0]);
        if (usuario.length == 0) {
            return res.json({
                ok: false,
                mensaje: "Usuarios y/o contrase;a incorrectas"
            });
        }
        if (usuario[0].password === body.password) {
            const tokenUser = token_1.default.getJwtToken({
                _id: usuario[0].id,
                nombre: usuario[0].nombre,
            });
            res.json({
                ok: true,
                token: tokenUser
            });
        }
        else {
            return res.json({
                ok: false,
                mensaje: "Usuarios y/o contrase;a incorrectas***"
            });
        }
    }).catch((err) => {
        res.json(err);
    });
});
exports.default = userRoutes;
