import { Router, Response, Request } from 'express';

const clienteRoutes = Router();
const pool = require('../database');

clienteRoutes.post('/create', async (req: Request,res: Response) => {

    const body = req.body;
    const newCliente = {
        nombre: body.nombre,
        apellidos: body.apellidos,
        telefono: body.telefono
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
    pool.query('SELECT * FROM cliente ORDER BY id DESC')
    .then((clientes: any) => {
        res.json({
            ok: true,
            clientes,
        })
    }).catch((err: any) => {
        res.json(err);
    });;
})

clienteRoutes.get('/fullClientes' ,(req,res:Response) => {
    pool.query('SELECT cliente.id, id_vestido, nombre, apellidos, telefono, modelo, estado from cliente INNER JOIN vestidos ON cliente.id_vestido = vestidos.id ORDER BY id DESC')
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
    pool.query('SELECT cliente.id, id_vestido, nombre, apellidos, telefono, modelo, estado from cliente INNER JOIN vestidos ON cliente.id_vestido = vestidos.id WHERE cliente.id =  ? ', [id])
    .then((cliente: any) => {
        //console.log(cliente);
        if (cliente.length > 0) {
            res.json({
                ok: true,   
                clientes:cliente[0],
            })
        } else {
            pool.query('SELECT * from cliente WHERE id =  ? ', [id])
                .then((cliente: any) => {
                   // console.log(cliente);
                    if (cliente.length > 0) {
                        res.json({
                            ok: true,   
                            clientes: cliente[0],
                            mensaje: 'Se ha encontrado el cliente'
                        })
                    } else {
                        res.json({
                            ok: true,   
                            mensaje: 'No se encontro el cliente',
                        })
                    }
                }).catch((err: any) => {
                    res.json(err);
                });
        }
    }).catch((err: any) => {
        res.json(err);
    });
});


clienteRoutes.get('/delete/:id' ,async (req,res:Response) => {
    const id = req.params.id

    
    
   try {
       // Cita
    const cliCita = await  pool.query(' DELETE FROM cita WHERE id_cliente = ?',[id]);
    if (cliCita.affectedRows> 0 || cliCita.serverStatus == 2) {

        // Pagos
        const cliPagos = await  pool.query(' DELETE FROM pago WHERE id_cliente = ?',[id]);
        if (cliPagos.affectedRows> 0 || cliPagos.serverStatus == 2) {
                // Vestidos
                    const cliVest = await  pool.query(' DELETE cliente, vestidos from cliente JOIN vestidos ON cliente.id_vestido = vestidos.id WHERE cliente.id = ?',[id]);
                    if (cliVest.affectedRows> 0) {
                    res.json({
                        ok: true,
                        cliVest,
                        mensaje: "Cliente y vestido borrado correctamente"
                    });
                    } else {
                        const cli = await  pool.query(' DELETE FROM cliente WHERE cliente.id = ?',[id]);
                        if (cli.affectedRows> 0) {
                            res.json({
                                ok: true,
                                cliVest,
                                mensaje: "Cliente  borrado correctamente"
                            });
                        } 
                        else {
                            res.json({
                                ok: false,
                                cli,
                                mensaje: "No se pudo borrar el cliente o el vestido  "
                            })
                        }
                        
                    }
                } else {
                    res.json({
                        ok: false,
                        cliPagos,
                        mensaje: "No se pudo borrar los pagos "
                    })
                }
        
    } else {
        res.json({
            ok: false,
            cliCita,
            mensaje: "No se puedo borrar las citas"
        })
    }
    
   } catch (err) {
    res.json(err);
   } 


    /*.then((cliVest: any) => {
        console.log(cliVest);
        if (cliVest.affectedRows> 0) {
            res.json({
                ok: true,
                mensaje: "Cliente y vestido borrado correctamente"
            });
        } else {
            pool.query(' DELETE FROM cliente WHERE cliente.id = ?',[id])
                .then((cliVest: any) => {
                    console.log(cliVest);
                    if (cliVest.affectedRows > 0) {
                        res.json({
                            ok: true,
                            mensaje: "Cliente borrado correctamente"
                        });
                    } else {
                        res.json({
                            ok: true,
                            mensaje: "no se encontro nada"
                        });
                    }
                
                }).catch((err: any) => {
                    res.json(err);
                });
        }
    
    }).catch((err: any) => {
        res.json(err);
    });*/
});




export default clienteRoutes;