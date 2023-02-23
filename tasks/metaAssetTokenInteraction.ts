import { task, types } from "hardhat/config";
import * as helpers from "../scripts/utils/helpers";
import { _createSIP } from "./sips/createSIP";
import { ISipArgument } from "./sips/args/SIPArgs";
import Logs from "node-logs";
import { BigNumber } from "ethers";
import * as hhHelpers from "@nomicfoundation/hardhat-network-helpers";
import { MAX_UINT256, ZERO_ADDRESS } from "@utils/constants";
import { signERC2612Permit } from 'eth-permit';
import { signTypedMessage } from "eth-sig-util";
import {
  EIP712Domain,
  Permit,
  PERMIT_TYPEHASH,
  domainSeparator,
} from "../test/helpers/EIP712";
import { fromRpcSig, toBuffer } from "ethereumjs-util";
import Wallet from "ethereumjs-wallet";
import { BN } from "bn.js";

const logger = new Logs().showInConsole(true);

const tokenName = "Sovryn Dollar";
const tokenSymbol = "DLLR";
const decimals = 18;
const maxDeadline = MAX_UINT256;
const name = tokenName;
const version = "1";

const buildData = (
  chainId,
  verifyingContract,
  from,
  spender,
  amount,
  nonce,
  deadline = maxDeadline
) => ({
  primaryType: "Permit",
  types: { EIP712Domain, Permit },
  domain: { name, version, chainId, verifyingContract },
  message: { owner: from, spender, value: amount, nonce, deadline },
});


task("interaction:get-massetManagerConfig", "Fetch massetManagerProxy address")
.addParam("contractAddress", "Meta asset token contract address (DLLR, etc)", undefined, types.string, false)
.setAction(async ({ contractAddress }, hre) => {
  const {ethers} = hre;
  const MetaAssetToken = await ethers.getContractAt("MetaAssetToken", contractAddress);
  console.log(`massetManagerProxy address: ${await MetaAssetToken.massetManagerProxy()}`);
  console.log(`massetManagerImplementation address: ${await MetaAssetToken.massetManagerImplementation()}`);
});

task("interaction:get-basketManagerConfig", "Fetch basketManagerProxy address")
.addParam("contractAddress", "Meta asset token contract address (DLLR, etc)", undefined, types.string, false)
.setAction(async ({ contractAddress }, hre) => {
  const {ethers} = hre;
  const MetaAssetToken = await ethers.getContractAt("MetaAssetToken", contractAddress);
  console.log(`basketManagerProxy address: ${await MetaAssetToken.basketManagerProxy()}`);
  console.log(`basketManagerImplementation address: ${await MetaAssetToken.basketManagerImplementation()}`);
});

task("interaction:get-chainid", "Fetch chain id")
.addParam("contractAddress", "Meta asset token contract address (DLLR, etc)", undefined, types.string, false)
.setAction(async ({ contractAddress }, hre) => {
  const {ethers} = hre;
  const MetaAssetToken = await ethers.getContractAt("MetaAssetToken", contractAddress);
  console.log(`chain id: ${await MetaAssetToken.getChainId()}`);
});

