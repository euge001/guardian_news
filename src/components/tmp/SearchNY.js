import React from "react";
import {
    FacebookShareButton, TwitterShareButton, EmailShareButton, EmailIcon,
    FacebookIcon, TwitterIcon
} from "react-share";
import Modal from 'react-bootstrap/Modal';
import { MdShare, MdEmail, MdDelete } from 'react-icons/md';
import { Link } from "react-router-dom";
import Loader from "./Loader";
import "./SearchNY.css";

class SearchNY extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            error: null,
            loading: false,
            item: this.props.article,
            show: false,
            
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleerr = this.handleerr.bind(this);
        this.shortenString = this.shortenString.bind(this);
        this.handleClick = this.handleClick.bind(this);
        
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

    shortenString(str, maxLen, separator = '.') {
        if (str.length <= maxLen) return str;
        return str.substring(0, str.lastIndexOf(separator, maxLen));
    }


    render(){
        let item = this.state.item;
        let imgForNY="";
        let imgIdx="";


        

        try {
            for(let i=0; i<item.multimedia.length; i++){
                console.log("try first line width:",item.multimedia[i].width);
                
                if(item.multimedia[i].width>=2000){
                    //console.log("width:",items.multimedia[i].width);
                    imgIdx = item.multimedia[i].url;
                    break;
                }                 

            }
            if(imgIdx.length!=0){
                imgForNY = 'https://www.nytimes.com/'+imgIdx;
            
            }else{
                imgForNY = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
                
            } 

        } catch (error) {
            imgForNY = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
        }
        return (
            <div class="column">
                <Link to={"/articleny?id=" + item.web_url} style={{ textDecoration: "none", color: "black" }}>
                    <div class="card" style={{backgroundColor:"white"}}>
                        <h5 className="title">{item.headline.main}<span onClick={this.handleShow}><MdShare /></span>
                        </h5>
                        <Modal show={this.state.show} onClick={this.handleClick} onHide={this.handleClose}>

                            <Modal.Header closeButton>
                                <Modal.Title>
                                        <h3>
                                        NY TIMES
                                      </h3>
                                      <div>
                                      {item.headline.main}
                                      </div>
                                    
                                    </Modal.Title>
                            </Modal.Header>
                            <Modal.Body><p className="shareIconBody">Share via</p>
                            <div className="iconsAlign">
                                <FacebookShareButton url={item.web_url} hashtag={"CSCI_571_NewsApp"} style={{paddingLeft:"5%", float: "left"}}>
                                    <FacebookIcon round={true} size={45} />
                                </FacebookShareButton>
                                <TwitterShareButton url={item.web_url + "#CSCI_571_NewsApp"} hashtag={"CSCI_571_NewsApp"}>
                                    <TwitterIcon round={true} size={45} />
                                </TwitterShareButton>
                                <EmailShareButton subject={"CSCI_571_NewsApp"} url={item.web_url} style={{paddingRight:"5%", float: "right"}}>
                                    <EmailIcon round={true} size={45} />
                                </EmailShareButton>
                                </div>
                            </Modal.Body>
                        </Modal>
                        <img className="imgBK" src={imgForNY} style={{ height: "100%", width: "100%" }} alt='imgage' />
                        <br />
                        <p>

                            <span className="date">
                                {item.pub_date.substring(0, 10)}
                            </span>
                            <span>
                                {(() => {
                                   
                                        switch (item.news_desk) {
                                            case "world": return <p className={item.news_desk}>WORLD</p>;
                                            case "politics": return <p className={item.news_desk}>POLITICS</p>;
                                            case "business": return <p className={item.news_desk}>BUSINESS</p>;
                                            case "technology": return <p className={item.news_desk}>TECHNOLOGY</p>;
                                            case "sport": return <p className={item.news_desk}>SPORTS</p>;
                                            case "": return <p className="health">None</p>;
                                            default: return <p className="health">{item.news_desk.toUpperCase()}</p>;
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

export default SearchNY;