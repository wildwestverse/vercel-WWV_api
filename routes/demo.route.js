const { Router } = require('express');
const { SuccessResponseObject, ErrorResponseObject } = require('../common/http');
const { getStakedNFTsFromWallet } = require('../dist/scripts');

const r = Router();

r.get('/', async (req, res) => {
    const {address} = req.query;
    if (!address) res.json(new ErrorResponseObject('Invalid address'));
    else {
        const result = await getStakedNFTsFromWallet(address);
        if (!result) res.json(new ErrorResponseObject('Internal server error'));
        else res.json( new SuccessResponseObject(address, result));
    }
});

module.exports = r;
