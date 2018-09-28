import React, { Component } from 'react';
import { Fragment } from 'react';
import PropTypes from 'prop-types';

import Container from 'react-bootstrap/lib/Container';

import CardGrid from '../card/cardGrid';
import GameHeader from './gameHeader';
import Timer from './timer';
import GameResultModal from './gameResultModal';

import { generateRandomGrid } from '../../shared/randomGridHelper';


class GamePanel extends Component {

  constructor(props) {
    super(props);
    const { cards, timeLimit } = this.props;
    const cardNum = cards.length * cards[0].length / 2;
    // fstTurnedCard records the most recent uncommitted card flip
    this.state = {
      cards: cards,
      fstTurnedCard: null,
      sndCardClicked: false,
      startTime: new Date(),
      currnetTime: new Date(),
      prevCardNum: cardNum,
      prevTimeLimit: timeLimit,
      timeLimit: timeLimit,
      cardNum: cardNum,
      resultModalShow: false
    };
    this.handleCardClick = this.handleCardClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.handleCardNumConfigChange = this.handleCardNumConfigChange.bind(this);
    this.handleTimeLimitConfigChange = this.handleTimeLimitConfigChange.bind(this);
    this.handleGameConfigSaveChange = this.handleGameConfigSaveChange.bind(this);
    this.handleGameConfigDiscardChange = this.handleGameConfigDiscardChange.bind(this);
    this.handleGameResultModalClose = this.handleGameResultModalClose.bind(this);
  }

  componentDidMount() {
    this.timerId = setInterval(() => {
      this.setState({ currnetTime: new Date() });
    },
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  handleCardClick(targetCard) {

    // if the second uncommitted card is clicked but its state change (scheduled to happen in 1 sec)
    // has not happend yet, we should prevent any further state change caused
    // by clicking 
    if(this.state.sndCardClicked) {
      return;
    }

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
    this.setState({sndCardClicked: true});

    // the state change of the second card is scheduled to run
    // after 1 second, which gives the user to still see the card
    // even if two cards do not match 
    setTimeout(() => {
      this.setState(prevState => {
        let newState = { ...prevState };

        if (targetCard.displayVal !== prevState.fstTurnedCard.displayVal) {
          newState.cards[targetCard.rowIdx][targetCard.colIdx].isTurnedOver = false;
          newState.cards[prevState.fstTurnedCard.rowIdx][prevState.fstTurnedCard.colIdx].isTurnedOver = false;
        }

        newState.fstTurnedCard = null;
        newState.sndCardClicked = false;
        return newState;
      });
    }, 1000);
  }

  handleResetClick() {
    // turn all cards into hidden state
    this.setState(prevState => {
      let newState = { ...prevState };
      newState.fstTurnedCard = null;
      newState.sndCardClicked = false;
      newState.startTime = new Date();
      newState.currnetTime = new Date();
      newState.cards = newState.cards.map(cardRow =>
        cardRow.map(card => {
          return { ...card, isTurnedOver: false };
        }));

      return newState;
    });
  }

  handleCardNumConfigChange(newVal) {
    this.setState({ cardNum: newVal });
  }

  handleTimeLimitConfigChange(newVal) {
    this.setState({ timeLimit: newVal });
  }

  // game settings changed, need to re-generate
  // the game board
  handleGameConfigSaveChange() {
    const newCardNum = parseInt(this.state.cardNum, 10),
      newTimeLimit = parseInt(this.state.timeLimit, 10);
    const randNums = generateRandomGrid(newCardNum);
    const newGrid = randNums.map((randNumRow, rowIdx) =>
      randNumRow.map((randNum, colIdx) => {
        return {
          row: rowIdx,
          col: colIdx,
          content: randNum,
          isTurnedOver: false
        };
      }));

    this.setState({
      cards: newGrid,
      fstTurnedCard: null,
      sndCardClicked: false,
      startTime: new Date(),
      currnetTime: new Date(),
      prevCardNum: newCardNum,
      prevTimeLimit: newTimeLimit,
      timeLimit: newTimeLimit,
      cardNum: newCardNum,
      resultModalCloseClicked: false
    });
  }

  // if user made changes to the game settings
  // but did not save them, we need to restore the
  // previous values
  handleGameConfigDiscardChange() {
    this.setState(prevState => {
      return {
        timeLimit: prevState.prevTimeLimit,
        cardNum: prevState.prevCardNum
      };
    })
  }

  // when user close the result modal,
  // reset all states in the game and restart it
  handleGameResultModalClose() {
    this.setState(prevState => {
      let newState = { ...prevState };
      newState.fstTurnedCard = null;
      newState.sndCardClicked = false;
      newState.startTime = new Date();
      newState.currnetTime = new Date();
      newState.resultModalCloseClicked = true;
      newState.cards = newState.cards.map(cardRow =>
        cardRow.map(card => {
          return { ...card, isTurnedOver: false };
        }));

      return newState;
    });
  }

  // calculate the time remaining, compared against
  // the pre-set game time limit
  getRemainingMinSec(startTime, endTime, timeLimitInMin) {
    const elapsedTotalSec = (endTime - startTime) / 1000;
    const remainingTotalSec = timeLimitInMin * 60 - elapsedTotalSec;
    const result = {};

    result.remainingMin = Math.floor(remainingTotalSec / 60);
    result.remainingSec = Math.floor(remainingTotalSec % 60);

    return result;
  }

  // check if all cards are in revealed state
  // if so, the player wins
  allCardsTurnedOver(cards) {
    return cards.every(cardsRow =>
      cardsRow.every(card => card.isTurnedOver)
    );
  }

  render() {
    let { remainingMin, remainingSec } =
      this.getRemainingMinSec(this.state.startTime, this.state.currnetTime, this.state.prevTimeLimit);

    let showResultModal, resultModalMsg;
    const allCardsRevealed = this.allCardsTurnedOver(this.state.cards);

    if (this.state.resultModalCloseClicked) {
      showResultModal = false;
    } else if ((remainingMin <= 0 && remainingSec <= 0) || allCardsRevealed) {
      resultModalMsg = allCardsRevealed ? "congratulations, you win!" : "Sorry, your time is up!"
      remainingMin = 0;
      remainingSec = 0;
      showResultModal = true;
    } else {
      showResultModal = false;
    }

    return (
      <Fragment>
        <GameHeader
          cardNum={this.state.cardNum}
          timeLimit={this.state.timeLimit}
          onResetClick={this.handleResetClick}
          onCardNumConfigChange={this.handleCardNumConfigChange}
          onTimeLimitConfigChange={this.handleTimeLimitConfigChange}
          onGameConfigSaved={this.handleGameConfigSaveChange}
          onGameConfigCanceled={this.handleGameConfigDiscardChange} />
        <Container className="pt-3">
          <Timer
            remainingMin={remainingMin}
            remainingSec={remainingSec}></Timer>
          <CardGrid
            cards={this.state.cards}
            onCardClick={this.handleCardClick} />
        </Container>
        <GameResultModal
          show={showResultModal}
          gameResultMsg={resultModalMsg}
          onGameResultModalClose={this.handleGameResultModalClose} />
      </Fragment>
    );
  }
}

GamePanel.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        content: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        isTurnedOver: PropTypes.bool.isRequired
      })
    )
  ).isRequired,
  timeLimit: PropTypes.number.isRequired
}

export default GamePanel;