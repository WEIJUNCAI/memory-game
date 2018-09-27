import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Container from 'react-bootstrap/lib/Container';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';


import Card from './card';

import './cardGrid.css'

class CardGrid extends Component {

  render() {
    const { cards, onCardClick } = this.props;

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
                  onCardClick={onCardClick}></Card>
              </Col>
            )}
          </Row>
        )}
      </Container>
    );
  }
}

CardGrid.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        content: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        isTurnedOver: PropTypes.bool.isRequired
      })
    )
  ).isRequired,
  onCardClick: PropTypes.func.isRequired
}

export default CardGrid;