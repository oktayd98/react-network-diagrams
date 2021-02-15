import React, { Component } from 'react';

export default class PropModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: this.props.show,
    };

    this.modalWrapper = {
      position: 'fixed',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      top: '0',
      left: '0',
      width: '100vw',
      height: '100vh',
      background: 'rgba(0, 0, 0, 0.5)',
      zIndex: '1500',
    };

    this.modalContent = {
      position: 'fixed',
      padding: '2rem 1rem',
      background: 'white',
    };

    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({ show: false });
  }

  render() {
    return this.state.show ? (
      <div
        className="modalWrapper"
        style={this.modalWrapper}
        onClick={() => this.handleClose()}
      >
        <div
          className="modalContent"
          style={this.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          {this.props.children}
        </div>
      </div>
    ) : null;
  }
}
