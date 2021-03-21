import React, { Component } from 'react'
import './Login.css';
import wave from '../assets/wave.png'
import bg from '../assets/bg.svg'
import avatar from '../assets/avatar.svg'

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { connect } from "react-redux";
import { login } from "../actions/auth";
import { Redirect } from 'react-router';

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            userName: "",
            password: "",
            loading: false,
        };
    }

    onChangeUsername(e) {
        this.setState({
            userName: e.target.value,
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value,
        });
    }

    handleLogin(e) {
        e.preventDefault();

        this.setState({
            loading: true,
        });

        this.form.validateAll();

        const { dispatch, history } = this.props;

        if (this.checkBtn.context._errors.length === 0) {
            dispatch(login(this.state.userName, this.state.password))
                .then(() => {
                    history.push("/dashboard");
                    window.location.reload();
                })
                .catch(() => {
                    this.setState({
                        loading: false
                    });
                });
        } else {
            this.setState({
                loading: false,
            });
        }

    }

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

        const { isLoggedIn, message } = this.props;

        if (isLoggedIn) {
            return <Redirect to="/dashboard" />;
        }

        return (
            <div>
                <img className="wave" src={wave}></img>
                <div className="container">
                    <div className="img">
                        <img src={bg}></img>
                    </div>
                    <div className="login-content">
                        <form onSubmit={this.handleLogin} ref={(c) => { this.form = c }}>
                            <img src={avatar}></img>
                            <h2 className="title">Welcome</h2>
                            <div className="input-div one">
                                <div className="i">
                                    <i className="fas fa-user"></i>
                                </div>
                                <div className="div">
                                    <h5>Username</h5>
                                    <input type="text" className="input" value={this.state.userName} onChange={this.onChangeUsername} validations={[required]}></input>
                                </div>
                            </div>
                            <div className="input-div pass">
                                <div className="i">
                                    <i className="fas fa-lock"></i>
                                </div>
                                <div className="div">
                                    <h5>Password</h5>
                                    <input type="password" className="input" value={this.state.password} onChange={this.onChangePassword} validations={[required]}></input>
                                </div>
                            </div>
                            <a href="/register" className="left">New here? Register</a>
                            {/* <a href="#" className="right">Forgot Password?</a> */}
                            <input type="submit" className="btn" value="Login" disabled={this.state.loading}></input>

                            {this.state.loading && (<span className="spinner-border spinner-border-sm"></span>)}

                            {message && (
                                <div className="form-group">
                                    <div className="alert alert-danger" role="alert">
                                        {message}
                                    </div>
                                </div>
                            )}
                            <CheckButton
                                style={{ display: "none" }}
                                ref={(c) => {
                                    this.checkBtn = c;
                                }}
                            />

                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    const { isLoggedIn } = state.auth;
    const { message } = state.message;
    return {
      isLoggedIn,
      message
    }
}
export default connect(mapStateToProps)(Login);
