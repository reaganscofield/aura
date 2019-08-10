import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Navigations from './Navigations';
import moment from 'moment';

export class Panics extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.props.actions.queryPanics();
  }

  render() {
    return (
      <div className="home-panics">
        <Navigations />
        <div className="container">
          {this.props.home.panics_data !== undefined && this.props.home.panics_data.length > 0 ? (
            <div className="row pt-5 mt-5">
              {this.props.home.panics_data.map(panic => (
                <div className="col-lg-4">
                  <div class="card border-dark mb-3 text-center">
                    <div class="card-header">{panic.name ? panic.name : 'Emergency'}</div>
                    <div class="card-body text-dark">
                      <h5 class="card-title">{panic.panics_number}</h5>
                      <span>{moment(panic.timestamp).format('dddd, MMMM Do YYYY, h:mm:ss a')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Panics);
