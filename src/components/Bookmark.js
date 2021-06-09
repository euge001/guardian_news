import React from "react";
import 'react-toastify/dist/ReactToastify.css'; 
import "./Bookmark.css";
import BookmarkCard from "./BookmarkCard";

class Bookmark extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        error: null,
        loading: false
    };

    this.handleDelete=this.handleDelete.bind(this);
}

  handleDelete(){  
    this.setState({
        x: ''
    });
  }
   
  render() {
        var retrievedObject = localStorage.getItem('storeTest');
        var str = JSON.parse(retrievedObject);
        var cards_data=[]        

        for (var prop in str){
          cards_data.push(str[prop])
        }
        
        let cards=[]
        for(let i=0;i<cards_data.length;i++){
 
            let urlToDetailed = cards_data[i].url.substring(28);
            cards.push(
              <BookmarkCard data={cards_data[i]} url={urlToDetailed} callback={this.handleDelete} key={urlToDetailed}/>             
            )        
        }

      if(cards_data.length===0 || cards_data.length===null)
        return(<h3>You have no saved articles</h3>);
        else
        {
          return (
            <div className="container">
            <div className="start">         
                <h1>All bookmark</h1>
                </div>
                <div class="row">
                {cards}
                </div>              
            </div>
          );
        }        
    }
}

export default Bookmark;