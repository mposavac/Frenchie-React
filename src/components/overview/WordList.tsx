import React from 'react';

import { IPropsOWordList } from '../../types/Overview';
import { IQuestion } from '../../types/Quiz';

const WordList: React.FC<IPropsOWordList> = ({ words }) => {
  return (
    <React.Fragment>
      {words.length > 0 && (
        <div className="word-list">
          <div>
            <p>English</p>
            <p>French</p>
          </div>
          {words.map((element: IQuestion, i: number) => (
            <div key={i}>
              <p>{element.translation[0].toUpperCase() + element.translation.substr(1)}</p>
              {Array.isArray(element.word) ? (
                <p>{element.word.map((word: string) => word).join(', ')}</p>
              ) : (
                <p>{element.word[0].toUpperCase() + element.word.substr(1)}</p>
              )}
            </div>
          ))}
        </div>
      )}
      {words.length > 18 && (
        <div className="scroll-arrows">
          <i className="fas fa-chevron-down" />
          <i className="fas fa-chevron-down" />
        </div>
      )}
    </React.Fragment>
  );
};

export default WordList;
