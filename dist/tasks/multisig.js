"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
const { task, types } = require("hardhat/config");
const helpers_1 = require("../scripts/helpers/helpers");
task("multisig:sign-tx", "Sign multisig tx")
    .addParam("id", "Multisig transaction to sign", undefined, types.string)
    .addOptionalParam("signer", "Signer name: 'signer' or 'deployer'", "deployer")
    .setAction(async ({ id, signer }, hre) => {
    const { deployments: { get }, } = hre;
    const signerAcc = (await hre.getNamedAccounts())[signer];
    const ms = await get("MultiSigWallet");
    await (0, helpers_1.signWithMultisig)(hre, ms.address, id, signerAcc);
});
task("multisig:sign-txs", "Sign multiple multisig tx")
    .addParam("ids", "Multisig transactions to sign. Supports '12,14,16-20,22' format where '16-20' is a continuous range of integers", undefined, types.string)
    .addOptionalParam("signer", "Signer name: 'signer' or 'deployer'", "deployer")
    .setAction(async ({ ids, signer }, hre) => {
    const { deployments: { get }, } = hre;
    const signerAcc = (await hre.getNamedAccounts())[signer];
    const ms = await get("MultiSigWallet");
    const txnArray = ids.split(",");
    for (let txId of txnArray) {
        if (typeof txId !== "string" || txId.indexOf("-") === -1) {
            await (0, helpers_1.signWithMultisig)(hre, ms.address, txId, signerAcc);
        }
        else {
            const txnRangeArray = ids.split("-", 2).map((num) => parseInt(num));
            for (let id = txnRangeArray[0]; id <= txnRangeArray[1]; id++) {
                await (0, helpers_1.signWithMultisig)(hre, ms.address, id, signerAcc);
            }
        }
    }
});
task("multisig:execute-tx", "Execute multisig tx by one of tx signers")
    .addParam("id", "Multisig transaction to sign", undefined, types.string)
    .addOptionalParam("signer", "Signer name: 'signer' or 'deployer'", "deployer")
    .setAction(async ({ id, signer }, hre) => {
    const signerAcc = (await hre.getNamedAccounts())[signer];
    await (0, helpers_1.multisigExecuteTx)(hre, id, signerAcc);
});
task("multisig:execute-txs", "Execute multiple multisig txs by one of tx signers")
    .addParam("ids", "Multisig transaction to sign", undefined, types.string)
    .addOptionalParam("signer", "Signer name from named signers: 'signer', 'deployer' etc.", "deployer")
    .setAction(async ({ ids, signer }, hre) => {
    const signerAcc = (await hre.getNamedAccounts())[signer];
    const txnArray = ids.split(",");
    for (let txId of txnArray) {
        if (typeof txId !== "string" || txId.indexOf("-") === -1) {
            await (0, helpers_1.multisigExecuteTx)(hre, txId, signerAcc);
        }
        else {
            const txnRangeArray = txId.split("-", 2).map((num) => parseInt(num));
            for (let id = txnRangeArray[0]; id <= txnRangeArray[1]; id++) {
                await (0, helpers_1.multisigExecuteTx)(hre, id, signerAcc);
            }
        }
    }
});
task("multisig:check-tx", "Check multisig tx")
    .addParam("id", "Multisig transaction id to check", undefined, types.string)
    .setAction(async (taskArgs, hre) => {
    console.log("checking...");
    await (0, helpers_1.multisigCheckTx)(hre, taskArgs.id);
});
task("multisig:check-txs", "Check multiple multisig txs")
    .addParam("ids", "Multisig transaction ids list to check", undefined, types.string)
    .setAction(async ({ ids }, hre) => {
    const txnArray = ids.split(",");
    for (let txId of txnArray) {
        if (typeof txId !== "string" || txId.indexOf("-") === -1) {
            await (0, helpers_1.multisigCheckTx)(hre, txId);
        }
        else {
            const txnRangeArray = txId.split("-", 2).map((num) => parseInt(num));
            for (let id = txnRangeArray[0]; id <= txnRangeArray[1]; id++) {
                await (0, helpers_1.multisigCheckTx)(hre, id.toString());
            }
        }
    }
});
task("multisig:revoke-sig", "Revoke multisig tx confirmation")
    .addParam("id", "Multisig transaction to revoke confirmation from", undefined, types.string)
    .addOptionalParam("signer", "Signer name: 'signer' or 'deployer'", "deployer")
    .setAction(async ({ id, signer }, hre) => {
    const signerAcc = (await hre.getNamedAccounts())[signer];
    await (0, helpers_1.multisigRevokeConfirmation)(hre, id, signerAcc);
});
task("multisig:add-owner", "Add or remove multisig owner")
    .addParam("address", "Owner address to add or remove", undefined, types.string)
    .addOptionalParam("signer", "Signer name: 'signer' or 'deployer'", "deployer")
    .setAction(async ({ address, signer }, hre) => {
    const signerAcc = (await hre.getNamedAccounts())[signer];
    await (0, helpers_1.multisigAddOwner)(hre, address, signerAcc);
});
task("multisig:remove-owner", "Add or remove multisig owner")
    .addParam("address", "Owner address to add or remove", undefined, types.string)
    .addOptionalParam("signer", "Signer name: 'signer' or 'deployer'", "deployer")
    .setAction(async ({ address, signer }, hre) => {
    const signerAcc = (await hre.getNamedAccounts())[signer];
    await (0, helpers_1.multisigRemoveOwner)(hre, address, signerAcc);
});
//# sourceMappingURL=multisig.js.map