import { Router, Response } from 'express';
var moment = require('moment');

const OneSignal = require('onesignal-node');    



const citasRoutes = Router();
const pool = require('../database');



export default citasRoutes;

// Crear cita
citasRoutes.post( '/create/:idCliente', (req: any, res: Response) => {
    const body = req.body;
    const id_cliente = req.params.idCliente;

    const newCita = {
        id_cliente: id_cliente,
        fecha: body.fecha,
        hora: body.hora,
        tipo_cita: body.tipo_cita
    }

    pool.query('INSERT INTO cita set ?', [newCita])
        .then((resp: any) => {
            if (resp.affectedRows > 0) {
                res.json({
                    ok: true,
                    newCita,
                    mensaje: "Cita creada correctamente"
                })    
            } else {
                res.json({
                    ok: false,
                    mensaje: "Ocurrio un error"
                })  
            }
            console.log(resp);
            
        }).catch((err: any) => {
            res.json(err);
        });
} )

citasRoutes.post('/prueba', (req: any, res: Response) => {

         const body = req.body;

         const newPush = {
            mensaje: body.mensaje,
            fecha: body.fecha
        }

       
        // first we need to create a client    
        var myClient = new OneSignal.Client({    
            userAuthKey: 'MjdlMWVmYzMtY2M5Zi00MmFiLTg1Y2MtZDdjZWY2NDRkYTMy',    
            app: { appAuthKey: 'MjdlMWVmYzMtY2M5Zi00MmFiLTg1Y2MtZDdjZWY2NDRkYTMy', appId: '869cc7da-0fef-4edc-8a31-a263b4087c5e' }    
        });    
            
        // we need to create a notification to send    
        var firstNotification = new OneSignal.Notification({    
            contents: {    
                en: newPush.mensaje,    
                tr: "Test mesajı"    
            }    
        });    
            
        // set target users    
        firstNotification.postBody["included_segments"] = ["Active Users"];    
        firstNotification.postBody["excluded_segments"] = ["Banned Users"];    
            
        // set notification parameters    
        //firstNotification.postBody["data"] = {"idcita": newPush.idCita };    
        firstNotification.postBody["send_after"] = newPush.fecha; //'Sat Apr 27 2019 22:33:42 GMT-0500 (hora de verano central)';
            
        // send this notification to All Users except Inactive ones    


        myClient.sendNotification(firstNotification, function (err:any, httpResponse: any, data:any) {    
            if (err) {    
                console.log('Something went wrong...');    
            } else {    
                if ( httpResponse.statusCode == 200) {
                    res.json({
                        ok:true,
                        data,
                        mensaje: "Notificacion creada con exito"
                    })
                }
                console.log(data, httpResponse.statusCode);    
            }    
        });  
    
});


// Obtener citas por cliente  
citasRoutes.get('/getcitas/:idCliente', (req: any,res: Response) => {

    const idCliente = req.params.idCliente;

    pool.query('SELECT * FROM cita WHERE id_cliente = ? ', [idCliente])
        .then((citas: any) => {
            res.json({
                ok: true,
                citas,
            })
            console.log(citas);
            
            
        }).catch((err: any) => {
            res.json(err);
        });
});

// Obtener todas las citas 
citasRoutes.get('/', (req: any,res: Response) => {

    pool.query('SELECT cita.id, cita.id_cliente, fecha , tipo_cita, hora,  nombre, apellidos from cita INNER JOIN cliente ON cita.id_cliente = cliente.id ORDER BY id desc')
        .then((citas: any) => {
            if (citas.length > 0) {
                res.json({
                    ok: true,
                    citas,
                })
            } else {
                res.json({
                    ok: false,
                    mensaje: 'No hay citas disponibles',
                })
            }
            
            console.log(citas);
            
            
        }).catch((err: any) => {
            res.json(err);
        });
});

citasRoutes.get('/delete/:idCita', (req: any,res: Response) => {

    const idCita = req.params.idCita;

    pool.query('DELETE FROM cita WHERE id = ?', [idCita])
        .then((citas: any) => {
            if (citas.affectedRows > 0) {
                res.json({
                    ok: true,
                    mensaje:'cita eliminada correctamente',
                })
            } else {
                res.json({
                    ok: false,
                    mensaje:'Ocurrio un error al eliminar la cita',
                }) 
            }
            
            console.log(citas);
            
            
        }).catch((err: any) => {
            res.json(err);
        });
});