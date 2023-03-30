"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SampleSIP01 = async (hre) => {
    const { ethers } = hre;
    const SampleToken = await ethers.getContractFactory("ERC20");
    const args = {
        targets: ["0x95a1CA72Df913f14Dc554a5D14E826B64Bd049FD"],
        values: [0],
        signatures: ["transfer(address,uint256)"],
        data: [SampleToken.interface.encodeFunctionData("transfer", ["0x95222290dd7278aa3ddd389cc1e1d165cc4bafe5", ethers.utils.parseEther("1")])],
        description: "SIP-0001: Transfer token. SHA256: "
    };
    return args;
};
const SIPSetMassetManagerProxy = async (hre) => {
    const { ethers } = hre;
    const newMassetManagerProxy = "";
    const DLLR = await ethers.getContract("DLLR");
    const args = {
        targets: [DLLR.address],
        values: [0],
        signatures: ["setMassetManagerProxy(address)"],
        data: [DLLR.interface.encodeFunctionData("setMassetManagerProxy", [newMassetManagerProxy])],
        description: "SIP-0002: Set Masset Manager Proxy. SHA256: "
    };
    return args;
};
const SIPSetBasketManagerProxy = async (hre) => {
    const { ethers } = hre;
    const newBasketManagerProxy = "";
    const DLLR = await ethers.getContract("DLLR");
    const args = {
        targets: [DLLR.address],
        values: [0],
        signatures: ["setBasketManagerProxy(address)"],
        data: [DLLR.interface.encodeFunctionData("setBasketManagerProxy", [newBasketManagerProxy])],
        description: "SIP-0003: Set Basket Manager Proxy. SHA256: "
    };
    return args;
};
const SIPArgs = {
    SampleSIP01,
    SIPSetMassetManagerProxy,
    SIPSetBasketManagerProxy,
};
exports.default = SIPArgs;
//# sourceMappingURL=SIPArgs.js.map