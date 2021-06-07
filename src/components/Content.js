import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";


function Content(props) {
  const { results } = props;
  return (
    <div>
      <div>
        {results.map(art => {
          const { id, webTitle, fields } = art;
          return (
            <Link to={"/article?id=" + id}  onClick={() => {window.location.href="/article?id=" + id}}>
            <div key={id}>       
                <h2>{webTitle}</h2>
                <img src={fields.thumbnail} width="70%" height="70%" alt="News" />
                <h4>{fields.trailText}</h4>         
              </div>
              </Link>
          );
        })}
      </div>
    </div>
  );
}

export default withRouter(Content);
