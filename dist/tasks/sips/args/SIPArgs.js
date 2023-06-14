"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Logs = require("node-logs");
const logger = new Logs().showInConsole(true);
const SampleSIP01 = async (hre) => {
    const { ethers } = hre;
    const SampleToken = await ethers.getContractFactory("ERC20");
    const args = {
        args: {
            targets: ["0x95a1CA72Df913f14Dc554a5D14E826B64Bd049FD"],
            values: [0],
            signatures: ["transfer(address,uint256)"],
            data: [
                SampleToken.interface.encodeFunctionData("transfer", [
                    "0x95222290dd7278aa3ddd389cc1e1d165cc4bafe5",
                    ethers.utils.parseEther("1"),
                ]),
            ],
            description: "SIP-0001: Transfer token. SHA256: ",
        },
        governorName: "GovernorOwner",
    };
    return args;
};
const SIPSetMassetManagerProxy = async (hre) => {
    const { ethers } = hre;
    const newMassetManagerProxy = "";
    const DLLR = await ethers.getContract("DLLR");
    const args = {
        args: {
            targets: [DLLR.address],
            values: [0],
            signatures: ["setMassetManagerProxy(address)"],
            data: [
                DLLR.interface.encodeFunctionData("setMassetManagerProxy", [
                    newMassetManagerProxy,
                ]),
            ],
            description: "SIP-0002: Set Masset Manager Proxy. SHA256: ",
        },
        governorName: "GovernorOwner",
    };
    return args;
};
const SIPSetBasketManagerProxy = async (hre) => {
    const { ethers } = hre;
    const newBasketManagerProxy = "";
    const DLLR = await ethers.getContract("DLLR");
    const args = {
        args: {
            targets: [DLLR.address],
            values: [0],
            signatures: ["setBasketManagerProxy(address)"],
            data: [
                DLLR.interface.encodeFunctionData("setBasketManagerProxy", [
                    newBasketManagerProxy,
                ]),
            ],
            description: "SIP-0003: Set Basket Manager Proxy. SHA256: ",
        },
        governorName: "GovernorOwner",
    };
    return args;
};
const sip0064 = async (hre) => {
    // Replace BasketManagerV3, MassetManager, FeesManager
    const { ethers, deployments: { get }, network, } = hre;
    const proxyAdmin = await ethers.getContract("MyntAdminProxy");
    const targetContractsList = [
        "BasketManagerV3",
        "MassetManager",
        "FeesManager",
        "FeesVault",
        "MocIntegration",
    ];
    const deploymentProxies = await Promise.all(targetContractsList.map(async (val) => {
        return (await get(val)).address;
    }));
    const deploymentImplementations = await Promise.all(targetContractsList.map(async (val) => {
        return (await get(val)).implementation;
    }));
    const targetsProxyAdmin = Array(deploymentProxies.length).fill(proxyAdmin.address);
    // VALIDATE DEPLOYMENTS
    const errorLog = [];
    await Promise.all(deploymentProxies.map(async (proxyAddress, index) => {
        if ((await proxyAdmin.getProxyImplementation(proxyAddress)) ===
            deploymentImplementations[index]) {
            errorLog.push(`Implementation ${targetContractsList[index]} has not changed: ${deploymentImplementations[index]}`);
        }
    }));
    if (errorLog.length > 0) {
        logger.error(errorLog);
        if ((network.tags.mainnet || network.tags.testnet) &&
            !network.tags["forked"]) {
            throw Error("^");
        }
    }
    // CALC SIP ARGS
    const datas = deploymentProxies.map((val, index) => {
        return ethers.utils.defaultAbiCoder.encode(["address", "address"], [deploymentProxies[index], deploymentImplementations[index]]);
    });
    const signatures = Array(deploymentProxies.length).fill("upgrade(address,address)");
    const args = {
        args: {
            targets: targetsProxyAdmin,
            values: Array(deploymentProxies.length).fill(0),
            signatures: signatures,
            data: datas,
            description: "SIP-0064: Remove Bridge Functions from Mynt, Details: https://github.com/DistributedCollective/SIPS/blob/3a3051a/SIP-0064.md, sha256: f3992c60dd7fce078e3afcd3d1687d61c852f62e01deabb67daaac83dcbd0dbd",
        },
        governorName: "GovernorOwner",
    };
    return args;
};
const sipArgs = {
    SampleSIP01,
    SIPSetMassetManagerProxy,
    SIPSetBasketManagerProxy,
    sip0064,
};
exports.default = sipArgs;
//# sourceMappingURL=SIPArgs.js.map