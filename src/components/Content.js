import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";



function Content(props) {
  const { results } = props;
  return (
    <div class="row">
        {results.map(art => {
          const { id, webTitle, fields } = art;
          return (
            <div class="column">
            <Link to={"/article?id=" + id}  onClick={() => {window.location.href="/article?id=" + id}}>
            <div key={id}>       
                <img className="imgBK" src={fields.thumbnail} style={{ height: "100%", width: "100%" }} alt='image' />
                <h5 className="title">{webTitle}</h5>     
              </div>
              </Link>
              </div>
          );
        })}
      </div>
  );
}

export default withRouter(Content);
