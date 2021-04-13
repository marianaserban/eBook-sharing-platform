import React, { Component } from 'react'
import * as IoIcons from "react-icons/io";
import './Reviews.css'
import Animation from './Animation'
import avatar from '../../assets/avatar.svg'
import StarRatingComponent from 'react-star-rating-component';
import Carousel from "react-elastic-carousel";

export default class Reviews extends Component {

    constructor(props){

        super(props);
        this.state = {
            reviews:[
                {
                    username: 'Mariana Serban',
                    rate:2,
                    title:'Foarte misto',
                    content:'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
                    date:'8 April 2020'

                },
                {
                    username: 'Ioana Popa',
                    rate:4 ,
                    title:'',
                    content:'',
                    date:'30 December 2020'

                },

                {
                    username: 'Buica Alexandra',
                    rate:5 ,
                    title:'Top',
                    content:'a pield. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested',
                    date:'30 December 2020'

                },

            ]
        }

    }
    componentDidMount(){
        const ratingBars = document.querySelectorAll(".bar")
        ratingBars.forEach(e => {
            e.style.width = `${e.dataset.perc}%`
        })
    }
    render() {
        return (
           // daca nu avem review-uri
            // <div>
            //     <div className="row">
            //         <div className="col-md-8 mr-auto ml-auto">
            //                 {/* <img className="img-rev" src={img}></img> */}
            //                 <div className="anim">
            //                     <Animation />
            //                 </div>
            //         </div>
            //         <div className="col-md-8 mr-auto ml-auto">
            //             <div>It's a little empty here...
            //                 <button className="bt-rev" onClick={()=>{alert('a')}}>
            //                          <IoIcons.IoIosAdd/> 
            //                 </button>
            //             </div>
            //         </div>
            //     </div>
            // </div>

            //daca avem
            <div>
                <div className="row">
                        
                        <div className="col-md-5">
                            <div className="row">
                                <div className="card-rev">

                                    <h1 className="title-rev">Readers Reviews</h1>
                                    <div class="out-of">
                                        <div class="stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
                                        <span>4.7 out of 5</span>
                                    </div>
                                    <p className="p">40 readers ratings</p>
                                    <div className="ratings">
                                        <div className="rating rate5">
                                        <span className="star-number">5 star</span>
                                        <div className="rating-bar">
                                            <div className="bar" data-perc={84} />
                                        </div>
                                        <span className="percent">84%</span>
                                        </div>
                                        <div className="rating rate4">
                                        <span className="star-number">4 star</span>
                                        <div className="rating-bar">
                                            <div className="bar" data-perc={9} />
                                        </div>
                                        <span className="percent">9%</span>
                                        </div>
                                        <div className="rating rate3">
                                        <span className="star-number">3 star</span>
                                        <div className="rating-bar">
                                            <div className="bar" data-perc={4} />
                                        </div>
                                        <span className="percent">4%</span>
                                        </div>
                                        <div className="rating rate2">
                                        <span className="star-number">2 star</span>
                                        <div className="rating-bar">
                                            <div className="bar" data-perc={2} />
                                        </div>
                                        <span className="percent">2%</span>
                                        </div>
                                        <div className="rating rate1">
                                        <span className="star-number">1 star</span>
                                        <div className="rating-bar">
                                            <div className="bar" data-perc={1} />
                                        </div>
                                        <span className="percent">1%</span>
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
                                                           <img className="img" src={avatar} />
                                                       </div>
                                                   </div>
                                       </div>
   
                                       <div className="col-md-8">
                                           <div className="row">
                                                       <div className="title">{item.username}</div>
                                           </div>
                                           <div  className="row" style={{fontSize:'1.8em'}}>
                                               <StarRatingComponent 
                                                       name="rate" 
                                                       editing={false}
                                                       starCount={5}
                                                       value={item.rate}
                                                       />
                                           </div>
                                       </div>
                                   </div> 
   
                                   <div className="row-rev"><h4>{item.title}</h4></div>
                                   <div className="row-rev-text">
                                            {item.content}
                                    </div>
   
                                    <div className="row">
                                        <div className="col-md-6">
                                        </div>
                                        <div className="col-md-6"><div className="rev-data">Reviewed on {item.date}</div> </div>
                                    </div>
                               </div>

                                )}
                                </Carousel>

                                </div>
                        </div>

                </div>
            </div>
        )
    }
}
