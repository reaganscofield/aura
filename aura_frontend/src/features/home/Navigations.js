import React, { Component } from 'react';

export default class Navigations extends Component {
  static propTypes = {};
  render() {
    return (
      <div className="home-navigations">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <a className="navbar-brand" href="/">
              <img src="http://aura-app.io/images/logo-white.svg" alt="aur" />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a className="nav-link" href="/users">
                    Users
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/security_agents">
                    Armed Agents
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/companies">
                    Armed Companies
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/panics">
                    Panics
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
