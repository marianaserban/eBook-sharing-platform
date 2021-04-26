import React, { Component } from 'react'
import Axios from 'axios'
import AuthService from "../../services/auth.service";
import Navbar from '../Navbar/Navbar'
import swal from 'sweetalert';
import './AddBook.css'
import * as IoIcons from "react-icons/io";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const API_URL = "http://localhost:8080/";
toast.configure();

export default class AddBook extends Component {
    constructor(props){
        super(props)

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeAuthor = this.onChangeAuthor.bind(this);
        this.onChangeGenre = this.onChangeGenre.bind(this);
        this.onChangeAvailability = this.onChangeAvailability.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePath = this.onChangePath.bind(this)
        this.onChangePicture = this.onChangePicture.bind(this)

        this.state={
            currentUser: AuthService.getCurrentUser(),
            title:'',
            author:'',
            genre:'',
            availability:'',
            description:'',
            path:'',
            picture:'' ,
            isOpen:false,
            isValid:false,
        }
    }
    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onChangeAuthor(e) {
        this.setState({
            author: e.target.value
        });
    }

    onChangeGenre(e) {
        this.setState({
            genre: e.target.value
        });
    }

    onChangeAvailability(e) {
        this.setState({
            availability: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangePath(e) {
        this.setState({
            path: e.target.files[0]
        });
        console.log(e.target.files[0])

    }

    onChangePicture(e) {
        this.setState({
            picture: e.target.files[0]
        });
        console.log(e.target.files[0])

    }

    handleSubmit = (e) => {
        e.preventDefault();
        const data=new FormData()
        data.append("title",this.state.title)
        data.append("author", this.state.author)
        data.append("genre", this.state.genre)
        data.append("availability",this.state.availability)
        data.append("description",this.state.description)
        data.append("path",this.state.path)
        data.append("picture",this.state.picture)

        Axios.post(`${API_URL}upload/${this.state.currentUser.id}`,data,
        {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then((res) => {
            document.getElementById("add-book").reset();
            swal("Good job!", "Your book has been uploaded successfully!", "success")


           //return false;
          // toast('Your book has been uploaded!')
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
                        <form id="add-book"className="book-form" onSubmit={this.handleSubmit} enctype="multipart/form-data">
                            <h1>Add a book</h1>

                            <div class="input-name">
                                <i className="lock"><IoIcons.IoIosBook /></i>
                                <input type="text" placeholder="Title" class="name" name="title" required onChange={this.onChangeTitle}/>
                                <span class="last">
                                    <i class="fa fa-user lock"></i>
                                    <input type="text" placeholder="Author" class="name" name="author"required onChange={this.onChangeAuthor}/>
                                </span>
                            </div>

                            <div class="input-name">
                                <select class="genre" name="genre" required onChange={this.onChangeGenre}>
                                    <option>Select a genre</option>
                                    <option>Arts and Photography</option>
                                    <option>Biographies and Memoirs</option>
                                    <option>Business and Money</option>
                                    <option>Computers and Technology</option>
                                    <option>Education and Teaching</option>
                                    <option>Cookbooks, Food and Wine</option>
                                    <option>History</option>
                                    <option>Literature and Fiction</option>
                                    <option>Mystery, Thriller and Suspense</option>
                                    <option>Religion and Spirituality</option>
                                    <option>Romance</option>
                                    <option>Science and Math</option>
                                </select>
                                <div class="arrow">
                                </div>
                            </div>

                            <div className="label">Availability</div>
                            <fieldset required>
                                <input type="radio" name="availability" id="radio-choice-1" value="1"  onChange={this.onChangeAvailability}/>
                                <label for="radio-choice-1" className="label-radio">
                                    Public
                                <span>Everyone can view it</span>
                                </label>

                                <input type="radio" name="availability" id="radio-choice-2" value="0" onChange={this.onChangeAvailability}/>
                                <label for="radio-choice-2" className="label-radio">
                                    Private
                                <span>You choose who can view it</span>
                                </label>
                            </fieldset>


                            <div className="label">Description</div>
                            <div class="input-group">
                                <div class="input-box comm">
                                    <textarea cols="200" rows="3" name="description" placeholder="Write description's book here" class="text" required onChange={this.onChangeDescription}/>
                                </div>
                            </div>

                            <div className="input-labels">
                                <div className="book">Add book (*.pdf)</div>
                                <div className="picture">Add photo (*.jpg)</div>
                            </div>

                            <div class="input-name">
                                <i class="fa fa-book lock"></i>
                                <input type="file" accept=".pdf" placeholder="Book" name="path" required class="name" onChange={this.onChangePath}/>
                                <span class="last">
                                    <i class="fa fa-picture-o lock"></i>
                                    <input type="file" accept=".jpg" placeholder="Book" name="picture" required class="name" onChange={this.onChangePicture}/>
                                </span>
                            </div>
                            <input type="submit" class="button"  value="Add book"/>

                              {/* <button type="button" onClick={()=>{ 
                                this.setState({isOpen:true})}} class="button">Add Book</button>   */}
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
