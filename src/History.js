import React from 'react';

export const History = (props) => {
  const { ops } = props;
  return (
    <div className="history" id='history-panel'>
      <ul className="history__group">
        {ops.map((op, idx) => {
          return (
            <li key={idx} className="history__group--item">
              {op}
            </li>
          )
        })}
      </ul>
    </div>
  )
}