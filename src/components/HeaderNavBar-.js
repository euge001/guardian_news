import React from "react";
import { Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import ReactTooltip from "react-tooltip";
import { MdBookmarkBorder, MdBookmark } from "react-icons/md";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

import "./HeaderNavBar.css";

import { withRouter } from "react-router";
import SearchResults from "./SearchResults";

class HeaderNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { url: "" };
    this.handleChange = this.handleChange.bind(this);
    this.onArticleClick = this.onArticleClick.bind(this);
    this.onBookmarkHandle = this.onBookmarkHandle.bind(this);
    this.debounce = this.debounce.bind(this);
  }

  debounce(func, wait, immediate) {
    var timeout;

    return function executedFunction() {
      var context = this;
      var args = arguments;

      var later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };

      var callNow = immediate && !timeout;

      clearTimeout(timeout);

      timeout = setTimeout(later, wait);

      if (callNow) func.apply(context, args);
    };
  }

  handleChange(checked) {
    if (this.state.checked) this.setState({ checked });
    else if (!this.state.checked) this.setState({ checked });
    this.props.callback(checked);
  }

  onArticleClick(url) {
    this.setState({ url });
  }

  onBookmarkHandle() {
    // Retrieve the object from storage
    this.props.history.push("/bookmark");
  }

  render() {  
      return (
        <Navbar collapseOnSelect expand="lg" className="navBar">
          <div className="container">
          <Link to={"/"}>
            <img src={logo} className="logo" alt="ThePeaks" />
          </Link>       

          <SearchResults />
          
          </div>
        </Navbar>
      );
    }
  }


export default withRouter(HeaderNavBar);
