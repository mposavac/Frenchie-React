import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIcons } from '../../store/actions/overviewActions';

const Basics: React.FC<any> = ({ words }) => {
  const dispatch = useDispatch();
  const images = useSelector<any, Array<string>>((state) => state.icons);

  useEffect(() => {
    if (images.length === 0) dispatch(fetchIcons());
    // eslint-disable-next-line
  }, []);

  return (
    <div className="word-list basic-list-wrapper">
      {words.map((section: any) => (
        <div className="word-list-wrapper" key={section.category}>
          <h2>{section.category}</h2>
          <div className={'basic-list ' + section.class}>
            {section.values.map((value: any, i: number) => (
              <div className="list-element" key={section.category + value.word}>
                {section.class === 'months' ? (
                  <div className="months-p-wrapper">
                    <p className="word">{value.word}</p>
                    {value.translation && <p className="translation">({value.translation})</p>}
                  </div>
                ) : (
                  <React.Fragment>
                    <p className="word">{value.word}</p>
                    {value.translation && <p className="translation">{value.translation}</p>}
                  </React.Fragment>
                )}
                {section.class === 'months' && <img src={images[i]} alt={value.translation} />}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Basics;