task("multisig:set-massetManagerProxy", "Set massetManagerProxy")
.addParam("contractAddress", "Meta asset token contract address (DLLR, etc)", undefined, types.string, false)
.addParam("newMassetManagerProxy", "new masset manager proxy address", undefined, types.string, false)
.addOptionalParam("isMultisig", "flag if transaction needs to be intiated from the multisig contract")
.addOptionalParam("isSIP", "flag if transaction needs to be initiated from the SIP")
.setAction(async ({ contractAddress, newMassetManagerProxy, isMultisig, isSIP }, hre) => {
  // if isMultisig & isSIP are false, assign based on network tags.
  const { network } = hre;
  if(!isMultisig && !isSIP) {
    let {isMultisigFlag, isSIPFlag} = helpers.defaultValueMultisigOrSipFlag(network.tags);
    isMultisig = isMultisigFlag;
    isSIP = isSIPFlag;
  }

  helpers.injectHre(hre);
  const {ethers, deployments: { get }, getNamedAccounts} = hre;
  const MetaAssetToken = await ethers.getContractAt("MetaAssetToken", contractAddress);
  const { deployer } = await getNamedAccounts();

  if(isMultisig) {
    const multisigAddress = (await get("MultisigWallet")).address;
    const data = MetaAssetToken.interface.encodeFunctionData("setMassetManagerProxy", [
      newMassetManagerProxy,
    ]);
    await helpers.sendWithMultisig(
      multisigAddress,
      MetaAssetToken.address,
      data,
      deployer
    );
  } else if(isSIP) {
    const signature = "setMassetManagerProxy(address)";
    const data = MetaAssetToken.interface.encodeFunctionData("setMassetManagerProxy", [
      newMassetManagerProxy,
    ]);

    const sipArgs: ISipArgument = {
      targets: [contractAddress],
      values: [0],
      signatures: [signature],
      data: [data],
      description: "Set massetManagerProxy address"
    };

    _createSIP(hre, sipArgs);
  } else {
    await MetaAssetToken.setMassetManagerProxy(newMassetManagerProxy);
  }
});

task("multisig:set-basketManagerProxy", "Set basketManagerProxy")
.addParam("contractAddress", "Meta asset token contract address (DLLR, etc)", undefined, types.string, false)
.addParam("newBasketManagerProxy", "new basket manager proxy address", undefined, types.string, false)
.addOptionalParam("isMultisig", "flag if transaction needs to be intiated from the multisig contract")
.addOptionalParam("isSIP", "flag if transaction needs to be initiated from the SIP")
.setAction(async ({ contractAddress, newBasketManagerProxy, isMultisig, isSIP }, hre) => {
  const { network } = hre;
  if(!isMultisig && !isSIP) {
    let {isMultisigFlag, isSIPFlag} = helpers.defaultValueMultisigOrSipFlag(network.tags);
    isMultisig = isMultisigFlag;
    isSIP = isSIPFlag;
  }

  // if isMultisig & isSIP are false, transaction will be initiated as per normal
  helpers.injectHre(hre);
  const {ethers, deployments: { get }, getNamedAccounts} = hre;
  const MetaAssetToken = await ethers.getContractAt("MetaAssetToken", contractAddress);
  const { deployer } = await getNamedAccounts();
  if(isMultisig) {
    const multisigAddress = (await get("MultisigWallet")).address;
    const data = MetaAssetToken.interface.encodeFunctionData("setBasketManagerProxy", [
      newBasketManagerProxy,
    ]);
    await helpers.sendWithMultisig(
      multisigAddress,
      MetaAssetToken.address,
      data,
      deployer
    );
  } else if(isSIP) {
    const signature = "setBasketManagerProxy(address)";
    const data = MetaAssetToken.interface.encodeFunctionData("setBasketManagerProxy", [
      newBasketManagerProxy,
    ]);

    const sipArgs: ISipArgument = {
      targets: [contractAddress],
      values: [0],
      signatures: [signature],
      data: [data],
      description: "Set basketManagerProxy address"
    }

    _createSIP(hre, sipArgs);
  } else {
    await MetaAssetToken.setBasketManagerProxy(newBasketManagerProxy);
  }
});

/** BasketManager contract interaction */
task("basketManager:isValidBasset", "Checks if bAasset is valid by checking its presence in the bAssets factors list")
.addParam("basset", "Basset address to be checked", undefined, types.string, false)
.setAction(async ({ basset }, hre) => {
  const { ethers } = hre;
  const basketManager = await ethers.getContract("BasketManagerV3"); // as BasketManagerV3;
  console.log("is valid: ", await basketManager.isValidBasset(basset));
})

