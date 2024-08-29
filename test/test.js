const estimateGas = require('../src/utils/estimateGas');
const path = require('path');
const assert = require('assert');

describe('Gas Estimation', function () {
    it('should estimate gas for Contract', async function () {
        const contractPath = path.resolve('./contracts/sample.sol');
        const gasEstimate = await estimateGas(contractPath);
        assert(gasEstimate > 0, 'Gas estimate should be greater than zero');
    });
});
