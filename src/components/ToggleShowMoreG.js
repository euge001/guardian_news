import React, { Component } from "react";

class ToggleShowMoreG extends Component {	
    constructor(props){
        super(props);
        
	} 
	componentDidMount() {
	
	}
	render() {
		let stringDisplay= this.props.article;
		
		
		return (
		
			<div> {<p>{stringDisplay}</p>
					
			} </div>
		);
	}
}

export default ToggleShowMoreG;