task("basketManager:checkBasketBalanceForDeposit", "Checks if ratio of bAssets in basket is within limits to make a deposit of specific asset")
.addParam("basset", "Basset address to deposit", undefined, types.string, false)
.addParam("bassetQuantity", "Amount of bAssets to deposit", undefined, types.string, false)
.setAction(async ({ basset, bassetQuantity }, hre) => {
  const { ethers } = hre;
  const basketManager = await ethers.getContract("BasketManagerV3"); // as BasketManagerV3;
  console.log("result: ", await basketManager.checkBasketBalanceForDeposit(basset, bassetQuantity));
})

task("basketManager:checkBasketBalanceForWithdrawal", "Checks if ratio of bAssets in basket is within limits to make a withdrawal of specific asset")
.addParam("basset", "Basset address to redeem", undefined, types.string, false)
.addParam("bassetQuantity", "Amount of bAssets to redeem", undefined, types.string, false)
.setAction(async ({ basset, bassetQuantity }, hre) => {
  const { ethers } = hre;
  const basketManager = await ethers.getContract("BasketManagerV3"); // as BasketManagerV3;
  console.log("result: ", await basketManager.checkBasketBalanceForWithdrawal(basset, bassetQuantity));
})

task("basketManager:convertBassetToMassetQuantity", "Converts bAsset to mAsset quantity")
.addParam("basset", "Basset address", undefined, types.string, false)
.addParam("bassetQuantity", "Amount of bAssets to check", undefined, types.string, false)
.setAction(async ({ basset, bassetQuantity }, hre) => {
  const { ethers } = hre;
  const basketManager = await ethers.getContract("BasketManagerV3"); // as BasketManagerV3;
  console.log("result: ",await basketManager.convertBassetToMassetQuantity(basset, bassetQuantity));
})

task("basketManager:convertMassetToBassetQuantity", "Converts mAsset to bAsset quantity")
.addParam("basset", "Basset address", undefined, types.string, false)
.addParam("massetQuantity", "Amount of mAssets to check", undefined, types.string, false)
.setAction(async ({ basset, massetQuantity }, hre) => {
  const { ethers } = hre;
  const basketManager = await ethers.getContract("BasketManagerV3"); // as BasketManagerV3;
  console.log("result: ",await basketManager.convertMassetToBassetQuantity(basset, massetQuantity));
})

task("basketManager:getTotalMassetBalance", "Calculates total mAsset balance")
.setAction(async ({}, hre) => {
  const { ethers } = hre;
  const basketManager = await ethers.getContract("BasketManagerV3"); // as BasketManagerV3;
  console.log("result: ",(await basketManager.getTotalMassetBalance()).toString());
})

task("basketManager:getBassetBalance", "Calculates total bAsset balance")
.addParam("basset", "Basset address", undefined, types.string, false)
.setAction(async ({ basset }, hre) => {
  const { ethers } = hre;
  const basketManager = await ethers.getContract("BasketManagerV3"); // as BasketManagerV3;
  console.log("result: ",(await basketManager.getBassetBalance(basset)).toString());
})

task("basketManager:getVersion", "Get version of basket manager")
.setAction(async ({}, hre) => {
  const { ethers } = hre;
  const basketManager = await ethers.getContract("BasketManagerV3"); // as BasketManagerV3;
  console.log("result: ",await basketManager.getVersion());
})

task("basketManager:getBassets", "Get list of bAssets")
.setAction(async ({}, hre) => {
  const { ethers } = hre;
  const basketManager = await ethers.getContract("BasketManagerV3"); // as BasketManagerV3;
  console.log(await basketManager.getBassets());
})

task("basketManager:getFactor", "Get factor")
.addParam("basset", "Basset address", undefined, types.string, false)
.setAction(async ({ basset }, hre) => {
  const { ethers } = hre;
  const basketManager = await ethers.getContract("BasketManagerV3"); // as BasketManagerV3;
  console.log("result: ", (await basketManager.getFactor(basset)).toString());
})

task("basketManager:getRange", "Get range(min,max)")
.addParam("basset", "Basset address", undefined, types.string, false)
.setAction(async ({ basset }, hre) => {
  const { ethers } = hre;
  const basketManager = await ethers.getContract("BasketManagerV3"); // as BasketManagerV3;
  console.log("result: ", await basketManager.getRange(basset));
})

