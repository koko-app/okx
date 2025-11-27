require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    hardhat: {},
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    mainnet: {
      url: process.env.MAINNET_RPC || "",
      accounts: process.env.DEPLOYER_KEY ? [process.env.DEPLOYER_KEY] : []
    },
    bsc: {
      url: process.env.BSC_RPC || "",
      accounts: process.env.DEPLOYER_KEY ? [process.env.DEPLOYER_KEY] : []
    }
  },
  etherscan: {
    // Etherscan/BscScan api keys (set as repo secrets)
    apiKey: {
      mainnet: process.env.ETHERSCAN_API_KEY || "",
      bsc: process.env.BSCSCAN_API_KEY || ""
    }
  }
};