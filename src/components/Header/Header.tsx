import React from 'react';

import logo from '@images/dao-metrics.png';

interface IProps {
}

const Header: React.FunctionComponent<IProps> = () => {
  return (
    <div style={{display: 'flex', flexDirection: 'row', height: '2em', margin: '0.5em 1.5em'}}>
      <img src={logo} style={{objectFit: 'contain', width: '10em'}}/>
    </div>
  );
};

Header.defaultProps = {};

export default Header;
