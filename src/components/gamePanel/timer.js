import React, { Component } from 'react';
import Badge from 'react-bootstrap/lib/Badge';

class Timer extends Component {
  render() {
    const { elapsedMin, elapsedSec } = this.props;
    return (
      <div>
        <p className="h3">
          Time elapsed: 
          <Badge variant="dark" className="mx-2">
            {`${elapsedMin} : ${elapsedSec}`}
          </Badge>
        </p>
      </div>
    );
  }
}

export default Timer;