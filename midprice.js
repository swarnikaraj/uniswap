

const { ChainId, Token, WETH, Fetcher, Route } = require('@uniswap/sdk');
async function fetchMidPrice(){

const DAI = new Token(ChainId.MAINNET, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18)


const pair = await Fetcher.fetchPairData(DAI, WETH[DAI.chainId])

const route = new Route([pair], WETH[DAI.chainId])
console.log( ` ${route.midPrice.toSignificant(6)},${route.midPrice.invert().toSignificant(6)}`)

return ` ${route.midPrice.toSignificant(6)},${route.midPrice.invert().toSignificant(6)}`

  
}

fetchMidPrice()

module.exports=fetchMidPrice;

