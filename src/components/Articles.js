import React, { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard";
import { MdBookmark } from "react-icons/md";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import "./Articles.css";


const Articles = () => {
  const [hasError, setErrors] = useState(false);
  const [articles, setArticles] = useState([]);
  const [sort_term, setSort_term] = useState("newest");
  const [section, setSection] = useState([]);
  const [loading, setLoading] = useState(true)

  async function fetchData() {
    const res = await fetch(
      `https://content.guardianapis.com/search?q=show-tags=contributor&show-fields=all&order-by=${sort_term}&api-key=78553091-f422-4259-957a-8487917d5090`
    );
    res
      .json()
      .then((res) => setArticles(res.response.results))
      .catch((err) => setErrors(err));
        setLoading(false)
  }

  async function fetchDataSection() {
    const res = await fetch(
      `https://content.guardianapis.com/search?q=show-tags=contributor&section=sport&show-fields=all&order-by=${sort_term}&api-key=78553091-f422-4259-957a-8487917d5090`
    );
    res
      .json()
      .then((res) => setSection(res.response.results))
      .catch((err) => setErrors(err));
        setLoading(false)
  }


  useEffect(() => {
    fetchData();
    fetchDataSection();
    }, [sort_term]);


  function onChangeHandler(e) {
    setSort_term(e.target.value);
  }

    if (loading === true) {
        return <Loader/>;
  }
  

  return (
        <div className="container">
          <div className="parent">
            <div className="start">
              <h2>Top Stories</h2>              
              <Link to={"bookmark"}>
              <div className="share-bookmark">
                <MdBookmark
                  data-tip="Bookmark"
                  data-for="bookmarkColor"
                  color="white"
                  size={20}
                />
            View bookmark
            </div>
          </Link>          

          <select
          className="sort-term"
          value={sort_term}
          onChange={onChangeHandler}
          >
            
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="relevance">Most Popular</option>
          </select>
        </div>
        
          {articles.slice(0, 8).map((item, i) => {
            return (
              <div className={"div" + i}>
                <ArticleCard key={item.id} article={item} />
              </div>
            );
          })}
          </div>        
     

          <div className="parent3col">
          <div className="start3col">
            <h2>Sport</h2>
          </div>
          {section.slice(0, 3).map((item, i) => {
            return (
              <div className={"div3col" + i}>                
                <ArticleCard key={item.id} article={item} />
              </div>
            );
          })}
          </div>          
        </div>  
    );
}


export default Articles;
