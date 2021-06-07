import React, { Component, Fragment } from "react";
import Search from "./Search";
import { Link, withRouter } from "react-router-dom";
import logo from "../assets/logo.png";
import "./HeaderNavBar.css";


class NavBar extends Component {
  state = {
    search: "",
    showNav: true
  };

  
  handleClick(e) {
    e.preventDefault();
  }

  handleChange = e => {
    this.setState({ search: e.target.value });
  };

  handleSearch = e => {
    e.preventDefault();
    this.props.handleSearch(this.state.search);
    this.setState({ search: "", showNav: false });
    this.props.history.push({pathname: `/search=${this.state.search}`})
  };

  render() {
    const { results } = this.props;

    return (
      <Fragment>
        <div className="navBar">
          <div className="container">

            <Link to={"/"} onClick={() => { window.location.href = "/" }}>
              <img src={logo} className="logo" alt="ThePeaks" />
            </Link>
            
            <div>
                <form onSubmit={this.handleSearch}>
                <input                  
                      placeholder="Search…"
                      value={this.state.search}
                      onChange={this.handleChange}
                    />
                </form>
            </div>
          </div>
        </div>
        <Search results={results} />
      </Fragment>
    );
  }
}


export default withRouter (NavBar);
