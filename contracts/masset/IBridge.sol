// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/**
 * @title IBridge
 * @dev Interface of the bridge. Bridge is used to exchange basset tokens from another blockchains.
 */

interface IBridge {
    /**
     * @dev Returns the version.
     */
    function version() external pure returns (string memory);

    /**
     * @dev Returns the fee percentage.
     */
    function getFeePercentage() external view returns (uint);

    /**
     * @dev Calculates maximal withdraw.
     */
    function calcMaxWithdraw() external view returns (uint);

    /**
     * @dev ERC-20 tokens approve and transferFrom pattern
     * See https://eips.ethereum.org/EIPS/eip-20#transferfrom for details.
     */
    function receiveTokens(address tokenToUse, uint256 amount) external returns (bool);

    /**
     * @dev ERC-20 tokens approve and transferFrom pattern
     * See https://eips.ethereum.org/EIPS/eip-20#transferfrom for details.
     */
    function receiveTokensAt(
        address tokenToUse,
        uint256 amount,
        address receiver,
        bytes calldata extraData
    ) external returns (bool);

    /**
     * @dev ERC-777 tokensReceived hook allows to send tokens to a contract and notify it in a single transaction
     * See https://eips.ethereum.org/EIPS/eip-777#motivation for details.
     */
    function tokensReceived(
        address operator,
        address from,
        address to,
        uint256 amount,
        bytes calldata userData,
        bytes calldata operatorData
    ) external;

    /**
     * @dev Accepts the transaction from the other chain that was voted and sent by the federation contract.
     * @return Returns a boolean value indicating whether transfer was accepted.
     */
    function acceptTransfer(
        address originalTokenAddress,
        address receiver,
        uint256 amount,
        string calldata symbol,
        bytes32 blockHash,
        bytes32 transactionHash,
        uint32 logIndex,
        uint8 decimals,
        uint256 granularity
    ) external returns (bool);

    /**
     * @dev Accepts the transaction from the other chain that was voted and sent by the federation contract.
     * @return Returns a boolean value indicating whether transfer was accepted.
     */
    function acceptTransferAt(
        address originalTokenAddress,
        address receiver,
        uint256 amount,
        string calldata symbol,
        bytes32 blockHash,
        bytes32 transactionHash,
        uint32 logIndex,
        uint8 decimals,
        uint256 granularity,
        bytes calldata userData
    ) external returns (bool);

    /**
     * @dev Emitted when cross occured.
     */
    event Cross(
        address indexed _tokenAddress,
        address indexed _to,
        uint256 _amount,
        string _symbol,
        bytes _userData,
        uint8 _decimals,
        uint256 _granularity
    );

    /**
     * @dev Emitted when new side token is deployed.
     */
    event NewSideToken(
        address indexed _newSideTokenAddress,
        address indexed _originalTokenAddress,
        string _newSymbol,
        uint256 _granularity
    );

    /**
     * @dev Emitted when cross transfer is accepted.
     */
    event AcceptedCrossTransfer(
        address indexed _tokenAddress,
        address indexed _to,
        uint256 _amount,
        uint8 _decimals,
        uint256 _granularity,
        uint256 _formattedAmount,
        uint8 _calculatedDecimals,
        uint256 _calculatedGranularity,
        bytes _userData
    );

    /**
     * @dev Emitted when fee percentage has changed.
     */
    event FeePercentageChanged(uint256 _amount);

    /**
     * @dev Emitted when error while receiving token occured.
     */
    event ErrorTokenReceiver(bytes _errorData);
}
