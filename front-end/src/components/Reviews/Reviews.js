import React, { Component } from 'react'
import * as IoIcons from "react-icons/io";
import './Reviews.css'
import Animation from './Animation'
import avatar from '../../assets/avatar.svg'
import StarRatingComponent from 'react-star-rating-component';
import Axios from 'axios'
import Carousel from "react-elastic-carousel";
import AddReview from './AddReview';
import ReactTooltip from "react-tooltip";

const API_URL = "http://localhost:8080/";

export default class Reviews extends Component {

    constructor(props){

        super(props);
        this.state = {
            reviews:[],
            bookId:JSON.parse(localStorage.getItem('bookId')),
            average:0,
            users:[]
        }

    }
    componentDidMount(){
        Axios.get(API_URL + 'reviews/'+`${this.state.bookId}`).then(
            res => {
              this.setState({ reviews: res.data });

              const ratingBars = document.querySelectorAll(".bar")
              ratingBars.forEach(e => {
                  e.style.width = `${e.dataset.perc}%`
              })
            }
        )
        Axios.get(API_URL + 'average/'+`${this.state.bookId}`).then(
            res => {
              this.setState({ average: res.data });
            }
        )
        Axios.get(API_URL + 'reviews/'+'users/'+`${this.state.bookId}`).then(
            res => {
              let reviewsCopy =[]
              for(let i=0;i<this.state.reviews.length;i++){
                  let review={
                        id:this.state.reviews[i].id,
                        content:this.state.reviews[i].content,
                        title:this.state.reviews[i].title,
                        raiting:this.state.reviews[i].raiting,
                        addDate:this.state.reviews[i].addDate,
                        userFullName:res.data[i].firstName+' '+res.data[i].lastName,
                        userThumbnail:res.data[i].thumbnail
                  }

                  reviewsCopy.push(review)
              }
              this.setState({ reviews: reviewsCopy })

            }
        )
    }
    getProc=(elem)=>{

        let nr=0;
        this.state.reviews.forEach(element => {
            if((element.raiting)==elem){
                nr++;
            }
        });

        return (nr/this.state.reviews.length)*100
    }

    render() {
        return (
            this.state.reviews.length ?
            
            <div>
            <div className="row">
                    
                    <div className="col-md-5">
                        <div className="row">
                            <div className="card-rev">

                                <h1 className="title-rev">Readers Reviews</h1>
                                <div class="out-of">
                                    <div class="stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
                                    <span>{this.state.average.toFixed(2)} out of 5</span>
                                </div>
                                <p className="p">{this.state.reviews.length} readers ratings</p>
                                <div className="ratings">
                                    <div className="rating rate5">
                                    <span className="star-number">5 star</span>
                                    <div className="rating-bar">
                                        <div className="bar" data-perc
                                        ={parseInt(Math.round(this.getProc(5)))} />

                                    </div>
                                    <span className="percent">{parseInt(Math.round(this.getProc(5)))}%</span>
                                    </div>
                                    <div className="rating rate4">
                                    <span className="star-number">4 star</span>
                                    <div className="rating-bar">
                                        <div className="bar" data-perc
                                        ={Math.round(this.getProc(4))} />
                                    </div>
                                    <span className="percent">{Math.round(this.getProc(4))}%</span>
                                    </div>
                                    <div className="rating rate3">
                                    <span className="star-number">3 star</span>
                                    <div className="rating-bar">
                                        <div className="bar" data-perc
                                        ={Math.round(this.getProc(3))} />
                                    </div>
                                    <span className="percent">{Math.round(this.getProc(3))}%</span>
                                    </div>
                                    <div className="rating rate2">
                                    <span className="star-number">2 star</span>
                                    <div className="rating-bar">
                                        <div className="bar" data-perc
                                        ={Math.round(this.getProc(2))} />
                                    </div>
                                    <span className="percent">{Math.round(this.getProc(2))}%</span>
                                    </div>
                                    <div className="rating rate1">
                                    <span className="star-number">1 star</span>
                                    <div className="rating-bar">
                                        <div className="bar" data-perc
                                        ={Math.round(this.getProc(1))} />
                                    </div>
                                    <span className="percent">{Math.round(this.getProc(1))}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-7">

                        <div className="content-center">

{/*                            
                        <div className="rev-content" style={{borderRadius:'10px'}}>
                            <div className="row">
                                <div className="col-md-4">
                                            <div className="card-profile-rev">
                                                <div className="card-avatar-rev">
                                                    <img className="img-rev" src={avatar} />
                                                </div>
                                            </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="row">
                                               <div className="title">Serban Mariana</div> 
                                    </div>
                                    <div  className="row" style={{fontSize:'1.8em'}}>
                                        <StarRatingComponent 
                                                name="rate" 
                                                editing={false}
                                                starCount={5}
                                                value={3}
                                                />
                                    </div>
                                </div>
                            </div> 
                            <div className="row-rev"><h4>Foarte misto cartea</h4></div>
                            <div className="row-rev-text">
                                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                                The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
                             </div>
                             <div className="row">
                                 <div className="col-md-8">
                                 </div>
                                 <div className="col-md-4"><div className="rev-data">Reviewed on 8 April 2020</div> </div>
                             </div>
                        </div> */}

                        <Carousel itemsToShow={1}>

                            {this.state.reviews.map(item =>  


                                <div className="rev-content" style={{borderRadius:'10px'}}>
                                <div className="row">
                                    <div className="col-md-4">
                                                <div className="card-profile-rev">
                                                    <div className="card-avatar-rev">
                                                        {item.userThumbnail ? <img className="img" src={item.userThumbnail} />: <img className="img" src={avatar} />}
                                                    </div>
                                                </div>
                                    </div>
 
                                    <div className="col-md-8">
                                        <div className="row">
                                                    <div style={{marginTop:'32px'}} className="title">{item.userFullName}</div>
                                        </div>
                                        <div  className="row" style={{fontSize:'2em'}}>
                                            <StarRatingComponent 
                                                    name="rate" 
                                                    editing={false}
                                                    starCount={5}
                                                    value={item.raiting}
                                                    />
                                        </div>
                                    </div>
                                </div> 
 
                                <div className="row-rev"><h4>{item.title}</h4></div>
                                <div className="row-rev-text">
                                         {item.content}
                                 </div>
 
                                 <div className="row">
                                     <div className="col-md-7">
                                     </div>
                                     <div className="col-md-5"><div className="rev-data">Reviewed on {item.addDate.substring(0,10)}</div> </div>
                                 </div>
                            </div>

                            )}
                            </Carousel>

                            </div>
                    </div>

            </div>
        </div>
            
            
            : 
            <div>
                <div className="row">
                    <div className="col-md-8 mr-auto ml-auto">
                            {/* <img className="img-rev" src={img}></img> */}
                            <div className="anim">
                                <Animation />
                            </div>
                    </div>
                    <div className="col-md-8 mr-auto ml-auto">
                        <div>It's a little empty here...
                            <button className="bt-rev"  data-tip data-for="addRev">
                                     <IoIcons.IoIosAdd/> 
                            </button>
                            <ReactTooltip id="addRev" 
                                        place="bottom" arrowColor="#38d39f" 
                                        clickable={true} backgroundColor="linear-gradient(to right, #32be8f, #38d39f, #32be8f)" 
                                        effect="float">Goo to Add Review</ReactTooltip>
                        </div>
                    </div>
                </div>
            </div>           
        )
    }
}
