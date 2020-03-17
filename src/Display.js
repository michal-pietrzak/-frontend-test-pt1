import React from 'react';

export const Display = (props) => {
  const { expression, result } = props
  return (
    <div className="display"> { result ? result : expression }</div >
    
  )
}