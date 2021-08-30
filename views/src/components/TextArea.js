import React from 'react';

const TextArea = (props) => {
  return (
    <textarea
      rows='4'
      className='text-input'
      placeholder='click here to type or click Start'
      value={props.value}
    ></textarea>
  );
};

export default TextArea;
