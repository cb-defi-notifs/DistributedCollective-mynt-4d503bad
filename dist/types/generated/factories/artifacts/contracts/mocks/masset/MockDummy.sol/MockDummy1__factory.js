"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockDummy1__factory = void 0;
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [],
        name: "getVersion",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
];
const _bytecode = "0x608060405234801561001057600080fd5b5060d98061001f6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c80630d8e6e2c14602d575b600080fd5b60408051808201825260018152603160f81b60208201529051604e91906057565b60405180910390f35b600060208083528351808285015260005b818110156082578581018301518582016040015282016068565b506000604082860101526040601f19601f830116850101925050509291505056fea26469706673582212207f2d3d52baa404327ef1f8211222466d42fcc152b2fe532e5324b1c6c0aad80264736f6c63430008110033";
const isSuperArgs = (xs) => xs.length > 1;
class MockDummy1__factory extends ethers_1.ContractFactory {
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
exports.MockDummy1__factory = MockDummy1__factory;
MockDummy1__factory.bytecode = _bytecode;
MockDummy1__factory.abi = _abi;
//# sourceMappingURL=MockDummy1__factory.js.map