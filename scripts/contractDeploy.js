const hre = require("hardhat");

async function main() {
  //   if (network !== "rinkeby") {
  const NFTMarketplace = await hre.ethers.deployContract("NFTMarketplace", [
    "0xB597bDD800867597066D5c019E9335E2aa4CB1cB",
    "0x02CE860e119581d4634611f3d926E02D997004c9",
  ]);
  await NFTMarketplace.waitForDeployment();

  console.log("NFTMarketplace deployed to:", NFTMarketplace.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
//   0x5FbDB2315678afecb367f032d93F642f64180aa3 deployed address
