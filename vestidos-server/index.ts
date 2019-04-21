import Server from './classes/server';
import clienteRoutes from './routes/cliente';

import bodyParser from 'body-parser';
import vestidoRoutes from './routes/vestido';
import userRoutes from './routes/usuario';
import citasRoutes from './routes/citas';

const server = new Server();

// Body parser
server.app.use(bodyParser.urlencoded({extended:true}));
server.app.use(bodyParser.json());

// Routes
server.app.use( '/clientes', clienteRoutes );
server.app.use( '/vestidos', vestidoRoutes );
server.app.use( '/user', userRoutes );
server.app.use( '/citas', citasRoutes );




// Levantar servidor
server.start(  () => {
    console.log(`Servidor corriendo en puerto`, server.port);
});

