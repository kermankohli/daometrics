import { moloch } from './../abis/ts/moloch';
import { daoAddresses, tokenAddresses } from './../constants/addresses';
import {ethers} from 'ethers';
import { BigNumber } from 'ethers/utils';
import { asyncForEach } from '../utils/array';

import { erc20 } from '../abis/ts/erc20'

import PriceService from '../services/PriceService';

require('dotenv').config({ path: './.env' });

const provider = new ethers.providers.InfuraProvider(1, process.env.INFURA_KEY);

let divider = new BigNumber(10).pow(18);

let results = {};

async function fetch() {
  console.log(`Current INFURA_KEY is ${process.env.INFURA_KEY}`);
  
  const daos = daoAddresses;
  const tokens = tokenAddresses;

  Object.values(daos).forEach(dao => {
    results[dao] = {
      name: getKeyByValue(daos, dao),
      address: dao,
      balances: {}
    };
  });
  
  let finalTickers: string[] = Object.keys(tokenAddresses);
  finalTickers.push('ETH');
  const prices = await new PriceService().getPrices(finalTickers);
  console.log(prices);

  await ethBalances(prices);
  await tokenBalances(prices);

  Object.keys(results).forEach(key => {
    const item = results[key];
    let balances = Object.values(item['balances']);
    results[key]['total'] = balances.reduce((previous: string, current: string) => parseFloat(previous) + parseFloat(current));
  });

  console.log(results);
  
}

async function ethBalances(prices: any) {
  const daos = Object.values(daoAddresses);
  let list: any = {};
  await asyncForEach(daos, async (address: string) => {
    const balance = await provider.getBalance(address);
    const usdValue = balance.div(divider).toNumber() * prices['ETH'];
    // console.log(`DAO: ${address} = ETH: $${usdValue.toString()}`);
    results[address]['balances']['ETH'] = usdValue.toString();
  });
}

async function tokenBalances(prices: any) {
  const daos = Object.values(daoAddresses);
  const tokens = Object.values(tokenAddresses);

  await asyncForEach(daos, async (daoAddress: string) => {
    await asyncForEach(tokens, async (tokenAddress: string) => {
      const contract = new ethers.Contract(tokenAddress, erc20, provider);
      const balance = await contract.functions.balanceOf(daoAddress);
      let tokenTicker = getKeyByValue(tokenAddresses, tokenAddress);
      let fetchTicker = tokenTicker;
      if (tokenTicker == 'CDAI') {
        fetchTicker = 'DAI';
      }
      if (tokenTicker == 'WETH') {
        fetchTicker = 'ETH';
      }
      const usdValue = balance.div(divider).toNumber() * prices[fetchTicker];
      results[daoAddress]['balances'][tokenTicker] = usdValue.toString();
      // console.log(`DAO: ${daoAddress} = ${tokenTicker}: ${usdValue.toString()}`);
    });
  });
}

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

fetch();
