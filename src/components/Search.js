import React, { Fragment } from "react";
import Loader from "./Loader";
import Content from "./Content";
import { withRouter } from "react-router";


  function Search(props) {

  const { results } = props;
  
  return (
        
    <div className="container">
          <Content results={results} />
    </div>

  );
}


export default withRouter(Search);
