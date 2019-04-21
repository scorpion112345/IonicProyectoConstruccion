"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const cliente_1 = __importDefault(require("./routes/cliente"));
const body_parser_1 = __importDefault(require("body-parser"));
const vestido_1 = __importDefault(require("./routes/vestido"));
const usuario_1 = __importDefault(require("./routes/usuario"));
const citas_1 = __importDefault(require("./routes/citas"));
const server = new server_1.default();
// Body parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
// Routes
server.app.use('/clientes', cliente_1.default);
server.app.use('/vestidos', vestido_1.default);
server.app.use('/user', usuario_1.default);
server.app.use('/citas', citas_1.default);
// Levantar servidor
server.start(() => {
    console.log(`Servidor corriendo en puerto`, server.port);
});
