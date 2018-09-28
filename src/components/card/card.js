import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/lib/Button';

class Card extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.onCardClick(this.props);
  }

  render() {
    const { displayVal, isTurnedOver } = this.props;

    return (
      // is revealed ?
      isTurnedOver ? 
      <Button variant="primary" className="h-100 turned-over" block>{displayVal}</Button>
      : <Button variant="info" className="h-100" onClick={this.handleClick} block></Button>
    );
  }

}

Card.propTypes = {
  displayVal: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isTurnedOver: PropTypes.bool.isRequired
}

export default Card;