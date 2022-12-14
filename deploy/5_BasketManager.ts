import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async ({ deployments, getNamedAccounts }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const deployedMassetManager = await deployments.get("MassetManager");
  const deployedToken = await deployments.get("DLLR");
  const deployedFeesVault = await deployments.get("FeesVault");
  const deployedFeesManager = await deployments.get("FeesManager");

  await deploy("BasketManagerV3", {
    proxy: {
      owner: deployer,
      proxyContract: "OpenZeppelinTransparentProxy",
      viaAdminContract: {
        name: "MyntAdminProxy",
        artifact: "MyntAdminProxy",
      },
      execute: {
        init: {
          methodName: "initialize",
          args: [deployedMassetManager.address],
        },
      },
    },
    from: deployer,
    log: true,
  });

  // Initialize  MassetManager
  const deployedBasketManager = await deployments.get("BasketManagerV3");
  console.log(deployedBasketManager.address);
  console.log(deployedToken.address);
  await deployments.execute(
    "MassetManager",
    { from: deployer },
    "initialize",
    deployedBasketManager.address,
    deployedToken.address,
    false
  );

  // Upgrade  MassetManager To V3
  await deployments.execute(
    "MassetManager",
    { from: deployer },
    "upgradeToV3",
    deployedBasketManager.address,
    deployedToken.address,
    deployedFeesVault.address,
    deployedFeesManager.address
  );

  const massetManagerVersion = await deployments.read("MassetManager", "getVersion");
  console.log("Masset Version :", massetManagerVersion);

  // Set  MassetManager & Basket Manager in DLLR contract
  await deployments.execute(
    "DLLR",
    { from: deployer },
    "setMassetManagerProxy",
    deployedMassetManager.address
  );

  await deployments.execute(
    "DLLR",
    { from: deployer },
    "setBasketManagerProxy",
    deployedBasketManager.address
  );
};

func.tags = ["BasketManager"];

export default func;
