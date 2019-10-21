import React, {useEffect, useState} from 'react';
import axios from 'axios';

import "./HomePage.css";

import boxOne from '@images/box-one.svg';
import boxTwo from '@images/box-two.svg';
import boxThree from '@images/box-three.svg';

import {DAOInformation, daos, tokens} from "../../constants/addresses";
import {asyncForEach} from "@utils/array";
import PriceService from "@services/PriceService";

interface IProps {
}

interface DAOData extends DAOInformation {
  rank: string,
  tokens: { [ticker: string]: number },
  usdTokens: { [ticker: string]: number },
  prices: string,
  ethTotal: number,
  usdTotal: number,
}

const Row = (rank: string, name: string, structure: string, locked: string) => {
  return (
    <tr>
      <td>{rank}</td>
      <td>{name}</td>
      <td className={'optional-metric'}>{structure}</td>
      <td>{locked}</td>
    </tr>
  )
}

const HomePage: React.FunctionComponent<IProps> = () => {
  const [daoData, setDAOData] = useState<Array<DAOData>>([]);

  async function fetchData() {
    let data: DAOData[] = [];
    let priceService = new PriceService();

    await asyncForEach(Object.values(daos), async (dao: DAOInformation) => {
      let newDAO: DAOData = {
        rank: '',
        tokens: {},
        usdTokens: {},
        prices: {},
        ethTotal: 0,
        usdTotal: 0,
        ...dao
      } as DAOData;

      const tokenBalances = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://api.bloxy.info/address/balance?address=${dao.address}&chain=eth&key=ACCFF7UlMIQ8X`)

      tokenBalances.data.filter((item: any) => {
        return item['sent_txs'] > 0;
      }).forEach((item: any) => {
        newDAO.tokens[item.symbol] = item.balance;
      });

      newDAO.ethTotal = newDAO.tokens.ETH || 0 + newDAO.tokens.PETH || 0 + newDAO.tokens.WETH || 0;
      newDAO.usdTokens = await priceService.getUSDValues((newDAO.tokens));
      newDAO.usdTotal = Object.values(newDAO.usdTokens).reduce((one, two) => one + two);

      data.push(newDAO);
    })

    data = data.sort((a, b) => (a.usdTotal < b.usdTotal) ? 1 : -1);
    data = data.map(item => {
      let rank = data.indexOf(item) + 1;
      let stringRank = rank.toString()
      if (rank == 1) {
        stringRank = '1  🏆'
      } else if (rank == 2) {
        stringRank = '2  🥈'
      } else if (rank == 3) {
        stringRank = '3  🥉'
      }

      item.rank = stringRank;
      return item;

    });

    setDAOData(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const getCombinedETH = () => {
    let ethTotal = 0;
    daoData.forEach((item) => ethTotal += item.ethTotal);
    return formatMoney(ethTotal);
  }

  const getCombinedUSD = () => {
    let usdTotal = 0;
    daoData.forEach((item) => usdTotal += item.usdTotal);
    return formatMoney(usdTotal);
  }

  const formatMoney = (amount: number) => {
    if (amount >= 1000000000) {
      return (amount / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
    }
    if (amount >= 1000000) {
      return (amount / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (amount >= 1000) {
      return (amount / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }

    return amount;
  };

  return (
    <div className={'outer-container'}>
      <div className={'leaderboard-container'}>
        <h1>Leaderboard</h1>
        <div className={'stats-container'}>
          <div className={'stats-box'} style={{backgroundImage: `url(${boxOne})`}}>
            <h5>DAOs Online</h5>
            <h2>{daoData.length}</h2>
          </div>
          <div className={'stats-box'} style={{backgroundImage: `url(${boxTwo})`}}>
            <h5>Total locked</h5>
            <h2>${getCombinedUSD()}</h2>
          </div>
          <div className={'stats-box'} style={{backgroundImage: `url(${boxThree})`}}>
            <h5>ETH Held</h5>
            <h2>{getCombinedETH()}</h2>
          </div>
        </div>
      </div>
      {
        daoData.length === 0 ?
          <p>Loading...</p> :
          <table className={'stats-table'}>
            <thead>
              <th>#</th>
              <th>Name</th>
              <th className={'optional-metric'}>Structure</th>
              <th>Locked</th>
            </thead>
            <tbody>
              {
                daoData.map((dao) => {
                  return Row(dao.rank, dao.name, dao.structure, '$' + formatMoney(dao.usdTotal));
                })
              }
            </tbody>
          </table>
      }
    </div>
  )
};

HomePage.defaultProps = {};

export default HomePage;
