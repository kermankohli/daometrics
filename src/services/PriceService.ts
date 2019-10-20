import Nomics from "nomics";
import axios from 'axios';

const nomics = new Nomics({
  apiKey: "37196e095b06bbb04e489939fcc158bd"
});

type Prices = {[ticker: string]: number};

class PriceService {

  prices: Prices = {};

  async getPrices(tickers: string[]): Promise<Prices> {
    // @ts-ignore
    const currencies = tickers.join(',');
    const result = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.nomics.com/v1/currencies/ticker?key=37196e095b06bbb04e489939fcc158bd&ids=${currencies}&interval=1d&convert=USD`);
    const prices = result.data;

    prices.forEach((item: any) => {
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
