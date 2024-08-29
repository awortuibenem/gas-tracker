const path = require('path');
const estimateGas = require('./utils/estimateGas');
const argv = require('yargs').argv;

async function main() {
    const contractPath = argv.path || './contracts/sample.sol';
    const absolutePath = path.resolve(contractPath);
    console.log(`Estimating gas for contract at: ${absolutePath}`);

    try {
        const gasEstimate = await estimateGas(absolutePath);
        console.log(`Estimated gas cost: ${gasEstimate}`);
    } catch (error) {
        console.error(`Error estimating gas: ${error.message}`);
    }
}

main();
