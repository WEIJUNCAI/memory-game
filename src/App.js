import React, { Component } from 'react';

import GamePanel from './components/gamePanel/gamePanel'

import { generateRandomGrid } from './shared/randomGridHelper'

import './App.css';

class App extends Component {

  render() {

    const cards = getInitialCards(4);

    return (
      <div className="App">
        <GamePanel cards={cards} timeLimit={1}></GamePanel>
      </div>
    );
  }
}

function getInitialCards(maxNumber) {
  const cards = [];
  const randGrid = generateRandomGrid(maxNumber);
  const rowNum = randGrid.length, colNum = randGrid[0].length;
  for(let i = 0; i < rowNum; ++i) {
    cards[i] = []
    for(let j = 0; j < colNum; ++j) {
      cards[i][j] = {
        row: i,
        col: j,
        content: randGrid[i][j], 
        isTurnedOver: false 
      };
    }
  }
  return cards;
}

export default App;
