import React, { Component } from 'react';
import Container from 'react-bootstrap/lib/Container';

import CardGrid from '../card/cardGrid';
import GameHeader from './gameHeader';
import Timer from './timer'; 

class GamePanel extends Component {

  constructor(props) {
    super(props);
    // fstTurnedCard records the most recent uncommitted card flip
    this.state = {
       cards: props.cards, 
       fstTurnedCard: null, 
       startTime: new Date(),
       currnetTime: new Date()
      };
    this.handleCardClick = this.handleCardClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
  }

  componentDidMount() {
    this.timerId = setInterval(
      () => this.setState({ currnetTime: new Date() }), 
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  handleCardClick(targetCard) {

    let isFstCardTurn = this.state.fstTurnedCard === null;

    // the clicked card should be revealed
    // no matter the circumstances
    this.setState(prevState => {
      let newState = { ...prevState };
      newState.cards[targetCard.rowIdx][targetCard.colIdx].isTurnedOver = true;
      if (!prevState.fstTurnedCard) {
        newState.fstTurnedCard = targetCard;
      }
      return newState;
    });

    // if the click flips the first (uncommitted) card,
    // no further actions are required
    if (isFstCardTurn) {
      return;
    }

    // otherwise, depending on whether the content of the second fliped card
    // is the same as that of the first card, we should either
    // - make the flip permanet, or
    // - turn both cards back to hidden
    setTimeout(() => {
      this.setState(prevState => {
        let newState = { ...prevState };
        newState.fstTurnedCard = null;

        if (targetCard.displayVal !== prevState.fstTurnedCard.displayVal) {
          newState.cards[targetCard.rowIdx][targetCard.colIdx].isTurnedOver = false;
          newState.cards[prevState.fstTurnedCard.rowIdx][prevState.fstTurnedCard.colIdx].isTurnedOver = false;
        }

        return newState;
      });
    }, 1000);
  }

  handleResetClick() {
    // turn all cards into hidden state
    this.setState(prevState => {
      let newState = { ...prevState };
      newState.fstTurnedCard = null;
      newState.startTime = new Date();
      newState.currnetTime = new Date();
      newState.cards = newState.cards.map(cardRow =>
        cardRow.map(card => {
          return { ...card, isTurnedOver: false };
        }));

      return newState;
    });
  }

  getElapsedMinSec(startTime, endTime) {
    const elapsedTotalSec = (endTime - startTime) / 1000;
    const result = {};

    result.elapsedMin = Math.floor(elapsedTotalSec / 60);
    result.elapsedSec = Math.floor(elapsedTotalSec % 60);

    return result;
  }


  render() {
    const { elapsedMin, elapsedSec } = this.getElapsedMinSec(this.state.startTime, this.state.currnetTime);

    return (
      <Container className="pt-3">
        <GameHeader
          onResetClick={this.handleResetClick}></GameHeader>
        <Timer
          elapsedMin={elapsedMin}
          elapsedSec={elapsedSec}></Timer>
        <CardGrid
          cards={this.state.cards}
          onCardClick={this.handleCardClick} />
      </Container>
    );
  }
}

export default GamePanel;