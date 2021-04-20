import React, { Component } from 'react'
import Axios from 'axios'
import AuthService from "../../services/auth.service";
import Navbar from '../Navbar/Navbar'
import './Dashboard.css'
import * as IoIcons from "react-icons/io";
import * as FcIcons from "react-icons/fc";
import * as FaIcons from 'react-icons/fa';
import * as ImIcons from "react-icons/im";
import Carousel from "react-elastic-carousel";
import * as AiIcons from "react-icons/ai";
import {Link} from "react-router-dom";
import ReactTooltip from "react-tooltip";

const API_URL = "http://localhost:8080/";




const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
];



export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.logOut = this.logOut.bind(this);

        this.state = {
            freeBooks: [],
            currentUser: AuthService.getCurrentUser(),
            sidebarOpen: false,
            currentItem:{}
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
                    <div className="free">
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
