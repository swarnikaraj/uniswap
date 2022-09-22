const { ethers } = require("ethers");
console.log("Hello")
const axios=require("axios");




// const { Pool, Position, NonfungiblePositionManager, nearestUsableTick }= require('@uniswap/v3-sdk')

const { Percent, Token, CurrencyAmount }= require('@uniswap/sdk-core')

const { abi: IUniswapV3PoolABI } = require("@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json");


const { getAbi, getPoolImmutables } = require('./uniswap')

require('dotenv').config()

const INFURA_URL = process.env.INFURA_URL


const provider = new ethers.providers.JsonRpcProvider(INFURA_URL) 

// pool address for DAI/USDC 0.05%
const poolAddress = '0x8ad599c3A0ff1De082011EFDDc58f1908eb6e6D8'
const poolContract = new ethers.Contract(poolAddress, IUniswapV3PoolABI, provider)


async function getPoolState() {
    const slot = await poolContract.slot0()
    const PoolState= {
      liquidity: await poolContract.liquidity(),
      sqrtPriceX96: slot[0],
      tick: slot[1],
      observationIndex: slot[2],
      observationCardinality: slot[3],
      observationCardinalityNext: slot[4],
      feeProtocol: slot[5],
      unlocked: slot[6],
    }
    return PoolState
  }






async function getSpotPrice() {
    const myimmute =await getPoolImmutables(poolContract)
    const mypoolstate=await getPoolState()
   console.log(mypoolstate)
console.log(myimmute)
    console.log("hello1")
  const immutables =myimmute

  const state = mypoolstate

  const DAI = new Token(1, immutables.token0, 18, 'DAI', 'Stablecoin')
  const USDC = new Token(1, immutables.token1, 18, 'USDC', 'USD Coin')
  const block = await provider.getBlock(provider.getBlockNumber())
  const deadline = block.timestamp + 200



  const DAI_USDC_POOL =new Pool(
    DAI,
    USDC,
    immutables.fee,
    state.sqrtPriceX96.toString(),
    state.liquidity.toString(),
    state.tick
  )
  
  const token0Price = DAI_USDC_POOL.token0Price
  const token1Price = DAI_USDC_POOL.token1Price
  
  return {token0Price,token1Price}

 
}
// getSpotPrice();
module.exports= getSpotPrice;

