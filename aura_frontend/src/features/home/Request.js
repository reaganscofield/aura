import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import defaultProfile from './../../default.jpeg';

export class Request extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      currentLatLng: null,
      username: '',
      panic: '',
      panic_name: 'Emergency',
      phone_number: '',
      general_validate_css: {},
      general_error_msg: '',
      nearest_agents: [],
      user_not_find: null,
      user: null,
      success: null,
      selected_agent: null,
      agent_not_find: null,
    };
  }

  componentWillMount(){
    this.props.actions.queryAgents();
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
    this.setState({
      general_validate_css: {
        border: '1px solid red',
      },
      general_error_msg: `${args} field is required please enter your ${args}`,
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

  requestPanic = event => {
    event.preventDefault();
    const connected_agents = [];
    this.props.home.agents_data.forEach((agent) => {
      if(agent.is_online === true){
        connected_agents.push(agent);
      }
    });
    if (this.state.username === '') {
      this.validates('username');
    } else {
       this.props.actions.findUser(this.state.username).then((user) => {
         if(user.data) {
           const User = user.data;
           const available_agent = [];
           connected_agents.forEach((agent) => {
             if(agent.current_location_suburb === User.address_suburb && agent.current_location_city === User.address_city){
               available_agent.push(agent);
             } else if (agent.current_location_city === User.address_city){
               available_agent.push(agent)
             }
           });
           this.setState({
             user: User,
             nearest_agents: available_agent
           });
         }
       }).catch((err) => {
        const __error = this.props.home.findUserError.response.data;
        if(__error.detail.includes("Not found")){
          this.setState({ 
             user_not_find: "User Not Found Please Create an Acoount"
          });
        }
       });
    }
  };


  comfirmPanic = (event) => {
    event.preventDefault();
    const { user, nearest_agents, panic_name } = this.state;
    if(nearest_agents[0]){
      const panics_data = {
        client_id: user.id,
        agent_id: nearest_agents[0].id,
        panics_name: panic_name,
        company_id: nearest_agents[0].company_id
      }
      this.props.actions.requesPanics(panics_data).then((res) => {
         if(res.data){
           this.setState({ 
             success: "success requested panic",
             selected_agent: nearest_agents[0],
            });
           return res.data;
         }
      });
    } else {
      this.setState({
        agent_not_find: "sorry we don't have avaible agent for the moment"
      });
    }
  }


  getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          console.log(position.coords);
          this.setState(prevState => ({
            currentLatLng: {
                ...prevState.currentLatLng,
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
          }))
        }
      )
    } 
  }

  render() {
    return (
      <div className="home-request">
        <div className="container">
          {this.state.user === null ?
            <div>
               <form onSubmit={this.requestPanic}>
            <div className="form-group">
              <label>Username</label>
              <input
                style={
                  !this.state.username && this.keyChecking(this.state.general_error_msg, 'username')
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
                <small className="form-text text-danger">{this.state.general_error_msg}</small>
              ) : null}
            </div>

            <button type="submit" className="btn btn-dark btn-block">
              Find Me
            </button>
        </form>
        {this.state.user_not_find ?
            <div className="mt-4">
                <div className="alert alert-danger text-center" role="alert">
                  {this.state.user_not_find}
                </div>
                
                  <a className="btn btn-success text-light" href="/users"> Create Account</a>
              
              </div>
          : null 
        }
            </div> : null
          }

        {this.state.user !== null ?
          <div>
          
              <div className="card border-dark mb-3 text-center">
                  <div className="card-header">Your Address</div>
                  <div className="card-body text-dark">
                    <h5 className="card-title">
                      {this.state.user.address_street}
                    </h5>
                    <h6 className="card-title">
                      {this.state.user.address_suburb}
                    </h6>
                    <h6 className="card-title">
                      {this.state.user.address_city}
                    </h6>
                    <button onClick={this.getCurrentLocation} className="btn btn-dark">use your current location</button>
                  </div>
              </div>


            <form onSubmit={this.comfirmPanic}>
              <div className="form-group">
                <label>Emergency Name</label>
                <input
                  onChange={this.handleChanged}
                  value={this.state.panic_name}
                  name="panic_name"
                  type="text"
                  className="form-control"
                />
              </div>

            <button type="submit" className="btn btn-dark btn-block">
              Request Panic
            </button>
           </form> 
          </div> :
          null
        }

        {this.state.agent_not_find !== null ?
          <div className="alert alert-danger mt-3 text-center" role="alert">
          {this.state.agent_not_find}
         </div> : null
        }

        {this.state.success !== null ?
          <div class="alert text-center mt-3 alert-success" role="alert">
            {this.state.success}
          </div>
          : null
        }

        {this.state.selected_agent !== null ?
          <div className="media">
            <img src={defaultProfile} width="180px" className="mr-3" alt="defaultProfile" />
            <div className="media-body mt-3">
              <h5 className="mt-0">
               {
                 `
                 ${this.state.selected_agent.first_name}  
                 ${this.state.selected_agent.last_name}
                 `
               }
              </h5>
              <h5 className="mt-0">
               0{this.state.selected_agent.phone_number}
              </h5>
              <p>
                {
                  `
                  ${this.state.selected_agent.vehicule_name} 
                  ${this.state.selected_agent.vehicule_mark} |
                  ${this.state.selected_agent.vehicule_plate_number}
                  `
                }
              </p>
              <span>
                {
                  `
                  ${this.state.selected_agent.current_location_street}, 
                  ${this.state.selected_agent.current_location_suburb},
                  ${this.state.selected_agent.current_location_city}
                  `
                }
              </span> <br />
              <span>
                {this.state.selected_agent.current_location_country}
              </span>
            </div>
          </div>
          : null
        }


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
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Request);
