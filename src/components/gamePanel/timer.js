import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

Timer.propTypes = {
  remainingMin: PropTypes.number.isRequired, 
  remainingSec: PropTypes.number.isRequired
}

export default Timer;