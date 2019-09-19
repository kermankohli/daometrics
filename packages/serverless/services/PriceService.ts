import Nomics from "nomics";

const nomics = new Nomics({
  apiKey: "37196e095b06bbb04e489939fcc158bd"
});

type Prices = {[ticker: string]: number};

class PriceService {

  async getPrices(tickers: string[]): Promise<Prices> {
    const prices = await nomics.currenciesTicker({
      interval: ['1d'],
      ids: tickers,
      quoteCurrency: "USD", // [DEPRECATED] use "convert" below instead
      convert: "USD", // defaults to "USD"
    });
    
    let final: Prices = {};
    prices.forEach(item => {
      console.log(item['price']);
      final[item['id']] = parseFloat(item['price']);
    })
    return final;
  }

};

export default PriceService;
