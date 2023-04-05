// const hre = require("hardhat");
/* const {
    deployments: { deploy, get, log },
    getNamedAccounts,
    ethers,
} = hre; */

/// @dev This file requires HardhatRuntimeEnvironment `hre` variable in its parent context for functions using hre to work
import col from "cli-color";
import { arrayToUnique } from "./utils";

const getStakingModulesNames = () => {
  return {
    StakingAdminModule: "StakingAdminModule",
    StakingGovernanceModule: "StakingGovernanceModule",
    StakingStakeModule: "StakingStakeModule",
    StakingStorageModule: "StakingStorageModule",
    StakingVestingModule: "StakingVestingModule",
    StakingWithdrawModule: "StakingWithdrawModule",
    WeightedStakingModule: "WeightedStakingModule",
  };
};

const stakingRegisterModuleWithMultisig = () => {
  return process.env.STAKING_REG_WITH_MULTISIG == "true";
};

const isMultisigOwner = async (multisigAddress, checkAddress) => {
  const multisig = await ethers.getContractAt(
    "MultiSigWallet",
    multisigAddress
  );
  return await multisig.isOwner(checkAddress);
};

const multisigAddOwner = async (addAddress, sender) => {
  const {
    ethers,
    getNamedAccounts,
    deployments: { get },
  } = hre;
  const multisigDeployment = await get("MultiSigWallet");
  const multisigInterface = new ethers.utils.Interface(multisigDeployment.abi);
  const data = multisigInterface.encodeFunctionData("addOwner", [addAddress]);
  /// @todo check if the deployer is one of ms owners
  console.log(`creating multisig tx to add new owner ${addAddress}...`);
  await sendWithMultisig(
    multisigDeployment.address,
    multisigDeployment.address,
    data,
    sender
  );
  console.log(
    col.bgBlue(
      `>>> DONE. Requires Multisig (${multisigDeployment.address}) signing to execute tx <<<`
    )
  );
};

const multisigRemoveOwner = async (removeAddress, sender) => {
  const {
    ethers,
    getNamedAccounts,
    deployments: { get },
  } = hre;
  const multisigDeployment = await get("MultiSigWallet");
  const multisigInterface = new ethers.utils.Interface(multisigDeployment.abi);
  const data = multisigInterface.encodeFunctionData("removeOwner", [
    removeAddress,
  ]);
  console.log(`creating multisig tx to remove owner ${removeAddress}...`);
  await sendWithMultisig(
    multisigDeployment.address,
    multisigDeployment.address,
    data,
    sender
  );
  console.log(
    col.bgBlue(
      `>>> DONE. Requires Multisig (${multisigDeployment.address}) signing to execute tx <<<`
    )
  );
};

const sendWithMultisig = async (
  multisigAddress,
  contractAddress,
  data,
  sender,
  value = 0
) => {
  const { ethers } = hre;
  const signer = await ethers.getSigner(sender);
  const multisig = await ethers.getContractAt(
    "MultiSigWallet",
    multisigAddress,
    signer
  );
  const gasEstimated = (
    await multisig.estimateGas.submitTransaction(contractAddress, value, data)
  ).toNumber();
  receipt = await (
    await multisig.submitTransaction(contractAddress, value, data, {
      gasLimit: Math.round(gasEstimated * 1.3),
    })
  ).wait();

  const abi = ["event Submission(uint256 indexed transactionId)"];
  const iface = new ethers.utils.Interface(abi);
  const parsedEvent = await getParsedEventLogFromReceipt(
    receipt,
    iface,
    "Submission"
  );
  await multisigCheckTx(parsedEvent.transactionId.value, multisig.address);
};

