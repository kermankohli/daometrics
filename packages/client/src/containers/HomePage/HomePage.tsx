import React, { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

interface IProps { }

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const OuterDiv = styled.div`
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
`;

const InnerDiv = styled.div`
`;

const StatsBox = styled.div`
  padding: 2rem;
  margin: 0 2rem;
  flex: 1;
`;

const StatsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Row = (rank: string = 'Rank', name: string = 'Name', structure: string = 'Structure', members: string = 'Members', locked: string = 'Locked') => {
  return(
    <div style={{display: 'flex', flexDirection: 'row', marginBottom: '1em'}}>
      <p style={{width: '10em'}}>{rank}</p>
      <p style={{width: '10em'}}>{name}</p>
      <p style={{width: '10em'}}>{structure}</p>
      <p style={{width: '10em'}}>{members}</p>
      <p style={{width: '10em'}}>{locked}</p>
    </div>
  )
}

const HomePage: React.FunctionComponent<IProps> = () => {

  async function test() {
    // const response = await axios.get('https://api.aleth.io/v1/tokens/0x1fd169A4f5c59ACf79d0Fd5d91D1201EF1Bce9f1',{ 
    //   headers: {
    //   "Authorization": 'main_ihmj3uousvb2nzhxy3eimhhxi4u4sbbn'
    //   }
    // });
    const response = await axios.get('https://api.tokenbalance.com/token/0x1fd169A4f5c59ACf79d0Fd5d91D1201EF1Bce9f1/');
    console.log(response);
  }

  test();

  return (
    <OuterDiv>
      <h1>Leaderboard</h1>
      <InnerDiv>
        <StatsContainer>
          <StatsBox>
            <h5>Total locked</h5>
            <h2>$800.4M</h2>
          </StatsBox>
          <StatsBox>
            <h5>Total locked</h5>
            <h2>$800.4M</h2>
          </StatsBox>
          <StatsBox>
            <h5>Total locked</h5>
            <h2>$800.4M</h2>
          </StatsBox>
        </StatsContainer>
      </InnerDiv>
      <InnerDiv>
        {Row()}
        {Row('1', 'MakerDAO', 'Democracy', '1000', '$500m')}
        {Row('1', 'MakerDAO', 'Democracy', '1000', '$500m')}
        {Row('1', 'MakerDAO', 'Democracy', '1000', '$500m')}
      </InnerDiv>
    </OuterDiv>
  );
};

HomePage.defaultProps = {};

export default HomePage;
