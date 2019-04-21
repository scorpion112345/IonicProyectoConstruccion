"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const citasRoutes = express_1.Router();
const pool = require('../database');
exports.default = citasRoutes;
citasRoutes.get('/', (req, res) => {
    res.json({
        ok: true
    });
});
