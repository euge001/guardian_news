import React from "react";
import Loader from "./Loader";
import "./DetailedArticle.css";
import { MdBookmarkBorder, MdBookmark } from "react-icons/md";
import ReactTooltip from "react-tooltip";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { css } from "glamor";

let titleBk = "";
let imgurlBk = "";
let dateBk = "";
let sectionBk = "";
let typeBk = "";
let urlToPass = "";
let book;
let query = "";


class DetailedArticleGuard extends React.Component {
  constructor(props) {
    super(props);
    query = this.props.location.search.substring(4);

    var aaa = JSON.parse(localStorage.getItem("storeTest"));
    var test = aaa[query] != null ? true : false;

    this.state = {
      error: null,
      loading: false,
      items: [],
      articleId: query,
      bookmarkChecker: test,
    };

    this.storeData = this.storeData.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.checkEmpty = this.checkEmpty.bind(this);
  }

  handleDelete(urlToDel) {
    var aaa = JSON.parse(localStorage.getItem("storeTest"));
    delete aaa[urlToDel];

    localStorage.setItem("storeTest", JSON.stringify(aaa));

    this.setState({
      bookmarkChecker: false,
    });

    book = false;

    toast("Removing " + titleBk, {
      className: css({
        color: "#000000 !important",
      }),
    });
  }

  componentDidMount() {
    let url =
      "https://content.guardianapis.com/" +
      this.state.articleId +
      "?&show-fields=all&api-key=78553091-f422-4259-957a-8487917d5090";

    fetch(url)
      .then((res) => res.json())
      .then(
        (res) => {
          this.setState({
            isLoaded: true,
            items: res.response.content,
          });
        },
        (error) => {
          console.log(error);
          this.setState({
            isLoaded: true,
            error,
          });
        }
      )
      .catch((err) => {
        console.log(err);
      });
  }


  checkEmpty(str) {
    if (str.length === 0 || str.length === null || str === "" || str === " ")
    return true;
    return false;
  }
  storeData() {
    var storeTest = {
      title: titleBk,
      img: imgurlBk,
      date: dateBk,
      section: sectionBk,
      type: typeBk,
      url: urlToPass,
      quer: query,
    };

    var aaa = JSON.parse(localStorage.getItem("storeTest"));
    aaa[query] = storeTest;

    localStorage.setItem("storeTest", JSON.stringify(aaa));

    toast("Saving " + titleBk, {
      className: css({
        color: "#000000 !important",
      }),
    });

    this.setState({
      bookmarkChecker: true,
    });
    book = true;
  }

  render() {
    const { error, isLoaded, items } = this.state;
    let imgsrc = "";
    let dateString = "";
    let strMore = "";
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <Loader />;
    } else {

      titleBk = items.webTitle;
      dateBk = items.webPublicationDate.substring(0, 10);
      sectionBk = items.sectionId;
      typeBk = "Guardian";
      urlToPass = items.webUrl;
      dateString = items.webPublicationDate.substring(0, 10);

      try {
        imgsrc = items.fields.thumbnail;
        imgurlBk = imgsrc;
      } catch (error) {
        imgsrc =
          "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
        imgurlBk = imgsrc;
      }

      if (this.state.bookmarkChecker === true) {
        return (
          <div>
            {
              <div className="container">
                <div className="parentDArticle">
                  <div className="div1">
       
                      <div className="w100 share-bookmark">
                        <span onClick={() => this.handleDelete(items.webUrl)}>
                          <MdBookmark
                            data-tip="Bookmark"
                            data-for="bookmarkColor"
                            color="red"
                            size={20}
                          />
                          <ReactTooltip
                            place="top"
                            type="dark"
                            effect="solid"
                            id="bookmarkColor"
                          />
                      </span>
                      Remove bookmark
                      </div>

                      <div className="w100">{dateString}</div>

                    <h1 className="">{titleBk}</h1>
                    
                    <h3 className="">{items.fields.trailText}</h3>

                    <hr />
                  </div>
                  
                  <div className="div3 body">
                  <div dangerouslySetInnerHTML={ {__html: items.fields.body} } />                  
                  </div>
               

                  <div className="div4">
                    <img
                      className="card-img-top"
                      src={imgsrc}
                      alt="Card cap"
                    ></img>
                  </div>
                </div>
              </div>
            }
          </div>
        );
      } else {
        return (
          <div className="container">
            <div className="parentDArticle">

              <div className="div1">
                <div className="w100 share-bookmark">
                    <span onClick={this.storeData}>
                      <MdBookmarkBorder
                        data-tip="Bookmark"
                        data-for="bookmark"
                        color="red"
                        size={32}
                      />
                      <ReactTooltip
                        place="top"
                        type="dark"
                        effect="solid"
                        id="bookmark"
                      />
                  </span>
                  Add bookmark
                  </div>

                  <div className="w100">{dateString}</div>

                  <h1 className="">{titleBk}</h1>
                    
                  <h3 className="">{items.fields.trailText}</h3>

                  <hr />
                  </div>
                  
                  <div className="div3 body">
                  <div dangerouslySetInnerHTML={ {__html: items.fields.body} } />                  
                  </div>
               
              <div className="div4">
                <img className="card-img-top" src={imgsrc} alt="Card cap"></img>
              </div>

            </div>
          </div>
        );
      }
    }
  }
}

export default DetailedArticleGuard;