import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Navigations from './Navigations';

export class Users extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      firstname: '',
      lastname: '',
      phone_number: null,
      street: '',
      suburb: '',
      city: '',
      zip: null,
      country: '',
      region: '',
      general_validate_css: {},
      general_error_msg: '',

      failed: null,
      success: null,
    };
  }

  handleChanged = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChange = event => {
    this.setState({
      phone_number: event.target.value,
    });
  };

  validates = args => {
    let message;
    if (args === 'invalid email') {
      message = 'your is invalid please enter a valid email address';
    } else {
      message = 'field is required please enter your';
    }
    this.setState({
      general_validate_css: {
        border: '1px solid red',
      },
      general_error_msg: `${args} ${message} ${args}`,
    });
    setTimeout(() => {
      this.setState({
        general_validate_css: {},
        general_error_msg: '',
      });
    }, 3000);
  };

  keyChecking = (args__, args) => {
    if (args__.includes(args)) {
      return true;
    } else {
      return false;
    }
  };

  submisson = event => {
    event.preventDefault();
    const {
      username,
      email,
      firstname,
      lastname,
      city,
      street,
      suburb,
      zip,
      country,
      region,
      phone_number,
    } = this.state;
    const regx_email = /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+/;
    if (username === '') {
      this.validates('username');
    } else if (email === '') {
      this.validates('email');
    } else if (!regx_email.test(email)) {
      this.validates('invalid email');
    } else if (email === '') {
      this.validates('email');
    } else if (phone_number === null) {
      this.validates('phone number');
    } else if (firstname === '') {
      this.validates('firstname');
    } else if (lastname === '') {
      this.validates('lastname');
    } else if (street === '') {
      this.validates('street');
    } else if (suburb === '') {
      this.validates('suburb');
    } else if (city === '') {
      this.validates('city');
    } else {
      const user_data = {
        username: username,
        email: email,
        first_name: firstname,
        last_name: lastname,
        phone_number: phone_number,
        address_city: city,
        address_street: street,
        address_suburb: suburb,
        address_zip: zip,
        address_country: country,
        address_region: region,
      };
      this.props.actions
        .users(user_data)
        .then(res => {
          if (res.data) {
            this.setState({
              success: 'you have success created your account',
            });
          }
        })
        .catch(error => {
          const __error = this.props.home.usersError.response.data;
          if (__error) {
            const __error__ = __error.username;
            if (__error__[0].includes(`A user with that username already exists`)) {
              this.setState({
                failed: 'user with that username already exists choose another username',
              });
            }
          }
        });
    }
  };

  render() {
    return (
      <div className="home-users">
        <Navigations />
        <div>
          <div className="container pt-5 mb-3">
            <div className="row pt-5">
              <div className="col-lg-6">
                {this.state.success !== null ? (
                  <div class="alert alert-success text-center" role="alert">
                    {this.state.success}
                  </div>
                ) : null}
                {this.state.failed !== null ? (
                  <div class="alert alert-danger text-center" role="alert">
                    {this.state.failed}
                  </div>
                ) : null}
                <form onSubmit={this.submisson}>
                  <div className="form-group">
                    <label>Username</label>
                    <input
                      style={
                        !this.state.username &&
                        this.keyChecking(this.state.general_error_msg, 'username')
                          ? this.state.general_validate_css
                          : {}
                      }
                      onChange={this.handleChanged}
                      value={this.state.username}
                      name="username"
                      type="text"
                      className="form-control"
                      placeholder="jhondoe"
                    />
                    {!this.state.username &&
                    this.keyChecking(this.state.general_error_msg, 'username') ? (
                      <small id="emailHelp" className="form-text text-danger">
                        {this.state.general_error_msg}
                      </small>
                    ) : null}
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      style={
                        !this.state.email && this.keyChecking(this.state.general_error_msg, 'email')
                          ? this.state.general_validate_css
                          : {}
                      }
                      onChange={this.handleChanged}
                      value={this.state.email}
                      name="email"
                      type="text"
                      className="form-control"
                      placeholder="jhondoe@mail.com"
                    />
                    {!this.state.email &&
                    this.keyChecking(this.state.general_error_msg, 'email') ? (
                      <small id="emailHelp" className="form-text text-danger">
                        {this.state.general_error_msg}
                      </small>
                    ) : null}
                  </div>
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      style={
                        !this.state.firstname &&
                        this.keyChecking(this.state.general_error_msg, 'firstname')
                          ? this.state.general_validate_css
                          : {}
                      }
                      onChange={this.handleChanged}
                      value={this.state.firstname}
                      name="firstname"
                      type="text"
                      className="form-control"
                      placeholder="Jhon"
                    />
                    {!this.state.firstname &&
                    this.keyChecking(this.state.general_error_msg, 'firstname') ? (
                      <small id="emailHelp" className="form-text text-danger">
                        {this.state.general_error_msg}
                      </small>
                    ) : null}
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      style={
                        !this.state.lastname &&
                        this.keyChecking(this.state.general_error_msg, 'lastname')
                          ? this.state.general_validate_css
                          : {}
                      }
                      onChange={this.handleChanged}
                      value={this.state.lastname}
                      name="lastname"
                      type="text"
                      className="form-control"
                      placeholder="Doe"
                    />
                    {!this.state.lastname &&
                    this.keyChecking(this.state.general_error_msg, 'lastname') ? (
                      <small id="emailHelp" className="form-text text-danger">
                        {this.state.general_error_msg}
                      </small>
                    ) : null}
                  </div>

                  <div className="form-group">
                    <label>Contact Number</label>
                    <input
                      style={
                        !this.state.phone_number &&
                        this.keyChecking(this.state.general_error_msg, 'phone number')
                          ? this.state.general_validate_css
                          : {}
                      }
                      onChange={this.handleChanged}
                      value={this.state.phone_number || ''}
                      name="phone_number"
                      type="number"
                      className="form-control"
                      placeholder="110002233"
                    />
                    {!this.state.phone_number &&
                    this.keyChecking(this.state.general_error_msg, 'phone number') ? (
                      <small className="form-text text-danger">
                        {this.state.general_error_msg}
                      </small>
                    ) : null}
                  </div>

                  <div className="form-group">
                    <label>Street</label>
                    <input
                      style={
                        !this.state.street &&
                        this.keyChecking(this.state.general_error_msg, 'street')
                          ? this.state.general_validate_css
                          : {}
                      }
                      onChange={this.handleChanged}
                      value={this.state.street}
                      name="street"
                      type="text"
                      className="form-control"
                      placeholder="23 Fox Street"
                    />
                    {!this.state.street &&
                    this.keyChecking(this.state.general_error_msg, 'street') ? (
                      <small id="emailHelp" className="form-text text-danger">
                        {this.state.general_error_msg}
                      </small>
                    ) : null}
                  </div>

                  <div className="form-group">
                    <label>Suburb</label>
                    <input
                      style={
                        !this.state.suburb &&
                        this.keyChecking(this.state.general_error_msg, 'suburb')
                          ? this.state.general_validate_css
                          : {}
                      }
                      onChange={this.handleChanged}
                      value={this.state.suburb}
                      name="suburb"
                      type="text"
                      className="form-control"
                      placeholder="Broklyn"
                    />
                    {!this.state.suburb &&
                    this.keyChecking(this.state.general_error_msg, 'suburb') ? (
                      <small id="emailHelp" className="form-text text-danger">
                        {this.state.general_error_msg}
                      </small>
                    ) : null}
                  </div>

                  <div className="form-group">
                    <label>City</label>
                    <input
                      style={
                        !this.state.city && this.keyChecking(this.state.general_error_msg, 'city')
                          ? this.state.general_validate_css
                          : {}
                      }
                      onChange={this.handleChanged}
                      value={this.state.city}
                      name="city"
                      type="text"
                      className="form-control"
                      placeholder="New York"
                    />
                    {!this.state.city && this.keyChecking(this.state.general_error_msg, 'city') ? (
                      <small id="emailHelp" className="form-text text-danger">
                        {this.state.general_error_msg}
                      </small>
                    ) : null}
                  </div>

                  <div className="form-group">
                    <label>Zip Code</label>
                    <input
                      style={
                        !this.state.zip && this.keyChecking(this.state.general_error_msg, 'zip')
                          ? this.state.general_validate_css
                          : {}
                      }
                      onChange={this.handleChanged}
                      value={this.state.zip || ''}
                      name="zip"
                      type="number"
                      className="form-control"
                      placeholder="45673"
                    />
                    {!this.state.zip && this.keyChecking(this.state.general_error_msg, 'zip') ? (
                      <small id="emailHelp" className="form-text text-danger">
                        {this.state.general_error_msg}
                      </small>
                    ) : null}
                  </div>

                  <div className="form-group">
                    <label>Region</label>
                    <input
                      style={
                        !this.state.region &&
                        this.keyChecking(this.state.general_error_msg, 'region')
                          ? this.state.general_validate_css
                          : {}
                      }
                      onChange={this.handleChanged}
                      value={this.state.region}
                      name="region"
                      type="text"
                      className="form-control"
                      placeholder="New York"
                    />
                    {!this.state.region &&
                    this.keyChecking(this.state.general_error_msg, 'region') ? (
                      <small id="emailHelp" className="form-text text-danger">
                        {this.state.general_error_msg}
                      </small>
                    ) : null}
                  </div>

                  <div className="form-group">
                    <label>Country</label>
                    <input
                      style={
                        !this.state.country &&
                        this.keyChecking(this.state.general_error_msg, 'country')
                          ? this.state.general_validate_css
                          : {}
                      }
                      onChange={this.handleChanged}
                      value={this.state.country}
                      name="country"
                      type="text"
                      className="form-control"
                      placeholder="US"
                    />
                    {!this.state.country &&
                    this.keyChecking(this.state.general_error_msg, 'country') ? (
                      <small id="emailHelp" className="form-text text-danger">
                        {this.state.general_error_msg}
                      </small>
                    ) : null}
                  </div>

                  <button type="submit" className="btn btn-dark btn-block">
                    Submit
                  </button>
                </form>
              </div>
              <div className="col-lg-6" />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Users);
