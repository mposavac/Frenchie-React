import React from 'react';

import { IPropsInputField } from '../../types/Home';

const InputField: React.FC<IPropsInputField> = ({ type, id, value, name, icon, handleInput }) => {
  return (
    <div className="input-field">
      <input type={type} id={id} value={value} onChange={handleInput} placeholder={name} required />
      <label htmlFor={id}>
        <i className={'fas ' + icon} />
      </label>
    </div>
  );
};

export default InputField;
