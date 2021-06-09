import React from 'react';
import { MdDelete } from 'react-icons/md';
import { Link } from "react-router-dom";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';
import "./Bookmark.css";

class BookmarkCard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            urlToDetailed: this.props.url,
            item: this.props.data,
        }
        this.handleDelete=this.handleDelete.bind(this);
    }

    handleDelete(urlToDel, titleDel,e){        
        e.stopPropagation();
        e.preventDefault();

        toast("Removing "+ titleDel, {
          className: css({
              color: "#000000 !important"
          })
      });
        
        var bookmrk = JSON.parse(localStorage.getItem('storeTest'));   
        delete bookmrk[urlToDel];        
        localStorage.setItem('storeTest', JSON.stringify(bookmrk));
        this.props.callback();
    }      

    render() {
        let {item, urlToDetailed} = this.state;
        return (
            <div class="column">
            <Link to={"/article?id=" + urlToDetailed} style={{ textDecoration: "none", color: "black" }}>
                    <div>
                        <img className="imgBK" src={item.img} style={{ height: "100%", width: "100%" }} alt='image' />
                        <h5 className="title">{item.title}
                            <span onClick={(e) => this.handleDelete(item.quer,item.title, e)}><MdDelete/></span>
                        </h5>               
                    </div>
            </Link>
            </div>
        );
    }
}

export default BookmarkCard;