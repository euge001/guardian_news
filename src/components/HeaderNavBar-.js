import React from "react";
import { Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import ReactTooltip from "react-tooltip";
import { MdBookmarkBorder, MdBookmark } from "react-icons/md";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { withRouter } from "react-router";
import SearchResults from "./SearchResults";
import "./HeaderNavBar.css";

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
    this.props.history.push("/bookmark");
  }

  render() {
    if (
      this.props.location.pathname === "/article" ||
      this.props.location.pathname === "/bookmark"
    ) {
      return (
        <Navbar collapseOnSelect expand="lg" className="navBar">

        <div className="container">
          <Link to={"/"}>
            <img src={logo} className="logo" alt="ThePeaks" />
          </Link>
        
          <div className="search-container">
            <form action="/search" method="get">
              <input
                className="search expandright"
                id="searchright"
                type="search"
                name="q"
                placeholder="Search"
              />
              <label className="button searchbutton" for="searchright">
                <span class="mglass">&#9906;</span>
              </label>
            </form>
          </div>

          {this.props.location.pathname === "/bookmark" ? (
              <Nav className="bookmark">
                <div onClick={this.onBookmarkHandle}>
                  <MdBookmark
                    color="white"
                    data-tip="Bookmark"
                    data-for="bookmarkNav"
                    size={35}
                  />
                </div>
              </Nav>
            ) : (
              <Nav className="bookmark">
                <div onClick={this.onBookmarkHandle}>
                  <MdBookmarkBorder
                    color="white"
                    data-tip="Bookmark"
                    data-for="bookmarkNav"
                    size={35}
                  />
                </div>
              </Nav>
            )}
            <ReactTooltip
              place="bottom"
              type="dark"
              effect="solid"
              id="bookmarkNav"
            />
            <div>View Bookmarks</div>
            </div>
        </Navbar>
        
      );
    } else {
      return (
        <Navbar collapseOnSelect expand="lg" className="navBar">
          <div className="container">
          <Link to={"/"}>
            <img src={logo} className="logo" alt="ThePeaks" />
          </Link>       

          <SearchResults />
          <Nav className="bookmark">
              <div onClick={this.onBookmarkHandle}>
                <MdBookmarkBorder
                  data-tip="Bookmark"
                  data-for="bookmarkNav"
                  size={25}
                />
                <ReactTooltip
                  place="bottom"
                  type="dark"
                  effect="solid"
                  id="bookmarkNav"
                />
              </div>
              <div>View Bookmarks</div>
            </Nav>
            </div>
        </Navbar>
      );
    }
  }
}

export default withRouter(HeaderNavBar);