task("basketManager:getPaused", "Get paused status of basset")
.addParam("basset", "Basset address", undefined, types.string, false)
.setAction(async ({ basset }, hre) => {
  const { ethers } = hre;
  const basketManager = await ethers.getContract("BasketManagerV3"); // as BasketManagerV3;
  console.log("result: ", await basketManager.getPaused(basset));
})

task("basketManager:getProxyImplementation", "Get proxy implementation of basket manager")
.setAction(async ({}, hre) => {
  const { ethers } = hre;
  const basketManager = await ethers.getContract("BasketManagerV3"); // as BasketManagerV3;
  console.log("result: ", await basketManager.getProxyImplementation());
})


task("test:mint-burn", "")
.setAction(async ({}, hre) => {
  const { ethers, network, deployments: {get} } = hre;
  const impersonateAcc = "0x5F777270259E32F79589fe82269DB6209F7b7582";

  const provider = new ethers.providers.JsonRpcProvider(
    "http://localhost:8545"
  );
  await provider.send("hardhat_impersonateAccount", [impersonateAcc]);
  const signer = provider.getSigner(impersonateAcc);

  hhHelpers.setBalance(impersonateAcc, 10n**18n)
  const DLLR = await get("DLLR");
  const MetaAssetToken = await ethers.getContractAt(DLLR.abi, DLLR.address, signer);

  await signer.sendTransaction({
    to: ethers.constants.AddressZero,
    value: ethers.utils.parseEther("0.1"),
  });
  const dummyAddress = "0xDCcA4285420e3965D5Ce831fC2a57fD08f9701Ee";
  const dummyMintAmount = BigNumber.from(ethers.utils.parseUnits("1000", 18));
  const dummyBurnAmount = BigNumber.from(ethers.utils.parseUnits("1000", 18));
  console.log(signer)
  console.log(DLLR.address);
  console.log(await MetaAssetToken.name());
  console.log(await MetaAssetToken.decimals());
  console.log(await MetaAssetToken.totalSupply());

  /** MINT */
  let previousBalance = await MetaAssetToken.balanceOf(dummyAddress);
  await MetaAssetToken.mint(dummyAddress, dummyMintAmount);
  let latestBalance = await MetaAssetToken.balanceOf(dummyAddress);

  console.log("previous balance: ", previousBalance.toString())
  console.log("latest balance: ", latestBalance.toString())
  expect(previousBalance.add(dummyMintAmount)).to.equal(latestBalance);


  /** BURN */
  previousBalance = await MetaAssetToken.balanceOf(dummyAddress);
  await MetaAssetToken.burn(dummyAddress, dummyBurnAmount);
  latestBalance = await MetaAssetToken.balanceOf(dummyAddress);
  expect(previousBalance.sub(dummyMintAmount)).to.equal(latestBalance);
})

task("test:transfer", "")
.setAction(async ({}, hre) => {
  const { ethers, network, deployments: {get} } = hre;
  const impersonateAcc = "0x5F777270259E32F79589fe82269DB6209F7b7582";

  const provider = new ethers.providers.JsonRpcProvider(
    "http://localhost:8545"
  );
  await provider.send("hardhat_impersonateAccount", [impersonateAcc]);
  const signer = provider.getSigner(impersonateAcc);

  hhHelpers.setBalance(impersonateAcc, 10n**18n)
  const DLLR = await get("DLLR");
  const MetaAssetToken = await ethers.getContractAt(DLLR.abi, DLLR.address, signer);

  await signer.sendTransaction({
    to: ethers.constants.AddressZero,
    value: ethers.utils.parseEther("0.1"),
  });
  const dummyAddress = "0xDCcA4285420e3965D5Ce831fC2a57fD08f9701Ee";
  const dummyMintAmount = BigNumber.from(ethers.utils.parseUnits("1000", 18));

  /** MINT & Transfer */
  let previousImpersonateBalance = await MetaAssetToken.balanceOf(impersonateAcc);
  let previousDummyBalance = await MetaAssetToken.balanceOf(dummyAddress);
  await MetaAssetToken.mint(impersonateAcc, dummyMintAmount);
  await MetaAssetToken.transfer(dummyAddress, dummyMintAmount);
  let latestImpersonateBalance = await MetaAssetToken.balanceOf(impersonateAcc);
  let latestDummyBalance = await MetaAssetToken.balanceOf(dummyAddress);

  expect(latestImpersonateBalance.toString()).to.equal("0");
  expect(previousDummyBalance.add(dummyMintAmount)).to.equal(latestDummyBalance)
})

