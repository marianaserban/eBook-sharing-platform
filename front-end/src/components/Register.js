import React, { Component } from 'react'
import RegisterCSS from './Register.module.css'
import wave from '../assets/RegisterWave.png'

export default class Register extends Component {
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
                        <form>
                            <div className={RegisterCSS.user_details}>
                                <div className={RegisterCSS.input_box}>
                                    <span className={RegisterCSS.details}>First Name</span>
                                    <input type="text" placeholder="Enter your first name"required></input>
                                </div>
                                <div className={RegisterCSS.input_box}>
                                    <span className={RegisterCSS.details}>Last Name</span>
                                    <input type="text" placeholder="Enter your last name"required></input>
                                </div>
                                <div className={RegisterCSS.input_box}>
                                    <span className={RegisterCSS.details}>Email</span>
                                    <input type="email" placeholder="Enter your email" required></input>
                                </div>
                                <div className={RegisterCSS.input_box}>
                                    <span className={RegisterCSS.details}>Username</span>
                                    <input type="text" placeholder="Enter your username" required></input>
                                </div>
                                <div className={RegisterCSS.input_box}>
                                    <span className={RegisterCSS.details}>Password</span>
                                    <input type="password" placeholder="Enter your password" required></input>
                                </div>
                                <div className={RegisterCSS.input_box}>
                                    <span className={RegisterCSS.details}>Confirm Password</span>
                                    <input type="password" placeholder="Confirm Password" required></input>
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
