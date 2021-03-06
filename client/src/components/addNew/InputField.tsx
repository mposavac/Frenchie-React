import React from 'react';
import { IPropsInputField } from '../../types/Quiz';

const InputField: React.FC<IPropsInputField> = ({ value, setter, id, text }) => {
  return (
    <div className="input-field">
      <input
        type="text"
        onChange={(e) => setter(e.target.value)}
        id={id}
        value={value}
        autoComplete="off"
        required
      />
      <label htmlFor={id}>
        <span className="label-tag">{text}</span>
      </label>
    </div>
  );
};

export default InputField;
