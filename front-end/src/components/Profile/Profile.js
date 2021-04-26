import React, { Component } from 'react'
import Axios from 'axios'
import Navbar from '../Navbar/Navbar'
import './Profile.css'
import ReactPaginate from 'react-paginate';
import avatar from '../../assets/avatar.svg'
import AuthService from "../../services/auth.service";
import $ from 'jquery';
import swal from 'sweetalert';
import * as IoIcons from "react-icons/io";
import * as AiIcons from "react-icons/ai";
import Modal from 'react-bootstrap/Modal'
import { toast } from "react-toastify";


const API_URL = "http://localhost:8080/";
toast.configure();

export default class Profile extends Component {
    constructor(props) {

        super(props)
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeAvatar = this.onChangeAvatar.bind(this);
        this.onChangeNewPassword = this.onChangeNewPassword.bind(this);
        this.onChangeConfirmNewPassword = this.onChangeConfirmNewPassword.bind(this);
        this.onChangeOldPassword = this.onChangeOldPassword.bind(this)

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeAuthor = this.onChangeAuthor.bind(this);
        this.onChangeGenre = this.onChangeGenre.bind(this);
        this.onChangeAvailability = this.onChangeAvailability.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePath = this.onChangePath.bind(this)
        this.onChangePicture = this.onChangePicture.bind(this)

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            userName: '',
            email: '',
            firstName: '',
            lastName: '',
            user: {},
            uploads: [],
            noOfReviews: 0,
            avatar: '',
            //paginare
            offset: 0,
            orgtableData: [],
            perPage: 3,
            currentPage: 0,

            show: false,
            pass1Visible: false,
            pass2Visible: false,
            pass3Visible: false,

            currentPass: '',
            newPass: '',
            confirmNewPass: '',

            showEditBookDialog:false,
            bookId:0,
            title:'',
            author:'',
            genre:'',
            availability:'',
            description:'',
            path:'',
            picture:'' ,

        }
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.loadMoreData()
        });

    };

    loadMoreData() {
        const data = this.state.orgtableData;
        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),
            uploads: slice
        })
    }

    componentDidMount() {
        Axios.get(API_URL + 'uploads/' + `${this.state.currentUser.id}`).then(
            res => {
                this.setState({ uploads: res.data });

                var data = this.state.uploads
                var slice = this.state.uploads.slice(this.state.offset, this.state.offset + this.state.perPage)
                this.setState({
                    pageCount: Math.ceil(this.state.uploads.length / this.state.perPage),
                    orgtableData: res.data,
                    orgtableData: data,
                    uploads: slice
                })
            }
        )
        Axios.get(API_URL + 'user/' + `${this.state.currentUser.id}`).then(
            res => {
                this.setState({ user: res.data });

            }
        )
        Axios.get(API_URL + 'noOfReviews/' + `${this.state.currentUser.id}`).then(
            res => {
                this.setState({ noOfReviews: res.data });
            }
        )
        this.setState({
            userName: this.state.currentUser.userName,
            email: this.state.currentUser.email,
            firstName: this.state.currentUser.firstName,
            lastName: this.state.currentUser.lastName,
            avatar: this.state.user.thumbnail
        })
        document.getElementById('userName').value = this.state.currentUser.userName
        document.getElementById('email').value = this.state.currentUser.email
        document.getElementById('firstName').value = this.state.currentUser.firstName
        document.getElementById('lastName').value = this.state.currentUser.lastName

        $(".profile-form")
            .find(".form-control")
            .each(function () {
                var targetItem = $(this).parent();
                if ($(this).val()) {
                    $(targetItem)
                        .find("label")
                        .css({
                            top: "-6px"
                            , fontSize: "16px"
                            , color: "#999"
                        });
                }
            });
        $(".profile-form")
            .find(".form-control")
            .focus(function () {
                $(this)
                    .parent(".input-block")
                    .addClass("focus");
                $(this)
                    .parent()
                    .find("label")
                    .animate({
                        top: "-6px"
                        , fontSize: "16px"
                        , color: "#999"
                    }
                        , 300
                    );
            });
        $(".profile-form")
            .find(".form-control")
            .blur(function () {
                if ($(this).val().length == 0) {
                    $(this)
                        .parent(".input-block")
                        .removeClass("focus");
                    $(this)
                        .parent()
                        .find("label")
                        .animate({
                            top: "20px"
                            , fontSize: "18px",
                        }
                            , 300
                        );
                }
            });


    }
    onChangeUsername(e) {
        this.setState({
            userName: e.target.value
        });
    }
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }
    onChangeFirstName(e) {
        this.setState({
            firstName: e.target.value
        });
    }
    onChangeLastName(e) {
        this.setState({
            lastName: e.target.value
        });

    }
    onChangeAvatar(e) {
        console.log(e.target.files[0])
        this.setState({
            avatar: e.target.files[0],
        });
    }

    onChangeOldPassword(e) {
        this.setState({
            oldPassword: e.target.value,
        });
    }
    onChangeNewPassword(e) {
        this.setState({
            newPass: e.target.value,
        });
    }
    onChangeConfirmNewPassword(e) {
        this.setState({
            confirmNewPass: e.target.value,
        });
    }

    updateAccount = (e) => {

        e.preventDefault()
        let user = {
            userName: this.state.userName,
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName
        }
        Axios.put(API_URL + 'user/' + `${this.state.currentUser.id}`, JSON.stringify(user),
            {
                headers: { "Content-Type": "application/json" }
            }
        ).then((res) => {
            let newUserStorage = {
                id: this.state.currentUser.id,
                accessToken: this.state.currentUser.accessToken,
                role: this.state.currentUser.role,
                userName: this.state.userName,
                email: this.state.email,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
            }
            this.setState({ currentUser: newUserStorage })
            localStorage.setItem("user", JSON.stringify(this.state.currentUser));
            swal("Good job!", "Your profile has been updated successfully!", "success")
        })
            .catch(error => {
                if (error.response !== undefined) {
                    alert(error.response.data.message)
                }
            });
    }
    uploadImage = (e) => {


        e.preventDefault()
        const data = new FormData()
        data.append("image", this.state.avatar)

        Axios.put(API_URL + 'updateProfilePic/' + `${this.state.currentUser.id}`, data,
            {
                headers: { "Content-Type": "multipart/form-data" }
            }
        ).then((res) => {
        })
            .catch(error => {
                if (error.response !== undefined) {
                    alert(error.response.data.message)
                }
            });
    }

    deleteAccount = (e) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover your account!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {

                e.preventDefault()
                Axios.delete(`${API_URL}deleteAccount/${this.state.currentUser.id}`)
                    .then((res) => {
                        localStorage.removeItem("user");
                    })

                swal("Poof! Your account has been deleted!", {
                    icon: "success",
                });
                this.props.history.push(`/`)
            }
        });
    }


    toggleModal = () => {
        if (this.state.show) {
            this.setState({ show: false })
        } else {
            this.setState({ show: true })
        }
    }

    editDialog=()=>{
        if (this.state.showEditBookDialog) {
            this.setState({ showEditBookDialog: false })
        } else {
            this.setState({ showEditBookDialog: true })
        }

       
    }

    updatePass = (e) => {
        e.preventDefault()
        if (this.state.newPass.length >= 6) {


            if (this.state.newPass === this.state.confirmNewPass) {
                let data = {
                    password: this.state.newPass,
                    oldPassword: this.state.oldPassword
                }
                Axios.patch(`${API_URL}updatePass/${this.state.currentUser.id}`, JSON.stringify(data),
                    {
                        headers: { "Content-Type": "application/json" }
                    }
                ).then((res) => {
                    swal("Good job!", "Your password has been updated successfully! Please login again", "success")
                    this.props.history.push(`/`)
                    AuthService.logout();
                })
                    .catch(error => {
                        if (error.response !== undefined) {
                            toast(error.response.data.message)
                        } else {
                            alert('eroare')
                        }
                    }
                    );
            } else {
                toast("Your password and confirmation password do not match")
            }
        } else {
            toast("Password must have at least 6 characters")
        }
    }

    changeVisibility1 = () => {
        if (this.state.pass1Visible) {
            this.setState({ pass1Visible: false })
        } else {
            this.setState({ pass1Visible: true })
        }
    }
    changeVisibility2 = () => {
        if (this.state.pass2Visible) {
            this.setState({ pass2Visible: false })
        } else {
            this.setState({ pass2Visible: true })
        }
    }
    changeVisibility3 = () => {
        if (this.state.pass3Visible) {
            this.setState({ pass3Visible: false })
        } else {
            this.setState({ pass3Visible: true })
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
        if(this.state.availability){
            this.setState({availability:false})
        }else{
            this.setState({availability:true})

        }
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
    }

    onChangePicture(e) {
        this.setState({
            picture: e.target.files[0]
        });
    }
    editBook=(e)=>{

        e.preventDefault()
        const data=new FormData()
        data.append("title",this.state.title)
        data.append("author", this.state.author)
        data.append("genre", this.state.genre)
        data.append("availability",this.state.availability)
        data.append("description",this.state.description)
        data.append("path",this.state.path)
        data.append("picture",this.state.picture)

        Axios.put(`${API_URL}updateBook/${this.state.bookId}`,data,
        {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then((res) => {
            swal("Good job!", "Your book has been updated successfully!", "success")
        })
        .catch(error => {
          if (error.response !== undefined) {
            console.log(error.response.data.message)
          }
        });

    }
    render() {
        return (
            <div>
                <Navbar />
                <div className="dash-content">


                    <div className="row">

                        <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered animation={false} show={this.state.show} onHide={this.toggleModal}>
                            <Modal.Header closeButton>
                                <Modal.Title style={{ color: '#474157' }}>Change password</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>



                                <form className="" onSubmit={this.updatePass}>

                                    <div className="row">
                                        <div className="col-md-10">
                                            <div class="group" style={{ marginTop: '1em' }}>
                                                <input onChange={this.onChangeOldPassword} type={this.state.pass1Visible ? "text" : "password"} className="input-modal" required />

                                                <span class="highlight"></span>
                                                <span class="bar-modal"></span>
                                                <label className="label-modal">Current password</label>
                                            </div>
                                        </div>

                                        <div onClick={this.changeVisibility1} style={{ fontSize: '1.5em', cursor: 'pointer' }} className="col-md-2">

                                            {this.state.pass1Visible ? <div><AiIcons.AiFillEye /></div> : <div><AiIcons.AiFillEyeInvisible /></div>}
                                        </div>

                                    </div>

                                    <div className="row">
                                        <div className="col-md-10">
                                            <div class="group">
                                                <input onChange={this.onChangeNewPassword} type={this.state.pass2Visible ? "text" : "password"} className="input-modal" required />
                                                <span class="highlight"></span>
                                                <span class="bar-modal"></span>
                                                <label className="label-modal">New password</label>
                                            </div>
                                        </div>

                                        <div onClick={this.changeVisibility2} style={{ fontSize: '1.5em', cursor: 'pointer' }} className="col-md-2">
                                            {this.state.pass2Visible ? <div><AiIcons.AiFillEye /></div> : <div><AiIcons.AiFillEyeInvisible /></div>}
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-10">
                                            <div class="group">
                                                <input onChange={this.onChangeConfirmNewPassword} type={this.state.pass3Visible ? "text" : "password"} className="input-modal" required />
                                                <span class="highlight"></span>
                                                <span class="bar-modal"></span>
                                                <label className="label-modal">Confirm new password</label>
                                            </div>
                                        </div>
                                        <div onClick={this.changeVisibility3} style={{ fontSize: '1.5em', cursor: 'pointer' }} className="col-md-2">
                                            {this.state.pass3Visible ? <div><AiIcons.AiFillEye /></div> : <div><AiIcons.AiFillEyeInvisible /></div>}
                                        </div>
                                    </div>

                                    <button variant="secondary" type="submit" className="btnu btnu-danger" onClick={this.toggleModal}>
                                        Close
                                </button>
                                    <button variant="primary" className="btnu btnu-success" type="submit">
                                        Save Changes
                                </button>

                                </form>

                            </Modal.Body>
                        </Modal>


                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header card-header-primary">
                                    <h4 className="card-title">Edit profile</h4>
                                    <p className="card-category">Complete your profile</p>
                                </div>
                                <div className="card-body">
                                    <form className="profile-form" onSubmit={this.updateAccount}>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="input-block">
                                                    <label htmlFor>Username</label>
                                                    <input disabled id="userName" onChange={this.onChangeUsername} /*value={this.state.user.userName}*/ name="userName" className="form-control" type="text" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="input-block">
                                                    <label htmlFor>Email</label>
                                                    <input disabled id="email" onChange={this.onChangeEmail} name="email" /*value={this.state.currentUser.email}*/ className="form-control" type="email" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="input-block">
                                                    <label htmlFor>First name</label>
                                                    <input required id="firstName" onChange={this.onChangeFirstName} /*value={this.state.currentUser.firstName}*/ name="firstName" className="form-control" type="text" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="input-block">
                                                    <label htmlFor>Last name</label>
                                                    <input required id="lastName" onChange={this.onChangeLastName} /*value={this.state.currentUser.lastName}*/ name="lastName" className="form-control" type="text" />
                                                </div>
                                            </div>
                                        </div>

                                    </form>


                                    <div className="row">
                                        <div className="col-md-4">
                                            <button onClick={this.updateAccount} type="submit" className="btnp btnp-success">Save changes</button>
                                        </div>
                                        <div className="col-md-4">
                                            <button onClick={this.deleteAccount} className="btnp btnp-danger">Delete account</button>
                                        </div>
                                        <div className="col-md-4">
                                            <button onClick={this.toggleModal} className="btnp btnp-warning">Update password</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card card-profile">
                                <div className="card-avatar">
                                    {this.state.user.thumbnail ?
                                        <img className="img" src={this.state.user.thumbnail} />
                                        :
                                        <img className="img" src={avatar} />
                                    }
                                </div>
                                <form id="form" onSubmit={this.uploadImage}>
                                    <div className="row">
                                        <div className="col-md-3">
                                        </div>
                                        <div className="col-md-9" style={{ marginTop: '-20px' }}>
                                            <i className="fa fa-camera icon" style={{ fontSize: '1.5em' }}
                                                onClick={() => {
                                                    document.querySelector('[type="file"]').click()
                                                    document.querySelector('[type="file"]').addEventListener('change', function () {
                                                        setTimeout(function () { document.getElementById("upload").click() }, 100);
                                                    });
                                                }}></i>
                                            <input id="file" required type="file" hidden accept=".jpg, .png" name="avatar" onChange={this.onChangeAvatar} />
                                            <button hidden id="upload">Upload picture</button>

                                        </div>
                                    </div>
                                </form>
                                <div className="card-body">
                                    <h6 className="card-category text-gray"></h6>

                                    <h4 className="card-title">{this.state.currentUser.firstName} {this.state.currentUser.lastName}</h4>

                                    {(this.state.currentUser.role === "user" &&
                                        <div className="acces-badge user" style={{ marginTop: '1em' }}>user</div>)
                                        || (this.state.currentUser.role === "superuser" &&
                                            <div className="acces-badge super-user" style={{ marginTop: '1em' }}>super-user</div>)
                                        || (this.state.currentUser.role === "admin" &&
                                            <div className="acces-badge admin" style={{ marginTop: '1em' }}>admin</div>)
                                    }

                                    <div className="row" style={{ margin: '1.5em' }}>
                                        <div className="col-md-6"><IoIcons.IoIosBook /> {this.state.orgtableData.length} Uploads </div>
                                        <div className="col-md-6"><AiIcons.AiFillStar /> {this.state.noOfReviews} Reviews </div>
                                    </div>

                                    <p className="card-description">
                                        Registry date: {`${this.state.user.createdAt}`.substring(0, 10)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {this.state.user.role === 'superuser' || this.state.user.role === 'admin' ?
                        <div className="row">
                            <div class="col-md-12">
                                <div class="card" style={{ backgroundColor: '#F3F3F4' }}>
                                    <div class="card-headera card-headera-primary">
                                        <h4 class="card-title ">Your uploads</h4>
                                    </div>
                                    <div class="card-body">
                                        <div class="table-responsive">
                                            <table className="table">

                                                <thead className="text">

                                                </thead>


                                                <tbody>
                                                    {this.state.uploads.map(item =>
                                                    
                                                        <tr>
                                                            <div className="col-md-12">
                                                                <img className="pimagine" src={item.picture}></img>

                                                                <div className="row">

        <Modal  dialogClassName="modal-90w" size="xl"  aria-labelledby="contained-modal-title-vcenter" centered 
        animation={false} show={this.state.showEditBookDialog} onHide={this.editDialog} >
        <Modal.Header style={{backgroundColor:'#F3F3F4'}} closeButton>
            <Modal.Title style={{ color: '#474157' }}>Edit book</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{backgroundColor:'#F3F3F4'}} >

            <div className="form-container">
                        <form id="add-book"className="pbook-form" onSubmit={this.editBook} enctype="multipart/form-data">
                            <div class="input-name">
                                <i className="lock"><IoIcons.IoIosBook /></i>
                                <input type="text" value={this.state.title} placeholder="Title" class="name" name="title" required onChange={this.onChangeTitle}/>
                                <span class="last">
                                    <i class="fa fa-user lock"></i>
                                    <input type="text" value={this.state.author} placeholder="Author" class="name" name="author"required onChange={this.onChangeAuthor}/>
                                </span>
                            </div>

                            <div class="input-name">
                                <select value={this.state.genre} class="genre" name="genre" required onChange={this.onChangeGenre}>
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

                            {this.state.availability ? 
                                <fieldset required>
                                <input type="radio" checked name="availability" id="radio-choice-1" value="1"  onChange={this.onChangeAvailability}/>
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
                        
                            : 
                            <fieldset required>
                            <input type="radio" name="availability" id="radio-choice-1" value="1"  onChange={this.onChangeAvailability}/>
                            <label for="radio-choice-1" className="label-radio">
                                Public
                            <span>Everyone can view it</span>
                            </label>

                            <input type="radio" checked name="availability" id="radio-choice-2" value="0" onChange={this.onChangeAvailability}/>
                            <label for="radio-choice-2" className="label-radio">
                                Private
                            <span>You choose who can view it</span>
                            </label>
                        </fieldset>
                            
                            }
                        


                            <div className="label">Description</div>
                            <div class="input-group">
                                <div class="input-box comm">
                                    <textarea cols="200" rows="3" value={this.state.description} name="description" placeholder="Write description's book here" class="text" required onChange={this.onChangeDescription}/>
                                </div>
                            </div>

                            <div className="input-labels">
                                <div className="book">Add book (*.pdf)</div>
                                <div className="picture">Add photo (*.jpg)</div>
                            </div>

                            <div class="input-name">
                                <i class="fa fa-book lock"></i>
                                <input type="file" value={this.state.path.name} accept=".pdf" placeholder="Book" name="path" required class="name" onChange={this.onChangePath}/>
                                <span class="last">
                                    <i class="fa fa-picture-o lock"></i>
                                    <input type="file" accept=".jpg" placeholder="Book" name="picture" required class="name" onChange={this.onChangePicture}/>
                                </span>
                            </div>
                        </form>
                    </div>

        </Modal.Body>

        <Modal.Footer style={{backgroundColor:'#F3F3F4'}}>
            <button variant="secondary" className="btnu btnu-danger" onClick={this.editDialog}>
                    Close
            </button>
                <button variant="primary" className="btnu btnu-success" type="submit" onClick={this.editBook}>
                    Save Changes
            </button>
            </Modal.Footer>
    </Modal>

                                                                    <div className="col-md-8">

                                                                        <div className="title">{item.title}</div>
                                                                        <div className="author">{item.author}</div>
                                                                        <div className="raiting">
                                                                            <AiIcons.AiFillStar />4.3
                                                                        </div>
                                                                        {item.availability ?

                                                                        <div style={{maxWidth:'5em'}}id="public" className="uacces-badge allowed">Public</div>

                                                                        : <div style={{maxWidth:'6em'}} className="uacces-badge forbidden">Private</div>}

                                                                    </div>

                                                                    <div className="col-md-4" >

                                                                        <div className="row" style={{ marginTop: '3em' }}>
                                                                            <div className="col-md-4" >
                                                                                    <div onClick={()=>{this.setState({ 
                                                                                        showEditBookDialog:true,
                                                                                        bookId:item.id,
                                                                                        title:item.title,
                                                                                        author:item.author,
                                                                                        description:item.description,
                                                                                        genre:item.genre,
                                                                                        availability:item.availability,
                                                                                        path:item.path,
                                                                                        picture:item.picture 

                                                                                        })}} id="public" className="uacces-badge edit">Edit</div>
                                                                            </div>

                                                                          


                                                                            <div className="col-md-4">
                                                                                <div className="uacces-badge delete" onClick={(e) => {
                                                                                    swal({
                                                                                        title: "Are you sure?",
                                                                                        text: "Once deleted, you will not be able to recover this file!",
                                                                                        icon: "warning",
                                                                                        buttons: true,
                                                                                        dangerMode: true,
                                                                                    })
                                                                                        .then((willDelete) => {
                                                                                            if (willDelete) {

                                                                                                e.preventDefault()
                                                                                                Axios.delete(`${API_URL}deleteBook/${item.id}`)
                                                                                                    .then((res) => {
                                                                                                    })

                                                                                                let index = this.state.uploads.indexOf(item)
                                                                                                let upload = [...this.state.uploads];
                                                                                                upload.splice(index, 1)
                                                                                                this.setState({ uploads: upload });

                                                                                                index = this.state.orgtableData.indexOf(item)
                                                                                                upload = [...this.state.orgtableData]
                                                                                                upload.splice(index, 1)
                                                                                                this.setState({ orgtableData: upload });

                                                                                                swal("Poof! Your file has been deleted!", {
                                                                                                    icon: "success",
                                                                                                });
                                                                                            } else {
                                                                                                swal("Your file is safe!");
                                                                                            }
                                                                                        });
                                                                                }}>Delete</div>
                                                                            </div>

                                                                            <div className="col-md-4">
                                                                                <div id="details" onClick={() => {
                                                                                    this.props.history.push({
                                                                                        pathname: "/bookDetail",
                                                                                        state: { item: item }
                                                                                    })
                                                                                }} className="uacces-badge details">Details</div>

                                                                            </div>



                                                                        </div>



                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </tr>)}

                                                </tbody>


                                            </table>
                                            <ReactPaginate
                                                previousLabel={"Prev"}
                                                nextLabel={"Next"}
                                                breakLabel={"..."}
                                                breakClassName={"break-me"}
                                                pageCount={this.state.pageCount}
                                                marginPagesDisplayed={2}
                                                pageRangeDisplayed={5}
                                                onPageChange={this.handlePageClick}
                                                containerClassName={"pagination"}
                                                subContainerClassName={"pages pagination"}
                                                activeClassName={"active-pg"} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        : <div></div>

                    }


                </div>
            </div>
        )
    }
}
