const axios = require('axios')

require('dotenv').config()
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

exports.getAbi = async (address) => {
  const url = `https://api.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${ETHERSCAN_API_KEY}`
  const res = await axios.get(url)
  const abi = JSON.parse(res.data.result)
  return abi
}




exports.getPoolImmutables = async (poolContract) => {
    const [factory, token0, token1, fee, tickSpacing, maxLiquidityPerTick] = await Promise.all([
        poolContract.factory(),
        poolContract.token0(),
        poolContract.token1(),
        poolContract.fee(),
        poolContract.tickSpacing(),
        poolContract.maxLiquidityPerTick(),
  ])



  const immutables = {
    factory,
    token0,
    token1,
    fee,
    tickSpacing,
    maxLiquidityPerTick,
  }

  return immutables
}