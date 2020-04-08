import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import WordList from '../../components/overview/WordList';
import { fetchWords } from '../../store/actions/overviewActions';
import { IQuestion } from '../../types/Quiz';
import Grammar from '../../components/overview/Grammar';
import LoginScreen from '../../components/home/LoginScreen';

const Overview: React.FC<{}> = () => {
  const [animate, setAnimate] = useState<boolean | string>(false);
  const [active, setActive] = useState<boolean | string>(false);
  const words = useSelector<any, Array<IQuestion>>((state) => state.words);
  const isLogin = useSelector<any, boolean>((state) => state.firebase.auth.uid);
  const dispatch = useDispatch();
  const history = useHistory();

  const categories: Array<string> = ['Adjectives', 'Nouns', 'Verbs', 'Your words', 'Grammar'];

  const handleCategory = (e: any) => {
    const name: string = e.target.id;
    if (active === name) {
      setActive(false);
      setAnimate(false);
      dispatch(fetchWords('null'));
    } else {
      if (name === categories[3] && !isLogin) setActive('Login Menu');
      else if (name !== categories[4]) {
        setAnimate(name);
        dispatch(fetchWords(name));
        setTimeout(() => {
          setActive(name);
        }, 500);
      } else {
        setAnimate(name);
        //TODO: FETCH GRAMMAR
        setTimeout(() => {
          setActive(name);
        }, 500);
      }
    }
  };

  const handleLoginMenu = () => {
    setActive(false);
  };

  const redirectHome = () => {
    setAnimate('Redirect');
    setActive(false);
    setTimeout(() => history.push('/'), 750);
  };

  const btnClass = (i: number): string => {
    if (categories[i] === active) return 'btn active';
    else if (categories[i] === animate) return 'btn animate';
    return 'btn';
  };

  return (
    <div className="overview">
      <div
        className={
          animate === 'Redirect'
            ? 'overview-square-backgorund redirect-anim'
            : 'overview-square-backgorund'
        }
      />
      <i className="fas fa-home" onClick={redirectHome} />
      <div className={active ? 'categories active' : 'categories'}>
        {categories.map((element: string, i: number) => (
          <div key={i} className={btnClass(i)} onClick={handleCategory} id={element}>
            {element}
          </div>
        ))}
      </div>
      {active && active !== categories[4] && <WordList words={words} />}
      {active && active === categories[4] && <Grammar words={words} />}
      <LoginScreen
        show={active === 'Login Menu'}
        isLogin={isLogin}
        handleLoginMenu={handleLoginMenu}
        showBackside={() => {}}
      />
    </div>
  );
};

export default Overview;
