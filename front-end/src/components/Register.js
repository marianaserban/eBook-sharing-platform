import React, { Component } from 'react'
import axios from "axios";
import RegisterCSS from './Register.module.css'
import wave from '../assets/RegisterWave.png'
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const API_URL = "http://localhost:8080/";
toast.configure();

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this)

        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            userName: "",
            password: "",
            confirmPassword: "",
            emailError: true,
            passwordError: true,
            passwordMatchError: true
        };



    }
    onChangeUsername(e) {
        this.setState({
            userName: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        },()=>{
            this.validateField("email", e.target.value)

        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        },()=>{
            this.validateField("password", e.target.value)
        });
    }
    onChangeLastName(e) {
        this.setState({
            lastName: e.target.value
        });
    }
    onChangeConfirmPassword(e) {
        this.setState({
            confirmPassword: e.target.value
        },()=>{
            this.validateField("confirmPassword", e.target.value)
        });
    }
    onChangeFirstName(e) {
        this.setState({
            firstName: e.target.value
        });
    }
    

    validateField = (fieldName, value) => {
        switch (fieldName) {
            case 'email':
                if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(value)) {
                    this.setState({ emailError: false })
                } else {
                    this.setState({ emailError: true })
                }
                break;
            case 'password':
                if (value.length >= 6) {
                    this.setState({ passwordError: false })
                } else {
                    this.setState({ passwordError: true })
                }
                break;
            case 'confirmPassword':
                // console.log(typeof value, typeof pass, value, pass)
                if (value === this.state.password) {
                    this.setState({ passwordMatchError: false })
                } else {
                    this.setState({ passwordMatchError: true })
                }
                break;
            default:
                break;
        }
    }

    handleRegister(e) {
        e.preventDefault();
      
        if(!this.state.emailError&& !this.state.passwordError && !this.state.passwordMatchError){
            const user = {
                userName:this.state.userName,
                password:this.state.password,
                firstName:this.state.firstName,
                lastName:this.state.lastName,
                email:this.state.email
              }
            axios.post(`${API_URL}signup`, JSON.stringify(user),
            {
              headers: { "Content-Type": "application/json" }
            })
            .then((res) => {
              toast(res.data.message);
              this.props.history.push(`/`)
            })
            .catch(error => {
              if (error.response !== undefined) {
                toast(error.response.data.message)
              }
            });
            
        }else{
            if(this.state.emailError){
                toast("Incorect email")
            }
            if(this.state.passwordError){
                toast("Password must have at least 6 characters")
            }
            if(this.state.passwordMatchError){
                toast("Your password and confirmation password do not match")
            }
        }
    }

render() {
    return (
        <div>
            <img className={RegisterCSS.wave} src={wave}></img>
            {/* <div className={RegisterCSS.img_container}>
                    <div className={RegisterCSS.img}>
                        <img src={bgReg}></img>
                    </div>
                </div> */}
            <div className={RegisterCSS.container}>
                <div className={RegisterCSS.title}>Registration</div>
                <div className={RegisterCSS.content}>
                    <form onSubmit={this.handleRegister} ref={c => { this.form = c; }}>
                        <div className={RegisterCSS.user_details}>
                            <div className={RegisterCSS.input_box}>
                                <span className={RegisterCSS.details} >First Name</span>
                                <input type="text" placeholder="Enter your first name" value={this.state.firstName} onChange={this.onChangeFirstName} required></input>
                            </div>
                            <div className={RegisterCSS.input_box}>
                                <span className={RegisterCSS.details} >Last Name</span>
                                <input type="text" placeholder="Enter your last name" value={this.state.lastName} onChange={this.onChangeLastName} required></input>
                            </div>
                            <div className={RegisterCSS.input_box}>
                                <span className={RegisterCSS.details} >Email</span>
                                <input type="email" placeholder="Enter your email"value={this.state.email} onChange={this.onChangeEmail} required></input>
                            </div>
                            <div className={RegisterCSS.input_box}>
                                <span className={RegisterCSS.details} >Username</span>
                                <input type="text" placeholder="Enter your username" value={this.state.userName} onChange={this.onChangeUsername} required></input>
                            </div>
                            <div className={RegisterCSS.input_box}>
                                <span className={RegisterCSS.details}>Password</span>
                                <input type="password" placeholder="Enter your password" required  value={this.state.password} onChange={this.onChangePassword}></input>
                            </div>
                            <div className={RegisterCSS.input_box}>
                                <span className={RegisterCSS.details} >Confirm Password</span>
                                <input type="password" placeholder="Confirm Password" value={this.state.confirmPassword} onChange={this.onChangeConfirmPassword} required></input>
                            </div>
                        </div>
                        {/* <div className={RegisterCSS.gender_details}>
                                <input type="radio" name="gender" id="dot-1"/>
                                <input type="radio" name="gender" id="dot-2"/>
                                <input type="radio" name="gender" id="dot-3"/>
                                <span className={RegisterCSS.gender_title}>Gender</span>
                                    <div className={RegisterCSS.category}>
                                        <label for="dot-1">
                                        <span className="dot one"></span>
                                        <input type="radio"></input>
                                        <span className="gender">Male</span>
                                    </label>
                                    <label for="dot-2">
                                        <span className="dot two"></span>
                                        <span className="gender">Female</span>
                                    </label>
                                    <label for="dot-3">
                                        <span className="dot three"></span>
                                        <span className="gender">Prefer not to say</span>
                                        </label>
                                    </div>
                            </div> */}
                        <div className={RegisterCSS.button}>
                            <input type="submit" value="Register"></input>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}
}
