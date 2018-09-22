import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';

class GameHeader extends Component {

  render() {
    return (
      <div className="d-flex justify-content-between border-bottom pb-2 mb-3">
        <h1 className="h2">Memory Game</h1>
        <ButtonToolbar>
          <ButtonGroup>
            <Button 
              variant="outline-secondary"
              onClick={this.props.onResetClick}>Reset cards</Button>
          </ButtonGroup>
        </ButtonToolbar>
      </div>
    );
  }
}

export default GameHeader;