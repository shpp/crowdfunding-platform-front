import React from 'react';

const CustomBlock = ({ label, lang, handleChange }) => {
  const fieldname = lang ? `${label.name}_${lang}` : label.name;
  return (
    <div>
      <label htmlFor={label.name}>{label.label} {lang && `(${lang})`}</label>
      <div><i>{label.description}</i></div>
      <input
        name={fieldname}
        id={fieldname}
        type={label.type}
        value={label.value[fieldname]}
        onChange={(event) => handleChange(event)}
      />
    </div>
  );
};

export default CustomBlock;
