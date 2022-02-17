"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
process.env.ANCHOR_WALLET = __dirname + '\\..\\wallet.json';
console.log(process.env.ANCHOR_WALLET);
const script_1 = require("./script");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// Configuring body parser middleware
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
const server = http_1.default.createServer(app);
app.get('/staked-nfts/*', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const address = req.params[0];
    if (!address)
        res.status(404).send('Invalid address');
    else {
        console.log(address);
        const result = yield (0, script_1.getStakedNFTsFromWallet)(address);
        console.log(result);
        if (!result)
            res.status(502).send('Internal server error');
        else
            res.send(result);
    }
}));
server.listen(8080, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('--@ Start: Listening on http://localhost:8080');
}));
//# sourceMappingURL=index.js.map