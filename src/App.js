import React, { Component } from 'react';

import CardGrid from './components/card/cardGrid'

import logo from './logo.svg';
import './App.css';

class App extends Component {

  render() {

    const cards = 
    [
      [1,2,3,11,22,33], 
      [4,5,6,44,55,66], 
      [7,8,9,77,88,99]
    ];

    return (
      <div className="App">
        <CardGrid cards={cards}></CardGrid>
      </div>
    );
  }
}

export default App;
