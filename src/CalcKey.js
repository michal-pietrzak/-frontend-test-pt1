import React from 'react';

export const CalcKey = (props) => {
  const { keyvalue } = props
  return (
      <button key={`key-${keyvalue}`} {...props}>{keyvalue}</button>
  )
}