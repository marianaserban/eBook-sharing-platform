import React, { Component } from 'react'
import AuthService from "../services/auth.service";
import Navbar from './Navbar/Navbar'
import './Dashboard.css'
import logo from '../assets/logo_transparent.png'


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
