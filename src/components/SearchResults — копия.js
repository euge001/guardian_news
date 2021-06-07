import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import SearchResultsList from './SearchResultsList';



const DataContext = React.createContext();
function DataProvider({ children }) {
  const [data, setData] = React.useState({});
  const history = useHistory();
  React.useEffect(() => {
    if (data && data.book_list && data.book_list.length > 0) {
      history.push("/search");
    }
  }, [data, history]);
    
  return (
    <DataContext.Provider value={[data, setData]}>
      {children}
    </DataContext.Provider>
  );
}

function SearchBar() {
  const apiKey = 'e5a72453-f9b8-4031-8d16-02c39e72dc1e';
  const [input, setInput] = React.useState("");
  const [, setData] = React.useContext(DataContext);
  function search(e) {
    e.preventDefault();
    fetch(`https://content.guardianapis.com/search?q=${input}&show-tags=contributor&show-fields=all&order-by=relevance&api-key=${apiKey}`)
      .then(res => res.json())
      .then(res => {
        setData({
          book_list: res.response.results,
          heading: "Search Results"
        });
      })
      .catch(err => console.log(err));
  }

  return (
          <div className="search-container">
            <form onSubmit={search}>
              <input
                className="search expandright"
                id="searchright"
                type="search"
                name="q"
                placeholder="Search all news"
                value={input} onChange={e => setInput(e.target.value)}
              />
              <label className="button searchbutton" for="searchright">
                <span class="mglass">&#9906;</span>
              </label>
            </form>
          </div>
  );
}

function Book({ data }) {
  return <div>{data.webTitle}</div>;
}

function SearchResult() {
  const [data] = React.useContext(DataContext);
  const books = (data && data.book_list) || [];
  if (!books || books.length === 0) {
    return "Empty search results";
  }
  return books.map(t => <Book key={t.id} data={t} />);
}

export default function SearchResults() {
  return (
    <div className="">
      <Router>
        <DataProvider>
          <SearchBar />
          <Switch>
            <Route exact path="/search" component={SearchResult} />
          </Switch>
        </DataProvider>
      </Router>
    </div>
  );
}


