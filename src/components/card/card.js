import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';

class Card extends Component {

  render() {
    const { displayVal } = this.props;
    return (
      <Button variant="primary" className="h-100" block>{displayVal}</Button>
    );
  }

}

export default Card;