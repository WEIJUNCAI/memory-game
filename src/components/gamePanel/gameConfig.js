import React, { Component } from 'react';
import { Fragment } from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Form from 'react-bootstrap/lib/Form';

class GameConfig extends Component {
  constructor(props) {
    super(props);

    this.state = {
      validated: false,
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
    this.setState({modalShow: false, validated: false});
    this.props.onGameConfigCanceled();
  }

  handleCardNumInputChange(event) {
    this.props.onCardNumConfigChange(event.target.value);
  }

  handleTimeLimitInputChange(event) {
    this.props.onTimeLimitConfigChange(event.target.value);
  }

  handleGameConfigSave(event) {

    const form = event.currentTarget;
    if(form.checkValidity() === true) {
      this.props.onGameConfigSaved();
      this.setState({modalShow: false});
    }
    this.setState({validated: true});
    event.preventDefault();
    event.stopPropagation();
  }
  
  render() {
    return (
      <Fragment>
        <Button 
          variant="outline-primary" 
          onClick={this.handleModalShow}
          className="mx-3">New game</Button>

        <Modal show={this.state.modalShow} onHide={this.handleModalClose}>
          <Form 
            noValidate
            validated={this.state.validated}
            onSubmit={this.handleGameConfigSave}>
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
                  min={1}
                  max="72"
                  step="1"
                  value={this.props.cardNum.toString()}
                  onChange={this.handleCardNumInputChange} />
                <FormControl.Feedback type="invalid">
                  Max card number should be an integer less than 72.
                </FormControl.Feedback>
              </InputGroup>
  
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>Game time limit</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl 
                  type="number"
                  min={1}
                  max={30}
                  value={this.props.timeLimit.toString()}
                  onChange={this.handleTimeLimitInputChange} />
                <InputGroup.Append>
                  <InputGroup.Text>minutes</InputGroup.Text>
                </InputGroup.Append>
                <FormControl.Feedback type="invalid">
                  Time limit must be an integer less than 30.
                </FormControl.Feedback>
              </InputGroup>
            </Modal.Body>
  
            <Modal.Footer>
              <Button variant="outline-dark" onClick={this.handleModalClose}>
                Cancel
              </Button>
              <Button variant="success" type="submit">
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Fragment>
    );
  }
}

GameConfig.propTypes = {
  timeLimit: PropTypes.number.isRequired,
  cardNum: PropTypes.number.isRequired,

  onCardNumConfigChange: PropTypes.func.isRequired,
  onTimeLimitConfigChange: PropTypes.func.isRequired,
  onGameConfigCanceled: PropTypes.func.isRequired,
  onGameConfigSaved: PropTypes.func.isRequired
}

export default GameConfig;