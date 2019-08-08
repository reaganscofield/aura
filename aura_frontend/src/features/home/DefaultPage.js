import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Navigations from './Navigations'
import moment from "moment";


export class DefaultPage extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props)
    this.state = {
      
    }
  }
  
  componentDidMount(){
    
  }

 

  render() {
   

    return (
      <div className="home-default-page">
        <Navigations />
      <div className="home-page" id="top">
        <div className="hero-banner">
          <div className="row">
            <div className="hero-banner__left large-3 columns">
            </div>
            <div className="hero-banner__middle large-6 columns">
              <h1>
                Request Panic
              </h1>
              <button className="button-large white" data-open="contact-modal">Get in touch</button>
              <div className="rwd-devices">
              </div>
            </div>
            <div className="hero-banner__right large-3 columns">
            </div>
          </div>
        </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DefaultPage);
