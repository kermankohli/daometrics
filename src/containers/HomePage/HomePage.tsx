import React, { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';

interface IProps { }

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const HomePage: React.FunctionComponent<IProps> = () => {

  return (
    <div>
      <h1>Leaderboard</h1>
      <div>
        <div>
          <h5>Total locked</h5>
          <h2>$800.4M</h2>
        </div>
      </div>
      <div>
        <div>
          <p>Rank</p>
          <p>Name</p>
          <p>Structure</p>
          <p>Members</p>
          <p>Locked (USD)</p>
        </div>
        <div>
          <p>1</p>
          <p>MakerDAO</p>
          <p>Democracy</p>
          <p>Members</p>
          <p>Locked</p>
        </div>
      </div>
    </div>
  );
};

HomePage.defaultProps = {};

export default HomePage;
