"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upgradeWithTransparentUpgradableProxy = void 0;
const hardhat_1 = __importDefault(require("hardhat"));
const cli_color_1 = __importDefault(require("cli-color"));
const multisig_1 = require("scripts/helpers/multisig");
const { deployments: { deploy, get, getOrNull, log, save }, getNamedAccounts, ethers, } = hardhat_1.default;
const upgradeWithTransparentUpgradableProxy = async (deployer, logicArtifactName, // logic contract artifact name
proxyArtifactName, // proxy deployment name
logicInstanceName = undefined, // save logic implementation as
proxyInstanceName = undefined, // save proxy implementation as
proxyAdminName = "MyntAdminProxy", // proxy admin implementation
forceOwnerIsMultisig = false, // overrides network dependency
args = [], multisigName = "MultiSigWallet") => {
    proxyInstanceName = proxyInstanceName === "" ? undefined : proxyInstanceName;
    logicInstanceName = logicInstanceName === "" ? undefined : logicInstanceName;
    const proxyAdminDeployment = await get(proxyAdminName);
    const proxyAdmin = await ethers.getContract(proxyAdminName);
    const proxyName = proxyInstanceName ?? proxyArtifactName; // support multiple deployments of the same artifact
    console.log("proxyName:", proxyName);
    const logicName = logicInstanceName ?? logicArtifactName;
    const logicImplName = `${logicName}_Implementation`; // naming convention like in hh deployment
    const logicDeploymentTx = await deploy(logicImplName, {
        contract: logicArtifactName,
        from: deployer,
        args,
        log: true,
    });
    const proxy = await ethers.getContract(proxyName);
    const proxyDeployment = await get(proxyName);
    console.log("proxy.address:", proxy.address);
    // console.log(await proxy.implementation());
    const prevImpl = await proxyAdmin.getProxyImplementation(proxy.address);
    log(`Current ${proxyName} implementation: ${prevImpl}`);
    if (logicDeploymentTx.newlyDeployed ||
        logicDeploymentTx.address !== prevImpl) {
        log(`New ${proxyName} implementation: ${logicImplName} @ ${logicDeploymentTx.address}`);
        await save(logicName, {
            address: proxy.address,
            implementation: logicDeploymentTx.address,
            abi: logicDeploymentTx.abi,
            bytecode: logicDeploymentTx.bytecode,
            deployedBytecode: logicDeploymentTx.deployedBytecode,
            devdoc: logicDeploymentTx.devdoc,
            userdoc: logicDeploymentTx.userdoc,
            storageLayout: logicDeploymentTx.storageLayout,
        });
        if (hardhat_1.default.network.tags.testnet || hardhat_1.default.network.tags.mainnet) {
            if (hardhat_1.default.network.tags.testnet || forceOwnerIsMultisig) {
                // multisig is the owner
                const multisigDeployment = await get(multisigName);
                // @todo wrap getting ms tx data into a helper
                const proxyAdminInterface = new ethers.utils.Interface(proxyAdminDeployment.abi);
                const data = proxyAdminInterface.encodeFunctionData("upgrade", [
                    proxyDeployment.address,
                    logicDeploymentTx.address,
                ]);
                log(`Creating multisig tx to set ${logicArtifactName} (${logicDeploymentTx.address}) as implementation for ${proxyName} (${proxyDeployment.address}...`);
                log();
                await (0, multisig_1.sendWithMultisig)(multisigDeployment.address, proxyAdminDeployment.address, data, deployer);
                log(cli_color_1.default.bgBlue(`>>> DONE. Requires Multisig (${multisigDeployment.address}) signing to execute tx <<<
                 >>> DON'T PUSH DEPLOYMENTS TO THE REPO UNTIL THE MULTISIG TX SUCCESSFULLY SIGNED & EXECUTED <<<`));
            }
            else if (hardhat_1.default.network.tags.mainnet) {
                log(">>> Create a Bitocracy proposal via SIP <<<");
                log(cli_color_1.default.bgBlue("Prepare and run SIP function in sips.js to create the proposal with args:"));
                const sipArgs = {
                    targets: [proxyAdminDeployment.address],
                    values: [0],
                    signatures: ["upgrade(address,address)"],
                    data: [
                        ethers.utils.defaultAbiCoder.encode(["address", "address"], [proxyDeployment.address, logicDeploymentTx.address]),
                    ],
                };
                log(cli_color_1.default.yellowBright(sipArgs));
                log(">>> DON'T PUSH DEPLOYMENTS TO THE REPO UNTIL THE SIP IS SUCCESSFULLY EXECUTED <<<`");
                // governance is the owner - need a SIP to register
                // TODO: implementation ; meanwhile use brownie sip_interaction scripts to create proposal
            }
        }
        else {
            // eslint-disable-next-line no-shadow
            const proxy = await ethers.getContractAt(proxyName, proxyDeployment.address);
            await proxy.upgrade(logicDeploymentTx.address);
            log(`>>> New implementation ${await proxy.implementation()} is set to the proxy <<<`);
        }
        log();
    }
};
exports.upgradeWithTransparentUpgradableProxy = upgradeWithTransparentUpgradableProxy;
//# sourceMappingURL=deployment.js.map