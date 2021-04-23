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

const API_URL = "http://localhost:8080/";


export default class Profile extends Component {
    constructor(props){

        super(props)
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeAvatar = this.onChangeAvatar.bind(this);

        this.state={
            currentUser:AuthService.getCurrentUser(),
            userName:'',
            email:'',
            firstName:'',
            lastName:'',
            user:{},
            uploads:[],
            noOfReviews:0,
            avatar:'',


            offset: 0,
            orgtableData: [],
            perPage: 3,
            currentPage: 0,

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

    componentDidMount(){
        Axios.get(API_URL + 'uploads/'+`${this.state.currentUser.id}`).then(
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
        Axios.get(API_URL + 'user/'+`${this.state.currentUser.id}`).then(
            res => {
              this.setState({ user: res.data });

            }
        )
        Axios.get(API_URL + 'noOfReviews/'+`${this.state.currentUser.id}`).then(
            res => {
              this.setState({ noOfReviews: res.data });
            }
        )
        this.setState({
            userName:this.state.currentUser.userName,
            email:this.state.currentUser.email,
            firstName:this.state.currentUser.firstName,
            lastName:this.state.currentUser.lastName,
            avatar:this.state.user.thumbnail
        })
        document.getElementById('userName').value=this.state.currentUser.userName
        document.getElementById('email').value=this.state.currentUser.email
        document.getElementById('firstName').value=this.state.currentUser.firstName
        document.getElementById('lastName').value=this.state.currentUser.lastName

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
    onChangeUsername(e){
        this.setState({
            userName: e.target.value
        });
    }
    onChangeEmail(e){
        this.setState({
            email: e.target.value
        });
    }
    onChangeFirstName(e){
        this.setState({
            firstName: e.target.value
        });
    }
    onChangeLastName(e){
        this.setState({
            lastName: e.target.value
        });

    }
    onChangeAvatar(e){
        console.log( e.target.files[0])
        this.setState({
            avatar: e.target.files[0],
        });
    }
    updateAccount=(e)=>{

        e.preventDefault()
        let user={
            userName:this.state.userName,
            email:this.state.email,
            firstName:this.state.firstName,
            lastName:this.state.lastName
        }
        Axios.put(API_URL + 'user/'+`${this.state.currentUser.id}`, JSON.stringify(user),
        {
            headers: { "Content-Type": "application/json" }
        }
        ).then((res) => {
            let newUserStorage={
                id:this.state.currentUser.id,
                accessToken:this.state.currentUser.accessToken,
                role:this.state.currentUser.role,
                userName:this.state.userName,
                email:this.state.email,
                firstName:this.state.firstName,
                lastName:this.state.lastName,
            }
            this.setState({currentUser:newUserStorage})
            localStorage.setItem("user", JSON.stringify(this.state.currentUser));
            swal("Good job!", "Your profile has been updated successfully!", "success")
        })
        .catch(error => {
            if (error.response !== undefined) {
                alert(error.response.data.message)
            }
        });
    }
    uploadImage=(e)=>{

     
        e.preventDefault()
        const data=new FormData()
        data.append("image",this.state.avatar)

        Axios.put(API_URL + 'updateProfilePic/'+`${this.state.currentUser.id}`, data,
        {
            headers: { "Content-Type": "multipart/form-data" }
        }
        ).then((res) => {
            alert('s-a trimis')
        })
        .catch(error => {
            if (error.response !== undefined) {
                alert(error.response.data.message)
            }
        });
    }

	updatePass(e){


	}
    render() {
        return (
            <div>
                <Navbar/>
                <div className="dash-content">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header card-header-primary">
                                    <h4 className="card-title">Edit profile</h4>
                                    <p className="card-category">Complete your profile</p>
                                </div>
                                <div className="card-body">
                                    <form className="profile-form"  onSubmit={this.updateAccount}>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="input-block">
                                                    <label htmlFor>Username</label>
                                                    <input disabled id="userName" onChange={this.onChangeUsername} /*value={this.state.user.userName}*/ name="userName" className="form-control" type="text"/>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="input-block">
                                                    <label htmlFor>Email</label>
                                                    <input disabled id="email" onChange={this.onChangeEmail} name="email" /*value={this.state.currentUser.email}*/ className="form-control" type="email"/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="input-block">
                                                    <label htmlFor>First name</label>
                                                    <input required id="firstName" onChange={this.onChangeFirstName} /*value={this.state.currentUser.firstName}*/ name="firstName" className="form-control" type="text"/>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="input-block">
                                                    <label htmlFor>Last name</label>
                                                    <input required id="lastName" onChange={this.onChangeLastName} /*value={this.state.currentUser.lastName}*/ name="lastName" className="form-control" type="text"/>
                                                </div>
                                            </div>
                                        </div>

									</form>


										<div className="row">
                                            <div className="col-md-4">
                                                <button onClick={this.updateAccount} type="submit"className="btnp btnp-success">Save changes</button> 
                                            </div>
                                            <div className="col-md-4">
                                                <button className="btnp btnp-danger">Delete account</button> 
                                            </div>
                                            <div  className="col-md-4">
                                                <button className="btnp btnp-warning">Update password</button>
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
                                            <div className="col-md-9" style={{marginTop:'-20px'}}>
                                            <i className="fa fa-camera icon" style={{fontSize: '1.5em'}} 
                                                onClick={()=>{document.querySelector('[type="file"]').click()
                                                document.querySelector('[type="file"]').addEventListener('change', function(){
                                                    setTimeout(function(){document.getElementById("upload").click()  }, 100);});}}></i>
                                            <input id="file" required type="file" hidden accept=".jpg, .png" name="avatar" onChange={this.onChangeAvatar}/>
                                            <button hidden id="upload">Upload picture</button>

                                        </div>
                                        </div>
                                    </form>
                                    <div className="card-body">
                                        <h6 className="card-category text-gray"></h6>
                                      
                                        <h4 className="card-title">{this.state.currentUser.firstName} {this.state.currentUser.lastName}</h4>

                                        {(this.state.currentUser.role==="user"&&
                                            <div className="acces-badge user" style={{marginTop:'1em'}}>user</div>)
                                                || (this.state.currentUser.role==="superuser" &&
                                            <div className="acces-badge super-user" style={{marginTop:'1em'}}>super-user</div>)
                                                 || (this.state.currentUser.role==="admin" &&
                                            <div className="acces-badge admin" style={{marginTop:'1em'}}>admin</div>)
                                         } 
                                        
                                        <div className="row" style={{margin:'1.5em'}}>
                                                <div className="col-md-6"><IoIcons.IoIosBook/> {this.state.orgtableData.length} Uploads </div>
                                                <div className="col-md-6"><AiIcons.AiFillStar/> {this.state.noOfReviews} Reviews </div>                                          
                                        </div>
                                       
                                        <p className="card-description">
                                            Registry date: {`${this.state.user.createdAt}`.substring(0,10)}
                                         </p>
                                    </div>
                                </div>
                        </div>
                    </div> 

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
                                                {this.state.uploads.map(item=>
                                                    <tr>
                                                        <div className="col-md-12"> 
                                                            <img className="pimagine" src={item.picture}></img>

                                                            <div className="row">

                                                                <div className="col-md-10">

                                                                    <div className="title">{item.title}</div>
                                                                    <div className="author">{item.author}</div>
                                                                    <div className="raiting">
                                                                    <AiIcons.AiFillStar/>4.3
                                                                    </div>
                                                                
                                                                </div>

                                                                <div className="col-md-2" >

                                                                    <div className="row" style={{marginTop:'3em'}}>
                                                                        <div className="col-md-6" >

                                                                        {item.availability? 
                                                                    
                                                                         <div className="uacces-badge allowed">Public</div> 
                                                                
                                                                        : <div className="uacces-badge forbidden">Private</div> }
                                                                        </div>

                                                                        <div className="col-md-6">
                                                                          <div onClick={()=>{
                                                                              this.props.history.push({
                                                                                pathname: "/bookDetail",
                                                                                state: {item:item}
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
                              
                </div>
            </div>
        )
    }
}
