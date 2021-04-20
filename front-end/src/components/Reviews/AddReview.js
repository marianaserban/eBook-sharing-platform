import React, { Component } from 'react'
import Animation from './Animation'
import './AddReview.css'
import StarRatingComponent from 'react-star-rating-component';
import AuthService from "../../services/auth.service";
import $ from 'jquery';
import Axios from 'axios'
import swal from 'sweetalert';


const API_URL = "http://localhost:8080/";



export default class AddReview extends Component {

    constructor(props){
        super(props)

        // this.handleRatingChange = this.handleRatingChange.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);

        this.state={
            currentUser: AuthService.getCurrentUser(),
            content:'',
            addDate:new Date(),
            raiting:1,
            title:'',
            bookId: JSON.parse(localStorage.getItem('bookId')),
            isOpen:false
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
    onChangeTitle(e){
        this.setState({
            title: e.target.value
        });
    }
    onChangeDescription(e){
        this.setState({
            content: e.target.value
        });
    }
    onStarClick(nextValue, prevValue, name) {
        // this.setState({
        //     rating:e

        // });
        this.setState({raiting: nextValue});
     }
     cancelCourse = () => { 
      document.getElementById("add-review").reset();
    }

    handleSubmit(e){
        e.preventDefault();
        const review = {
            content:this.state.content,
            title:this.state.title,
            raiting:`${this.state.raiting}`,
            addDate:this.state.addDate,
            userId:this.state.currentUser.id,
            bookId:this.state.bookId,
          }
        Axios.post(`${API_URL}review`, JSON.stringify(review),
        {
          headers: { "Content-Type": "application/json" }
        })
        .then((res) => {
          document.getElementById("add-review").reset();
                this.setState({raiting:1})
                this.setState({content:' '})
                this.setState({title:' '})
                //return false;
        })
        .catch(error => {
          if (error.response !== undefined) {
          }
        });

    }
    render() {

        return (
                <div className="row">
                    <div className="col-md-7">
                            <div className="form-container">
                                <form id="add-review"className="rev-form" onSubmit={this.handleSubmit}> 
                                    <h3 className="col-sm-12">Add a review</h3>
                                    <div className="col-sm-12" style={{fontSize:'2.2em'}}>
                                        <StarRatingComponent id="rating" style={{fontSize:'2.2em'}} 
                                        name="raiting" editing={true} starCount={5} 
                                        value={this.state.raiting} 
                                        onStarClick={this.onStarClick.bind(this)}/>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="input-block">
                                        <label htmlFor>Title</label>
                                        <input name="title" className="form-control" type="text" onChange={this.onChangeTitle}/>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="input-block textarea">
                                        <label htmlFor>Your impression</label>
                                        <textarea name="content" rows={3} type="text" className="form-control"
                                         defaultValue={""} onChange={this.onChangeDescription} />
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                            <div className="bt-con">
                                              
                                            <input type="button" type="submit" className="read-btn" 
                                                value="Submit" onClick={()=>{swal("Good job!", "Your review has been added successfully!", "success");
                                            }}/>

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
