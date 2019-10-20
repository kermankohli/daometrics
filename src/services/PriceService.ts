import Nomics from "nomics";

const nomics = new Nomics({
  apiKey: "37196e095b06bbb04e489939fcc158bd"
});

type Prices = {[ticker: string]: number};

class PriceService {

  prices: Prices = {};

  async getPrices(tickers: string[]): Promise<Prices> {
    const prices = await nomics.currenciesTicker({
      interval: ['1d'],
      ids: tickers,
      quoteCurrency: "USD", // [DEPRECATED] use "convert" below instead
      convert: "USD", // defaults to "USD"
    });
    
    prices.forEach(item => {
      this.prices[item['id']] = parseFloat(item['price']);
    })

    return this.prices;
  }

  async getUSDValues(prices: Prices): Promise<Prices> {
    await this.getPrices(Object.keys(prices));

    const tickerMapping = {
      'WETH': 'ETH',
      'PETH': 'ETH',
      'CDAI': 'DAI'
    };

    let usdPrices: Prices = {};

    Object.keys(prices).forEach(ticker => {
      if (ticker == 'WETH') {
        console.log(prices);
        console.log(ticker);
        console.log(this.prices);
      }
      let priceTicker = ticker;
      if (tickerMapping[ticker]) {
        priceTicker = tickerMapping[ticker];
      }
      usdPrices[ticker] = prices[ticker] * this.prices[priceTicker];
    });

    return usdPrices;

  };

};

export default PriceService;
