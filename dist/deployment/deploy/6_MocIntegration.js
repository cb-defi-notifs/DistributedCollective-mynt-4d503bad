"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const deployment_1 = require("../helpers/deployment");
const func = async ({ deployments, getNamedAccounts }) => {
    const { deploy, get, getOrNull, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const networkName = deployments.getNetworkName();
    let mocAddress;
    const docAddress = (await get("DoC")).address;
    if (hardhat_1.network.tags.mainnet || hardhat_1.network.tags.testnet) {
        mocAddress = (await get("MocMintRedeemDoc")).address;
    }
    else if (["development", "hardhat", "localhost"].includes(networkName)) {
        // @todo add handling forked networks
        mocAddress = (await deploy("MocMock", { from: deployer, log: true }))
            .address;
    }
    log(`using addresses on the '${networkName}'
    MoC main contract address: ${mocAddress}
    DoC address: ${docAddress}`);
    const dllrAddress = (await get("DLLR")).address;
    const deploymentName = "MocIntegration";
    const deployment = await getOrNull(deploymentName);
    if (deployment) {
        await (0, deployment_1.upgradeWithTransparentUpgradableProxy)(deployer, deploymentName, "TransparentUpgradeableProxy", undefined, `${deploymentName}_Proxy`);
    }
    else {
        const massetManagerAddress = (await get("MassetManager")).address;
        await deploy(deploymentName, {
            args: [mocAddress, docAddress, dllrAddress, massetManagerAddress],
            proxy: {
                owner: deployer,
                proxyContract: "OpenZeppelinTransparentProxy",
                viaAdminContract: {
                    name: "MyntAdminProxy",
                    artifact: "MyntAdminProxy",
                },
                execute: {
                    init: {
                        methodName: "initialize",
                        args: [hardhat_1.ethers.constants.AddressZero],
                    },
                },
            },
            from: deployer,
            log: true,
        });
    }
};
func.tags = ["MocIntegration"];
func.dependencies = [
    "DLLR",
    "MassetManager",
    "MyntAdminProxy",
    "DeployMockBAssets",
];
exports.default = func;
//# sourceMappingURL=6_MocIntegration.js.map