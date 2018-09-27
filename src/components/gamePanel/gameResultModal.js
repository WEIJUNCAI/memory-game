import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

class GameResultModal extends Component {

  constructor(props) {
    super(props);

    this.handleModalClose = this.handleModalClose.bind(this);
  }

  handleModalClose() {
    this.props.onGameResultModalClose();
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Game finished</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.props.gameResultMsg}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={this.handleModalClose}>
            OK
        </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

GameResultModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onGameResultModalClose: PropTypes.func.isRequired
}

export default GameResultModal;