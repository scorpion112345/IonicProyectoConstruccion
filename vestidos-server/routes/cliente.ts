import { Router, Response, Request } from 'express';

const clienteRoutes = Router();
const pool = require('../database');

clienteRoutes.get('/create', async (req: Request,res: Response) => {

    const body = req.body;
    const newCliente = {
        nombre: body.nombre,
        apellidos: body.apellidos,
        telefono: body.telefono,
        id_vestido: body.id_vestido
    }

    pool.query('INSERT INTO cliente set ?', [newCliente])
        .then((resp: any) => {
            res.json({
                ok: true,
                mensaje: "Creado correctamente"
            })

            console.log(resp);
            
        }).catch((err: any) => {
            res.json(err);
        });
});


clienteRoutes.get('/' ,(req,res:Response) => {
    pool.query('SELECT * FROM clientes ORDER BY id DESC')
    .then((clientes: any) => {
        res.json({
            ok: true,
            clientes,
        })
    }).catch((err: any) => {
        res.json(err);
    });;
})

clienteRoutes.get('/' ,(req,res:Response) => {
    pool.query('SELECT * FROM clientes ORDER BY id DESC')
    .then((clientes: any) => {
        res.json({
            ok: true,
            clientes,
        })
    }).catch((err: any) => {
        res.json(err);
    });;
})

clienteRoutes.get('/:id' ,(req,res:Response) => {
    const id = req.params.id
    pool.query('SELECT nombre, apellidos, telefono, modelo ,color ,tela ,talla ,complementos ,estado ,observaciones FROM cliente, vestidos WHERE cliente.id = ? AND  cliente.id_vestido = vestidos.id', [id])
    .then((clientes: any) => {
        res.json({
            ok: true,   
            clientes,
        })
    }).catch((err: any) => {
        res.json(err);
    });
})



export default clienteRoutes;