import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Navigations from './Navigations';

export class Companies extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      address: '',
      vat_number: null,
      mark: '',
      license: '',
      plate: '',
      vehicule_name: '',
      phone_number: null,
      name_search: '',
      general_validate_css: {},
      general_error_msg: '',
      initializedCompanies: {},
      success: null,
      success_added_vehicule: null,

      searchCompanyForm: true,
      createCompanyForm: false,

      company_not_find: null,
    };
  }

  handleChanged = e => {
    this.setState({ [e.target.name]: e.target.value });
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
    const { name, email, address, vat_number, phone_number } = this.state;
    const regx_email = /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+/;
    if (name === '') {
      this.validates('name');
    } else if (email === '') {
      this.validates('email');
    } else if (!regx_email.test(email)) {
      this.validates('invalid email');
    } else if (email === '') {
      this.validates('email');
    } else if (phone_number === null) {
      this.validates('phone number');
    } else if (address === '') {
      this.validates('address');
    } else {
      const company_data = {
        name: name,
        email: email,
        phone_number: phone_number,
        address: address,
        vat_number: vat_number,
      };
      this.props.actions
        .companies(company_data)
        .then(res => {
          if (res.data) {
            this.setState({
              initializedCompanies: res.data,
              success: 'you have success created your account',
              name: '',
              email: '',
              phone_number: null,
              address: '',
            });
          }
        })
        .catch(error => {
          return error;
        });
    }
  };

  searchCompanySubmit = event => {
    event.preventDefault();
    const { name_search, phone_number } = this.state;
    if (name_search === '') {
      this.validates('search');
    } else if (phone_number === null) {
      this.validates('phone number');
    } else {
      const company_data = {
        name: name_search,
        phone_number: phone_number,
      };
      this.props.actions
        .searchCompany(company_data)
        .then(res => {
          if (res.data) {
            if(res.data.length > 0){
              const company = res.data[0];
              this.setState({
                initializedCompanies: company,
                name: '',
                phone_number: null,
              });
            } else {
                this.setState({
                  company_not_find: "company doesn't exists please create a company",
                  searchCompanyForm: false,
                  createCompanyForm: true,
                });
            }
          }
        })
        .catch(error => {
          return error;
        });
    }
  };

  addVehicules = event => {
    event.preventDefault();
    const { vehicule_name, mark, license, plate, initializedCompanies } = this.state;
    if (initializedCompanies.id) {
      if (vehicule_name === '') {
        this.validates('vehicule');
      } else if (mark === '') {
        this.validates('mark');
      } else if (license === '') {
        this.validates('lincese');
      } else if (plate === '') {
        this.validates('plate');
      } else {
        const vehicule_data = {
          company_id: initializedCompanies.id,
          name: vehicule_name,
          mark: mark,
          license_number: license,
          plate_number: plate,
        };
        this.props.actions
          .addVehicule(vehicule_data)
          .then(res => {
            if (res.data) {
              const vehicule = res.data;
              this.setState({
                success_added_vehicule: `sucesss added car ${vehicule.name} ${vehicule.mark}`,
                vehicule_name: '',
                mark: '',
                license: '',
                plate: '',
              });
            }
          })
          .catch(error => {
            return error;
          });
      }
    }
  };

  createCompany = () => {
    this.setState({
      createCompanyForm: true,
      searchCompanyForm: false,
    });
  };

  searchCompany = () => {
    this.setState({
      createCompanyForm: false,
      searchCompanyForm: true,
    });
  };

  render() {
    const { initializedCompanies } = this.state;

    return (
      <div className="home-companies">
        <Navigations />
        <div>
          <div className="container mt-5 mb-3">
            <div className="row">
              <div className="col-lg-5">
                <div className="mt-5 mb-5">
                  <div className="row">
                    <div className="col-sm-6">
                      <button
                        onClick={this.createCompany}
                        className="btn btn-success mt-3 mb-3 mr-3 btn-block"
                      >
                        Create Company
                      </button>
                    </div>
                    <div className="col-sm-6">
                      <button
                        onClick={this.searchCompany}
                        className="btn btn-success mt-3 mb-3 btn-block"
                      >
                        Search Company
                      </button>
                    </div>
                  </div>

                  {this.state.searchCompanyForm === true ? (
                    <form onSubmit={this.searchCompanySubmit}>
                      <div className="form-group">
                        <label>Company Name</label>
                        <input
                          style={
                            !this.state.name_search &&
                            this.keyChecking(this.state.general_error_msg, 'search')
                              ? this.state.general_validate_css
                              : {}
                          }
                          onChange={this.handleChanged}
                          value={this.state.name_search}
                          name="name_search"
                          type="text"
                          className="form-control"
                          placeholder="Aura"
                        />
                        {!this.state.name_search &&
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


                {this.state.company_not_find !== null ?
                    <div class="alert text-center alert-danger" role="alert">
                      {this.state.company_not_find}
                    </div>
                  : null 
                }

                <div className="mt-5 mb-5">
                  {this.state.createCompanyForm === true ? (
                    <form onSubmit={this.submisson}>
                      {this.state.success !== null ? (
                        <div class="alert text-center alert-success" role="alert">
                          {this.state.success}
                        </div>
                      ) : null}
                      <div className="form-group">
                        <label>Name</label>
                        <input
                          style={
                            !this.state.name &&
                            this.keyChecking(this.state.general_error_msg, 'name')
                              ? this.state.general_validate_css
                              : {}
                          }
                          onChange={this.handleChanged}
                          value={this.state.name}
                          name="name"
                          type="text"
                          className="form-control"
                          placeholder="Aura"
                        />
                        {!this.state.name &&
                        this.keyChecking(this.state.general_error_msg, 'name') ? (
                          <small className="form-text text-danger">
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
                        <label>Address</label>
                        <input
                          style={
                            !this.state.address &&
                            this.keyChecking(this.state.general_error_msg, 'address')
                              ? this.state.general_validate_css
                              : {}
                          }
                          onChange={this.handleChanged}
                          value={this.state.address}
                          name="address"
                          type="text"
                          className="form-control"
                          placeholder="23 Fox Street, Broklyn,  3421, New York"
                        />
                        {!this.state.address &&
                        this.keyChecking(this.state.general_error_msg, 'address') ? (
                          <small className="form-text text-danger">
                            {this.state.general_error_msg}
                          </small>
                        ) : null}
                      </div>

                      <div className="form-group">
                        <label>Vat Number</label>
                        <input
                          onChange={this.handleChanged}
                          value={this.state.vat_number || ''}
                          name="vat_number"
                          type="number"
                          className="form-control"
                          placeholder="45673"
                        />
                      </div>
                      <button type="submit" className="btn btn-dark btn-block">
                        Submit
                      </button>
                    </form>
                  ) : null}
                </div>
              </div>
              <div className="col-lg-2" />
              <div className="col-lg-5">
                {Object.entries(initializedCompanies).length !== 0 ? (
                  <div className="m-5">
                    <div className="text-center">
                      <h1>{initializedCompanies.name.toUpperCase()}</h1>
                      <h5>{initializedCompanies.phone_number}</h5>
                      <h5>{initializedCompanies.email}</h5>
                      <h5>{initializedCompanies.vat_number}</h5>
                    </div>
                    <div className="mt-3">
                      <h6>Add Vehicule</h6>
                      {this.state.success_added_vehicule !== null ? (
                        <div class="alert text-center alert-success" role="alert">
                          {this.state.success_added_vehicule}
                        </div>
                      ) : null}

                      <form>
                        <div className="form-group">
                          <label>Name</label>
                          <input
                            style={
                              !this.state.vehicule_nam &&
                              this.keyChecking(this.state.general_error_msg, 'vehicule')
                                ? this.state.general_validate_css
                                : {}
                            }
                            onChange={this.handleChanged}
                            value={this.state.vehicule_nam}
                            name="vehicule_name"
                            type="text"
                            className="form-control"
                          />
                          {!this.state.vehicule_nam &&
                          this.keyChecking(this.state.general_error_msg, 'vehicule') ? (
                            <small className="form-text text-danger">
                              {this.state.general_error_msg}
                            </small>
                          ) : null}
                        </div>
                        <div className="form-group">
                          <label>Mark</label>
                          <input
                            style={
                              !this.state.mark &&
                              this.keyChecking(this.state.general_error_msg, 'mark')
                                ? this.state.general_validate_css
                                : {}
                            }
                            onChange={this.handleChanged}
                            value={this.state.mark}
                            name="mark"
                            type="text"
                            className="form-control"
                          />
                          {!this.state.mark &&
                          this.keyChecking(this.state.general_error_msg, 'mark') ? (
                            <small className="form-text text-danger">
                              {this.state.general_error_msg}
                            </small>
                          ) : null}
                        </div>
                        <div className="form-group">
                          <label>License</label>
                          <input
                            style={
                              !this.state.license &&
                              this.keyChecking(this.state.general_error_msg, 'license')
                                ? this.state.general_validate_css
                                : {}
                            }
                            onChange={this.handleChanged}
                            value={this.state.license}
                            name="license"
                            type="text"
                            className="form-control"
                          />
                          {!this.state.license &&
                          this.keyChecking(this.state.general_error_msg, 'license') ? (
                            <small className="form-text text-danger">
                              {this.state.general_error_msg}
                            </small>
                          ) : null}
                        </div>
                        <div className="form-group">
                          <label>Plate</label>
                          <input
                            style={
                              !this.state.plate &&
                              this.keyChecking(this.state.general_error_msg, 'plate')
                                ? this.state.general_validate_css
                                : {}
                            }
                            onChange={this.handleChanged}
                            value={this.state.plate}
                            name="plate"
                            type="text"
                            className="form-control"
                          />
                          {!this.state.plate &&
                          this.keyChecking(this.state.general_error_msg, 'plate') ? (
                            <small className="form-text text-danger">
                              {this.state.general_error_msg}
                            </small>
                          ) : null}
                        </div>

                        <button
                          onClick={this.addVehicules}
                          type="submit"
                          className="btn btn-dark btn-block"
                        >
                          Add
                        </button>
                      </form>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
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
)(Companies);
