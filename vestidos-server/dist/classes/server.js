"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class Server {
    constructor() {
        this.port = 3000;
        this.app = express_1.default();
        this.app.set('port', process.env.PORT || this.port);
    }
    start(callback) {
        this.app.listen(this.app.get('port'), callback);
    }
}
exports.default = Server;
