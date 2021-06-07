import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import './NewsArticleGuardian.css';

class NewsArticleGuardian extends React.Component {
    constructor(props) {
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

    shortenString(str, maxLen, separator = '.') {
        if (str.length <= maxLen) return str;
        return str.substring(0, str.lastIndexOf(separator, maxLen));
    }

    render() {

        let imgsrc = "";
        let dateString = "";
        let item = this.state.item;
        
        try {
            imgsrc = item.fields.thumbnail;
            dateString = item.webPublicationDate.substring(0, 10);
        } catch (error) {
            imgsrc = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
        }
        return (
            <Link to={"/article?id=" + item.id}>
                    <div className="item">
                        <img src={imgsrc} alt="Guardian" className=" "></img>
                        <div className="intro">
                            <h1>{item.webTitle}</h1>                           
                            <p className="trailText">
                                {item.fields.trailText}
                            </p>      
                        </div>
                    </div>
            </Link>
        )
    }
}

export default withRouter(NewsArticleGuardian);

