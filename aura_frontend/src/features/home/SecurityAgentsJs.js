import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Navigations from './Navigations';
import defaultProfile from './../../default.jpeg';
import { Button, ButtonGroup, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export class SecurityAgentsJs extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      is_online: false,
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
      phone_number_css: {
        width: '100%',
        border: '1px solid #ced4da',
        backgroundColor: '#fff',
      },

      companies: [],
      company_id: '',
      vehicule_id: '',

      failed: null,
      success: null,

      checked: '',
      off_on: 'Off',
      modal: false,

      createProfileForm: false,
      searchProfileForm: true,
      updateLocationForm: false,

      start_trip: true,
      end_trip: false,
    };
  }

  componentWillMount() {
    this.props.actions.queryCompanies().then(res => {
      if (res.data) {
        return;
      }
    });
  }

  onRadioBtnClick(rSelected) {
    this.setState({
      rSelected,
      is_online: true,
    });
    const is_offline_or_is_online = true;
    const is_on_trip = false;
    this.Update_setOnline_setOffline(is_offline_or_is_online, is_on_trip);
  }

  offRadioBtnClick(rSelected) {
    this.setState({
      rSelected,
      is_online: false,
    });
    const is_offline_or_is_online = false;
    const is_on_trip = false;
    this.Update_setOnline_setOffline(is_offline_or_is_online, is_on_trip);
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
      company_id,
      street,
      suburb,
      zip,
      country,
      region,
      phone_number,
      vehicule_id,
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
      const agent_data = {
        username: username,
        email: email,
        first_name: firstname,
        company_id: company_id,
        vehicule_id: vehicule_id,
        last_name: lastname,
        phone_number: phone_number,
        current_location_city: city,
        current_location_street: street,
        current_location_suburb: suburb,
        current_location_zip: zip,
        current_location_country: country,
        current_location_region: region,
      };
      this.props.actions
        .agentProfiles(agent_data)
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

  updatedState = args => {
    this.setState({
      is_online: args.is_online,
      username: args.username,
      email: args.email,
      firstname: args.first_name,
      company_id: args.company_id,
      vehicule_id: args.vehicule_id,
      lastname: args.last_name,
      phone_number: args.phone_number,
      city: args.current_location_city,
      street: args.current_location_street,
      suburb: args.current_location_suburb,
      zip: args.current_location_zip,
      country: args.current_location_country,
      region: args.current_location_region,
    });
  };

  Update_setOnline_setOffline = (is_offline_or_is_online, is_on_trip) => {
    const {
      id,
      username,
      email,
      firstname,
      lastname,
      city,
      company_id,
      street,
      suburb,
      zip,
      country,
      region,
      phone_number,
      vehicule_id,
    } = this.state;
    if (id !== null) {
      const agent_data = {
        id: id,
        is_online: is_offline_or_is_online,
        is_on_trip: is_on_trip,
        username: username,
        email: email,
        first_name: firstname,
        company_id: company_id,
        vehicule_id: vehicule_id,
        last_name: lastname,
        phone_number: phone_number,
        current_location_city: city,
        current_location_street: street,
        current_location_suburb: suburb,
        current_location_zip: zip,
        current_location_country: country,
        current_location_region: region,
      };
      this.props.actions.updateAgent(agent_data).then(res => {
        if (res.data) {
          const data = res.data;
          this.updatedState(data);
        }
      });
    }
  };

  searchAgent = event => {
    event.preventDefault();
    const { username, phone_number } = this.state;
    if (username === '') {
      this.validates('search');
    } else if (phone_number === null) {
      this.validates('phone number');
    } else {
      const profile_data = {
        username: username,
        phone_number: phone_number,
      };
      this.props.actions
        .searchProfiles(profile_data)
        .then(res => {
          if (res.data) {
            const profiles = res.data[0];
            if (profiles.id) {
              this.updatedState(profiles);
              this.setState({
                id: profiles.id,
              });
              this.setState(prevState => ({
                modal: !prevState.modal,
              }));
              this.props.actions.filteredNotifications(profiles.id);
            }
          }
        })
        .catch(error => {
          return error;
        });
    }
  };

  toggle_off = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  handleChangeCompany = event => {
    const company_id = event.target.value;
    this.props.actions.queryVehicules(company_id);
    this.setState({ company_id: company_id });
  };

  handleChangeVehicule = event => {
    this.setState({ vehicule_id: event.target.value });
  };

  createProfile = () => {
    this.setState({
      createProfileForm: true,
      searchProfileForm: false,
    });
  };

  searchProfile = () => {
    this.setState({
      createProfileForm: false,
      searchProfileForm: true,
    });
  };

  updateLocation = () => {
    this.setState({
      updateLocationForm: true,
    });
  };

  update = event => {
    event.preventDefault();
    const is_offline_or_is_online = true;
    const is_on_trip = false;
    this.Update_setOnline_setOffline(is_offline_or_is_online , is_on_trip);
  };

  isOnway = id => {
    const data = {
      id: id,
      is_on_way: true,
      start_time: new Date(),
    };
    this.props.actions.isOnWay(data).then(res => {
      if (res.data) {
        this.setState({
          start_trip: false,
          end_trip: true,
        });
        const is_offline_or_is_online = true;
        const  is_on_trip = true;
        this.Update_setOnline_setOffline(is_offline_or_is_online, is_on_trip);
      }
    });
  };

  isArrived = id => {
    const data = {
      id: id,
      is_arrived: true,
      ended_time: new Date(),
      is_active: false,
    };
    this.props.actions.isOnWay(data).then(res => {
      if (res.data) {
        const is_offline_or_is_online = true;
        const is_on_trip = false
        this.Update_setOnline_setOffline(is_offline_or_is_online, is_on_trip);
      }
    });
  };

  render() {
    return (
      <div className="home-security-agents-js">
        <Navigations />
        <div>
          <div className="container mt-5 mb-3">
            <div className="row">
              <div className="col-lg-5">
                <div className="mt-5 mb-5">
                  <div className="row">
                    <div className="col-sm-6">
                      <button
                        onClick={this.createProfile}
                        className="btn btn-success mt-3 mb-3 mr-3 btn-block"
                      >
                        Create Profile
                      </button>
                    </div>
                    <div className="col-sm-6">
                      <button
                        onClick={this.searchProfile}
                        className="btn btn-success mt-3 mb-3 btn-block"
                      >
                        Search Profile
                      </button>
                    </div>
                  </div>

                  {this.state.searchProfileForm === true ? (
                    <form onSubmit={this.searchAgent}>
                      <div className="form-group">
                        <label>Username</label>
                        <input
                          style={
                            !this.state.username &&
                            this.keyChecking(this.state.general_error_msg, 'search')
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
                        this.keyChecking(this.state.general_error_msg, 'search') ? (
                          <small className="form-text text-danger">
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
                      <button type="submit" className="btn btn-dark btn-block">
                        Search
                      </button>
                    </form>
                  ) : null}
                </div>

                <div className="mt-5 mb-5">
                  {this.state.createProfileForm === true ? (
                    <form onSubmit={this.submisson}>
                      {this.state.success !== null ? (
                        <div className="alert alert-success" role="alert">
                          {this.state.success}
                        </div>
                      ) : null}

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
                            !this.state.email &&
                            this.keyChecking(this.state.general_error_msg, 'email')
                              ? this.state.general_validate_css
                              : {}
                          }
                          onChange={this.handleChanged}
                          value={this.state.email}
                          name="email"
                          type="text"
                          className="form-control"
                          placeholder="aura@tech.com"
                        />
                        {!this.state.email &&
                        this.keyChecking(this.state.general_error_msg, 'email') ? (
                          <small className="form-text text-danger">
                            {this.state.general_error_msg}
                          </small>
                        ) : null}
                      </div>

                      <div className="form-group">
                        <label>Companies</label>
                        <select onChange={this.handleChangeCompany} className="form-control">
                          {this.props.home.companies_data.map(element => (
                            <option key={element.id} value={element.id}>
                              {element.name}
                            </option>
                          ))}
                        </select>
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

                      {this.props.home.vehicules_data !== undefined &&
                      this.props.home.vehicules_data.length > 0 ? (
                        <div className="form-group">
                          <label>Vehicule</label>
                          <select onChange={this.handleChangeVehicule} className="form-control">
                            {this.props.home.vehicules_data.map(element => (
                              <option key={element.id} value={element.id}>
                                {element.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      ) : null}

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
                            !this.state.city &&
                            this.keyChecking(this.state.general_error_msg, 'city')
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
                        {!this.state.city &&
                        this.keyChecking(this.state.general_error_msg, 'city') ? (
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
                        {!this.state.zip &&
                        this.keyChecking(this.state.general_error_msg, 'zip') ? (
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
                          placeholder="New York"
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
                  ) : null}
                </div>
              </div>
              <div className="col-lg-2" />
              <div className="col-lg-5" />
            </div>
          </div>
        </div>
        <Modal
          size={'xl'}
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader className="header-bg text-light" toggle={this.toggle}>{`${
            this.state.firstname
          }'s Profile`}</ModalHeader>
          <ModalBody>
            <h1 className="text-center">
              Welcome Back {this.state.firstname} {this.state.lastname}
            </h1>
            <div className="mt-3 mb-3 text-center">
              <ButtonGroup>
                <Button
                  color="secondary"
                  onClick={() => this.onRadioBtnClick(1)}
                  active={this.state.rSelected === 1}
                >
                  Online
                </Button>
                <Button
                  color="secondary"
                  onClick={() => this.offRadioBtnClick(2)}
                  active={this.state.rSelected === 2}
                >
                  Offline
                </Button>
              </ButtonGroup>
            </div>
            <div className="row">
              <div className="col-lg-6 text-center">
                <h4>Your Current Location Is</h4>
                <div className="card mb-3">
                  <div className="card-header" />
                  <div className="card-body">
                    <h5 className="card-title">{this.state.suburb}</h5>
                    <p className="card-text">{this.state.street}</p>
                    <p className="card-text">{this.state.city}</p>
                  </div>
                </div>
                <button onClick={this.updateLocation} className="btn btn-success mt-3 mb-3">
                  Update Your Location
                </button>
              </div>
              <div className="col-lg-6">
                {this.state.updateLocationForm === true ? (
                  <form onSubmit={this.update}>
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
                      {!this.state.city &&
                      this.keyChecking(this.state.general_error_msg, 'city') ? (
                        <small className="form-text text-danger">
                          {this.state.general_error_msg}
                        </small>
                      ) : null}
                    </div>

                    <button type="submit" className="btn btn-dark btn-block">
                      Submit
                    </button>
                  </form>
                ) : null}

                {this.props.home.notifications_data !== undefined &&
                this.props.home.notifications_data.length > 0 ? (
                  <div>
                    <h4 className="text-center">Panic Notifications</h4>
                    <hr />
                    {this.props.home.notifications_data.map(element => (
                      <div key={element.id} className="media">
                        <img
                          src={defaultProfile}
                          width="180px"
                          className="mr-3"
                          alt="defaultProfile"
                        />
                        <div className="media-body mt-3">
                          <h5 className="mt-0">
                            {`
                             ${element.client_firstname}  
                             ${element.client_lastname}
                             `}
                          </h5>
                          <h5 className="mt-0">0{element.client_phone_number}</h5>
                          <span>{element.to_address}</span> <br />
                          {this.state.start_trip === true ? (
                            <button
                              className="btn btn-dark"
                              onClick={() => this.isOnway(element.id)}
                            >
                              Start Trip
                            </button>
                          ) : null}
                          {this.state.end_trip === true ? (
                            <button
                              className="btn btn-dark"
                              onClick={() => this.isArrived(element.id)}
                            >
                              End Trip
                            </button>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
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
)(SecurityAgentsJs);
