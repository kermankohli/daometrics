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
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
`;

const StatsBox = styled.div`
  padding: 1.5rem 1rem;
  flex: 1;
  text-align: center;
`;

const StatsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  @media (max-width: 440px) {
    flex-direction: column;
  }
`;

const Table = styled.table`
  overflow: auto;
  display: grid;
  border-collapse: collapse;
  min-width: 100%;
  row-gap: 0.5em;
  grid-template-columns: 
    minmax(50px, 1fr)
    minmax(125px, 1.67fr)
    minmax(150px, 1.67fr)
    minmax(100px, 1.67fr);
`;

const TD = styled.td`
  padding: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-top: 10px;
  padding-bottom: 10px;
  color: #808080;
  background-color: #323447;
`;

const TH = styled.th`
  padding: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: sticky;
  top: 0;
  text-align: left;
  font-weight: normal;
  font-size: 1.1rem;
  color: white;
`;

const TR = styled.tr`
  margin: 1em;
  display: contents;
`;

const Row = (rank: string = 'Rank', name: string = 'Name', structure: string = 'Structure', members: string = 'Members', locked: string = 'Locked') => {
  return(
    <div style={{display: 'flex', margin: '2em'}}>
      <p style={{marginRight: '2em'}}>{name}</p>
      <p style={{marginRight: '2em'}}>{structure}</p>
      <p style={{marginRight: '2em'}}>{members}</p>
      <p style={{marginRight: '2em'}}>{rank}</p>
      <p style={{marginRight: 'em'}}>{locked}</p>
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
      <h1 style={{textAlign: 'center'}}>Leaderboard</h1>
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
      {/* <InnerDiv> */}
        <Table>
          <thead style={{display: 'contents'}}>
            <TR>
              <TH>#</TH>
              <TH>Name</TH>
              <TH>Structure</TH>
              <TH>Locked</TH>
            </TR>
          </thead>
          <tbody style={{display: 'contents'}}>
            <TR>
              <TD>1</TD>
              <TD>MakerDAO</TD>
              <TD>Democracy</TD>
              <TD>$300m</TD>
            </TR>
            <TR>
              <TD>1</TD>
              <TD>MakerDAO</TD>
              <TD>Democracy</TD>
              <TD>$300m</TD>
            </TR>
          </tbody>
        </Table>
        {/* <RowContainer>
          {Row()}
          {Row('1', 'MakerDAO', 'Democracy', '1000', '$500m')}
          {Row('1', 'MakerDAO', 'Democracy', '1000', '$500m')}
          {Row('1', 'MakerDAO', 'Democracy', '1000', '$500m')}
        </RowContainer> */}
      {/* </InnerDiv> */}
    </OuterDiv>
  );
};

HomePage.defaultProps = {};

export default HomePage;
