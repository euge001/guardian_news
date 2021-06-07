import React from 'react';
import './App.css';
import { Switch,  Route,  withRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Articles from "./components/Articles";
import DetailedArticle from "./components/DetailedArticleGuard";
import Footer from "./components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import Bookmark from "./components/Bookmark";
import Search from './components/Search';
import NavBar from "./components/NavBar";


class App extends React.Component {

  state = {
    search: [],
    showSearch: true
  };


  handleSearch = search => {
    let theURL;
    theURL = new URL("https://content.guardianapis.com/search?");
    theURL.searchParams.set("q", search);
    theURL.searchParams.set("show-fields", "all");
    theURL.searchParams.set("api-key", "e5a72453-f9b8-4031-8d16-02c39e72dc1e");
    fetch(theURL)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({          
          search: data.response.results,
          showSearch: true
        })
      })
      .catch(err => console.log("Error while searching the query", err));
  };


  render() {
    const {
      search,
      showSearch
    } = this.state;

  return (
    <div>
      <ToastContainer
                    position="top-center"
                    autoClose={2000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnVisibilityChange
                    draggable                   
      />
      
      <NavBar
          handleSearch={this.handleSearch}
          results={showSearch ? search : []}
      />

              <Switch>      
                  <Route exact path="/" render={(props)=><Articles {...props} checked={this.state.checked} callback={this.onArticleClick} />}/>
                  <Route exact path="/article" render={(props)=><DetailedArticle {...props} checked={this.state.checked} callback={this.onArticleClick} id={this.props}/>}/>
                  <Route exact path="/bookmark" render={(props)=><Bookmark {...props} checked={this.state.checked} />}/>
                  <Route exact path="/search" component={Search}/>
              </Switch>      
    
      <Footer />
    </div>
        );
      }
}

export default withRouter(App);


