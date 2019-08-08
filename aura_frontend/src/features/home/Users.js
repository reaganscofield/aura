import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class Users extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props)
  
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
      general_error_msg: null,
      phone_number_css: {
        width: '100%',
        border: '1px solid #ced4da',
        backgroundColor: '#fff'
      },

      failed: null,
      success: null,

    }
  }


  handleChanged = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChange = (event) => {
    this.setState({
      phone_number: event.target.value
    });
  }

  validates = (args) => {
    let message;
    if (args === 'invalid email'){
      message = 'your is invalid please enter a valid email address'
    } else {
      message = 'field is required please enter your'
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
        general_error_msg: null,
      })
    }, 3000);
  }

  submisson = (event) => {
    event.preventDefault();
    const {
      username, email, firstname, lastname, city,
      street, suburb, zip, country, region, phone_number
    } = this.state;
    const regx_email = /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+/;
    if(username === '' || username === null) {
        this.validates('username');
    } else if (email === '' || email === null) {
        this.validates('email');
    } else if (!regx_email.test(email)) {
        this.validates('invalid email');
    } else if (email === '' || email === null) {
        this.validates('email');
    } else if (phone_number === null || phone_number === '') {
        this.validates('phone number');
    } else if (firstname === '' || firstname === null){
        this.validates('first name');
    } else if (lastname === '' || lastname === null) {
        this.validates('last name');
    } else if (street === '' || street === null) {
        this.validates('street');
    }  else if (suburb === '' || suburb === null) {
        this.validates('suburb');
    } else if (city === '' || city === null) {
        this.validates('city');
    } else if (region === '' || region === null) {
        this.validates('region');
    } else if (country === '' || country === null) {
        this.validates('country');
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
        address_region: region
      }
      this.props.actions.users(user_data).then((res) => {
        if(res.data){
          this.setState({
            success: "you have success created your account"
          });
        }
      }).catch((error) => {
        const __error = this.props.home.usersError.response.data;
        if(__error){
          const __error__ = __error.username;
          if(__error__[0].includes(`A user with that username already exists`)){
            this.setState({
              failed: "user with that username already exists choose another username"
            });
          }
        }
      })
    }
  }
  

  render() {
    return (
      <div className="home-users">
        <h1 className="text-danger">{this.state.failed}</h1>
        <h1 className="text-success">{this.state.success}</h1>
        <form onSubmit={this.submisson}>
                <div className="form-group">
                  <label>Username</label>
                  <input
                    style={this.state.general_validate_css}
                    onChange={this.handleChanged}
                    value={this.state.username}
                    name="username"
                    type="text"
                    className="form-control"
                  />
                  <small id="emailHelp" className="form-text text-danger">
                    {this.state.general_error_msg}
                  </small>
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    style={this.state.general_validate_css}
                    onChange={this.handleChanged}
                    value={this.state.email}
                    name="email"
                    type="text"
                    className="form-control"
                  />
                  <small id="emailHelp" className="form-text text-danger">
                    {this.state.general_error_msg}
                  </small>
                </div>
                <div className="form-group">
                  <label>Fist Name</label>
                  <input
                    style={this.state.general_validate_css}
                    onChange={this.handleChanged}
                    value={this.state.firstname}
                    name="firstname"
                    type="text"
                    className="form-control"
                  />
                  <small id="emailHelp" className="form-text text-danger">
                    {this.state.general_error_msg}
                  </small>
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    style={this.state.general_validate_css}
                    onChange={this.handleChanged}
                    value={this.state.lastname}
                    name="lastname"
                    type="text"
                    className="form-control"
                  />
                  <small id="emailHelp" className="form-text text-danger">
                    {this.state.lastname_validate}
                  </small>
                </div>


                {/* <div className="form-group">
                  <label>Contact Number</label>
                  <ReactPhoneInput
                    defaultCountry={'za'}
                    inputStyle={styleObj}
                    value={this.state.phone_number}
                    onChange={ phone_number => this.setState({ phone_number }) } 
                  />
                  <small id="emailHelp" className="form-text text-danger">
                    {this.state.general_error_msg}
                  </small>
                </div> */}

                
                <div className="form-group">
                  <label>Street</label>
                  <input
                    style={this.state.general_validate_css}
                    onChange={this.handleChanged}
                    value={this.state.street}
                    name="street"
                    type="text"
                    className="form-control"
                    placeholder="23 Fox Street"
                  />
                  <small id="emailHelp" className="form-text text-danger">
                    {this.state.general_error_msg}
                  </small>
                </div>

                <div className="form-group">
                  <label>Suburb</label>
                  <input
                    style={this.state.suburb_css}
                    onChange={this.handleChanged}
                    value={this.state.suburb}
                    name="suburb"
                    type="text"
                    className="form-control"
                  />
                  <small id="emailHelp" className="form-text text-danger">
                    {this.state.general_error_msg}
                  </small>
                </div>

                <div className="form-group">
                  <label>City</label>
                  <input
                    style={this.state.general_validate_css}
                    onChange={this.handleChanged}
                    value={this.state.city}
                    name="city"
                    type="text"
                    className="form-control"
                  />
                  <small id="emailHelp" className="form-text text-danger">
                    {this.state.city_validate}
                  </small>
                </div>

                <div className="form-group">
                  <label>Zip Code</label>
                  <input
                    style={this.state.general_validate_css}
                    onChange={this.handleChanged}
                    value={this.state.zip}
                    name="zip"
                    type="number"
                    className="form-control"
                  />
                  <small id="emailHelp" className="form-text text-danger">
                    {this.state.general_error_msg}
                  </small>
                </div>



                {/* <div className="form-group">
                  <label>Country</label>
                  <CountryDropdown
                      value={this.state.country}
                      classes={'form-control'}
                      onChange={val => this.selectCountry(val)}
                  />
                  <small id="emailHelp" className="form-text text-danger">
                    {this.state.general_error_msg}
                  </small>
                </div>
                <div className="form-group">
                  <label>Region</label>
                  <RegionDropdown
                    classes={'form-control'}
                    country={this.state.country}
                    value={this.state.region}
                    onChange={val => this.selectRegion(val)}
                  />
                  <small id="emailHelp" className="form-text text-danger">
                    {this.state.general_error_msg}
                  </small>
                </div> */}
            
                <button type="submit" className="btn btn-dark btn-block">
                    Submit
                </button>
              </form>
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
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
