import React, { Component } from 'react'
import Axios from 'axios'
import Navbar from '../Navbar/Navbar'
import AuthService from "../../services/auth.service";
import $ from 'jquery';
import avatar from '../../assets/avatar.svg'
import * as IoIcons from "react-icons/io";
import * as AiIcons from "react-icons/ai";
import swal from 'sweetalert';
import ReactPaginate from 'react-paginate';
import { toast } from "react-toastify";

const API_URL = "http://localhost:8080/";

export default class SuperUserProfile extends Component {
    constructor(props){
        super(props)

        this.state={
            user:this.props.location.superUser,
            currentUser: AuthService.getCurrentUser(),
            freeBooks:[],
            list:[],
            uploads: [],
            noOfReviews: 0,
            avatar: '',
            //paginare
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
        Axios.get(API_URL + 'books').then(
            res => {
                this.setState({ freeBooks: res.data});
            }
        )
        Axios.get(API_URL + 'privateBooks/'+`${this.state.currentUser.id}`).then(
            res => {
                let arr=[]
                this.setState({ privateBooks: res.data});
                for(let i=0;i<res.data.length;i++){
                    arr.push(res.data[i].Book)
                }
                for(let i=0;i<this.state.freeBooks.length;i++){
                    arr.push(this.state.freeBooks[i])
                }
                this.setState({ list: arr});
            }
        )
        Axios.get(API_URL + 'uploads/' + `${this.state.user.id}`).then(
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
        Axios.get(API_URL + 'noOfReviews/' + `${this.state.user.id}`).then(
            res => {
                this.setState({ noOfReviews: res.data });
            }
        )

        document.getElementById('userName').value = this.state.user.userName
        document.getElementById('email').value = this.state.user.email
        document.getElementById('firstName').value = this.state.user.firstName
        document.getElementById('lastName').value = this.state.user.lastName

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
    render() {
        return (
            <div>
                 <Navbar list={this.state.list} />
                 <div className="dash-content">
                     <div className="row">
                        <div className="col-md-8">
                        <div className="card" style={{height:'290px'}}>
                            <div className="card-header card-header-primary">
                                <h4 className="card-title">User profile</h4>
                                <p className="card-category">Analise super-user profile</p>
                            </div>
                            <div className="card-body">
                                <form className="profile-form" >
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="input-block">
                                                <label htmlFor>Username</label>
                                                <input disabled id="userName" name="userName" className="form-control" type="text" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="input-block">
                                                <label htmlFor>Email</label>
                                                <input disabled id="email"  name="email" className="form-control" type="email" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="input-block">
                                                <label htmlFor>First name</label>
                                                <input disabled required id="firstName"  name="firstName" className="form-control" type="text" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="input-block">
                                                <label htmlFor>Last name</label>
                                                <input disabled required id="lastName" name="lastName" className="form-control" type="text" />
                                            </div>
                                        </div>
                                    </div>
                                </form>
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
                        <div className="card-body">
                            <h6 className="card-category text-gray" style={{marginTop:'-1em'}}></h6>

                            <h4 className="card-title">{this.state.user.firstName} {this.state.user.lastName}</h4>

                            {(this.state.user.role === "user" &&
                                <div className="acces-badge user" style={{ marginTop: '1em' }}>user</div>)
                                || (this.state.user.role === "superuser" &&
                                    <div className="acces-badge super-user" style={{ marginTop: '1em' }}>super-user</div>)
                                || (this.state.user.role === "admin" &&
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
                            <h4 class="card-title ">{this.state.user.firstName}'s uploads</h4>
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
                                <img className="pimagine" src={item.Book.picture}></img>

                                <div className="row">
                                    <div className="col-md-8">

                                        <div className="title">{item.Book.title}</div>
                                        <div className="author">{item.Book.author}</div>
                                    
                                        <div className="raiting">
                                            <AiIcons.AiFillStar />{item.rating.toFixed(2)}
                                        </div>
                                        {item.Book.availability ?

                                        <div style={{maxWidth:'8em'}}id="public" className="uacces-badge allowed">Public book</div>

                                        : <div style={{maxWidth:'9em'}} className="uacces-badge forbidden">Private book</div>}

                                    </div>

                                    <div className="col-md-4" >
                                            

                                        <div className="row" style={{ marginTop: '3em' }}>
                                            <div className="col-md-4"></div>
                                            <div className="col-md-4"></div>
                                            <div className="col-md-4">
                                                <div id="details" onClick={() => {
                                          
                                                let found=false;
                                                for(let i=0;i<this.state.privateBooks.length;i++){
                                                    if(this.state.privateBooks[i].Book.id===item.Book.id){
                                                        found=true;
                                                    }
                                                }
                                                if(found || item.Book.availability){
                                                    this.props.history.push({
                                                        pathname: "/bookDetail",
                                                        state: { item: item.Book }
                                                    })
                                                }else{
                                                    toast('You can not acces this book!')
                                                }
    
                                                }} className="uacces-badge details"
                                                >Details</div>

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
