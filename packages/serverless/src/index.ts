import { moloch } from './../abis/ts/moloch';
import { daoAddresses, tokenAddresses } from './../constants/addresses';
import {ethers} from 'ethers';
import { BigNumber } from 'ethers/utils';
import { asyncForEach } from '../utils/array';

import { erc20 } from '../abis/ts/erc20'
import Nomics from "nomics";

const nomics = new Nomics({
  apiKey: "37196e095b06bbb04e489939fcc158bd"
});

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

  const prices = await getPrices();
  console.log(prices);

  const contract = new ethers.Contract(daos['moloch'], moloch, provider);

  let members = ethers.utils.id("ProcessProposal(uint256,address,address,uint256,uint256,bool)");

  let membersFilter = {
      address: daos['moloch'],
      fromBlock: 0,
      toBlock: 'latest',
      topics: [ members ]
  }

  const membersLogs = await provider.getLogs(membersFilter);
  console.log(membersLogs.length);

  let quits = ethers.utils.id("Ragequit(address,uint256)");

  let quitsFilter = {
      address: daos['moloch'],
      fromBlock: 0,
      toBlock: 'latest',
      topics: [ quits ]
  }

  const quitsLogs = await provider.getLogs(quitsFilter);
  console.log(quitsLogs.length);


  // await ethBalances(prices);
  // await tokenBalances(prices);

  // Object.keys(results).forEach(key => {
  //   const item = results[key];
  //   let balances = Object.values(item['balances']);
  //   results[key]['total'] = balances.reduce((previous: string, current: string) => parseFloat(previous) + parseFloat(current));
  // });

  // console.log(results);
  
}

async function getPrices(): Promise<any> {
  let tokens: string[] = Object.keys(tokenAddresses);
  tokens.push('ETH');
  const prices = await nomics.currenciesTicker({
    interval: ['1d'],
    ids: tokens,
    quoteCurrency: "USD", // [DEPRECATED] use "convert" below instead
    convert: "USD", // defaults to "USD"
  });
  
  let final: {[ticker: string]: number} = {};
  prices.forEach(item => {
    console.log(item['price']);
    final[item['id']] = parseFloat(item['price']);
  })
  return final;
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
