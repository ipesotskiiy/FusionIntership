import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import Header from './ui/containers/Header/Header';
import Footer from './ui/containers/Footer';
import Navigation from './ui/containers/Navigation';
import authApi from './api/authApi';
import { useAppDispatch } from './store';
import { setUser } from './store/reducer';

const App = () => {
  const dispatch = useAppDispatch();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    (async () => {
      const token = Cookies.get('token');
      const response = await authApi.checkToken(token).catch(() => null);
      if (response) {
        dispatch(setUser(response.data.user));
      }
      setIsAuthorized(true);
    })();
  }, [setIsAuthorized, dispatch]);

  if (!isAuthorized) {
    return null;
  }

  return (
    <>
      <Header />
      <Navigation />
      <Footer />
    </>
  );
};

export default App;
