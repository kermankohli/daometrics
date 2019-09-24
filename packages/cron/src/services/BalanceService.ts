import { Provider } from 'ethers/providers';
import { BigNumber } from 'ethers/utils';
import { asyncForEach } from '../../utils/array';
import { ethers } from 'ethers';
import { erc20 } from '../abis/ts/erc20'
import { getKeyByValue } from '../../utils/dictionary';

const divider = new BigNumber(10).pow(18);

class BalanceService {

  provider: Provider;
  tokens: {[ticker: string]: string};

  constructor(provider: Provider, tokens: {[ticker: string]: string}) {
    this.provider = provider;
    this.tokens = tokens;
  }

  async retrieveAllBalances(address: string): Promise<{[ticker: string]: number}> {
    let balances: {[ticker: string]: number} = {};
    balances['ETH'] = (await this.provider.getBalance(address)).div(divider).toNumber();
    
    await asyncForEach(Object.values(this.tokens), async (tokenAddress: string) => {
      const contract = new ethers.Contract(tokenAddress, erc20, this.provider);
      const balance = await contract.functions.balanceOf(address);
      const decimals = await contract.functions.decimals();
      const tokenTicker = getKeyByValue(this.tokens, tokenAddress);
      balances[tokenTicker] = balance.div(new BigNumber(10).pow(decimals)).toNumber();
    });
    
    return balances;
  }

}

export default BalanceService;