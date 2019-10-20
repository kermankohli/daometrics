import { daos, tokens, DAOInformation } from './constants/addresses';
import { ethers } from 'ethers';

import PriceService from './services/PriceService';
import BalanceService from './services/BalanceService';
import { asyncForEach } from '../utils/array';
import { Provider } from 'ethers/providers';

require('dotenv').config({ path: './.env' });

type Result = {
    information: DAOInformation;
    balances: {
      [ticker: string]: number
    },
    usdBalances: {
      [ticker: string]: number
    },
    usdTotal: number
}

class Processor { 

  priceService: PriceService;
  provider: Provider;

  constructor() {
    this.provider = new ethers.providers.InfuraProvider(1, process.env.INFURA_KEY);
  }

  public async fetch(): Promise<{[name: string]: Result}> {
    console.log(`Current INFURA_KEY is ${process.env.INFURA_KEY}`);
    
    let finalTickers: string[] = Object.keys(tokens);
    finalTickers.push('ETH');
  
    this.priceService = new PriceService();
    await this.priceService.getPrices(finalTickers);

    let results: {[name: string]: Result} = {};
   
    await asyncForEach(Object.keys(daos), async (dao) => {
      results[dao] = await this.getDAOResult(dao);
      console.log(results[dao]);
    });

    return results;
    
  }
  
  private async getDAOResult(name: string): Promise<Result> {
  
    const balanceService = new BalanceService(this.provider, tokens);
    const information = daos[name];
    const balances = await balanceService.retrieveAllBalances(information.address);
    const usdBalances = await this.priceService.getUSDValues(balances);
    const usdTotal = Object.values(usdBalances).reduce((one, two) => one + two, 0);
  
    return {
      information,
      balances,
      usdBalances,
      usdTotal
    };
  }
  
};

export default Processor;