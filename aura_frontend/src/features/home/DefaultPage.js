import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Navigations from './Navigations';
import Request from './Request';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


export class DefaultPage extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      currentLatLng: null,
      modal: false,
    };
  }

  modalOpen = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  };

  toggle_off = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  render() {
    return (
      <div className="home-default-page">
        <Navigations />
        <div className="home-page" id="top">
          <div className="hero-banner">
            <div className="row">
              <div className="col-lg-12">
                <div className="container text-center">
                  <h1>Request Panic</h1>
                  <button
                    onClick={this.modalOpen}
                    className="btn-lg white"
                    data-open="contact-modal"
                  >
                    Request
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          size={'xl'}
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader className="header-bg text-light" toggle={this.toggle}>
            Request Panic
          </ModalHeader>
          <ModalBody>
            <Request />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle_off}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DefaultPage);
