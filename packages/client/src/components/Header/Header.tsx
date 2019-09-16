import React from 'react';
// import logo from '@images/logo.svg';

interface IProps {
  textColor?: string;
}

const Header: React.FunctionComponent<IProps> = (props) => (
  <div>
    <div>
      {/* <img className="h-6 mr-md" src={} /> */}
      <p>HELIS</p>
    </div>
    <div>
      <a href="https://about.helis.network">
        <p>
          About
        </p>
      </a>
      <a className="" href="https://medium.com/helisnetwork" target="_blank">
        <p>Blog</p>
      </a>
    </div>
  </div>
);

Header.defaultProps = {
};

export default Header;
