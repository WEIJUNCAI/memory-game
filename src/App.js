import React, { Component } from 'react';

import GamePanel from './components/gamePanel/gamePanel'

import './App.css';

class App extends Component {

  render() {

    const cards = getInitialCards();

    return (
      <div className="App">
        <GamePanel cards={cards}></GamePanel>
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
  return cards;
}

export default App;
