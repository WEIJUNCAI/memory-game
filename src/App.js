import React, { Component } from 'react';

import CardGrid from './components/card/cardGrid'

import './App.css';

class App extends Component {

  render() {

    const cards = getInitialCards();

    return (
      <div className="App">
        <CardGrid cards={cards}></CardGrid>
      </div>
    );
  }
}

function getInitialCards() {
  const cards = [];
  const rowNum = 6, colNum = 6;
  for(let i = 0; i < rowNum; ++i) {
    cards[i] = []
    for(let j = 0; j < colNum; ++j) {
      cards[i][j] = {
        row: i,
        col: j,
        content: i + j, 
        isTurnedOver: false 
      };
    }
  }


// function getInitialCards2() {
//   return 
//   [
//     [{row: 0, col: 0,
//       content: 0, 
//       isTurnedOver: true 
//     }]
//   ];
// }

  return cards;
}

export default App;
