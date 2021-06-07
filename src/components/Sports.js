import React from "react";
import Loader from "./Loader";
import NewsArticleGuardian from "./NewsArticleGuardian";


class Sports extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            loading: false,
            itemsG: [],
            checkedToggle: this.props.checked
        };
    }

    componentDidMount() {
        
        Promise.all([
          fetch("https://high-bedrock-268705.appspot.com/guardianSportTab").then(valueG => valueG.json())
          ])
          .then(([ valueG]) => {

              this.setState({
                                  isLoaded: true,
                                  itemsG: valueG.data.response.results
                              }
                              );
          })
          .catch((err) => {
              console.log(err);
          });
  }


    render() {

        const { error, isLoaded } = this.state;
        
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return (<Loader/>);
        } else {

            const {itemsG} = this.state;           
       
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
            


export default Sports;