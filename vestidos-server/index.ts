import Server from './classes/server';
import clienteRoutes from './routes/cliente';

import cors from 'cors';

import bodyParser from 'body-parser';
import vestidoRoutes from './routes/vestido';
import userRoutes from './routes/usuario';
import citasRoutes from './routes/citas';
import pagosRoutes from './routes/pagos';

const server = new Server();

// Body parser
server.app.use(bodyParser.urlencoded({extended:true}));
server.app.use(bodyParser.json());

// Configurar cors
server.app.use( cors({  origin: true, credentials: true}) );


// Routes
server.app.use( '/clientes', clienteRoutes );
server.app.use( '/vestidos', vestidoRoutes );
server.app.use( '/user', userRoutes );
server.app.use( '/citas', citasRoutes );
server.app.use( '/pagos', pagosRoutes );




// Levantar servidor
server.start(  () => {
    console.log(`Servidor corriendo en puerto`, server.port);
});

