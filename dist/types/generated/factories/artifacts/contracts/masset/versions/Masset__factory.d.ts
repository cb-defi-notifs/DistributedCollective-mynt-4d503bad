import { Signer, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type { Masset, MassetInterface } from "../../../../../artifacts/contracts/masset/versions/Masset";
type MassetConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class Masset__factory extends ContractFactory {
    constructor(...args: MassetConstructorParams);
    deploy(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<Masset>;
    getDeployTransaction(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): TransactionRequest;
    attach(address: string): Masset;
    connect(signer: Signer): Masset__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b50611cca806100206000396000f3fe608060405234801561001057600080fd5b50600436106100f45760003560e01c8063715018a611610097578063e4bbb5a811610066578063e4bbb5a8146101e6578063eeea5d36146101f9578063f2fde38b1461020a578063fb2c92231461021d57600080fd5b8063715018a6146101a75780638da5cb5b146101af578063960015a2146101c0578063c4a58637146101d357600080fd5b80631e9a6950116100d35780631e9a69501461014957806321df0da71461015c57806340c10f1914610181578063438b1b4b1461019457600080fd5b806223de29146100f95780630b8aad071461010e5780630d8e6e2c14610134575b600080fd5b61010c6101073660046116d5565b610230565b005b61012161011c366004611786565b61027f565b6040519081526020015b60405180910390f35b61013c6102aa565b60405161012b919061181f565b610121610157366004611832565b61033c565b6099546001600160a01b03165b6040516001600160a01b03909116815260200161012b565b61012161018f366004611832565b610365565b6101216101a236600461185e565b61037a565b61010c6103a2565b6033546001600160a01b0316610169565b6101216101ce36600461185e565b6103b6565b61010c6101e13660046118a0565b6103cd565b61010c6101f436600461190a565b6107ea565b6098546001600160a01b0316610169565b61010c61021836600461194a565b610a64565b61012161022b36600461185e565b610add565b7fa693010e29186da1ce1e8a9fdf6619831117e41c17cbb8927787b66b35627be6888888888888888860405161026d989796959493929190611990565b60405180910390a15050505050505050565b6000610289610af4565b6102968585856001610b4d565b90506102a26001606555565b949350505050565b6060609780546102b9906119ee565b80601f01602080910402602001604051908101604052809291908181526020018280546102e5906119ee565b80156103325780601f1061030757610100808354040283529160200191610332565b820191906000526020600020905b81548152906001019060200180831161031557829003601f168201915b5050505050905090565b6000610346610af4565b6103538383336000610b4d565b905061035f6001606555565b92915050565b600061036f610af4565b6103538383336110e1565b6000610384610af4565b61038f8484846110e1565b905061039b6001606555565b9392505050565b6103aa611463565b6103b460006114bd565b565b60006103c0610af4565b61038f8484846001610b4d565b6103d5610af4565b336001600160a01b03167fc00ef8ea79854d25cda161b949dfe54da4ddf385ef9cf6faaab7c6f9e8d9b3ac858585856040516104149493929190611a28565b60405180910390a2600084116104665760405162461bcd60e51b81526020600482015260126024820152710616d6f756e74206d757374206265203e20360741b60448201526064015b60405180910390fd5b60006104a783838080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061150f92505050565b60985460405163f44c7c8f60e01b81526001600160a01b0380881660048301529293508692600092169063f44c7c8f90602401602060405180830381865afa1580156104f7573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061051b9190611a5d565b9050336001600160a01b0382161461056c5760405162461bcd60e51b81526020600482015260146024820152731bdb9b1e48189c9a5919d9481b585e4818d85b1b60621b604482015260640161045d565b60985460405163d80f5a8760e01b81526001600160a01b0384811660048301529091169063d80f5a8790602401602060405180830381865afa1580156105b6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105da9190611a7a565b6105f65760405162461bcd60e51b815260040161045d90611a97565b6098546040516354f8177f60e11b81526001600160a01b039091169063a9f02efe906106289085908b90600401611abf565b602060405180830381865afa158015610645573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106699190611a7a565b6106ad5760405162461bcd60e51b81526020600482015260156024820152746261736b6574206f7574206f662062616c616e636560581b604482015260640161045d565b609854604051631af327bd60e01b81526000916001600160a01b031690631af327bd906106e09086908c90600401611abf565b602060405180830381865afa1580156106fd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107219190611ad8565b6099546040516340c10f1960e01b81529192506001600160a01b0316906340c10f19906107549087908590600401611abf565b600060405180830381600087803b15801561076e57600080fd5b505af1158015610782573d6000803e3d6000fd5b5050604080518481526001600160a01b0387811660208301529181018c905290871692503391507f30873c596f54a2e2e09894670d7e1a48b2433c00204f81fbedf557353c36e7c79060600160405180910390a3505050506107e46001606555565b50505050565b600054610100900460ff161580801561080a5750600054600160ff909116105b806108245750303b158015610824575060005460ff166001145b6108875760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b606482015260840161045d565b6000805460ff1916600117905580156108aa576000805461ff0019166101001790555b6098546001600160a01b03161580156108cc57506099546001600160a01b0316155b61090e5760405162461bcd60e51b8152602060048201526013602482015272185b1c9958591e481a5b9a5d1a585b1a5e9959606a1b604482015260640161045d565b6001600160a01b03841661095d5760405162461bcd60e51b815260206004820152601660248201527534b73b30b634b2103130b9b5b2ba1036b0b730b3b2b960511b604482015260640161045d565b6001600160a01b0383166109a35760405162461bcd60e51b815260206004820152600d60248201526c34b73b30b634b2103a37b5b2b760991b604482015260640161045d565b6109ab61158a565b6109b36115ba565b609880546001600160a01b038087166001600160a01b031992831617909255609980549286169290911691909117905581156109f1576109f16115e1565b6040805180820190915260038152620312e360ec1b6020820152609790610a189082611b56565b5080156107e4576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a150505050565b610a6c611463565b6001600160a01b038116610ad15760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840161045d565b610ada816114bd565b50565b6000610ae7610af4565b61038f8484846000610b4d565b600260655403610b465760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00604482015260640161045d565b6002606555565b60006001600160a01b038316610ba15760405162461bcd60e51b81526020600482015260196024820152781b5d5cdd0818994818481d985b1a59081c9958da5c1a595b9d603a1b604482015260640161045d565b60008411610c005760405162461bcd60e51b815260206004820152602660248201527f6d6173736574207175616e74697479206d75737420626520677265617465722060448201526507468616e20360d41b606482015260840161045d565b60985460405163d80f5a8760e01b81526001600160a01b0387811660048301529091169063d80f5a8790602401602060405180830381865afa158015610c4a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c6e9190611a7a565b610c8a5760405162461bcd60e51b815260040161045d90611a97565b609854604051635ac9946160e01b81526000916001600160a01b031690635ac9946190610cbd9089908990600401611abf565b602060405180830381865afa158015610cda573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cfe9190611ad8565b60985460405163c7bbc86560e01b81529192506001600160a01b03169063c7bbc86590610d319089908590600401611abf565b602060405180830381865afa158015610d4e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d729190611a7a565b610daf5760405162461bcd60e51b815260206004820152600e60248201526d1a5b9d985b1a590818985cdad95d60921b604482015260640161045d565b8215610fa95760985460405163f44c7c8f60e01b81526001600160a01b038881166004830152600092169063f44c7c8f90602401602060405180830381865afa158015610e00573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e249190611a5d565b90506001600160a01b038116610e6d5760405162461bcd60e51b815260206004820152600e60248201526d696e76616c69642062726964676560901b604482015260640161045d565b60405163095ea7b360e01b81526001600160a01b0388169063095ea7b390610e9b9084908690600401611abf565b6020604051808303816000875af1158015610eba573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ede9190611a7a565b50604080516020810182526000815290516303f2e9b160e51b81526001600160a01b03831691637e5d362091610f1c918b9187918b91600401611c16565b6020604051808303816000875af1158015610f3b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f5f9190611a7a565b610fa35760405162461bcd60e51b815260206004820152601560248201527418d85b1b081d1bc8189c9a5919d94819985a5b1959605a1b604482015260640161045d565b5061101c565b60405163a9059cbb60e01b81526001600160a01b0387169063a9059cbb90610fd79087908590600401611abf565b6020604051808303816000875af1158015610ff6573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061101a9190611a7a565b505b609954604051632770a7eb60e21b81526001600160a01b0390911690639dc29fac9061104e9033908990600401611abf565b600060405180830381600087803b15801561106857600080fd5b505af115801561107c573d6000803e3d6000fd5b5050604080518881526001600160a01b038a8116602083015291810185905290871692503391507fa0dde38365e7863fcda1e12536206bc5ab0b7074a66a441e866145cf3d07fc249060600160405180910390a35092949350505050565b6001606555565b60006001600160a01b0382166111355760405162461bcd60e51b81526020600482015260196024820152781b5d5cdd0818994818481d985b1a59081c9958da5c1a595b9d603a1b604482015260640161045d565b6000831161117e5760405162461bcd60e51b815260206004820152601660248201527507175616e74697479206d757374206e6f7420626520360541b604482015260640161045d565b60985460405163d80f5a8760e01b81526001600160a01b0386811660048301529091169063d80f5a8790602401602060405180830381865afa1580156111c8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111ec9190611a7a565b6112085760405162461bcd60e51b815260040161045d90611a97565b6098546040516354f8177f60e11b81526001600160a01b039091169063a9f02efe9061123a9087908790600401611abf565b602060405180830381865afa158015611257573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061127b9190611a7a565b6112b85760405162461bcd60e51b815260206004820152600e60248201526d1a5b9d985b1a590818985cdad95d60921b604482015260640161045d565b609854604051631af327bd60e01b81526000916001600160a01b031690631af327bd906112eb9088908890600401611abf565b602060405180830381865afa158015611308573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061132c9190611ad8565b6040516323b872dd60e01b8152336004820152306024820152604481018690529091506001600160a01b038616906323b872dd906064016020604051808303816000875af1158015611382573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113a69190611a7a565b506099546040516340c10f1960e01b81526001600160a01b03909116906340c10f19906113d99086908590600401611abf565b600060405180830381600087803b1580156113f357600080fd5b505af1158015611407573d6000803e3d6000fd5b5050604080518481526001600160a01b03898116602083015291810188905290861692503391507f30873c596f54a2e2e09894670d7e1a48b2433c00204f81fbedf557353c36e7c79060600160405180910390a3949350505050565b6033546001600160a01b031633146103b45760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161045d565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600080828060200190518101906115269190611a5d565b90506001600160a01b03811661035f5760405162461bcd60e51b815260206004820152602360248201527f436f6e7665727465723a204572726f72206465636f64696e672065787472614460448201526261746160e81b606482015260840161045d565b600054610100900460ff166115b15760405162461bcd60e51b815260040161045d90611c49565b6103b4336114bd565b600054610100900460ff166110da5760405162461bcd60e51b815260040161045d90611c49565b6040516329965a1d60e01b815230600482018190527fb281fc8c12954d22544db45de3159a39272895b169a852b314f9cc762e44c53b60248301526044820152731820a4b7618bde71dce8cdc73aab6c95905fad249081906329965a1d90606401600060405180830381600087803b15801561165c57600080fd5b505af1158015611670573d6000803e3d6000fd5b5050505050565b6001600160a01b0381168114610ada57600080fd5b60008083601f84011261169e57600080fd5b50813567ffffffffffffffff8111156116b657600080fd5b6020830191508360208285010111156116ce57600080fd5b9250929050565b60008060008060008060008060c0898b0312156116f157600080fd5b88356116fc81611677565b9750602089013561170c81611677565b9650604089013561171c81611677565b955060608901359450608089013567ffffffffffffffff8082111561174057600080fd5b61174c8c838d0161168c565b909650945060a08b013591508082111561176557600080fd5b506117728b828c0161168c565b999c989b5096995094979396929594505050565b6000806000806080858703121561179c57600080fd5b84356117a781611677565b93506020850135925060408501356117be81611677565b915060608501356117ce81611677565b939692955090935050565b6000815180845260005b818110156117ff576020818501810151868301820152016117e3565b506000602082860101526020601f19601f83011685010191505092915050565b60208152600061039b60208301846117d9565b6000806040838503121561184557600080fd5b823561185081611677565b946020939093013593505050565b60008060006060848603121561187357600080fd5b833561187e81611677565b925060208401359150604084013561189581611677565b809150509250925092565b600080600080606085870312156118b657600080fd5b8435935060208501356118c881611677565b9250604085013567ffffffffffffffff8111156118e457600080fd5b6118f08782880161168c565b95989497509550505050565b8015158114610ada57600080fd5b60008060006060848603121561191f57600080fd5b833561192a81611677565b9250602084013561193a81611677565b91506040840135611895816118fc565b60006020828403121561195c57600080fd5b813561039b81611677565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b6001600160a01b0389811682528881166020830152871660408201526060810186905260c0608082018190526000906119cc9083018688611967565b82810360a08401526119df818587611967565b9b9a5050505050505050505050565b600181811c90821680611a0257607f821691505b602082108103611a2257634e487b7160e01b600052602260045260246000fd5b50919050565b8481526001600160a01b0384166020820152606060408201819052600090611a539083018486611967565b9695505050505050565b600060208284031215611a6f57600080fd5b815161039b81611677565b600060208284031215611a8c57600080fd5b815161039b816118fc565b6020808252600e908201526d1a5b9d985b1a590818985cdcd95d60921b604082015260600190565b6001600160a01b03929092168252602082015260400190565b600060208284031215611aea57600080fd5b5051919050565b634e487b7160e01b600052604160045260246000fd5b601f821115611b5157600081815260208120601f850160051c81016020861015611b2e5750805b601f850160051c820191505b81811015611b4d57828155600101611b3a565b5050505b505050565b815167ffffffffffffffff811115611b7057611b70611af1565b611b8481611b7e84546119ee565b84611b07565b602080601f831160018114611bb95760008415611ba15750858301515b600019600386901b1c1916600185901b178555611b4d565b600085815260208120601f198616915b82811015611be857888601518255948401946001909101908401611bc9565b5085821015611c065787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b6001600160a01b0385811682526020820185905283166040820152608060608201819052600090611a53908301846117d9565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b60608201526080019056fea2646970667358221220f020bce9f3cc66b397629d5a74bd29c7bba4c1e19f88bc3d083b9747737dda7764736f6c63430008110033";
    static readonly abi: readonly [{
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
            readonly name: "minter";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "recipient";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "massetQuantity";
            readonly type: "uint256";
        }, {
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "bAsset";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "bassetQuantity";
            readonly type: "uint256";
        }];
        readonly name: "Minted";
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
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "redeemer";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "recipient";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "massetQuantity";
            readonly type: "uint256";
        }, {
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "bAsset";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "bassetQuantity";
            readonly type: "uint256";
        }];
        readonly name: "Redeemed";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "sender";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "orderAmount";
            readonly type: "uint256";
        }, {
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "tokenAddress";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "bytes";
            readonly name: "userData";
            readonly type: "bytes";
        }];
        readonly name: "onTokensMintedCalled";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "operator";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "from";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }, {
            readonly indexed: false;
            readonly internalType: "bytes";
            readonly name: "userData";
            readonly type: "bytes";
        }, {
            readonly indexed: false;
            readonly internalType: "bytes";
            readonly name: "operatorData";
            readonly type: "bytes";
        }];
        readonly name: "onTokensReceivedCalled";
        readonly type: "event";
    }, {
        readonly inputs: readonly [];
        readonly name: "getBasketManager";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "getToken";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "getVersion";
        readonly outputs: readonly [{
            readonly internalType: "string";
            readonly name: "";
            readonly type: "string";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "_basketManagerAddress";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "_tokenAddress";
            readonly type: "address";
        }, {
            readonly internalType: "bool";
            readonly name: "_registerAsERC777RecipientFlag";
            readonly type: "bool";
        }];
        readonly name: "initialize";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "_bAsset";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "_bAssetQuantity";
            readonly type: "uint256";
        }];
        readonly name: "mint";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "massetMinted";
            readonly type: "uint256";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "_bAsset";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "_bAssetQuantity";
            readonly type: "uint256";
        }, {
            readonly internalType: "address";
            readonly name: "_recipient";
            readonly type: "address";
        }];
        readonly name: "mintTo";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "massetMinted";
            readonly type: "uint256";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "_orderAmount";
            readonly type: "uint256";
        }, {
            readonly internalType: "address";
            readonly name: "_tokenAddress";
            readonly type: "address";
        }, {
            readonly internalType: "bytes";
            readonly name: "_userData";
            readonly type: "bytes";
        }];
        readonly name: "onTokensMinted";
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
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "_bAsset";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "_massetQuantity";
            readonly type: "uint256";
        }];
        readonly name: "redeem";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "massetRedeemed";
            readonly type: "uint256";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "_bAsset";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "_massetQuantity";
            readonly type: "uint256";
        }, {
            readonly internalType: "address";
            readonly name: "_recipient";
            readonly type: "address";
        }];
        readonly name: "redeemTo";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "massetRedeemed";
            readonly type: "uint256";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "_basset";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "_massetQuantity";
            readonly type: "uint256";
        }, {
            readonly internalType: "address";
            readonly name: "_recipient";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "_bridgeAddress";
            readonly type: "address";
        }];
        readonly name: "redeemToBridge";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "massetRedeemed";
            readonly type: "uint256";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "_basset";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "_massetQuantity";
            readonly type: "uint256";
        }, {
            readonly internalType: "address";
            readonly name: "_recipient";
            readonly type: "address";
        }];
        readonly name: "redeemToBridge";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "massetRedeemed";
            readonly type: "uint256";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "renounceOwnership";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "_operator";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "_from";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "_to";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "_amount";
            readonly type: "uint256";
        }, {
            readonly internalType: "bytes";
            readonly name: "_userData";
            readonly type: "bytes";
        }, {
            readonly internalType: "bytes";
            readonly name: "_operatorData";
            readonly type: "bytes";
        }];
        readonly name: "tokensReceived";
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
    static createInterface(): MassetInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): Masset;
}
export {};
