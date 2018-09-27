import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/lib/Button';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';

import GameConfig from './gameConfig';

class GameHeader extends Component {

  render() {
    return (
      <Navbar bg="light" expand="md" className="justify-content-between mb-3 py-3">
        <Navbar.Brand>Memory Game</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Nav>
            <GameConfig 
              cardNum={this.props.cardNum}
              timeLimit={this.props.timeLimit}
              onCardNumConfigChange={this.props.onCardNumConfigChange}
              onTimeLimitConfigChange={this.props.onTimeLimitConfigChange}
              onGameConfigSaved={this.props.onGameConfigSaved}
              onGameConfigCanceled={this.props.onGameConfigCanceled} />
            <Button
              variant="outline-secondary"
              onClick={this.props.onResetClick}>Reset cards</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

GameHeader.propTypes = {
  timeLimit: PropTypes.number.isRequired,
  cardNum: PropTypes.number.isRequired,

  onCardNumConfigChange: PropTypes.func.isRequired,
  onTimeLimitConfigChange: PropTypes.func.isRequired,
  onGameConfigCanceled: PropTypes.func.isRequired,
  onGameConfigSaved: PropTypes.func.isRequired,
  onResetClick: PropTypes.func.isRequired
}

export default GameHeader;