import React from "react";
import DetailedArticle from "./DetailedArticleGuard";
import Loader from "./Loader";
import { withRouter } from "react-router";
import { MdShare, MdEmail } from 'react-icons/md';

import { FaFacebook, FaTwitter } from 'react-icons/fa';
import { Link } from "react-router-dom";
import '../index.css';
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap';
import { render } from 'react-dom';
import {
    FacebookShareButton, TwitterShareButton, EmailShareButton, EmailIcon,
    FacebookIcon, TwitterIcon
} from "react-share";

var divStyle = {
    
    paddingLeft: "20px"
  };

class NewsArticle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            loading: false,
            item: this.props.article,
            show: false,
            setShow: false

        };
        this.handleClick = this.handleClick.bind(this);

        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleerr = this.handleerr.bind(this);


    }

    handleClick = (e) => {
        e.stopPropagation();
       
    }

    handleClose() {
        //e.preventDefault();
        this.setState({
            show: false,
            setShow: false
        });
    }

    handleShow(e) {
        e.preventDefault();
        
        this.setState({
            show: true,
            setShow: true
        });
    }

    handleerr(e) {
        e.preventDefault();
    }




    render() {

        let imgsrc = "";
        let dateString = "";
        let item = this.state.item;
        let keyValue = this.state.key;
        let imgIdx="";
         console.log(" mutlimedia len : "+item.multimedia.length);
        
            // for(let i=0; i<item.multimedia.length; i++){
            //     console.log("width:",item.multimedia[i].width);
            //     if(item.multimedia[i].width>=2000)
            //     imgsrc = item.multimedia[i].url;
            //     else
            //     imgsrc = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";

            // }

            try{
                for(let i=0; i<item.multimedia.length; i++){
                    
                    
                    if(item.multimedia[i].width>=2000){
                        
                        imgIdx = item.multimedia[i].url;
                        break;
                    }                 
    
                }
                if(imgIdx.length!=0){
                    imgsrc = imgIdx;
                
                }else{
                    imgsrc = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
                    
                } 

            }catch(error){
                imgsrc="https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
            }
            
            dateString = item.published_date.substring(0, 10);
        
        return (

            <Link to={"/articleny?id=" + item.url} style={{ textDecoration: "none", color: "black" }}>

                <div className="card mb-3" style={{backgroundColor:"white",width:"98%"}}>
                    <div className="row no-gutters">
                        <div className="col-md-2" style={{border:"1px solid",color:"#dedbd2"}}>
                            <img src={imgsrc} alt="NYTimes" className="card-img" style={{padding:"4px", height:"100%"}}></img>
                        </div>
                        <div className="col-md-10">
                            <div className="card-body" style={divStyle}>
                                <h3 style={{fontSize:"1.25rem",fontStyle:"italic",fontWeight:"bold"}}>{item.title}<span onClick={this.handleShow}><MdShare /></span></h3>
                                <Modal show={this.state.show} onClick={this.handleClick} onHide={this.handleClose}>

                                    <Modal.Header closeButton>
                                        <Modal.Title>{item.title}</Modal.Title>
                                    </Modal.Header>
                                   
                                </Modal>


                                <p className="block-with-text">{item.abstract}</p>
                                <p className="dateNsection">
                                    <span style={{ fontStyle: "italic"}}>
                                        {dateString}
                                    </span>
                                    <span>
                                        {(() => {
                                            switch (item.section) {
                                                case "world": return <p className={item.section}>WORLD</p>;
                                                case "politics": return <p className={item.section}>POLITICS</p>;
                                                case "business": return <p className={item.section}>BUSINESS</p>;
                                                case "technology": return <p className={item.section}>TECHNOLOGY</p>;
                                                case "sport": return <p className={item.section}>SPORTS</p>;
                                                case "sports": return <p className={item.section}>SPORTS</p>;

                                            default: return <p className="health">{item.section.toUpperCase()}</p>;
                                            }
                                        })()}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        )
    }

}

export default NewsArticle;

