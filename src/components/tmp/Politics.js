import React from "react";
import Loader from "./Loader";
import NewsArticle from "./NewsArticle";
import NewsArticleGuardian from "./NewsArticleGuardian";


class Politics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            loading: false,
            items: [],
            itemsG: [],
            checkedToggle: this.props.checked
        };
       //console.log(this.props.checked);
        
    }

    componentDidMount() {

        
        Promise.all([
          fetch("https://high-bedrock-268705.appspot.com/nytimePoliticsTab").then(valueNY => valueNY.json()),
          fetch("https://high-bedrock-268705.appspot.com/guardianPoliticsTab").then(valueG => valueG.json())
          ])
          .then(([valueNY, valueG]) => {

              this.setState({
                                  isLoaded: true,
                                  items: valueNY.data.results,
                                  itemsG: valueG.data.response.results
                              }
                              );
            //  console.log(valueNY)
            //  console.log(valueG)
            //json response
          })
          .catch((err) => {
              console.log(err);
          });

  }


            render() {
        //         console.log("hj")
    
        const { error, isLoaded, checkedToggle } = this.state;
        //console.log("toggle switch passed : ",this.props.checked);
        let imgsrc="";
        let dateString="";
        
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return (<Loader/>);
        } else {
            const {items} = this.state;
            const {itemsG} = this.state;
            
            if (this.props.checked===false) {
                return (
                    <div>
                        <br></br>
                        {items.slice(0,10).map((item) => {
                            return (<div style={{marginLeft:"1%"}}><NewsArticle article={item} key={item.url}/><br></br></div>);
                        })
                        
                        }
                       
                    </div>
                    
    
                );
            } else {
                return (
                    <div>
                       <br></br>
                        {itemsG.slice(0,10).map((item) => {
                            return (<div style={{marginLeft:"1%"}}><NewsArticleGuardian article={item} key={item.id}/><br></br></div>);
                        })
                        
                        }
                    
                      
                    </div>
                    

                );
            }
            
            
        }
    }
            
            
        
    
}

export default Politics;