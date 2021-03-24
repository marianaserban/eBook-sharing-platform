import React, { Component } from 'react'
import './Login.css';
import wave from '../../assets/wave.png'
import bg from '../../assets/bg.svg'
import avatar from '../../assets/avatar.svg'
import AuthService from "../../services/auth.service";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
toast.configure();
let logged=false

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            userName: "",
            password: "",
            loading: false,
            message: "",
        };
    }

    onChangeUsername(e) {
        this.setState({
            userName: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    handleLogin(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true,
        });
            AuthService.login(this.state.userName, this.state.password).then(
                () => {
                    this.props.history.push("/dashboard");
                    window.location.reload();
                    logged=true
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    this.setState({
                        loading: false,
                        message: resMessage,
                    });  
                }
            )
            if(!logged){
                toast('Invalid login, please try again!')
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
        return (
            <div>
                <img className="wave" src={wave}></img>
                <div className="container">
                    <div className="img">
                        <img src={bg}></img>
                    </div>
                    <div className="login-content">
                        <form onSubmit={this.handleLogin}ref={c => {this.form = c;}}>
                            <img src={avatar}></img>
                            <h2 className="title">Welcome</h2>
                            <div className="input-div one">
                                <div className="i">
                                    <i className="fas fa-user"></i>
                                </div>
                                <div className="div">
                                    <h5>Username</h5>
                                    <input type="text" className="input" value={this.state.userName}onChange={this.onChangeUsername} required></input>
                                </div>
                            </div>
                            <div className="input-div pass">
                                <div className="i">
                                    <i className="fas fa-lock"></i>
                                </div>
                                <div className="div">
                                    <h5>Password</h5>
                                    <input type="password" className="input" value={this.state.password} onChange={this.onChangePassword} required ></input>
                                </div>
                            </div>
                            <a href="/register" className="left">New here? Register</a>
                            {/* <a href="#" className="right">Forgot Password?</a> */}
                            <input type="submit" className="btn" value="Login"  disabled={this.state.loading}></input>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
