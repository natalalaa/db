import React from 'react';

const Form = (result) => {
  

  return (
    <div>
      <span>Result: {result.testResult1}</span>
      <input type="text" id="theInput" className="input" />
      <button className="button">Click me</button>
    </div>
  );
};

export default Form;