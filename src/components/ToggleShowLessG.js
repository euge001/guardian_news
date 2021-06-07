import React, { Component } from "react";
import {FaAngleDown} from "react-icons/fa";
import {FaAngleUp} from "react-icons/fa";
import { ScrollTo } from "react-scroll-to";

class ToggleShowLessG extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			opened: false,
		};
		this.toggleBox = this.toggleBox.bind(this);
	}
	componentDidMount() {
		//  window.scrollBy(0,300);
		// setTimeout
		setTimeout(function(){ window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth'
		   });}, 100);
		
	}
	
	toggleBox() {
		const { opened } = this.state;
		this.setState({
			opened: !opened,
		});
	}
  
	render() {
		var { title, children } = this.props;
		const { opened } = this.state;

		if (opened){
			title =<FaAngleUp/>;
		}else{
			title =<FaAngleDown/>;
		}
//console.log("more data",this.props.article);
		return (
			<div className="box">
                {opened && (					
					<div class="boxContent">
						{children}
					</div>
				)}
				<div className="boxTitle" onClick={this.toggleBox}>
					{this.props.article&&title}
				
				</div>
				
			</div>
		);
	}
}

export default ToggleShowLessG;