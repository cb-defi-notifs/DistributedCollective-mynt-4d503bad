"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NonReentrantMock__factory = void 0;
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [],
        name: "clientMethod",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
];
const _bytecode = "0x6080604052348015600f57600080fd5b50607780601d6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c8063848d0bd414602d575b600080fd5b604080516001815290519081900360200190f3fea2646970667358221220613342e8ead9eccab35b19f022402974a835d08f4bb660b8a6bef7fbe295552564736f6c63430008110033";
const isSuperArgs = (xs) => xs.length > 1;
class NonReentrantMock__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    deploy(overrides) {
        return super.deploy(overrides || {});
    }
    getDeployTransaction(overrides) {
        return super.getDeployTransaction(overrides || {});
    }
    attach(address) {
        return super.attach(address);
    }
    connect(signer) {
        return super.connect(signer);
    }
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.NonReentrantMock__factory = NonReentrantMock__factory;
NonReentrantMock__factory.bytecode = _bytecode;
NonReentrantMock__factory.abi = _abi;
//# sourceMappingURL=NonReentrantMock__factory.js.map