const signWithMultisig = async (multisigAddress, txId, sender) => {
  const { ethers, getNamedAccounts } = hre;
  console.log("Signing multisig txId...", txId);
  const signer = await ethers.getSigner(sender);
  const multisig = await ethers.getContractAt(
    "MultiSigWallet",
    multisigAddress,
    signer
  );
  const gasEstimated = (
    await multisig.estimateGas.confirmTransaction(txId)
  ).toNumber();
  /*
    receipt = await (
        await multisig.confirmTransaction(txId, { gasLimit: Math.round(gasEstimated * 1.3) })
    ).wait();
    // console.log("Required signatures:", await multisig.required());
    console.log("Signed. Details:");
    await multisigCheckTx(txId, multisig.address);
    */
  console.log("Estimated Gas:", gasEstimated);
  const lastBlock = await ethers.provider.getBlock();
  const lastBlockGasLimit = lastBlock.gasLimit.toNumber();
  console.log("Last Block Gas Limit:", lastBlockGasLimit);
  const gasEstimatedMul = gasEstimated * 1.5;

  let receipt;
  let wontSign = false;
  if (gasEstimatedMul < lastBlockGasLimit) {
    try {
      await multisig.callStatic.confirmTransaction(txId, { gasEstimatedMul });
      receipt = await (
        await multisig.confirmTransaction(txId, { gasEstimatedMul })
      ).wait();
    } catch (e) {
      wontSign = true;
    }
  }
  if (wontSign || gasEstimatedMul >= lastBlockGasLimit) {
    receipt = await (
      await multisig.confirmTransaction(txId, { gasLimit: lastBlockGasLimit })
    ).wait();
  }

  console.log(
    col.yellowBright(
      "==============================================================================="
    )
  );
  console.log(col.greenBright("DONE. Details:"));
  console.log("Tx hash:", receipt.transactionHash);
  console.log("Gas used:", receipt.gasUsed.toNumber());
  await multisigCheckTx(txId, multisig.address);
  console.log(
    col.yellowBright(
      "==============================================================================="
    )
  );
};

const multisigCheckTx = async (
  txId,
  multisigAddress = ethers.constants.ADDRESS_ZERO
) => {
  const {
    ethers,
    deployments: { get },
  } = hre;
  const multisig = await ethers.getContractAt(
    "MultiSigWallet",
    multisigAddress == ethers.constants.ADDRESS_ZERO
      ? (
          await get("MultiSigWallet")
        ).address
      : multisigAddress
  );
  const transaction = await multisig.transactions(txId);
  console.log(
    "TX { ID: ",
    txId,
    ", Data: ",
    transaction.data,
    ", Value: ",
    transaction.value.toString(),
    ", Destination: ",
    transaction.destination,
    ", Confirmations: ",
    (await multisig.getConfirmationCount(txId)).toNumber(),
    ", Executed:",
    transaction.executed,
    ", Confirmed by:",
    await multisig.getConfirmations(txId),
    "}"
  );
};

const multisigRevokeConfirmation = async (
  txId,
  sender,
  multisigAddress = ethers.constants.ADDRESS_ZERO
) => {
  const {
    ethers,
    deployments: { get },
  } = hre;
  const signer = await ethers.getSigner(sender);
  const multisig = await ethers.getContractAt(
    "MultiSigWallet",
    multisigAddress == ethers.constants.ADDRESS_ZERO
      ? (
          await get("MultiSigWallet")
        ).address
      : multisigAddress,
    signer
  );
  console.log("Revoking confirmation of txId", txId, "...");
  receipt = await (await multisig.revokeConfirmation(txId)).wait();
  // console.log("Required signatures:", await multisig.required());
  console.log(`Confirmation of txId ${txId} revoked.`);
  console.log("Details:");
  await multisigCheckTx(txId, multisig.address);
};

