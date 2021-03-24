import React, { Component } from 'react'
import Axios from 'axios'
import AuthService from "../../services/auth.service";
import Navbar from '../Navbar/Navbar'
import './AddBook.css'

export default class AddBook extends Component {
    render() {
        return (
            <div>
                <Navbar/>

                <div className="dash-content">

                    <div className="form-container">
                        <form className="book-form">
                            <h1>Add a book</h1>
                            
                            <div class="input-name">
                                <i class="fa fa-user lock"></i>
                                <input type="text" placeholder="Title" class="name"/>
                                <span class="last">
                                    <i class="fa fa-user lock"></i>
                                    <input type="text" placeholder="Author" class="name"/>
                                </span>
                             </div>

                             <div class="input-name">
                             {/* <i class="fa fa-user lock"></i> */}
                                <select class="country">
                                    <option>Select a genre</option>
                                    <option>Fantasy</option>
                                    <option>Sci-Fi</option>
                                    <option>Mystery</option>
                                    <option>Thriller</option>
                                    <option>Romance</option>
                                    <option>Westerns</option>
                                    {/* <option>Dystopian</option> */}
                                    <option>Conteporary</option>
                                    <option>Historical Fiction</option>
                                    <option>Biograohies and Autobiographies</option>
                                    {/* <option>Cook books</option> */}
                                    <option>History</option>

                                </select>
                                <div class="arrow">
                                </div>
                            </div>


                            <fieldset>
                                <legend>Availability</legend>
                                <input type="radio" name="radio-choice-1" id="radio-choice-1" value="choice-1" />
                                <label for="radio-choice-1" className="label-radio">
                                Free
                                <span>Everyone can view it</span>
                                </label> 
                            
                                <input type="radio" name="radio-choice-1" id="radio-choice-2" value="choice-2" />
                                <label for="radio-choice-2"  className="label-radio">
                                Private
                                <span>You choose who can view it</span>
                                </label>
                            </fieldset>

                            
                            <div className="label">Description</div>    
                            <div class="input-group">
                                <div class="input-box comm">
                                    <textarea cols="200" rows="3" placeholder="Write description's book here" class="text"/>
                                    {/* <i class="fa fa-comment"></i> */}
                                </div>
                            </div>


                             <div class="input-name">
                                <i class="fa fa-envelope email"></i>
                                <input type="file" placeholder="Book" required class="name"/>
                                <span class="last">
                                    <i class="fa fa-user lock"></i>
                                    <input type="file" placeholder="Book" required class="name"/>
                                </span>
                            </div>
                            {/* <div class="input-name"> */}
                    <input class="button" type="submit" value="Register" />
                {/* </div> */}
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
