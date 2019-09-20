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

    this.prices = {};
    
    prices.forEach(item => {
      this.prices[item['id']] = parseFloat(item['price']);
    })

    return this.prices;
  }

  async getUSDValues(prices: Prices): Promise<Prices> {
    const tickerMapping = {
      'WETH': 'ETH',
      'CDAI': 'DAI'
    };

    let usdPrices: Prices = {};

    Object.keys(prices).forEach(ticker => {
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
