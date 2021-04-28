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
import {Link} from "react-router-dom";
import ReactTooltip from "react-tooltip";
import Chart from "react-apexcharts";
import LineChart from './LineChart'
const API_URL = "http://localhost:8080/";

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1300, itemsToShow: 4 },
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
            series: [44, 55, 20, 43, 22,34,56,22,65,23,45,56],
            options: {
              chart: {
                width: 680,
                type: 'pie',
             
            },
              labels: ['Arts and Photography', 'Biographies and Memoirs', 'Business and Money', 'Computers and Technology', 'Education and Teaching','Cookbooks, Food and Wine','History','Literature and Fiction','Mystery, Thriller and Suspense','Religion and Spirituality','Romance','Science and Math'],
              colors:['#26c6da', '#43a047', '#d81b60','#fb8c00','#f44336','#38d39f','#565472','#474157','#694382','#23547b','#256029','#F44336'],
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 400
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
              }]
            },
        };
    }

    logOut() {
        AuthService.logout();
        this.props.history.push('/')
    }

    componentDidMount = () => {
        Axios.get(API_URL + 'books').then(
            res => {
                this.setState({ freeBooks: res.data});
                console.log('books', this.state.freeBooks)
            }
        )
    }


    render() {
        // const { currentUser } = this.state.currentUser;
        const { items } = this.state.freeBooks;

        return (
            <div>
                <Navbar />
                <div className="dash-content">
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
                                        <p style={{color:'#474157', fontSize:'0.7em'}}  className="card-category">11 Users</p>
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
                                        <p style={{color:'#474157', fontSize:'0.7em'}}  className="card-category">37 Uploads</p>
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
                                        <p style={{color:'#474157', fontSize:'0.7em'}}  className="card-category">103 Reviews</p>
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
                                        <p style={{color:'#474157', fontSize:'0.7em'}}  className="card-category">12 Book genres</p>
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
                                                    <AiIcons.AiFillStar/>4.3
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

           
                        </div>
                    </div>

                    <div className="history">
                        <div className="book-logo">
                            <FaIcons.FaHistory />Recent opened
                        </div>
                    </div>


                    <div className="stats">
                        <div className="book-logo">
                            <ImIcons.ImStatsDots />Stats
                        </div>
                        <div className="row" style={{marginTop:'-1em'}}>
                        <div className="col-md-7">
                            <div className="card">
                            <Chart options={this.state.options} series={this.state.series} type="pie" width={680}/>
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
