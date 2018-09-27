import React, { Component } from 'react';
import Badge from 'react-bootstrap/lib/Badge';

class Timer extends Component {
  render() {
    const { remainingMin, remainingSec } = this.props;
    return (
      <div>
        <p className="h3">
          Time remaining: 
          <Badge variant="dark" className="mx-2">
            {`${remainingMin} : ${remainingSec}`}
          </Badge>
        </p>
      </div>
    );
  }
}

export default Timer;