task("test:transferWithPermit", "")
.setAction(async ({}, hre) => {
  const { ethers, config, deployments: {get} } = hre;
  const impersonateAcc = "0x5F777270259E32F79589fe82269DB6209F7b7582";
  const [dummyOwner] = await ethers.getSigners();

  const accounts = config.networks.hardhat.accounts as any;
  const index = 0; // first wallet, increment for next wallets
  const dummyOwnerObj = ethers.Wallet.fromMnemonic(accounts.mnemonic, accounts.path + `/${index}`);
  const privateKeyBuffer = toBuffer(dummyOwnerObj.privateKey);
  const dummyOwnerWallet = Wallet.fromPrivateKey(privateKeyBuffer);

  const provider = new ethers.providers.JsonRpcProvider(
    "http://localhost:8545"
  );
  await provider.send("hardhat_impersonateAccount", [impersonateAcc]);
  let signer = provider.getSigner(impersonateAcc);

  hhHelpers.setBalance(impersonateAcc, 10n**18n)
  const DLLR = await get("DLLR");
  let MetaAssetToken = await ethers.getContractAt(DLLR.abi, DLLR.address, signer);

  await signer.sendTransaction({
    to: ethers.constants.AddressZero,
    value: ethers.utils.parseEther("0.1"),
  });
  const dummySpenderAddress = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
  const dummyMintAmount = BigNumber.from(ethers.utils.parseUnits("1000", 18));

  /** MINT */
  await MetaAssetToken.mint(dummyOwner.address, dummyMintAmount);

  const deadline = new BN(MAX_UINT256);
  const nonce = await MetaAssetToken.nonces(dummyOwner.address);
  const chainId = await MetaAssetToken.getChainId();
  const data = buildData(
    chainId.toString(),
    MetaAssetToken.address,
    dummyOwner.address,
    dummySpenderAddress,
    dummyMintAmount.toString(),
    new BN(nonce.toString()),
    deadline
  ) as any;
  
  const signature = signTypedMessage(dummyOwnerWallet.getPrivateKey(), {
    data,
  });
  const { v } = fromRpcSig(signature);
  const { r, s }: any = fromRpcSig(signature);
  
  let previousSpenderBalance = await MetaAssetToken.balanceOf(dummySpenderAddress);
  let previousInitiatorBalance = await MetaAssetToken.balanceOf(dummyOwner.address);
  await provider.send("hardhat_stopImpersonatingAccount", [impersonateAcc]);
  await provider.send("hardhat_impersonateAccount", [dummySpenderAddress]);
  signer = provider.getSigner(dummySpenderAddress);
  MetaAssetToken = await ethers.getContractAt(DLLR.abi, DLLR.address, signer);
  await MetaAssetToken.transferWithPermit(dummyOwner.address, dummySpenderAddress, dummyMintAmount, deadline.toString(), v, r, s);
  let latestSpenderBalance = await MetaAssetToken.balanceOf(dummySpenderAddress);
  let latestInitiatorBalance = await MetaAssetToken.balanceOf(dummyOwner.address);
  expect(previousSpenderBalance.add(dummyMintAmount)).to.equal(latestSpenderBalance);
  expect(previousInitiatorBalance.sub(dummyMintAmount)).to.equal(latestInitiatorBalance);
})