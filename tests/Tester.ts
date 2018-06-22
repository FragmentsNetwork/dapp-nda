import promisify from './promisify';
//import Web3 from 'web3';


//const sleep = async (ms) => new Promise(resolve => setTimeout(resolve, ms));
const sleep = async (ms) => new Promise(resolve => setTimeout(resolve, ms));

// TODO: better naming
export default class SolidityTester {

    public blockTime: number;
    //public web3: Web3;
    public web3: any;
    public compiledContracts: {
        contracts: {
            [contractName: string]: any
        };
    };


    constructor(web3Provider, compiledContracts, blockTime) {
        this.web3 = web3Provider;
        this.compiledContracts = compiledContracts;
        this.blockTime = blockTime;

        //Object.keys(this.compiledContracts.contracts).forEach((key) => console.log('---' + key));
    }

    getCompiledContract(name) {
        return this.compiledContracts.contracts[name];
    }

    async createContract(contractName, contractAddress = null) {
        let contract = await this.createContractFromCompiled(this.getCompiledContract(contractName))

        if (!contractAddress) {
            return contract;
        }

        contract.options.address = contractAddress;
        return contract;
    }

    async createContractFromCompiled(compiledContract) {
        let abi = JSON.parse(compiledContract.interface);
        //let code = '0x' + compiledContract.bytecode; // Smart contract EVM bytecode as hex
//console.log(this.web3.eth)
        let contract = new this.web3.eth.Contract(abi);

        return contract;
    }

    async deployContract(creatorAddress, contract, bytecode, constructorValues) {
        const transactionSettings = {
            gas: 1000000,
            gasPrice: 5000000000,
            from: creatorAddress
        }
        const deploySettings = {
            data: '0x' + bytecode,
            arguments: constructorValues
        }

        let deployObject = await contract.deploy(deploySettings);
        let contractInstance = await promisify((cb) => deployObject.send(transactionSettings, cb));

        return contractInstance;
    }

    async easyDeploy(creatorAddress, contractName, constructorParameters = []) {
        let compiledContract = this.getCompiledContract(contractName);

        let contract = await this.createContractFromCompiled(compiledContract);

        //return await this.deployAndMineContract(creatorAddress, contract, compiledContract.bytecode, constructorParameters);
        let transactionHash = await this.deployContract(creatorAddress, contract, compiledContract.bytecode, constructorParameters);
        return await this.waitForTransactionMining(transactionHash);
    }


    async waitForTransactionMining(transactionHash) {
        while (true) {

            let receipt: any = await promisify((cb) => this.web3.eth.getTransactionReceipt(transactionHash, cb));
            if (receipt && receipt.contractAddress) {
                return receipt.contractAddress;
            }

            let blockNumber = await promisify((cb) => this.web3.eth.getBlockNumber(cb));
            //console.log("Waiting a mined block to include your contract... currently in block " + blockNumber);
            await sleep(this.blockTime * 1000);
        }
    }
/*
    // not used right now
    async unlockAccount(address) {
        let password = "tmpPassword";

        try {
            await promisify((cb) => this.web3.eth.personal.unlockAccount(address, password, 500, cb));
        } catch(e) {
            console.log(e);
            console.log("TESTER ERROR: " + e);
        }
    }
*/
}
