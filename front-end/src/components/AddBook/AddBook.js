import React, { Component } from 'react'
import Axios from 'axios'
import AuthService from "../../services/auth.service";
import Navbar from '../Navbar/Navbar'
import './AddBook.css'
import * as IoIcons from "react-icons/io";
// import { verifyToken } from '../../../../back-end/services/authJWT';
const API_URL = "http://localhost:8080/";


export default class AddBook extends Component {
    constructor(props){
        super(props)

        this.state={
            currentUser: AuthService.getCurrentUser(),
            book:{
                title:'',
                author:'',
                genre:'',
                availability:'',
                description:'',
                path:'',
                picture:'' 
            }
        }
    }
    handleChange = (e) => {
        e.preventDefault();
        let newBook = this.state.book;
        newBook[e.target.name] = e.target.value;
        this.setState({ book: newBook });
    };
    handleSubmit = (e) => {
        console.log(this.state.book)
        e.preventDefault();

        // Axios.post(API_URL + "upload", this.state.book,
        // { headers: { 'Content-Type': 'application/json'} }).then(res => {
        //     // var existingReviews = [...this.state.reviews];
        //     // existingReviews.push(res.data);
        //     // console.log(res.data);
        //     // this.setState({ reviews: existingReviews });
        //     alert('inserat in bd')
        // })

        Axios.post(`${API_URL}upload`, JSON.stringify(this.state.book),
        {
          headers: { "Content-Type": "application/json" }
        })
        .then((res) => {
        //   toast(res.data.message);
          alert('inserat')
        })
        .catch(error => {
          if (error.response !== undefined) {
            console.log(error.response.data.message)
          }
        });


    };
    render() {
        return (
            <div className="add-book">
                <Navbar />

                <div className="dash-content">

                    <div className="form-container">
                        <form className="book-form" onSubmit={this.handleSubmit}>
                            <h1>Add a book</h1>

                            <div class="input-name">
                                <i className="lock"><IoIcons.IoIosBook /></i>
                                <input type="text" placeholder="Title" class="name" name="title" required onChange={this.handleChange}/>
                                <span class="last">
                                    <i class="fa fa-user lock"></i>
                                    <input type="text" placeholder="Author" class="name" name="author"required onChange={this.handleChange}/>
                                </span>
                            </div>

                            <div class="input-name">
                                <select class="genre" name="genre" required onChange={this.handleChange}>
                                    <option>Select a genre</option>
                                    <option>Fantasy</option>
                                    <option>Sci-Fi</option>
                                    <option>Mystery</option>
                                    <option>Thriller</option>
                                    <option>Romance</option>
                                    <option>Westerns</option>
                                    <option>Dystopian</option>
                                    <option>Conteporary</option>
                                    <option>Historical Fiction</option>
                                    <option>Biograohies and Autobiographies</option>
                                    <option>Cook books</option>
                                    <option>History</option>
                                </select>
                                <div class="arrow">
                                </div>
                            </div>

                            <div className="label">Availability</div>
                            <fieldset required>
                                <input type="radio" name="availability" id="radio-choice-1" value="1"  onChange={this.handleChange}/>
                                <label for="radio-choice-1" className="label-radio">
                                    Public
                                <span>Everyone can view it</span>
                                </label>

                                <input type="radio" name="availability" id="radio-choice-2" value="0" onChange={this.handleChange}/>
                                <label for="radio-choice-2" className="label-radio">
                                    Private
                                <span>You choose who can view it</span>
                                </label>
                            </fieldset>


                            <div className="label">Description</div>
                            <div class="input-group">
                                <div class="input-box comm">
                                    <textarea cols="200" rows="3" name="description" placeholder="Write description's book here" class="text" required onChange={this.handleChange}/>
                                </div>
                            </div>

                            <div className="input-labels">
                                <div className="book">Add book (*.pdf)</div>
                                <div className="picture">Add photo (*.png, *.jpg)</div>
                            </div>

                            <div class="input-name">
                                <i class="fa fa-book lock"></i>
                                <input type="file" placeholder="Book" name="path" required class="name" onChange={this.handleChange}/>
                                <span class="last">
                                    <i class="fa fa-picture-o lock"></i>
                                    <input type="file" placeholder="Book" name="picture" required class="name" onChange={this.handleChange}/>
                                </span>
                            </div>
                            <input class="button" type="submit" value="Add book"/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
