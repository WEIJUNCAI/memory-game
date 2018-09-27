import React, { Component } from 'react';
import { Fragment } from 'react';

import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import FormControl from 'react-bootstrap/lib/FormControl';

class GameConfig extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardInputValidity: "valid",
      timeInputValidity: "valid",
      modalShow: false 
    };

    this.handleModalShow = this.handleModalShow.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleCardNumInputChange = this.handleCardNumInputChange.bind(this);
    this.handleTimeLimitInputChange = this.handleTimeLimitInputChange.bind(this);
    this.handleGameConfigSave = this.handleGameConfigSave.bind(this);
  }

  handleModalShow() {
    this.setState({modalShow: true});
  }

  handleModalClose() {
    this.setState({modalShow: false});
  }

  handleCardNumInputChange(event) {
    if(event.target.value > 72) {
      this.setState({cardInputValidity: "invalid"})
      return;
    }
    this.props.onCardNumConfigChange(event.target.value);
  }

  handleTimeLimitInputChange(event) {
    this.props.onTimeLimitConfigChange(event.target.value);
  }

  handleGameConfigSave(event) {
    this.props.onGameConfigSaved();
    this.setState({modalShow: false});
  }
  
  render() {
    return (
      <Fragment>
        <Button 
          variant="outline-primary" 
          onClick={this.handleModalShow}
          className="mx-3">New game</Button>

        <Modal show={this.state.modalShow} onHide={this.handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Adjust game settings</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text>Number of cards</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl 
                type="number"
                value={this.props.cardNum.toString()}
                onChange={this.handleCardNumInputChange} />
              <FormControl.Feedback type={this.state.cardInputValidity}>
                Max card number should be integer less than 72.
              </FormControl.Feedback>
            </InputGroup>

            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>Game time limit</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl 
                type="number"
                value={this.props.timeLimit.toString()}
                onChange={this.handleTimeLimitInputChange} />
              <InputGroup.Append>
                <InputGroup.Text>minutes</InputGroup.Text>
              </InputGroup.Append>
              <FormControl.Feedback type={this.state.timeInputValidity} />
            </InputGroup>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="outline-dark" onClick={this.handleModalClose}>
              Cancel
            </Button>
            <Button variant="success" onClick={this.handleGameConfigSave}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Fragment>
    );
  }
}

export default GameConfig;