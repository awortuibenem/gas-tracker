const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3');
const Ganache = require('ganache');

async function estimateGas(contractPath) {
    const web3 = new Web3(Ganache.provider());
    
    const source = fs.readFileSync(contractPath, 'utf8');
    const input = {
        language: 'Solidity',
        sources: {
            'contract': {
                content: source,
            },
        },
        settings: {
            outputSelection: {
                '*': {
                    '*': ['*'],
                },
            },
        },
    };
    
    const output = JSON.parse(solc.compile(JSON.stringify(input)));
    const compiledContract = output.contracts['contract'];
    const contractName = Object.keys(compiledContract)[0];
    const abi = compiledContract[contractName].abi;
    const bytecode = compiledContract[contractName].evm.bytecode.object;

    const contract = new web3.eth.Contract(abi);
    const accounts = await web3.eth.getAccounts();

    const deployment = contract.deploy({ data: '0x' + bytecode });
    const gasEstimate = await deployment.estimateGas({ from: accounts[0] });

    return gasEstimate;
}

module.exports = estimateGas;
