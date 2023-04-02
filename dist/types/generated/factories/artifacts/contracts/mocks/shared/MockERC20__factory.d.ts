import { Signer, ContractFactory, BigNumberish, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type { MockERC20, MockERC20Interface } from "../../../../../artifacts/contracts/mocks/shared/MockERC20";
type MockERC20ConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class MockERC20__factory extends ContractFactory {
    constructor(...args: MockERC20ConstructorParams);
    deploy(_name: PromiseOrValue<string>, _symbol: PromiseOrValue<string>, _decimals: PromiseOrValue<BigNumberish>, _initialRecipient: PromiseOrValue<string>, _initialMint: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<MockERC20>;
    getDeployTransaction(_name: PromiseOrValue<string>, _symbol: PromiseOrValue<string>, _decimals: PromiseOrValue<BigNumberish>, _initialRecipient: PromiseOrValue<string>, _initialMint: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): TransactionRequest;
    attach(address: string): MockERC20;
    connect(signer: Signer): MockERC20__factory;
    static readonly bytecode = "0x60806040523480156200001157600080fd5b50604051620011bd380380620011bd83398101604081905262000034916200021a565b8484600362000044838262000358565b50600462000053828262000358565b5050506200007f828460ff16600a6200006d919062000539565b6200007990846200054e565b6200008a565b50505050506200057e565b6001600160a01b038216620000e55760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015260640160405180910390fd5b8060026000828254620000f9919062000568565b90915550506001600160a01b038216600081815260208181526040808320805486019055518481527fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a35050565b505050565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200017d57600080fd5b81516001600160401b03808211156200019a576200019a62000155565b604051601f8301601f19908116603f01168101908282118183101715620001c557620001c562000155565b81604052838152602092508683858801011115620001e257600080fd5b600091505b83821015620002065785820183015181830184015290820190620001e7565b600093810190920192909252949350505050565b600080600080600060a086880312156200023357600080fd5b85516001600160401b03808211156200024b57600080fd5b6200025989838a016200016b565b965060208801519150808211156200027057600080fd5b506200027f888289016200016b565b945050604086015160ff811681146200029757600080fd5b60608701519093506001600160a01b0381168114620002b557600080fd5b80925050608086015190509295509295909350565b600181811c90821680620002df57607f821691505b6020821081036200030057634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200015057600081815260208120601f850160051c810160208610156200032f5750805b601f850160051c820191505b8181101562000350578281556001016200033b565b505050505050565b81516001600160401b0381111562000374576200037462000155565b6200038c81620003858454620002ca565b8462000306565b602080601f831160018114620003c45760008415620003ab5750858301515b600019600386901b1c1916600185901b17855562000350565b600085815260208120601f198616915b82811015620003f557888601518255948401946001909101908401620003d4565b5085821015620004145787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b634e487b7160e01b600052601160045260246000fd5b600181815b808511156200047b5781600019048211156200045f576200045f62000424565b808516156200046d57918102915b93841c93908002906200043f565b509250929050565b600082620004945750600162000533565b81620004a35750600062000533565b8160018114620004bc5760028114620004c757620004e7565b600191505062000533565b60ff841115620004db57620004db62000424565b50506001821b62000533565b5060208310610133831016604e8410600b84101617156200050c575081810a62000533565b6200051883836200043a565b80600019048211156200052f576200052f62000424565b0290505b92915050565b600062000547838362000483565b9392505050565b808202811582820484141762000533576200053362000424565b8082018082111562000533576200053362000424565b610c2f806200058e6000396000f3fe6080604052600436106100c65760003560e01c806344dee17f1161007f578063a457c2d711610059578063a457c2d714610215578063a9059cbb14610235578063c8353f8e14610255578063dd62ed3e1461027557600080fd5b806344dee17f146101a857806370a08231146101ca57806395d89b411461020057600080fd5b806306fdde03146100d2578063095ea7b3146100fd57806318160ddd1461012d57806323b872dd1461014c578063313ce5671461016c578063395093511461018857600080fd5b366100cd57005b600080fd5b3480156100de57600080fd5b506100e7610295565b6040516100f491906108d2565b60405180910390f35b34801561010957600080fd5b5061011d61011836600461093c565b610327565b60405190151581526020016100f4565b34801561013957600080fd5b506002545b6040519081526020016100f4565b34801561015857600080fd5b5061011d610167366004610966565b610341565b34801561017857600080fd5b50604051601281526020016100f4565b34801561019457600080fd5b5061011d6101a336600461093c565b610365565b3480156101b457600080fd5b506101c86101c33660046109a2565b610387565b005b3480156101d657600080fd5b5061013e6101e53660046109bb565b6001600160a01b031660009081526020819052604090205490565b34801561020c57600080fd5b506100e7610394565b34801561022157600080fd5b5061011d61023036600461093c565b6103a3565b34801561024157600080fd5b5061011d61025036600461093c565b610423565b34801561026157600080fd5b506101c8610270366004610a26565b610431565b34801561028157600080fd5b5061013e610290366004610ae4565b6104a6565b6060600380546102a490610b17565b80601f01602080910402602001604051908101604052809291908181526020018280546102d090610b17565b801561031d5780601f106102f25761010080835404028352916020019161031d565b820191906000526020600020905b81548152906001019060200180831161030057829003601f168201915b5050505050905090565b6000336103358185856104d1565b60019150505b92915050565b60003361034f8582856105f5565b61035a85858561066f565b506001949350505050565b60003361033581858561037883836104a6565b6103829190610b51565b6104d1565b6103913382610813565b50565b6060600480546102a490610b17565b600033816103b182866104a6565b9050838110156104165760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084015b60405180910390fd5b61035a82868684036104d1565b60003361033581858561066f565b6040516223de2960e01b81526001600160a01b038a16906223de2990610469908b908b908b908b908b908b908b908b90600401610b9b565b600060405180830381600087803b15801561048357600080fd5b505af1158015610497573d6000803e3d6000fd5b50505050505050505050505050565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6001600160a01b0383166105335760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b606482015260840161040d565b6001600160a01b0382166105945760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b606482015260840161040d565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b600061060184846104a6565b90506000198114610669578181101561065c5760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e6365000000604482015260640161040d565b61066984848484036104d1565b50505050565b6001600160a01b0383166106d35760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b606482015260840161040d565b6001600160a01b0382166107355760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b606482015260840161040d565b6001600160a01b038316600090815260208190526040902054818110156107ad5760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b606482015260840161040d565b6001600160a01b03848116600081815260208181526040808320878703905593871680835291849020805487019055925185815290927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a3610669565b6001600160a01b0382166108695760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015260640161040d565b806002600082825461087b9190610b51565b90915550506001600160a01b038216600081815260208181526040808320805486019055518481527fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a35050565b600060208083528351808285015260005b818110156108ff578581018301518582016040015282016108e3565b506000604082860101526040601f19601f8301168501019250505092915050565b80356001600160a01b038116811461093757600080fd5b919050565b6000806040838503121561094f57600080fd5b61095883610920565b946020939093013593505050565b60008060006060848603121561097b57600080fd5b61098484610920565b925061099260208501610920565b9150604084013590509250925092565b6000602082840312156109b457600080fd5b5035919050565b6000602082840312156109cd57600080fd5b6109d682610920565b9392505050565b60008083601f8401126109ef57600080fd5b50813567ffffffffffffffff811115610a0757600080fd5b602083019150836020828501011115610a1f57600080fd5b9250929050565b600080600080600080600080600060e08a8c031215610a4457600080fd5b610a4d8a610920565b9850610a5b60208b01610920565b9750610a6960408b01610920565b9650610a7760608b01610920565b955060808a0135945060a08a013567ffffffffffffffff80821115610a9b57600080fd5b610aa78d838e016109dd565b909650945060c08c0135915080821115610ac057600080fd5b50610acd8c828d016109dd565b915080935050809150509295985092959850929598565b60008060408385031215610af757600080fd5b610b0083610920565b9150610b0e60208401610920565b90509250929050565b600181811c90821680610b2b57607f821691505b602082108103610b4b57634e487b7160e01b600052602260045260246000fd5b50919050565b8082018082111561033b57634e487b7160e01b600052601160045260246000fd5b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b6001600160a01b0389811682528881166020830152871660408201526060810186905260c060808201819052600090610bd79083018688610b72565b82810360a0840152610bea818587610b72565b9b9a505050505050505050505056fea2646970667358221220a23c79432fd4d75ad71c4b7e571818894409032a18d515de2271fafe33bb98a464736f6c63430008110033";
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "string";
            readonly name: "_name";
            readonly type: "string";
        }, {
            readonly internalType: "string";
            readonly name: "_symbol";
            readonly type: "string";
        }, {
            readonly internalType: "uint8";
            readonly name: "_decimals";
            readonly type: "uint8";
        }, {
            readonly internalType: "address";
            readonly name: "_initialRecipient";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "_initialMint";
            readonly type: "uint256";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "constructor";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "owner";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "spender";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "value";
            readonly type: "uint256";
        }];
        readonly name: "Approval";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "from";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "value";
            readonly type: "uint256";
        }];
        readonly name: "Transfer";
        readonly type: "event";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "owner";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "spender";
            readonly type: "address";
        }];
        readonly name: "allowance";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "spender";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "approve";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "balanceOf";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "aggregator";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "operator";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "from";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }, {
            readonly internalType: "bytes";
            readonly name: "userData";
            readonly type: "bytes";
        }, {
            readonly internalType: "bytes";
            readonly name: "operatorData";
            readonly type: "bytes";
        }];
        readonly name: "callTokensReceived";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "decimals";
        readonly outputs: readonly [{
            readonly internalType: "uint8";
            readonly name: "";
            readonly type: "uint8";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "spender";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "subtractedValue";
            readonly type: "uint256";
        }];
        readonly name: "decreaseAllowance";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "giveMe";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "spender";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "addedValue";
            readonly type: "uint256";
        }];
        readonly name: "increaseAllowance";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "name";
        readonly outputs: readonly [{
            readonly internalType: "string";
            readonly name: "";
            readonly type: "string";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "symbol";
        readonly outputs: readonly [{
            readonly internalType: "string";
            readonly name: "";
            readonly type: "string";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "totalSupply";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "transfer";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "from";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "transferFrom";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly stateMutability: "payable";
        readonly type: "receive";
    }];
    static createInterface(): MockERC20Interface;
    static connect(address: string, signerOrProvider: Signer | Provider): MockERC20;
}
export {};
