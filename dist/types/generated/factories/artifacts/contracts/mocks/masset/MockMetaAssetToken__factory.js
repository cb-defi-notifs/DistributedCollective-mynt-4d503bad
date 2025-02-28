"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockMetaAssetToken__factory = void 0;
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "string",
                name: "_tokenName",
                type: "string",
            },
            {
                internalType: "string",
                name: "_symbol",
                type: "string",
            },
            {
                internalType: "address",
                name: "_massetManagerImplementation",
                type: "address",
            },
            {
                internalType: "address",
                name: "_basketManagerImplementation",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "Approval",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "_newBasketManagerProxy",
                type: "address",
            },
        ],
        name: "BasketManagerProxyChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "_newMassetManagerProxy",
                type: "address",
            },
        ],
        name: "MassetManagerProxyChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "OwnershipTransferred",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "Transfer",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "_from",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "_to",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "_amount",
                type: "uint256",
            },
        ],
        name: "TransferWithPermit",
        type: "event",
    },
    {
        inputs: [],
        name: "DOMAIN_SEPARATOR",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
        ],
        name: "allowance",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "approve",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_spender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "_amount",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "_data",
                type: "bytes",
            },
        ],
        name: "approveAndCall",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "balanceOf",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "basketManagerImplementation",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "basketManagerProxy",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_account",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "_amount",
                type: "uint256",
            },
        ],
        name: "burn",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "decimals",
        outputs: [
            {
                internalType: "uint8",
                name: "",
                type: "uint8",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "subtractedValue",
                type: "uint256",
            },
        ],
        name: "decreaseAllowance",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "getChainId",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "addedValue",
                type: "uint256",
            },
        ],
        name: "increaseAllowance",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "massetManagerImplementation",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "massetManagerProxy",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_account",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "_amount",
                type: "uint256",
            },
        ],
        name: "mint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "name",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
        ],
        name: "nonces",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "deadline",
                type: "uint256",
            },
            {
                internalType: "uint8",
                name: "v",
                type: "uint8",
            },
            {
                internalType: "bytes32",
                name: "r",
                type: "bytes32",
            },
            {
                internalType: "bytes32",
                name: "s",
                type: "bytes32",
            },
        ],
        name: "permit",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_basketManagerProxy",
                type: "address",
            },
        ],
        name: "setBasketManagerProxy",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_massetManagerProxy",
                type: "address",
            },
        ],
        name: "setMassetManagerProxy",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "symbol",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "totalSupply",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_recipient",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "_amount",
                type: "uint256",
            },
        ],
        name: "transfer",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_from",
                type: "address",
            },
            {
                internalType: "address",
                name: "_to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "_amount",
                type: "uint256",
            },
        ],
        name: "transferFrom",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_from",
                type: "address",
            },
            {
                internalType: "address",
                name: "_to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "_amount",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_deadline",
                type: "uint256",
            },
            {
                internalType: "uint8",
                name: "_v",
                type: "uint8",
            },
            {
                internalType: "bytes32",
                name: "_r",
                type: "bytes32",
            },
            {
                internalType: "bytes32",
                name: "_s",
                type: "bytes32",
            },
        ],
        name: "transferWithPermit",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x6101406040523480156200001257600080fd5b5060405162001d5738038062001d5783398101604081905262000035916200027f565b83838180604051806040016040528060018152602001603160f81b815250848481600390816200006691906200039d565b5060046200007582826200039d565b5050825160209384012082519284019290922060e08390526101008190524660a0818152604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f818901819052818301979097526060810194909452608080850193909352308483018190528151808603909301835260c0948501909152815191909601209052929092526101205250620001149050336200014b565b5050600a80546001600160a01b039384166001600160a01b031991821617909155600b805492909316911617905550620004699050565b600780546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b634e487b7160e01b600052604160045260246000fd5b600082601f830112620001c557600080fd5b81516001600160401b0380821115620001e257620001e26200019d565b604051601f8301601f19908116603f011681019082821181831017156200020d576200020d6200019d565b816040528381526020925086838588010111156200022a57600080fd5b600091505b838210156200024e57858201830151818301840152908201906200022f565b600093810190920192909252949350505050565b80516001600160a01b03811681146200027a57600080fd5b919050565b600080600080608085870312156200029657600080fd5b84516001600160401b0380821115620002ae57600080fd5b620002bc88838901620001b3565b95506020870151915080821115620002d357600080fd5b50620002e287828801620001b3565b935050620002f36040860162000262565b9150620003036060860162000262565b905092959194509250565b600181811c908216806200032357607f821691505b6020821081036200034457634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200039857600081815260208120601f850160051c81016020861015620003735750805b601f850160051c820191505b8181101562000394578281556001016200037f565b5050505b505050565b81516001600160401b03811115620003b957620003b96200019d565b620003d181620003ca84546200030e565b846200034a565b602080601f831160018114620004095760008415620003f05750858301515b600019600386901b1c1916600185901b17855562000394565b600085815260208120601f198616915b828110156200043a5788860151825594840194600190910190840162000419565b5085821015620004595787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b60805160a05160c05160e051610100516101205161189e620004b96000396000610eee01526000610f3d01526000610f1801526000610e7101526000610e9b01526000610ec5015261189e6000f3fe608060405234801561001057600080fd5b50600436106101c45760003560e01c80637ecebe00116100f9578063cae9ca5111610097578063e5d61a5611610071578063e5d61a56146103a3578063f2fde38b146103b6578063f8b204ec146103c9578063fa38b22e146103dc57600080fd5b8063cae9ca511461036a578063d505accf1461037d578063dd62ed3e1461039057600080fd5b80639dc29fac116100d35780639dc29fac14610320578063a457c2d714610333578063a9059cbb14610346578063c0d15b9c1461035957600080fd5b80637ecebe00146102f45780638da5cb5b1461030757806395d89b411461031857600080fd5b80633644e515116101665780635259889611610140578063525988961461029f578063605629d6146102b057806370a08231146102c3578063715018a6146102ec57600080fd5b80633644e5151461026f578063395093511461027757806340c10f191461028a57600080fd5b806323b872dd116101a257806323b872dd1461021c57806329f3c4a11461022f578063313ce5671461025a5780633408e4701461026957600080fd5b806306fdde03146101c9578063095ea7b3146101e757806318160ddd1461020a575b600080fd5b6101d16103ef565b6040516101de91906114cc565b60405180910390f35b6101fa6101f5366004611536565b610481565b60405190151581526020016101de565b6002545b6040519081526020016101de565b6101fa61022a366004611560565b61049b565b600954610242906001600160a01b031681565b6040516001600160a01b0390911681526020016101de565b604051601281526020016101de565b4661020e565b61020e610519565b6101fa610285366004611536565b610528565b61029d610298366004611536565b610545565b005b600a546001600160a01b0316610242565b61029d6102be36600461159c565b61057d565b61020e6102d136600461160f565b6001600160a01b031660009081526020819052604090205490565b61029d610692565b61020e61030236600461160f565b6106a6565b6007546001600160a01b0316610242565b6101d16106c4565b61029d61032e366004611536565b6106d3565b6101fa610341366004611536565b610707565b6101fa610354366004611536565b610782565b600b546001600160a01b0316610242565b61029d610378366004611631565b6107cd565b61029d61038b36600461159c565b610844565b61020e61039e3660046116b8565b6109a8565b61029d6103b136600461160f565b6109d3565b61029d6103c436600461160f565b610a87565b600854610242906001600160a01b031681565b61029d6103ea36600461160f565b610b00565b6060600380546103fe906116eb565b80601f016020809104026020016040519081016040528092919081815260200182805461042a906116eb565b80156104775780601f1061044c57610100808354040283529160200191610477565b820191906000526020600020905b81548152906001019060200180831161045a57829003601f168201915b5050505050905090565b60003361048f818585610b9a565b60019150505b92915050565b6000826001600160a01b038116158015906104bf57506001600160a01b0381163014155b6104e45760405162461bcd60e51b81526004016104db9061171f565b60405180910390fd5b6105038533856104f489336109a8565b6104fe9190611793565b610b9a565b61050e858585610cbf565b506001949350505050565b6000610523610e64565b905090565b60003361048f81858561053b83836109a8565b6104fe91906117a6565b6008546001600160a01b0316331461056f5760405162461bcd60e51b81526004016104db906117b9565b6105798282610f8b565b5050565b856001600160a01b0381161580159061059f57506001600160a01b0381163014155b6105bb5760405162461bcd60e51b81526004016104db9061171f565b6105ca88338888888888610844565b6105d588888861049b565b61063d5760405162461bcd60e51b815260206004820152603360248201527f4d6574614173736574546f6b656e3a3a7472616e73666572576974685065726d6044820152721a5d0e881d1c985b9cd9995c8819985a5b1959606a1b60648201526084016104db565b604080516001600160a01b03808b168252891660208201529081018790527f248045bd8dd43ca5645e66af7003ebfb1579f27be326e439f761ba6e5561431b9060600160405180910390a15050505050505050565b61069a61104a565b6106a460006110a4565b565b6001600160a01b038116600090815260056020526040812054610495565b6060600480546103fe906116eb565b6008546001600160a01b031633146106fd5760405162461bcd60e51b81526004016104db906117b9565b61057982826110f6565b6000338161071582866109a8565b9050838110156107755760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084016104db565b61050e8286868403610b9a565b6000826001600160a01b038116158015906107a657506001600160a01b0381163014155b6107c25760405162461bcd60e51b81526004016104db9061171f565b61048f338585610cbf565b6107d78484610481565b50604051638f4ffcb160e01b81526001600160a01b03851690638f4ffcb19061080c90339087903090889088906004016117fe565b600060405180830381600087803b15801561082657600080fd5b505af115801561083a573d6000803e3d6000fd5b5050505050505050565b834211156108945760405162461bcd60e51b815260206004820152601d60248201527f45524332305065726d69743a206578706972656420646561646c696e6500000060448201526064016104db565b60007f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c98888886108c38c611220565b6040805160208101969096526001600160a01b0394851690860152929091166060840152608083015260a082015260c0810186905260e001604051602081830303815290604052805190602001209050600061091e82611248565b9050600061092e82878787611296565b9050896001600160a01b0316816001600160a01b0316146109915760405162461bcd60e51b815260206004820152601e60248201527f45524332305065726d69743a20696e76616c6964207369676e6174757265000060448201526064016104db565b61099c8a8a8a610b9a565b50505050505050505050565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6109db61104a565b6001600160a01b038116610a3d5760405162461bcd60e51b815260206004820152602360248201527f696e76616c6964204d61737365744d616e616765722070726f7879206164647260448201526265737360e81b60648201526084016104db565b600880546001600160a01b0319166001600160a01b0383169081179091556040517f0cc6b830b24ab95e101cf469a14b35ae55ee47b9b50650226ab1510d1441b3a190600090a250565b610a8f61104a565b6001600160a01b038116610af45760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016104db565b610afd816110a4565b50565b610b0861104a565b6001600160a01b038116610b505760405162461bcd60e51b815260206004820152600f60248201526e696e76616c6964206164647265737360881b60448201526064016104db565b600980546001600160a01b0319166001600160a01b0383169081179091556040517f5554b3bffdd2afa299cf961d2a6038c24170eea54aa1e62ff09eb7f471a0e7bc90600090a250565b6001600160a01b038316610bfc5760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b60648201526084016104db565b6001600160a01b038216610c5d5760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b60648201526084016104db565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a3505050565b6001600160a01b038316610d235760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b60648201526084016104db565b6001600160a01b038216610d855760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b60648201526084016104db565b6001600160a01b03831660009081526020819052604090205481811015610dfd5760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b60648201526084016104db565b6001600160a01b03848116600081815260208181526040808320878703905593871680835291849020805487019055925185815290927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a350505050565b6000306001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016148015610ebd57507f000000000000000000000000000000000000000000000000000000000000000046145b15610ee757507f000000000000000000000000000000000000000000000000000000000000000090565b50604080517f00000000000000000000000000000000000000000000000000000000000000006020808301919091527f0000000000000000000000000000000000000000000000000000000000000000828401527f000000000000000000000000000000000000000000000000000000000000000060608301524660808301523060a0808401919091528351808403909101815260c0909201909252805191012090565b6001600160a01b038216610fe15760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f20616464726573730060448201526064016104db565b8060026000828254610ff391906117a6565b90915550506001600160a01b038216600081815260208181526040808320805486019055518481527fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a35050565b6007546001600160a01b031633146106a45760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016104db565b600780546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6001600160a01b0382166111565760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b60648201526084016104db565b6001600160a01b038216600090815260208190526040902054818110156111ca5760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b60648201526084016104db565b6001600160a01b0383166000818152602081815260408083208686039055600280548790039055518581529192917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9101610cb2565b6001600160a01b03811660009081526005602052604090208054600181018255905b50919050565b6000610495611255610e64565b8360405161190160f01b6020820152602281018390526042810182905260009060620160405160208183030381529060405280519060200120905092915050565b60008060006112a7878787876112be565b915091506112b481611382565b5095945050505050565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08311156112f55750600090506003611379565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015611349573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b03811661137257600060019250925050611379565b9150600090505b94509492505050565b600081600481111561139657611396611852565b0361139e5750565b60018160048111156113b2576113b2611852565b036113ff5760405162461bcd60e51b815260206004820152601860248201527f45434453413a20696e76616c6964207369676e6174757265000000000000000060448201526064016104db565b600281600481111561141357611413611852565b036114605760405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e6774680060448201526064016104db565b600381600481111561147457611474611852565b03610afd5760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604482015261756560f01b60648201526084016104db565b600060208083528351808285015260005b818110156114f9578581018301518582016040015282016114dd565b506000604082860101526040601f19601f8301168501019250505092915050565b80356001600160a01b038116811461153157600080fd5b919050565b6000806040838503121561154957600080fd5b6115528361151a565b946020939093013593505050565b60008060006060848603121561157557600080fd5b61157e8461151a565b925061158c6020850161151a565b9150604084013590509250925092565b600080600080600080600060e0888a0312156115b757600080fd5b6115c08861151a565b96506115ce6020890161151a565b95506040880135945060608801359350608088013560ff811681146115f257600080fd5b9699959850939692959460a0840135945060c09093013592915050565b60006020828403121561162157600080fd5b61162a8261151a565b9392505050565b6000806000806060858703121561164757600080fd5b6116508561151a565b935060208501359250604085013567ffffffffffffffff8082111561167457600080fd5b818701915087601f83011261168857600080fd5b81358181111561169757600080fd5b8860208285010111156116a957600080fd5b95989497505060200194505050565b600080604083850312156116cb57600080fd5b6116d48361151a565b91506116e26020840161151a565b90509250929050565b600181811c908216806116ff57607f821691505b60208210810361124257634e487b7160e01b600052602260045260246000fd5b602080825260409082018190527f444c4c523a20496e76616c696420616464726573732e2043616e6e6f74207472908201527f616e7366657220444c4c5220746f20746865206e756c6c20616464726573732e606082015260800190565b634e487b7160e01b600052601160045260246000fd5b818103818111156104955761049561177d565b808201808211156104955761049561177d565b60208082526025908201527f444c4c523a756e617574686f72697a6564204d61737365744d616e616765722060408201526470726f787960d81b606082015260800190565b6001600160a01b038681168252602082018690528416604082015260806060820181905281018290526000828460a0840137600060a0848401015260a0601f19601f85011683010190509695505050505050565b634e487b7160e01b600052602160045260246000fdfea2646970667358221220ce7f569cb8e0a0ea0224c50190007dcdf6e9dbc54f0906f9189102e1a638e56864736f6c63430008110033";
const isSuperArgs = (xs) => xs.length > 1;
class MockMetaAssetToken__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    deploy(_tokenName, _symbol, _massetManagerImplementation, _basketManagerImplementation, overrides) {
        return super.deploy(_tokenName, _symbol, _massetManagerImplementation, _basketManagerImplementation, overrides || {});
    }
    getDeployTransaction(_tokenName, _symbol, _massetManagerImplementation, _basketManagerImplementation, overrides) {
        return super.getDeployTransaction(_tokenName, _symbol, _massetManagerImplementation, _basketManagerImplementation, overrides || {});
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
exports.MockMetaAssetToken__factory = MockMetaAssetToken__factory;
MockMetaAssetToken__factory.bytecode = _bytecode;
MockMetaAssetToken__factory.abi = _abi;
//# sourceMappingURL=MockMetaAssetToken__factory.js.map