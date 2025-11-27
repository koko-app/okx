const { ethers } = require('ethers');
const chainlinkAbi = [
  "function latestRoundData() view returns (uint80,int256,uint256,uint256,uint80)"
];

const CHAINLINK_FEED = '0x...'; // TODO: Replace with actual Chainlink feed for POL
async function getLivePrice() {
  try {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    const priceFeed = new ethers.Contract(CHAINLINK_FEED, chainlinkAbi, provider);
    const [, price] = await priceFeed.latestRoundData();
    return Number(price) / 1e8;
  } catch (e) {
    // fallback: fetch price from Uniswap/pancake (not implemented here)
    return null;
  }
}

module.exports = { getLivePrice };