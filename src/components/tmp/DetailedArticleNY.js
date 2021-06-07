import React from "react";
import {FacebookShareButton, TwitterShareButton, EmailShareButton, EmailIcon,
    FacebookIcon,TwitterIcon} from "react-share";
    import CommentBoxG from "./CommentBoxG";
    import ToggleShowLessG from "./ToggleShowLessG";
    import ToggleShowMoreG from "./ToggleShowMoreG";
    import {FaAngleDown} from "react-icons/fa";
    import Loader from "./Loader";
    import Card from 'react-bootstrap/Card';
    import "./DetailedArticleNY.css";
    import { MdBookmarkBorder, MdBookmark } from 'react-icons/md';
    import Toast from "./Toast";
    import ReactTooltip from 'react-tooltip';
    import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';

let url ="";
let titleBk="";
let imgurlBk="";
let dateBk="";
let sectionBk="";
let typeBk="";
let query ="";
let urlToPass="";
//this detailed article is for NY times pages 
class DetailedArticleNY extends React.Component {
  
    constructor(props) {
        super(props);
         query = this.props.location.search.substring(4);
         //console.log(query);
         
         var aaa = JSON.parse(localStorage.getItem('storeTest'));
        //  if(aaa == null) aaa={};
         var test = aaa[query]!=null?true:false;
        this.state = {
            error: null,
            loading: false,
            items: [],
            articleId: query,
            bookmarkChecker: test
        };
         //console.log("nytime id :"+query);
        this.shortenString = this.shortenString.bind(this);
        this.storeData = this.storeData.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
      
    }
    handleDelete(urlToDel){

        // alert("delte selected!");
        // e.stopPropagation();
        // e.preventDefault();
        var aaa = JSON.parse(localStorage.getItem('storeTest'));
        
        delete aaa[urlToDel];
        
      
      localStorage.setItem('storeTest', JSON.stringify(aaa));
      this.setState({
          bookmarkChecker: false,
        xyz: 36
      });
      
    

      toast("Removing "+ titleBk, {
        className: css({
            color: "#000000 !important"
        })
    });
      
      }
    
    
    componentDidMount() {
        let url = "https://high-bedrock-268705.appspot.com/articleny?key=" + query;
         //console.log("url to fetch from node:",url)
        //fetch()
    fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                 //console.log("result", result);
                    this.setState({
                        isLoaded: true,
                        items: result.data.response.docs[0]
                    });
                   //console.log("items fetced: ",this.state.items);
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            ).catch((err) => {
                console.log(err);
            });
        }
        shortenString(str, maxLen, separator = '.') {
            if (str.length <= maxLen) return str;
            return str.substring(0, str.lastIndexOf(separator, maxLen));
          }

        storeData(){
            var storeTest = { 'title': titleBk, 'img': imgurlBk, 'date': dateBk, 'section':sectionBk, 'type':typeBk, 'url':urlToPass, 'quer':query };
            
            var aaa = JSON.parse(localStorage.getItem('storeTest'));
            //  if(aaa == null) aaa={};
            aaa[query]=storeTest;
       
         localStorage.setItem('storeTest', JSON.stringify(aaa));
         

         toast("Saving "+ titleBk, {
            className: css({
                color: "#000000 !important"
            })
        });
         
         this.setState({
            
            bookmarkChecker: true
        });
          }

    render() { 
        const { error, isLoaded, items } = this.state;
         console.log("url :",items.web_url)
        let imgsrc = ""
        let dateString=""
        let month=""
        let strLess = ""
        let strMore =""
        let imgIdx="";
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return (<Loader />);
            
        } else {
            titleBk=items.headline.main;
            
            dateBk=items.pub_date.substring(0,10);
            sectionBk=items.section_name;
            typeBk='NYTimes';
            urlToPass=items.web_url;
            dateString=items.pub_date.substring(0,10);
               
                
            try {
               
                for(let i=0; i<items.multimedia.length; i++){
                    // console.log("try first line width:",items.multimedia[i].width);
                    
                    if(items.multimedia[i].width>=2000){
                        // console.log("width:",items.multimedia[i].width);
                        imgIdx = items.multimedia[i].url;
                        break;
                    }                 
    
                }
                if(imgIdx.length!=0){
                    imgsrc = 'https://www.nytimes.com/'+imgIdx;
                    imgurlBk=imgsrc;
                }else{
                    imgsrc = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
                    imgurlBk=imgsrc;
                }              

           } catch (error) {
            imgsrc = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
            imgurlBk=imgsrc;
           }
            
        //    console.log(this.state.articleId.id);
        if(this.state.bookmarkChecker==true){
            return (
                <div>
                    
                    {
                        <div style={{marginLeft:"1.5%"}}>
                            <br></br>
                    <div className="card" style={{width:"98%",backgroundColor:"white"}}>
                         <h3 className="card-title">{items.headline.main}</h3>
                         <p className="para">
                    <span style={{fontStyle:"italic"}}>{dateString}</span>
                    <div className="share-bookmark">
                    <span className="shareButton" style={{paddingRight:"30px"}}>
                        <FacebookShareButton url={items.web_url} hashtag={"CSCI_571_NewsApp"}
                     data-tip="Facebook"
                     data-for='facebook'>
                                <FacebookIcon size={30} round={true}/>
                                <ReactTooltip place="top" type="dark" effect="solid" id='facebook'/>
                            </FacebookShareButton>
                            <TwitterShareButton url={items.web_url+"#CSCI_571_NewsApp"} hashtag={"CSCI_571_NewsApp"}
                            data-tip="Twitter"
                            data-for='twitter'>
                                <TwitterIcon round={true} size={30}/>
                                <ReactTooltip place="top" type="dark" effect="solid" id='twitter'/>
                            </TwitterShareButton>
                            <EmailShareButton subject={"CSCI_571_NewsApp"} url={items.web_url}
                            data-tip="Email" data-for='email'>
                                <EmailIcon round={true} size={30}/>
                                <ReactTooltip place="top" type="dark" effect="solid" id='email'/>
                            </EmailShareButton>
                          </span>   
                            <span onClick={() => this.handleDelete(items.web_url)}> 
                             <MdBookmark data-tip="Bookmark" data-for='bookmarkColor' color="red" size={32}/>
                         <ReactTooltip place="top" type="dark" effect="solid" id='bookmarkColor'/> 
                         </span>
                        
                    </div>
                         
                         </p>
                         
                    <img className="card-img-top" style={{width:"100%"}} src={imgsrc} alt="Card image cap"></img>
                    <div className="card-body">
                     
                    {/* <p>{this.shortenString(items.blocks.body[0].bodyTextSummary,600,'.')}.</p> */}
                    <p>{items.abstract}</p>
                        {/* <ToggleShowLessG title={<FaAngleDown/>} >
                            <ToggleShowMoreG article={strMore}/>
                        </ToggleShowLessG> */}
                    
                    </div>
                    </div>                 
                
                    </div>}
                         <CommentBoxG id={this.state.articleId}/>
                </div>


            );
        }else{
            return (
                <div>
                    <ToastContainer
                    position="top-center"
                    autoClose={2500}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnVisibilityChange
                    draggable
                   
                     />
                    {
                        <div style={{marginLeft:"1.5%"}}>
                        <br></br>
                    <div className="card" style={{width:"98%", backgroundColor:"white"}}>
                         <h3 className="card-title">{items.headline.main}</h3>
                         <p className="para">
                    <span style={{fontStyle:"italic"}}>{dateString}</span>
                    <div className="share-bookmark">
                    <span className="shareButton" style={{paddingRight:"30px"}}>
                        <FacebookShareButton url={items.web_url} hashtag={"CSCI_571_NewsApp"}
                     data-tip="Facebook"
                     data-for='facebook'>
                                <FacebookIcon size={30} round={true}/>
                                <ReactTooltip place="top" type="dark" effect="solid" id='facebook'/>
                            </FacebookShareButton>
                            <TwitterShareButton url={items.web_url+"#CSCI_571_NewsApp"} hashtag={"CSCI_571_NewsApp"}
                            data-tip="Twitter"
                            data-for='twitter'>
                                <TwitterIcon round={true} size={30}/>
                                <ReactTooltip place="top" type="dark" effect="solid" id='twitter'/>
                            </TwitterShareButton>
                            <EmailShareButton subject={"CSCI_571_NewsApp"} url={items.web_url}
                            data-tip="Email" data-for='email'>
                                <EmailIcon round={true} size={30}/>
                                <ReactTooltip place="top" type="dark" effect="solid" id='email'/>
                            </EmailShareButton>
                            </span>
                            <span onClick={this.storeData}> 
                         
                         <MdBookmarkBorder data-tip="Bookmark" data-for='bookmark' color="red" size={32}/>
                     <ReactTooltip place="top" type="dark" effect="solid" id='bookmark'/>
                      </span>
                        
                    </div>
                         
                         </p>
                         
                    <img className="card-img-top" style={{width:"100%"}} src={imgsrc} alt="Card image cap"></img>
                    <div className="card-body">
                     
                    {/* <p>{this.shortenString(items.blocks.body[0].bodyTextSummary,600,'.')}.</p> */}
                    <p>{items.abstract}</p>
                        {/* <ToggleShowLessG title={<FaAngleDown/>} >
                            <ToggleShowMoreG article={strMore}/>
                        </ToggleShowLessG> */}
                    
                    </div>
                    </div>                 
                
                    </div>}
                         <CommentBoxG id={this.state.articleId}/>
                </div>


            );

        }
               
        }
           
            
        }
        
}

export default DetailedArticleNY;