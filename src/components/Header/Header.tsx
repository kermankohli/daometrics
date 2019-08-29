import React from 'react';
// import logo from '@images/logo.svg';

interface IProps {
  textColor?: string;
}

const Header: React.FunctionComponent<IProps> = (props) => (
  <div 
    className={`flex justify-between items-center py-5 px-5 tablet:px-12 ${props.textColor || 'text-white'}`} 
    style={{background: '#071021'}}
  >
    <div className="flex flex-row items-center">
      {/* <img className="h-6 mr-md" src={} /> */}
      <p className="text-lg tracking-wide">HELIS</p>
    </div>
    <div className="flex flex-row">
      <a className="mr-lg tablet:mr-xl" href="https://about.helis.network">
        <p className="font-medium">
          About
        </p>
      </a>
      <a className="" href="https://medium.com/helisnetwork" target="_blank">
        <p className="font-medium">Blog</p>
      </a>
    </div>
  </div>
);

Header.defaultProps = {
};

export default Header;
