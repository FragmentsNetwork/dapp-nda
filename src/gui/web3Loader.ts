//declare let window: any; 

import SolidityTester from '../../tests/Tester';
//import Web3 from 'web3';
let Web3 = require('web3');

const blockTime = 1;
/*
let web3 = new Web3();
let provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
web3.setProvider(provider);
*/

declare global {
    interface Window {
        web3: any
    }
}

//declare let window: any;


let web3 = new Web3(window.web3.currentProvider);
//let web3 = window.web3;

let compiledContracts = require("../../dist/MainContract.json");
let solidityTester = new SolidityTester(web3, compiledContracts, blockTime);

export {web3, solidityTester};