const multisigExecuteTx = async (
  txId,
  sender,
  multisigAddress = ethers.constants.ADDRESS_ZERO
) => {
  const {
    ethers,
    deployments: { get },
  } = hre;
  const signer = await ethers.getSigner(sender);
  const multisig = await ethers.getContractAt(
    "MultiSigWallet",
    multisigAddress == ethers.constants.ADDRESS_ZERO
      ? (
          await get("MultiSigWallet")
        ).address
      : multisigAddress,
    signer
  );
  console.log("Executing multisig txId", txId, "...");
  const gasEstimated = (
    await multisig.estimateGas.executeTransaction(txId)
  ).toNumber();
  console.log("Estimated Gas:", gasEstimated);
  const lastBlock = await ethers.provider.getBlock();
  const lastBlockGasLimit = lastBlock.gasLimit.toNumber();
  console.log("Last Block Gas Limit:", lastBlockGasLimit);
  const gasEstimatedMul = gasEstimated * 1.3;

  let receipt;
  let wontExecute = false;
  if (gasEstimatedMul < lastBlockGasLimit) {
    try {
      await multisig.callStatic.executeTransaction(txId, { gasEstimatedMul });
      receipt = await (
        await multisig.executeTransaction(txId, { gasEstimatedMul })
      ).wait();
    } catch (e) {
      wontExecute = true;
    }
  }
  if (wontExecute || gasEstimatedMul >= lastBlockGasLimit) {
    receipt = await (
      await multisig.executeTransaction(txId, { gasLimit: lastBlockGasLimit })
    ).wait();
  }

  console.log(
    col.yellowBright(
      "==============================================================================="
    )
  );
  console.log(col.greenBright("DONE. Details:"));
  console.log("Tx hash:", receipt.transactionHash);
  console.log("Gas used:", receipt.gasUsed.toNumber());
  await multisigCheckTx(txId, multisig.address);
  console.log(
    col.yellowBright(
      "==============================================================================="
    )
  );
};

const parseEthersLog: any = (parsed) => {
  const parsedEvent = {};
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < parsed.args.length; i++) {
    const input = parsed.eventFragment.inputs[i];
    const arg = parsed.args[i];
    const newObj = { ...input, ...{ value: arg.toString() } };
    parsedEvent[input.name] = newObj;
  }
  return parsedEvent;
};

const parseEthersLogToValue = (parsed) => {
  const parsedEvent = {};
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < parsed.args.length; i++) {
    const input = parsed.eventFragment.inputs[i];
    const arg = parsed.args[i];
    const newObj = { ...input, ...{ value: arg.toString() } };
    parsedEvent[input.name] = newObj.value;
  }
  return parsedEvent;
};

const getTxLog = (tx, contract) => {
  return tx.logs.map((log) =>
    parseEthersLogToValue(contract.interface.parseLog(log))
  );
};

const getEthersLog = async (contract, filter) => {
  if (contract === undefined || filter === undefined) return;
  const events = await contract.queryFilter(filter);
  if (events.length === 0) return;
  const parsedEvents = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const event of events) {
    const ethersParsed = contract.interface.parseLog(event);
    const customParsed = parseEthersLog(ethersParsed);
    parsedEvents.push(customParsed);
  }
  return parsedEvents;
};

const getParsedEventLogFromReceipt = async (receipt, iface, eventName) => {
  const topic = iface.getEventTopic(eventName);
  // search for the log by the topic
  const log = receipt.logs.find((x) => x.topics.indexOf(topic) >= 0);
  // finally, you can parse the log with the interface
  // to get a more user-friendly event object
  const parsedLog = iface.parseLog(log);
  return parseEthersLog(parsedLog);
};

/* return values: 
   - registered module contract address
   - zero address (no registered module containing the new module's func sigs found)
*/
const getStakingModuleContractToReplace = async (
  stakingModulesProxy,
  newModuleAddress
) => {
  const { ethers } = hre;
  const clashing = await stakingModulesProxy.checkClashingFuncSelectors(
    newModuleAddress
  );
  if (
    clashing.clashingProxyRegistryFuncSelectors.length !== 0 &&
    clashing.clashingProxyRegistryFuncSelectors[0] != "0x00000000"
  ) {
    throw `Clashing functions signatures of ${newModuleAddress} with StakingModulesProxy functions:\n ${clashing.clashingProxyRegistryFuncSelectors}`;
  }

  if (
    clashing.clashingModules.length == 0 &&
    clashing.clashingProxyRegistryFuncSelectors.length == 0
  ) {
    return ethers.constants.AddressZero;
  }

  if (clashing.clashingModules.length != 0) {
    const clashingUnique = clashing.clashingModules.filter(arrayToUnique);
    if (clashingUnique.length == 1) {
      const addressModuleBeingReplaced = clashingUnique[0];
      if (addressModuleBeingReplaced != newModuleAddress) {
        return addressModuleBeingReplaced;
      }
      console.log(
        `Skipping module ${newModuleAddress} replacement - the module is reused`
      );
      return false;
    } else {
      console.log(
        `New module ${newModuleAddress} can't replace multiple modules at once:`
      );
      clashing.clashingModules.forEach((item, index, arr) => {
        console.log(`${item[index]} - ${arr[1][index]}`);
      });
      throw new Error("Execution interrupted");
    }
  }
};

