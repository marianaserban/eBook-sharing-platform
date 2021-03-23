import React, { Component } from 'react'
import AuthService from "../services/auth.service";
import Navbar from './Navbar/Navbar'
import './Dashboard.css'
import * as IoIcons from "react-icons/io";
import * as FcIcons from "react-icons/fc";
import * as FaIcons from 'react-icons/fa';
import * as ImIcons from "react-icons/im";
import Carousel from "react-elastic-carousel";
import * as AiIcons from "react-icons/ai";

// import { Carousel } from 'react-responsive-carousel';
import img from '../assets/silent_patient.jpg'

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
            currentUser: AuthService.getCurrentUser(),
            sidebarOpen:false
        };
    }
    logOut() {
        AuthService.logout();
        this.props.history.push('/')
    }
    

    render() {
        const { currentUser } = this.state;

        return (
            <div>
            <Navbar/> 
                <div className="dash-content">
                    <div className="free">
                        <div className="book-logo">
                            <IoIcons.IoIosBook/>Free Books

                            <Carousel breakPoints={breakPoints}>
                                {/* Aici facem cu map cred */}
                                {/* <Item>One</Item>
                                <Item>Two</Item>
                                <Item>Three</Item>
                                <Item>Four</Item>
                                <Item>Five</Item>
                                <Item>Six</Item>
                                <Item>Seven</Item>
                                <Item>Eight</Item> */}
                                <div className="item">
                                    <div className="item-content">
                                        <div className="imagine">
                                            <img classname="img" src={img}></img>
                                        </div>
                                        <div className="book-detail">
                                            <div className="title">Silent patient</div>
                                            <div className="author">Alex Michaelides</div>
                                            <div className="raiting">
                                                <AiIcons.AiFillStar/>4.3
                                            </div>
                                            <div className="sum">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived </div>
                                            {/* <button className="button">More</button> */}
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className="item">Two</div>
                                <div className="item">Three</div>
                                <div className="item">For</div>
                                <div className="item">Five</div>
                                <div className="item">Six</div>
                                <div className="item">Seven</div>
                                <div className="item">Eight</div>
                            </Carousel>

                        </div>
                    </div>

                    <div className="raiting">
                        <div className="book-logo">
                            <FcIcons.FcLike/>The most apreciated
                        </div>
                    </div>

                    <div className="history">
                        <div className="book-logo">
                            <FaIcons.FaHistory/>Recent opened
                        </div>
                    </div>


                    <div className="stats">
                        <div className="book-logo">
                            <ImIcons.ImStatsDots/>Stats
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
