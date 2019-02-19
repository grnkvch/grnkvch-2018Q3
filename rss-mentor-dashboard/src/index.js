import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

fetch('./data.json')
  .then((response)=>response.json())
  .then((result)=>{
    ReactDOM.render(<App data={result} />, document.getElementById('root'));
  })
  .catch(error => {
    alert(error);
  });

