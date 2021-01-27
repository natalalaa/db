import './../styles/App.css';
import React, { useState } from 'react';
import { useLazyQuery, gql } from '@apollo/client';

const MAX_INPUT_LENGTH = 10;

const PERSON_QUERY = gql`
query GetPersonById( $id: Int!) {
  person(id: $id) {
    val1
    val2
    facility {
      id
      val3
    }
    exposure {
      id
      val5
    }
  }
}
`;


function App() {

  const [inputValue, setInputValue] = useState();
  const [overlay, setOverlay] = useState(false);

  const [getPerson, { data }] = useLazyQuery(PERSON_QUERY);

  const onChangeHandler = function (e){
    let theValue = e.target.value;

    let isnum = /^\d+$/.test(theValue);
    if (!isnum){
      theValue = "";
    }

    if (theValue.length > MAX_INPUT_LENGTH) {
      theValue = theValue.slice(0, MAX_INPUT_LENGTH);
    }

    setInputValue(theValue);
  };

  const onClickHandler = function (e){
    console.log("inputValue", inputValue);
    if (!inputValue) return;

    //only 1000 records in the mock data, so we fake a bit
    let passedValue = inputValue;
    if (passedValue > 1000) {
      passedValue = passedValue % 1000;
    }

    getPerson({ 
      variables: { 
        id: parseInt(passedValue)
      } 
    });
    setOverlay(true);

  };

  

  
  

  return (
      <main id="main-content" className="section-container">
        <div className="bar"></div>
        <img className="logo" src="https://danskebank.dk/-/media/danske-bank/img/danske-bank-logo.svg?rev=7be956c6ad76407f8863ffc56e4234e7&hash=B82DDEBF6167BF33FAFC6EA8B9BAAEE2" alt="Danske Bank"></img>
        {data && overlay &&
           <div className="overlay" >
              <div className="overlay---inner">
                <button className="close" onClick={() => setOverlay(false)}>Close</button>
                <h2>Here is your data :)</h2>
                <div className="results">
                  <h3>Val3: <span>{data.person.facility.val3}</span></h3>
                  <h3>Val5: <span>{data.person.exposure.val5}</span></h3>
                </div>
                <h2>Result: {parseInt(data.person.facility.val3) * parseInt(data.person.exposure.val5)}</h2>
              </div>
            </div>
        }
          <div className="form">
            <h1>Would you like to find your data?</h1>
              <input value={inputValue} onChange={e => onChangeHandler(e)} className="input" />
              <button className="button" onClick={(e) => onClickHandler(e) } >Search</button>
            </div>
          
      </main>
    );
  

}

export default App;