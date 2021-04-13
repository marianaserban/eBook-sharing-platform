import React, { Component } from 'react'
import Animation from './Animation'
import './AddReview.css'
import StarRatingComponent from 'react-star-rating-component';
import AuthService from "../../services/auth.service";
import $ from 'jquery';


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

    componentDidMount(){
        $(".rev-form")
        .find(".form-control")
        .each(function () {
            var targetItem = $(this).parent();
            if ($(this).val()) {
                $(targetItem)
                    .find("label")
                    .css({
                        top: "-6px"
                        , fontSize: "16px"
                        , color: "#ff512f"
                    });
            }
        });
        $(".rev-form")
            .find(".form-control")
            .focus(function () {
                $(this)
                    .parent(".input-block")
                    .addClass("focus");
                $(this)
                    .parent()
                    .find("label")
                    .animate({
                            top: "-6px"
                            , fontSize: "16px"
                            , color: "#ff512f"
                        }
                        , 300
                    );
            });
        $(".rev-form")
            .find(".form-control")
            .blur(function () {
                if ($(this).val().length == 0) {
                    $(this)
                        .parent(".input-block")
                        .removeClass("focus");
                    $(this)
                        .parent()
                        .find("label")
                        .animate({
                                top: "20px"
                                , fontSize: "18px"
                            }
                            , 300
                        );
                }
            });
    }

    handleRatingChange(e) {
        this.setState({raiting:e});
     }

    render() {

        return (
                <div className="row">
                    <div className="col-md-7">
                            <div className="form-container">
                                <form action className="rev-form">
                                    <h3 className="col-sm-12">Add a review</h3>
                                    <div className="col-sm-12" style={{fontSize:'2.2em'}}>
                                        <StarRatingComponent id="raiting" style={{fontSize:'2.2em'}} name="raiting" editing={true} starCount={5} value={this.state.raiting} onChange={this.handleRatingChange} onStarClick={this.handleRatingChange}/>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="input-block">
                                        <label htmlFor>Title</label>
                                        <input className="form-control" type="text" />
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="input-block textarea">
                                        <label htmlFor>Your impression</label>
                                        <textarea rows={3} type="text" className="form-control" defaultValue={""} />
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                            <div className="bt-con">
                                                <input type="button" className="read-btn" value="Submit"/>
                                            </div>
                                    </div>
                                </form>
                            </div>                  
                        </div>
                        <div className="col-md-5">
                            <Animation />
                        </div>
             </div>
        )
    }
}
