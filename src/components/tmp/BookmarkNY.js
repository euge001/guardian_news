import React from 'react';
import {FacebookShareButton, TwitterShareButton, EmailShareButton, EmailIcon,
    FacebookIcon,TwitterIcon} from "react-share";
import Modal from 'react-bootstrap/Modal';
import { MdShare, MdEmail,MdDelete } from 'react-icons/md';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';

import "./Bookmark.css";

class BookmarkNY extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            urlToDetailed: this.props.url,
            item: this.props.data,
            show: false,
            // flag: this.props.flag,
        }

        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleerr = this.handleerr.bind(this);
        // this.shortenString = this.shortenString.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleDelete=this.handleDelete.bind(this);
    }

    handleDelete(urlToDel, titleDel,e){

        // alert("delte selected!");
        
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
    //   window.location.reload();
      
    }      

    handleClick = (e) => {
        e.stopPropagation();
       
    }
    
    handleClose() {
        // e.stopPropagation();
        // this.handleerr(e);
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
            <Link to={"/articleny?id=" + urlToDetailed} style={{ textDecoration: "none", color: "black" }}>
            <div class="card" style={{backgroundColor: "white"}}>
              <h5 className="title">{item.title
            //   this.shortenString(item.title, 100, '.')
              }
              <span onClick={this.handleShow}><MdShare /></span>
              {/* {this.state.flag?(<span onClick={(e) => this.handleDelete(item.quer,item.title, e)}><MdDelete/></span>):null} */}
              <span onClick={(e) => this.handleDelete(item.quer,item.title, e)}><MdDelete/></span>
              </h5>
              <Modal show={this.state.show} onClick={this.handleClick} onHide={this.handleClose}>

                                <Modal.Header closeButton>
                                    <Modal.Title>
                                    <h3>
                                        NY TIMES
                                      </h3>
                                      <div>
                                      {item.title}
                                      </div>
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body><p className="shareIconBody">Share via</p>
                                <div className="iconsAlign">
                                    <FacebookShareButton url={item.url} hashtag={"CSCI_571_NewsApp"} style={{paddingLeft:"5%", float: "left"}}>
                                        <FacebookIcon round={true} size={45} />
                                    </FacebookShareButton>
                                    <TwitterShareButton url={item.url + "#CSCI_571_NewsApp"} hashtag={"CSCI_571_NewsApp"}>
                                        <TwitterIcon round={true} size={45} />
                                    </TwitterShareButton>
                                    <EmailShareButton subject={"CSCI_571_NewsApp"} url={item.url} style={{paddingRight:"5%", float: "right"}}>
                                        <EmailIcon round={true} size={45} />
                                    </EmailShareButton>
                                    </div>
                                </Modal.Body>
                            </Modal>
              <img className="imgBK" src ={item.img} style={{height:"100%",width:"100%"}} alt='imgage'/>
              <br />
              <p>
              
                            <span className="date">
                              {item.date}
                            </span>
                            <span className="badge-padding">
                                {(() => {
                                    switch (item.section) {
                                        case "world": return <p className={item.section}>WORLD</p>;
                                        case "politics": return <p className={item.section}>POLITICS</p>;
                                        case "business": return <p className={item.section}>BUSINESS</p>;
                                        case "technology": return <p className={item.section}>TECHNOLOGY</p>;
                                        case "sport": return <p className={item.section}>SPORTS</p>;
                                        case "sports": return <p className={item.section}>SPORTS</p>;

                                        default: return <p className="health">HEALTH</p>;
                                    }
                                })()}
                           {(() => {
                                    switch (item.type) {
                                        case "Guardian": return <p className={item.type}>GUARDIAN</p>;
                                        case "NYTimes": return <p className={item.type}>NYTIMES</p>;
                                      }
                                    })()}
                            </span>
              </p>
            </div>
            </Link>
          </div>
        );
    }

}
export default BookmarkNY;