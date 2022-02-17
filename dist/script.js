"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getUserPoolState = exports.getStakedNFTsFromWallet = void 0;
const anchor_1 = require("@project-serum/anchor");
const anchor = __importStar(require("@project-serum/anchor"));
const web3_js_1 = require("@solana/web3.js");
const fs_1 = __importDefault(require("fs"));
const GLOBAL_AUTHORITY_SEED = "global-authority";
const PROGRAM_ID = "F7cBo37zfFK5kLbTZxfejozgSiTb6J3EfgNWiu9HRPzD";
anchor.setProvider(anchor.Provider.local(anchor_1.web3.clusterApiUrl("mainnet-beta")));
// anchor.setProvider(anchor.Provider.local(web3.clusterApiUrl("devnet")));
let program = null;
// Configure the client to use the local cluster.
const idl = JSON.parse(fs_1.default.readFileSync(__dirname + "/staking_program.json", "utf8"));
// Address of the deployed program.
const programId = new anchor.web3.PublicKey(PROGRAM_ID);
// Generate the program client from IDL.
program = new anchor.Program(idl, programId);
console.log('ProgramId: ', program.programId.toBase58());
const getStakedNFTsFromWallet = (address) => __awaiter(void 0, void 0, void 0, function* () {
    const [globalAuthority, bump] = yield web3_js_1.PublicKey.findProgramAddress([Buffer.from(GLOBAL_AUTHORITY_SEED)], program.programId);
    console.log('GlobalAuthority: ', globalAuthority.toBase58());
    try {
        const userPool = yield (0, exports.getUserPoolState)(new web3_js_1.PublicKey(address));
        return {
            holder: globalAuthority.toBase58(),
            stakedCount: userPool.itemCount.toNumber(),
            stakedMints: userPool.items.slice(0, userPool.itemCount.toNumber()).map((info) => {
                return info.nftAddr.toBase58();
            })
        };
    }
    catch (e) {
        console.log(e);
        return undefined;
    }
});
exports.getStakedNFTsFromWallet = getStakedNFTsFromWallet;
const getUserPoolState = (userAddress) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userAddress)
        return null;
    let userPoolKey = yield web3_js_1.PublicKey.createWithSeed(userAddress, "user-pool", program.programId);
    console.log('User Pool: ', userPoolKey.toBase58());
    try {
        let poolState = yield program.account.userPool.fetch(userPoolKey);
        return poolState;
    }
    catch (_a) {
        return null;
    }
});
exports.getUserPoolState = getUserPoolState;
//# sourceMappingURL=script.js.map