import React, { Component } from 'react';
import CardGrid from '../card/cardGrid';


class GamePanel extends Component {

  constructor(props) {
    super(props);
    this.state = {cards: props.cards, fstTurnedCard: null};
    this.onCardClick = this.onCardClick.bind(this);
  }

  onCardClick(targetCard) {

    let isFstCardTurn = this.state.fstTurnedCard === null;

    this.setState(prevState => {
      let newState = {...prevState};
      newState.cards[targetCard.rowIdx][targetCard.colIdx].isTurnedOver = true;
      if(!prevState.fstTurnedCard) {
        newState.fstTurnedCard = targetCard;
      }
      return newState;
    });

    if(isFstCardTurn) {
      return;
    }

    this.setState(prevState => {
      let newState = {...prevState};
      newState.fstTurnedCard = null;

      if(targetCard.displayVal !== prevState.fstTurnedCard.displayVal) {
        newState.cards[targetCard.rowIdx][targetCard.colIdx].isTurnedOver = false;
        newState.cards[prevState.fstTurnedCard.rowIdx][prevState.fstTurnedCard.colIdx].isTurnedOver = false;
      }

      return newState;
    });
  }



  render() {
    return (
      <div>
        <CardGrid
          cards={this.state.cards}
          onCardClick={this.onCardClick} />
      </div>
    );
  }
}

export default GamePanel;