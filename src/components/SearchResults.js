import React, { Component, Redirect } from "react";
import axios from "axios";
import { withRouter } from "react-router";
import SearchResultsList from "./SearchResultsList";


class SearchResults extends React.Component {
constructor(props) {
super(props);
this.state = {
  results: [],
  term: ""
};

this.submit = this.submit.bind(this);
this.handleChange = this.handleChange.bind(this);
}

componentDidUpdate(prevProps, prevState) {
const { history } = this.props;
if (prevState.results !== this.state.results) {
  history.push("/results");
}
}

handleChange(event) {
this.setState({
  [event.target.name]: event.target.value
});
console.log(this.state);
}

submit(e) {
e.preventDefault();
const term = e.target.elements.term.value;
let url = `https://content.guardianapis.com/search?q=${term}&show-tags=contributor&show-fields=all&order-by=relevance&api-key=e5a72453-f9b8-4031-8d16-02c39e72dc1e`;
axios
  .get(url)
  .then(({ data }) => {
    console.log(data);
    this.setState({
      results: data
    });
  })
  .catch(error => console.log(error));
}

  render() {
    const resultList = this.state.results;
    console.log(resultList)
return (
  <div>
    <form onSubmit={this.submit}>
      <input
        onChange={this.handleChange}
        type="text"
        name="term"
        value={this.state.term}
      />
      <button type="submit" bsStyle="primary">
        Find
      </button>
      </form>

          {resultList.map((item) => {
            return (
              <div>
                <div key={item.id}> { item }}</div>
              </div>
            );
          })}
   
  </div>
   
    );
    
}
}
export default withRouter(SearchResults);