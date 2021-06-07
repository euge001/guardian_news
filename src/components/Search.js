import React, { Fragment } from "react";
import Loader from "./Loader";
import Content from "./Content";
import { withRouter } from "react-router";


  function Search(props) {

  const { results } = props;
  
  return (
    <Fragment>           
      <div>
          <Content results={results} />
        </div>
    </Fragment>
  );
}


export default withRouter(Search);
