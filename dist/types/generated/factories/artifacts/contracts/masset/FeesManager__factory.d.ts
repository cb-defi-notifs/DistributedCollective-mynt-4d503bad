import { Signer, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type { FeesManager, FeesManagerInterface } from "../../../../artifacts/contracts/masset/FeesManager";
type FeesManagerConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class FeesManager__factory extends ContractFactory {
    constructor(...args: FeesManagerConstructorParams);
    deploy(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<FeesManager>;
    getDeployTransaction(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): TransactionRequest;
    attach(address: string): FeesManager;
    connect(signer: Signer): FeesManager__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b5061082b806100206000396000f3fe608060405234801561001057600080fd5b506004361061010b5760003560e01c80637f0c6010116100a2578063c54edda011610071578063c54edda0146101ed578063c8066c41146101f5578063d8e159f8146101fd578063ee87674314610205578063f2fde38b1461021857600080fd5b80637f0c6010146101a35780638da5cb5b146101b6578063aaf5eb68146101d1578063ac1e5025146101da57600080fd5b806350bc5042116100de57806350bc50421461016257806360a2da441461017557806364c4fbba14610188578063715018a61461019b57600080fd5b80630de705b514610110578063247d284b146101275780633ee7ab841461013a578063490ae2101461014d575b600080fd5b6065545b6040519081526020015b60405180910390f35b61011461013536600461070e565b61022b565b61011461014836600461070e565b61023f565b61016061015b36600461070e565b61024d565b005b61016061017036600461070e565b6102bc565b610160610183366004610727565b61031b565b61011461019636600461070e565b610454565b610160610462565b6101146101b136600461070e565b610476565b6033546040516001600160a01b03909116815260200161011e565b61011461271081565b6101606101e836600461070e565b610484565b606854610114565b606654610114565b606754610114565b61016061021336600461070e565b6104e3565b610160610226366004610759565b610542565b6000610239826065546105bb565b92915050565b6000610239826068546105bb565b6102556105da565b6127108111156102805760405162461bcd60e51b815260040161027790610782565b60405180910390fd5b60658190556040518181527f2a6f1084651542f3142c70f4c43c096d016a8b517c063660b146268f646ea43a906020015b60405180910390a150565b6102c46105da565b6127108111156102e65760405162461bcd60e51b815260040161027790610782565b60668190556040518181527f670d967e6a887c84c79a646c76703d9237c70d6f94df6e50ab680b527c264d17906020016102b1565b600054610100900460ff161580801561033b5750600054600160ff909116105b806103555750303b158015610355575060005460ff166001145b6103b85760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610277565b6000805460ff1916600117905580156103db576000805461ff0019166101001790555b6103e3610634565b6103ec8561024d565b6103f5846102bc565b6103fe83610484565b610407826104e3565b801561044d576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b5050505050565b6000610239826066546105bb565b61046a6105da565b61047460006106a4565b565b6000610239826067546105bb565b61048c6105da565b6127108111156104ae5760405162461bcd60e51b815260040161027790610782565b60678190556040518181527ffc1353e6b18ce07b5a979c8edf77a87455939a17a9eebbb084dcde5bfb3b19ac906020016102b1565b6104eb6105da565b61271081111561050d5760405162461bcd60e51b815260040161027790610782565b60688190556040518181527f6885e5ccab44b224d100539b69688eb383fb3ccf89de3819cc5d128063e389c9906020016102b1565b61054a6105da565b6001600160a01b0381166105af5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610277565b6105b8816106a4565b50565b60006105d36127106105cd85856106f6565b90610702565b9392505050565b6033546001600160a01b031633146104745760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610277565b600054610100900460ff1661069f5760405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201526a6e697469616c697a696e6760a81b6064820152608401610277565b610474335b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b60006105d382846107ae565b60006105d382846107d3565b60006020828403121561072057600080fd5b5035919050565b6000806000806080858703121561073d57600080fd5b5050823594602084013594506040840135936060013592509050565b60006020828403121561076b57600080fd5b81356001600160a01b03811681146105d357600080fd5b6020808252601290820152711a5b9d985b1a590819995948185b5bdd5b9d60721b604082015260600190565b808202811582820484141761023957634e487b7160e01b600052601160045260246000fd5b6000826107f057634e487b7160e01b600052601260045260246000fd5b50049056fea2646970667358221220a59339f4e13f92c09060802ebbb56b81ee341c260a9c1e3c76a5c2cecfd070ee64736f6c63430008110033";
    static readonly abi: readonly [{
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "depositBridgeFee";
            readonly type: "uint256";
        }];
        readonly name: "DepositBridgeFeeChanged";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "depositFee";
            readonly type: "uint256";
        }];
        readonly name: "DepositFeeChanged";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "uint8";
            readonly name: "version";
            readonly type: "uint8";
        }];
        readonly name: "Initialized";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "previousOwner";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "newOwner";
            readonly type: "address";
        }];
        readonly name: "OwnershipTransferred";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "withdrawalBridgeFee";
            readonly type: "uint256";
        }];
        readonly name: "WithdrawalBridgeFeeChanged";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "withdrawalFee";
            readonly type: "uint256";
        }];
        readonly name: "WithdrawalFeeChanged";
        readonly type: "event";
    }, {
        readonly inputs: readonly [];
        readonly name: "PRECISION";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "_massetAmount";
            readonly type: "uint256";
        }];
        readonly name: "calculateDepositBridgeFee";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "_massetAmount";
            readonly type: "uint256";
        }];
        readonly name: "calculateDepositFee";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "_massetAmount";
            readonly type: "uint256";
        }];
        readonly name: "calculateRedeemBridgeFee";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "_massetAmount";
            readonly type: "uint256";
        }];
        readonly name: "calculateRedeemFee";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "getDepositBridgeFee";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "getDepositFee";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "getWithdrawalBridgeFee";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "getWithdrawalFee";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "_depositFee";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "_depositBridgeFee";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "_withdrawalFee";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "_withdrawalBridgeFee";
            readonly type: "uint256";
        }];
        readonly name: "initialize";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "owner";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "renounceOwnership";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "_amount";
            readonly type: "uint256";
        }];
        readonly name: "setDepositBridgeFee";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "_amount";
            readonly type: "uint256";
        }];
        readonly name: "setDepositFee";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "_amount";
            readonly type: "uint256";
        }];
        readonly name: "setWithdrawalBridgeFee";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "_amount";
            readonly type: "uint256";
        }];
        readonly name: "setWithdrawalFee";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "newOwner";
            readonly type: "address";
        }];
        readonly name: "transferOwnership";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): FeesManagerInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): FeesManager;
}
export {};
