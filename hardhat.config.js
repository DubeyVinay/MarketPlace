require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
const Private_Key =
  "6d293f0d6234bdefb23b57580056ebcfd3817d255d5e1b533880b4f53406fc21";
module.exports = {
  solidity: "0.8.9",

  networks: {
    matic: {
      url: `https://polygon-mumbai.infura.io/v3/2d1b1045fecd4885be926e261d15644f`,
      accounts: [`0x${Private_Key}`],
    },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: "2MTPM72IFXXRE9UZ7X6Y56BVD2W6BRY2IK",
    },
  },
};
