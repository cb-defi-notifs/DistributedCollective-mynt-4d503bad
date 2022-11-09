pragma solidity ^0.5.17;

import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";
import "../interfaces/IApproveAndCall.sol";
import "../interfaces/IProxy.sol";
import "../shared/ERC20Permit.sol";

/**
 * @title Token
 * @dev Implementation of staking Token.
 * Inherits from ERC20 and ERC20Detailed with implemented
 * mint and burn functions.
 */

contract MetaAssetToken is ERC20Permit, ERC20Detailed, Ownable {
    // events

    /**
     * @dev Emitted when mAsset config is changed.
     * @param _newAssetProxy                    Address of new mAsset proxy.
     */
    event AssetProxyChanged(address indexed _newAssetProxy);

    /**
     * @dev Emitted when Basket Manager config is changed.
     * @param _newBasketManagerProxy                    Address of new Basket Manager proxy.
     */
    event BasketManagerProxyChanged(address indexed _newBasketManagerProxy);

    // state

    address public assetProxy;
    address public basketManagerProxy;

    // modifiers
    modifier onlyAssetProxy() {
      require(msg.sender == assetProxy, "MetaAsset:unauthorized mAsset proxy");
      _;
    }

    modifier requireValidRecipient(address _recipient) {
        require(
            _recipient != address(0) && _recipient != address(this),
            "MetaAsset: Invalid address. Cannot transfer MetaAsset directly to the MetaAsset contract or the null address"
        );

        address assetImplementation = assetImplementation();
        address basketManagerImplementation = basketManagerImplementation();
        require(
            _recipient != assetProxy && _recipient != assetImplementation && _recipient != basketManagerProxy && _recipient != basketManagerImplementation,
            "MetaAsset: Invalid address. Cannot transfer MetaAsset directly to a Sovryn protocol address"
        );

        _;
    }

    /**
     * @notice Constructor called on deployment, initiates the contract.
     */
    constructor(string memory _tokenName, string memory _symbol) public ERC20Detailed(_tokenName, _symbol, 18) {}

    /**
     * @dev getter function of asset implementation address
     *
     * @return asset implementation address
     */
    function assetImplementation() public view returns(address) {
        return IProxy(assetProxy).implementation();
    }

    /**
     * @dev getter function of basket manager implementation address
     *
     * @return basket manager implementation address
     */
    function basketManagerImplementation() public view returns(address) {
        return IProxy(basketManagerProxy).implementation();
    }

    /**
     * @notice setAssetConfig sets the mAsset proxy address
     * @param _assetProxy The address of the mAsset proxy contract
     */
    function setAssetProxy(address _assetProxy) external onlyOwner {
        require(_assetProxy != address(0), "invalid address");
        assetProxy = _assetProxy;

        emit AssetProxyChanged(assetProxy);
    }

     /**
     * @notice setBasketManagerConfig sets the Basket Manager proxy address
     * @param _basketManagerProxy The address of the Basket Manager proxy contract
     */
    function setBasketManagerProxy(address _basketManagerProxy) external onlyOwner {
        require(_basketManagerProxy != address(0), "invalid address");
        basketManagerProxy = _basketManagerProxy;
        emit BasketManagerProxyChanged(basketManagerProxy);
    }

    /**
     * @notice Creates new tokens and sends them to the recipient.
     * @notice Can be minted only by the mAsset proxy contract.
     *
     * @param _account The recipient address to get the minted tokens.
     * @param _amount The amount of tokens to be minted.
     */
    function mint(address _account, uint256 _amount) external onlyAssetProxy {
        _mint(_account, _amount);
    }

    /**
     * @notice Burns tokens for the given account.
     * @notice Can be burned only by the mAsset proxy contract.
     *
     * @param _account The recipient address to get the minted tokens.
     * @param _amount The amount of tokens to be minted.
     */
    function burn(address _account, uint256 _amount) external onlyAssetProxy {
        _burn(_account, _amount);
    }

    /**
     * @notice Only owner who can transfer the token.
     * @notice destination cannot be:
     * - Zero address.
     * - DDLR contract address.
     * - Sovryn mAsset proxy & implementation address.
     * - Sovryn Basket Manager proxy & implementation address.
     *
     * @param _recipient Recipient of the token.
     * @param _amount The amount of token that will be transferred.
     *
     * @return true / false.
     */
    function transfer(address _recipient, uint256 _amount) public requireValidRecipient(_recipient) returns (bool) {
        _transfer(_msgSender(), _recipient, _amount);
        return true;
    }

    /**
     * @notice Only owner who can transfer the token.
     * @notice destination cannot be:
     * - Zero address.
     * - DDLR contract address.
     * - Sovryn mAsset proxy & implementation address.
     * - Sovryn Basket Manager proxy & implementation address.
     *
     * @param _from Sender of the token.
     * @param _to Recipient of the token.
     * @param _amount The amount of token that will be transferred.
     *
     * @return true / false.
     */
    function transferFrom(address _from, address _to, uint256 _amount) public requireValidRecipient(_to) returns (bool) {
        _approve(
            _from,
            msg.sender,
            allowance(_from, msg.sender).sub(_amount, "ERC20: transfer amount exceeds allowance")
        );
        _transfer(_from, _to, _amount);
        return true;
    }

    /**
     * @notice transfer utilizing EIP-2612, to reduce the additional sending transaction for doing the approval to the spender.
     *
     * @notice destination cannot be:
     * - Zero address.
     * - DDLR contract address.
     * - Sovryn mAsset proxy & implementation address.
     * - Sovryn Basket Manager proxy & implementation address.
     *
     * @dev By calling this function, the allowance will be overwritten by the total amount.
     *
     * @param _from Sender of the token.
     * @param _to Recipient of the token.
     * @param _amount The amount of the token that will be transferred.
     * @param _deadline Expiration time of the signature.
     * @param _v Last 1 byte of ECDSA signature.
     * @param _r First 32 bytes of ECDSA signature.
     * @param _s 32 bytes after _r in ECDSA signature.
     */
    function transferWithPermit(address _from, address _to, uint256 _amount, uint256 _deadline, uint8 _v, bytes32 _r, bytes32 _s) external requireValidRecipient(_to) {
        permit(_from, msg.sender, _amount, _deadline, _v, _r, _s);
        transferFrom(_from, _to, _amount);
    }

    /**
     * @notice Approves and then calls the receiving contract.
     * Useful to encapsulate sending tokens to a contract in one call.
     * Solidity has no native way to send tokens to contracts.
     * ERC-20 tokens require approval to be spent by third parties, such as a contract in this case.
     * @param _spender The contract address to spend the tokens.
     * @param _amount The amount of tokens to be sent.
     * @param _data Parameters for the contract call, such as endpoint signature.
     */
    function approveAndCall(
        address _spender,
        uint256 _amount,
        bytes calldata _data
    ) external {
        approve(_spender, _amount);
        IApproveAndCall(_spender).receiveApproval(msg.sender, _amount, address(this), _data);
    }
}
