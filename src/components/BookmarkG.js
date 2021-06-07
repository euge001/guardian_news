import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { MdDelete } from 'react-icons/md';
import { Link } from "react-router-dom";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';

import "./Bookmark.css";

class BookmarkG extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            urlToDetailed: this.props.url,
            item: this.props.data,
            show: false,
        }

        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleerr = this.handleerr.bind(this);
        this.handleClick = this.handleClick.bind(this);
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
        
        var aaa = JSON.parse(localStorage.getItem('storeTest'));        
       
        delete aaa[urlToDel];        
      
        localStorage.setItem('storeTest', JSON.stringify(aaa));
      
        this.props.callback();
    }      

    handleClick = (e) => {
        e.stopPropagation();
       
    }
    
    handleClose() {
        this.setState({
            show: false,
    });    
    }
    
    handleShow(e) {
        e.stopPropagation();
        this.handleerr(e);
        this.setState({
            show: true,        
        });   
    }    

    handleerr(e) {
        e.preventDefault();
    }

    render() {
        let {item, urlToDetailed} = this.state;
        return (
            <div class="column">
            <Link to={"/article?id=" + urlToDetailed} style={{ textDecoration: "none", color: "black" }}>
                    <div>
                    <img className="imgBK" src={item.img} style={{ height: "100%", width: "100%" }} alt='imgage' />
                        <h5 className="title">{item.title}
                                <span onClick={(e) => this.handleDelete(item.quer,item.title, e)}><MdDelete/></span>
                          </h5>

                            <Modal show={this.state.show} onClick={this.handleClick} onHide={this.handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>                         
                                      <div>
                                      {item.title}
                                      </div>
                                    </Modal.Title>
                                </Modal.Header>
                            </Modal>
                
                    </div>
            </Link>
            </div>
        );
    }

}
export default BookmarkG;