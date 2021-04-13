import React, { Component } from 'react'
import Animation from './Animation'
import './AddReview.css'
import StarRatingComponent from 'react-star-rating-component';
import AuthService from "../../services/auth.service";

export default class AddReview extends Component {
    constructor(props){
        super(props)
        this.handleRatingChange = this.handleRatingChange.bind(this);
        this.state={
            currentUser: AuthService.getCurrentUser(),
            raiting:1,
            title:'',
            description:''
            
        }
    }

    handleRatingChange(e) {
        this.setState({raiting:e});
     }

    render() {

        return (
            <div>
                <div className="row">
                    <div className="col-md-7">
                        <div className="form-container">
                            <form className="rev-form" onSubmit={this.handleSubmit}>
                                <h3>Add a review</h3>
                                <div  className="row" style={{fontSize:'2.2em'}}>
                                               <StarRatingComponent 
                                                       name="rating" 
                                                       editing={true}
                                                       starCount={5}
                                                       value={this.state.raiting}
                                                       onChange={this.handleRatingChange} 
                                                       onStarClick={this.handleRatingChange}
                                                       />
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="col-md-5">
                        <div className="col-md-8 mr-auto ml-auto">
                            {/* <div className="anim"> */}
                                <Animation />
                            {/* </div> */}
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
