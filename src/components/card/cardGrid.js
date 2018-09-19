import React, { Component } from 'react';
import Container from 'react-bootstrap/lib/Container';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';


import Card from './card';

import './cardGrid.css'

class CardGrid extends Component {

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
    const { cards } = this.props;

    return (
      <Container>
        {cards.map((cardRow, indexOuter) => 
          <Row key={`outerCardGrid${indexOuter}`}>
            {cardRow.map((cardCol, indexInner) => 
              <Col key={`innerIndex${indexInner}`}  className="card-grid my-4">
                <Card 
                  rowIdx={indexOuter}
                  colIdx={indexInner}
                  displayVal={cardCol.content}
                  isTurnedOver={cardCol.isTurnedOver}
                  onCardClick={this.onCardClick}></Card>
              </Col>
            )}
          </Row>
        )}
      </Container>
    );
  }
}

export default CardGrid;