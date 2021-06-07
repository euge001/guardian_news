import React from "react";
import Loader from "./Loader";
import NewsArticleGuardian from "./NewsArticleGuardian";
import SearchResults from "./SearchResults";


class Home extends React.Component {    
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            loading: false,
            itemsG: [],
            sort_term: 'newest'      
        };
      this.handleChange = this.handleChange.bind(this);
      console.log(this.props)
    }

    handleChange(event) {
        this.setState({sort_term: event.target.value});
    }

    componentDidMount() {
        Promise.all([
          fetch(`https://content.guardianapis.com/search?q=show-tags=contributor&show-fields=all&order-by=${this.state.sort_term}&api-key=78553091-f422-4259-957a-8487917d5090`).then(valueG => valueG.json())
          ])
          .then(([valueG]) => {
              this.setState({
                                  isLoaded: true,
                                  itemsG: valueG.response.results
                              }
                              );
          })
          .catch((err) => {
              console.log(err);
          });
    }


    componentDidUpdate(prevState) {
        if(this.state.sort_term !== prevState.sort_term) {
            Promise.all([
                fetch(`https://content.guardianapis.com/search?q=show-tags=contributor&show-fields=all&order-by=${this.state.sort_term}&api-key=78553091-f422-4259-957a-8487917d5090`).then(valueG => valueG.json())
                ])
                .then(([valueG]) => {
                    this.setState({
                                        isLoaded: true,
                                        itemsG: valueG.response.results
                                    }
                                    );
                })
                .catch((err) => {
                    console.log(err);
                });
        }
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

                        <select className="u-full-width" value={this.state.sort_term}
                            onChange={this.handleChange}>            
                            <option value="newest">Newest</option>
                            <option value="oldest">Oldest</option>
                            <option value="relevance">Most Popular</option>
                        </select> 
   
                        {itemsG.slice(0,10).map((item) => {
                            return (<div><NewsArticleGuardian key={item.id} article={item}/><br></br></div>);
                        })                        
                        }                   
                    </div>                    
                );
        }
    }                        
}

export default Home;