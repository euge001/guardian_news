// import React from 'react';
// import commentBox from 'commentbox.io';

// class CommentBox extends React.Component {

//     constructor(props){
//         super(props);
//         this.state={

//         };
//     }

//     componentDidMount() {

//         this.removeCommentBox = commentBox('5662267903311872-proj', {
//             className: 'commentbox', // the class of divs to look for
//            // defaultBoxId: this.props.id, // the default ID to associate to the div
//             tlcParam: 'tlc' // used for identifying links to comments on your page
          
//         });
//         console.log(this.props.id);
//     }

//     componentWillUnmount() {

//         this.removeCommentBox();
    
//     }

//     render() {

//         return (
//             <div className="commentbox" id={this.props.id}/>
//         );
//     }
// }


import React from 'react';
import commentBox from 'commentbox.io';

class CommentBoxG extends React.Component {
    constructor(props){
        super(props);
       //console.log("id passed from detailed artilce: "+this.props.id);
    }

    componentDidMount() {

        this.removeCommentBox = commentBox('5662267903311872-proj',{
            className: 'commentbox', // the class of divs to look for
            defaultBoxId: this.props.id});
        
    }

    componentWillUnmount() {

        this.removeCommentBox();
    }

    render() {

        return (
            <div className="commentbox" id={this.props.id}/>
        );
    }
}


export default CommentBoxG;