import React from 'react';
import './App.css';
import { Switch,  Route,  withRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import Articles from "./components/Articles";
import World from "./components/World";
import Sports from "./components/Sports";
import DetailedArticle from "./components/DetailedArticleGuard";
import HeaderNavBar from "./components/HeaderNavBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import Bookmark from "./components/Bookmark";
import Results from './components/Results';



class App extends React.Component {

  constructor() {
    super();
    this.state = { url: '' };
  }


render(){
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
      
              <HeaderNavBar callback={this.toggleCallback} searchCallBack={this.searchCallBack} />
      
              <Switch>      
                  <Route exact path="/" render={(props)=><Articles {...props} checked={this.state.checked} callback={this.onArticleClick} />}/>
                  <Route exact path="/world" render={(props)=><World {...props} checked={this.state.checked} callback={this.onArticleClick} />}/>
                  <Route exact path="/sports" render={(props)=><Sports {...props} checked={this.state.checked} callback={this.onArticleClick} />}/>
                  <Route exact path="/article" render={(props)=><DetailedArticle {...props} checked={this.state.checked} callback={this.onArticleClick} id={this.props}/>}/>
                  <Route exact path="/bookmark" render={(props)=><Bookmark {...props} checked={this.state.checked} />}/>
                  <Route exact path="/results" render={(props)=><Results {...props} checked={this.state.checked} value={this.state.searchKeyWord} />} />
              </Switch>   
    
          </div>
        );
      }
}

export default withRouter(App);


