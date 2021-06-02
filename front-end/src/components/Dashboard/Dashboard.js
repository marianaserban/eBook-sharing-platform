import React, { Component } from 'react'
import Axios from 'axios'
import AuthService from "../../services/auth.service";
import Navbar from '../Navbar/Navbar'
import './Dashboard.css'
import * as IoIcons from "react-icons/io";
import * as FcIcons from "react-icons/fc";
import * as FaIcons from 'react-icons/fa';
import * as ImIcons from "react-icons/im";
import * as BsIcons from "react-icons/bs";
import Carousel from "react-elastic-carousel";
import * as AiIcons from "react-icons/ai";
import ReactTooltip from "react-tooltip";
import LineChart from './LineChart'
import PieChart from './PieChart';
import Footer from '../Footer/Footer'

const API_URL = "http://localhost:8080/";
const recommendations=require('../../services/lib/cf_api')

const breakPoints = [
    // { width: 1, itemsToShow: 1 },
    // { width: 550, itemsToShow: 2 },
    // { width: 768, itemsToShow: 3 },
    // { width: 1300, itemsToShow: 4 },


    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 }
];

export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.logOut = this.logOut.bind(this);

        this.state = {
            freeBooks: [],
            currentUser: AuthService.getCurrentUser(),
            sidebarOpen: false,
            currentItem:{},
            allUsers:[],
            allBooks:[],
            allReviews:[],
            rec:[],
            theMostApreciated:[],

            series:[],
            stats:{}
        };
    }

    logOut() {
        AuthService.logout();
        this.props.history.push('/')
    }

    componentDidMount = () => {
        Axios.get(API_URL + 'theMostApreciated').then(
            res => {               
                this.setState({ theMostApreciated: res.data});
            }
          )
          Axios.get(API_URL + 'stats').then(
            res => {               
                this.setState({ stats: res.data});
            }
          )
        Axios.get(API_URL + 'books').then(
            res => {
                this.setState({ freeBooks: res.data});
            }
        )
         Axios.get(API_URL + 'getAllReviews').then(
            res => {
                this.setState({ allReviews: res.data});
            }
        )
        Axios.get(API_URL + 'users').then(
            res => {
                this.setState({ allUsers: res.data});
            }
        )

        Axios.get(API_URL + 'getAllBooks').then(
            res => {
                this.setState({ allBooks: res.data});
            }
        )

        Axios.get(API_URL + 'noOfGenres').then(
            res => {
                let arr=[]
                for(let i=0;i< res.data.length;i++){
                    arr.push(parseInt(res.data[i]))
                }
                this.setState({ series: arr});
            }
          )
        
         
        setTimeout(this.rec, 1000);
    }

    rec=()=>{
        let ratings=[]
        for(let i=0;i < this.state.allUsers.length;i++){
            let arr=[]
           for(let j=0;j< this.state.allBooks.length;j++){
            if (this.state.allReviews.filter(e => e.bookId === this.state.allBooks[j].id && e.userId===this.state.allUsers[i].id).length > 0) {
                arr.push(1)
            }else{
                arr.push(0)
            }
           }
           ratings.push(arr)
        }
        let index;
        for(let i=0; i<this.state.allUsers.length;i++){
            if(this.state.allUsers[i].id===this.state.currentUser.id){
                index=i;
            }
        }
        const a = recommendations.cFilter(ratings, index);
        let copy=[]
        for(let i=0; i< a.length; i++){
            copy.push(this.state.allBooks[a[i]])
        }
        this.setState({ rec: copy});
    }

    render() {
        // const { currentUser } = this.state.currentUser;
        const { items } = this.state.freeBooks;

        return (
            <div>
                <Navbar />
                <div className="dash-content">

                    {/* <button onClick={this.rec}>VEzi rec</button> */}
                    
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="card card-stats">
                                <div style={{color:'#fff',fontSize:'2em'}} className="card-header card-header-warning card-header-icon">
                                    <div className="card-icon">
                                        <i class="material-icons">
                                            <AiIcons.AiOutlineUserAdd />
                                        </i>
                                    </div>
                               
                                    <div style={{marginTop:'0.5em',padding:'0.5em'}}>
                                        <p style={{color:'#333333', fontSize:'0.7em'}}  className="card-category">{this.state.stats.noOfUsers} Users</p>
                                    </div>
                                </div>
                             </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="card card-stats">
                                <div style={{color:'#fff',fontSize:'2em'}} className="card-header card-header-rose card-header-icon">
                                    <div className="card-icon">
                                        <i class="material-icons">
                                            <IoIcons.IoIosBook />
                                        </i>
                                    </div>
                               
                                    <div style={{marginTop:'0.5em',padding:'0.5em'}}>
                                        <p style={{color:'#333333', fontSize:'0.7em'}}  className="card-category">{this.state.stats.noOfUploads} Uploads</p>
                                    </div>
                                </div>
                             </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="card card-stats">
                                <div style={{color:'#fff',fontSize:'2em'}} className="card-header card-header-success card-header-icon">
                                    <div className="card-icon">
                                        <i class="material-icons">
                                            <AiIcons.AiFillStar />
                                        </i>
                                    </div>
                               
                                    <div style={{marginTop:'0.5em',padding:'0.5em'}}>
                                        <p style={{color:'#333333', fontSize:'0.7em'}}  className="card-category">{this.state.stats.noOfReviews} Reviews</p>
                                    </div>
                                </div>
                             </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="card card-stats">
                                <div style={{color:'#fff',fontSize:'2em'}} className="card-header card-header-info card-header-icon">
                                    <div className="card-icon">
                                        <i class="material-icons">
                                            <BsIcons.BsBookmarksFill />
                                        </i>
                                    </div>
                               
                                    <div style={{marginTop:'0.5em',padding:'0.5em'}}>
                                        <p style={{color:'#333333', fontSize:'0.7em'}}  className="card-category">12 Book genres</p>
                                    </div>
                                </div>
                             </div>
                        </div>
                    </div>

                    <div className="free" style={{marginTop:'-1em'}}>
                        <div className="book-logo">
                            <IoIcons.IoIosBook />Free Books

                            <Carousel breakPoints={breakPoints}>

                            {this.state.freeBooks.map(item => 
                                <div className="item" data-tip data-for="seeMoreTip" onClick={()=>{ this.props.history.push({
                                    pathname: "/bookDetail",
                                    state: {item:item}
                                  })}}>
                                        <div className="item-content">
                                            <div className="imagine">
                                                <img classname="img" src={item.picture}></img>
                                            </div>
                                            <div className="book-detail">
                                                <div className="title">{item.title}</div>
                                                <div className="author">{item.author}</div>
                                                <div className="raiting">
                                                    <AiIcons.AiFillStar/>{item.rating.toFixed(2)}
                                                </div>
                                                <div className="sum">{item.description.substring(0,300)}...</div>
                                            </div>
                                        </div>
                                        <ReactTooltip id="seeMoreTip" 
                                        place="bottom" arrowColor="#38d39f" 
                                        clickable={true} backgroundColor="linear-gradient(to right, #32be8f, #38d39f, #32be8f)" 
                                        effect="float">See more</ReactTooltip>
                                </div>
                            )}
                            </Carousel>

                        </div>
                    </div>

                
                    <div className="raiting">
                        <div className="book-logo">
                            <FcIcons.FcLike />The most apreciated
                            <Carousel breakPoints={breakPoints}>

                            {this.state.theMostApreciated.map(item => 
                                <div className="item" data-tip data-for="seeMoreTip" onClick={()=>{ this.props.history.push({
                                    pathname: "/bookDetail",
                                    state: {item:item}
                                  })}}>
                                        <div className="item-content">
                                            <div className="imagine">
                                                <img classname="img" src={item.picture}></img>
                                            </div>
                                            <div className="book-detail">
                                                <div className="title">{item.title}</div>
                                                <div className="author">{item.author}</div>
                                                <div className="raiting">
                                                    <AiIcons.AiFillStar/>{item.rating.toFixed(2)}
                                                </div>
                                                <div className="sum">{item.description.substring(0,300)}...</div>
                                            </div>
                                        </div>
                                        <ReactTooltip id="seeMoreTip" 
                                        place="bottom" arrowColor="#38d39f" 
                                        clickable={true} backgroundColor="linear-gradient(to right, #32be8f, #38d39f, #32be8f)" 
                                        effect="float">See more</ReactTooltip>
                                </div>
                            )}
                            </Carousel>

           
                        </div>
                    </div>

                    {this.state.rec.length > 2 ? 
                                
                    <div className="history">
                        <div className="book-logo">
                            <FaIcons.FaHistory />Inspired by users with same interests
                            <Carousel breakPoints={breakPoints}>

                            {this.state.rec.map(item => 
                                <div className="item" data-tip data-for="seeMoreTip" onClick={()=>{ this.props.history.push({
                                    pathname: "/bookDetail",
                                    state: {item:item}
                                  })}}>
                                        <div className="item-content">
                                            <div className="imagine">
                                                <img classname="img" src={item.picture}></img>
                                            </div>
                                            <div className="book-detail">
                                                <div className="title">{item.title}</div>
                                                <div className="author">{item.author}</div>
                                                <div className="raiting">
                                                    <AiIcons.AiFillStar/>{item.rating.toFixed(2)}
                                                </div>
                                                <div className="sum">{item.description.substring(0,300)}...</div>
                                            </div>
                                        </div>
                                        <ReactTooltip id="seeMoreTip" 
                                        place="bottom" arrowColor="#38d39f" 
                                        clickable={true} backgroundColor="linear-gradient(to right, #32be8f, #38d39f, #32be8f)" 
                                        effect="float">See more</ReactTooltip>
                                </div>
                            )}
                            </Carousel>

                        </div>
                    </div>
                                
                    : <div></div>}

                
                    <div className="stats">
                        <div className="book-logo">
                            <ImIcons.ImStatsDots />Stats
                        </div>
                        <div className="row" style={{marginTop:'-1em'}}>
                            <div className="col-md-7">
                                <div className="card">
                            
                                <PieChart/>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="card">
                                    <LineChart/>
                                </div>
                            </div>
                    </div>
                </div>
                </div>

    
                <div className="footer">
                <Footer/>
                </div>
                
                {/* Dashboard
                <p>{currentUser.role}</p>
                <p>{currentUser.userName}</p>
                <p>{currentUser.accessToken.substring(0, 20)} ...{" "}</p>
                <p>{currentUser.accessToken.substr(currentUser.accessToken.length - 20)}</p>
                <p>{currentUser.id}</p>
                <p>{currentUser.email}</p>
                <button onClick={this.logOut}>Logout</button> */}
            </div>
        )
    }
}
