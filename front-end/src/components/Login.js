import React, { Component } from 'react'
import './Login.css';
import wave from '../assets/wave.png'
import bg from '../assets/bg.svg'
import avatar from '../assets/avatar.svg'

export default class Login extends Component {

    componentDidMount() {
        const inputs = document.querySelectorAll(".input");

        function addcl() {
            let parent = this.parentNode.parentNode;
            parent.classList.add("focus");
        }

        function remcl() {
            let parent = this.parentNode.parentNode;
            if (this.value == "") {
                parent.classList.remove("focus");
            }
        }

        inputs.forEach(input => {
            input.addEventListener("focus", addcl);
            input.addEventListener("blur", remcl);
        });

        const script = document.createElement("script");
        script.src = "https://kit.fontawesome.com/a81368914c.js";
        script.async = true;      
        document.body.appendChild(script);

    }

    render() {
        return (
            <div>
                <img className="wave" src={wave}></img>
                <div className="container">
                    <div className="img">
                        <img src={bg}></img>
                    </div>
                    <div className="login-content">
                        <form>
                            <img src={avatar}></img>
                            <h2 className="title">Welcome</h2>
                            <div className="input-div one">
                                <div className="i">
                                    <i className="fas fa-user"></i>
                                </div>
                                <div className="div">
                                    <h5>Username</h5>
                                    <input type="text" className="input"></input>
                                </div>
                            </div>
                            <div className="input-div pass">
                                <div className="i">
                                    <i className="fas fa-lock"></i>
                                </div>
                                <div className="div">
                                    <h5>Password</h5>
                                    <input type="password" className="input"></input>
                                </div>
                            </div>
                            <a href="/register" className="left">New here? Register</a>
                            {/* <a href="#" className="right">Forgot Password?</a> */}
                            <input type="submit" className="btn" value="Login"></input>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
