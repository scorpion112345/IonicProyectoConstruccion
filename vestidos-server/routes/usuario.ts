import { Router, Response, Request } from 'express';
import Token from '../classes/token';
import { verificaToken } from '../middlewares/autenticacion';

const userRoutes = Router();
const pool = require('../database');

userRoutes.post('/login', (req: any, res: Response) => {

    const body = req.body;

    pool.query( 'SELECT * FROM users WHERE nombre = ?', [body.nombre] )
        .then((usuario: any) => {
            console.log(usuario[0]);

            if (usuario.length == 0) {
                return res.json({
                    ok: false,
                    mensaje: "Usuarios y/o contrase;a incorrectas"
                })
            } 

            if (usuario[0].password === body.password) {

                const tokenUser = Token.getJwtToken({
                    _id: usuario[0].id,
                    nombre: usuario[0].nombre,
                    tipo: usuario[0].tipo
                })
                res.json({
                    ok: true,
                    token: tokenUser
                })
            } else {
                return res.json({
                    ok: false,
                    mensaje: "Usuarios y/o contrase;a incorrectas***"
                })
            }
        }).catch((err: any) => {
            res.json(err);
        });        
})

userRoutes.get('/', [verificaToken], (req: any, res: Response) => {

    const usuario = req.usuario;

    res.json({
        ok: true,
        usuario
    })

});



export default userRoutes;