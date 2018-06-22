import Tester from './Tester';

import testNDA from './subtests/nda';
import 'mocha';

const assert = require('assert');
const Web3 = require('web3');
const fs = require('fs');


/*
// TODO: run as server in separate thread
const Ganache = require('ganache-core');
const provider = Ganache.provider({
    blocktime: this.autominingBlockTime , // turns on automining
    default_balance_ether: 100

});
this.web3.setProvider(provider);
*/

const autominingBlockTime = 0.1;
const web3 = new Web3();
let provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
web3.setProvider(provider);


describe('Fragments dapp',  () => {

    let tester = new Tester(web3, JSON.parse(fs.readFileSync("dist/MainContract.json")), autominingBlockTime);

    const globals = {
        existingAccounts: []
    };


    // before
    before(async () => {
        //await tester.restartTestingServer(web3);
        globals.existingAccounts = await web3.eth.getAccounts();
    });


    // prepare new blockchain environment
    beforeEach(async () => {

        return true;
    });

    afterEach(async () => {
        // TODO: restart server
        //await tester.restartTestingServer(web3);
    });

    describe('Treaty', async () => {
        testNDA(web3, tester, globals);
    });
});