const createProposal = async (
  governorAddress,
  targets,
  values,
  signatures,
  callDatas,
  description
) => {
  const { ethers } = hre;
  const { deployer } = await getNamedAccounts();
  console.log("CREATING PROPOSAL:");
  console.log(`=============================================================
    Proposal creator:    ${deployer}
    Governor Address:    ${governorAddress}
    Target:              ${targets}
    Values:              ${values}
    Signature:           ${signatures}
    Data:                ${callDatas}
    Description:         ${description}
    =============================================================`);

  const signer = await ethers.getSigner(deployer);
  const gov = await ethers.getContractAt("GovernorAlpha", governorAddress);
  const receipt = await (
    await gov
      .connect(signer)
      .propose(targets, values, signatures, callDatas, description)
  ).wait();

  const abi = [
    `
            event ProposalCreated(
            uint256 id,
            address proposer,
            address[] targets,
            uint256[] values,
            string[] signatures,
            bytes[] calldatas,
            uint256 startBlock,
            uint256 endBlock,
            string description)
        `,
  ];
  const iface = new ethers.utils.Interface(abi);
  const parsedEvent = await getParsedEventLogFromReceipt(
    receipt,
    iface,
    "ProposalCreated"
  );
  // const { id, proposer, targets, values, signatures, calldatas, startBlock, endBlock } =
  console.log("PROPOSAL CREATED:");
  console.log(`=============================================================
    Contract:            GovernorAlpha @ ${governorAddress}
    Proposal Id:         ${parsedEvent.id.value.toString()}
    Proposer:            ${parsedEvent.proposer.value}
    Targets:             ${parsedEvent.targets.value}
    Values:              ${parsedEvent.values.value}
    Signature:           ${parsedEvent.signatures.value}
    Data:                ${parsedEvent.calldatas.value}
    StartBlock:          ${parsedEvent.startBlock.value.toString()}
    EndBlock:            ${parsedEvent.endBlock.value.toString()}
    Description:         ${parsedEvent.description.value}
    =============================================================`);
  // return receipt;
  // @todo Add a decoded event logging: e.g. https://github.com/ethers-io/ethers.js/issues/487#issuecomment-1101937446
};

const getTxRevertReason = async (txHash) => {
  const tx = await ethers.provider.getTransaction(txHash);
  try {
    const code = await ethers.provider.call(tx, tx.blockNumber);
    console.log("code:", code);
  } catch (err) {
    return err;
    /* console.log(err);
        const code = err.data.replace("Reverted ", "");
        console.log({ err });
        let reason = ethers.utils.toUtf8String("0x" + code.substr(138));
        console.log("Revert reason:", reason);
        return `Revert reason: ${reason}`; */
  }
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export {
  getStakingModulesNames,
  stakingRegisterModuleWithMultisig,
  parseEthersLog,
  getEthersLog,
  parseEthersLogToValue,
  getParsedEventLogFromReceipt,
  sendWithMultisig,
  signWithMultisig,
  multisigCheckTx,
  multisigRevokeConfirmation,
  multisigExecuteTx,
  getStakingModuleContractToReplace,
  createProposal,
  deployWithCustomProxy,
  multisigAddOwner,
  multisigRemoveOwner,
  getTxLog,
  getTxRevertReason,
  delay,
};
