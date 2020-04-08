import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ReactPlayer from 'react-player';

import { signOut } from '../../store/actions/authActions';
import Loading from '../../components/Loading';
import LoginScreen from '../../components/home/LoginScreen';
import DesktopHome from './DesktopHome';
import '../../style/home.scss';
import MobileHome from './MobileHome';

const HomeController: React.FC<{}> = () => {
  const [animateIndex, setAnimateIndex] = useState<number | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loginMenuOpen, setLoginMenuOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const isLogin = useSelector<any, boolean>((state) => state.firebase.auth.uid || false);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    console.log(window.innerWidth);
    if (window.innerWidth < 400) setIsMobile(true);
  }, []);

  const handleAnimation = (e: any) => {
    setAnimateIndex(parseInt(e.target.id));
    let redirectingTo: string;
    if (e.target.id === '1') redirectingTo = '/quiz';
    else if (e.target.id === '2') redirectingTo = '/overview';
    else if (e.target.id === '3') redirectingTo = '/add';

    if (e.target.id === '4' && isLogin) {
      setAnimateIndex(undefined);
      dispatch(signOut());
      //ANIMACIJA LOADING
    } else if (e.target.id === '4')
      setTimeout(() => {
        handleLoginMenu();
      }, 800);
    else setTimeout(() => history.push(redirectingTo), 800);
  };

  const handleLoginMenu = () => {
    setLoginMenuOpen(!loginMenuOpen);
    if (loginMenuOpen) setAnimateIndex(undefined);
  };

  const showBackside = () => {
    if (animateIndex === 4) setAnimateIndex(5);
    else setAnimateIndex(4);
  };

  const screenSize = (): string => {
    if (window.innerWidth < 400) return '350%';
    return '150%';
  };
  return (
    <div className="home">
      <Loading isLoading={isLoading} />
      <div className={isLoading ? 'video-background' : 'video-background active'}>
        <ReactPlayer
          url="https://www.youtube.com/watch?v=odw6rIoiJuo"
          playing
          muted
          loop
          width={screenSize()}
          height="150%"
          onStart={() => setIsLoading(false)}
        />
      </div>

      {isMobile ? (
        <MobileHome
          isLoading={isLoading}
          isLogin={isLogin}
          handleAnimation={handleAnimation}
          animateIndex={animateIndex}
        />
      ) : (
        <DesktopHome
          isLoading={isLoading}
          isLogin={isLogin}
          handleAnimation={handleAnimation}
          animateIndex={animateIndex}
        />
      )}

      <LoginScreen
        show={loginMenuOpen}
        isLogin={isLogin}
        handleLoginMenu={handleLoginMenu}
        showBackside={showBackside}
      />
    </div>
  );
};

export default HomeController;
