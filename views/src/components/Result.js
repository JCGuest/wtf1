import React from 'react';

const Result = (props) => {
  return (
    <div>
      <h3>
        <em>Answer</em>
      </h3>
      <p>{props.result}</p>
    </div>
  );
};

export default Result;
