import React from 'react';
import { Link } from 'react-router-dom';
import CommonButton from '../components/CommonButton';
import CommonTextBlock from '../styles/CommonTextBlock';
import castle from '../images/castle.png';
import fairy from '../images/fairy.png';
import Wrapper from './AuthorizeBanner.styles';
import CommonWrapper from '../styles/CommonWrapper';

const AuthorizeBanner = () => {
  return (
    <CommonWrapper>
      <Wrapper>
        <div>
          <img src={castle} className="main-img" alt="castle image" />
        </div>
        <div className="info-block">
          <img src={fairy} className="background-img" alt="fairy image" />
          <CommonTextBlock className="text-block">
            <p className="title">Authorize now</p>
            <p className="text">
              Authorize now and discover the fabulous world of books
            </p>
            <Link className="button" to="/signIn">
              <CommonButton text="Log In/ Sign Up" />
            </Link>
          </CommonTextBlock>
        </div>
      </Wrapper>
    </CommonWrapper>
  );
};

export default AuthorizeBanner;