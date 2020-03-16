import React, {useState} from 'react';

export const Input = () => {
  const [expression, setExpression] = useState('');

  const handleChange = (e) => {
    e.preventDefault();
    setExpression(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(expression);
    const calcKeys = /([0-9]*)|([+ - * /]*)/gm;
    const total = parse(expression);
    console.log(total);
    setExpression(e.target.value);

  }

  const parse = (str) => {
    return str.split(/([^0-9.]+)/);
  }

  return (
    <form className="calc-input">
      <input type="text" onChange={handleChange} value={expression} />
    </form>
  )
}