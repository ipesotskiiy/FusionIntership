import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logoWhiteLetters.png';
import map from '../../images/map.png';
import Logo from '../../styles/Logo.styles';
import FooterWrapper from './Footer.styles';
import CommonWrapper from '../../styles/CommonWrapper.styles';
import { routePath } from '../../../constants';

const Footer = () => {
  return (
    <FooterWrapper>
      <CommonWrapper>
        <div className="footer__main">
          <div className="footer__contacts">
            <Link to={routePath.home}>
              <Logo
                src={logo}
                className="footer__logo"
              />
            </Link>
            <p className="footer__text">
              ye.alexey@gmail.com
            </p>
            <p className="footer__text">
              (480) 555-0103
            </p>
          </div>
          <div className="footer__nav nav">
            <Link to={routePath.home} className="nav__link">
              Home Page
            </Link>
            <Link to={routePath.home} className="nav__link">
              Catalog
            </Link>
            <Link to={routePath.profile} className="nav__link">
              My Account
            </Link>
            <Link to={routePath.cart} className="nav__link">
              Cart
            </Link>
          </div>
          <div>
            <p className="footer__text">
              6391 Elgin St. Celina, Delaware 10299
            </p>
            <img
              className="footer__map"
              src={map}
            />
          </div>
        </div>
      </CommonWrapper>
    </FooterWrapper>
  );
};

export default Footer;
