import { Router, Response, Request } from 'express';
import { verificaToken } from '../middlewares/autenticacion';

const vestidoRoutes = Router();
const pool = require('../database');


// Crear un nuevo vestido
vestidoRoutes.post('/create/:idCliente', [verificaToken], (req: any,res: Response) => {

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
        .then((resp: any) => {
            console.log(parseInt(resp.insertId));
            if (resp.affectedRows == 1) {
                pool.query('UPDATE cliente set id_vestido = ? WHERE id = ? ', [parseInt(resp.insertId), parseInt(idCliente)])
                    .then((cliente: any) => {
                        res.json({
                            ok: true,
                            mensaje: "Vestido y cliente creado correctamente"
                        }) 
                        console.log(cliente);
                        
                    }).catch((err: any) => {
                        res.json(err);
                    });
            } else {
                res.json({
                    ok: false,
                    mensaje: "No se pudo crear el vestido"
                })   
            }
           
            
        }).catch((err: any) => {
            res.json(err);
        }); 
});


// Actualizar vestidos
vestidoRoutes.post('/update/:id', [verificaToken],  (req: any,res: Response) => {

    const body = req.body;
    const id = req.params.id;

    const newVestido = {
        modelo: body.modelo ,
        color: body.color,
        tela: body.tela,
        talla: body.talla,
        complementos: body.complementos,
        estado: body.estado,
        observaciones: body.observaciones 
    };

    console.log(id);
    
      pool.query('UPDATE vestidos set ? WHERE id = ? ', [newVestido, id])
      .then((resp: any) => {
          if (resp.affectedRows!= 0) {
            res.json({
                ok: true,
                mensaje: "Actualizado correctamente correctamente"
            })
          } else {
            res.json({
                ok: false,
                mensaje: "Ocurrio un error al actualizar"
            })
          }
        

        console.log(resp);
        
    }).catch((err: any) => {
        res.json(err);
    });

});


// Obtener vestidos 

vestidoRoutes.get('/', (req: any,res: Response) => {
    pool.query('SELECT * FROM vestidos ORDER BY id DESC')
        .then((vestidos: any) => {
            res.json({
                ok: true,
                vestidos,
                mensaje: "Actualizado correctamente correctamente"
            })
            
        }).catch((err: any) => {
            res.json(err);
        });
})




export default vestidoRoutes;


