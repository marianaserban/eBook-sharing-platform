import React, { Component } from 'react'
import Axios from 'axios'
import Navbar from '../Navbar/Navbar'
import AuthService from "../../services/auth.service";
import ReactPaginate from 'react-paginate';
import * as AiIcons from "react-icons/ai";
import './Library.css'
import Animation from './Animation'

const API_URL = "http://localhost:8080/";

export default class Library extends Component {
    constructor(props) {
        super(props);

        this.logOut = this.logOut.bind(this);

        this.state = {
            books:[],
            currentUser: AuthService.getCurrentUser(),
             //paginare,
             offset: 0,
             orgtableData: [],
             perPage: 3,
             currentPage: 0,

             freeBooks:[],
             list:[]
        };
    }

    logOut() {
        AuthService.logout();
        this.props.history.push('/')
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
            books: slice
        })
    }

    componentDidMount = () => {
        Axios.get(API_URL + 'books').then(
            res => {
                this.setState({ freeBooks: res.data});
            }
        )
        Axios.get(API_URL + 'privateBooks/'+`${this.state.currentUser.id}`).then(
            res => {               
                this.setState({ books: res.data});
                console.log('PRIVATE',this.state.books)
                var data = this.state.books
                var slice = this.state.books.slice(this.state.offset, this.state.offset + this.state.perPage)
                this.setState({
                    pageCount: Math.ceil(this.state.books.length / this.state.perPage),
                    orgtableData: res.data,
                    orgtableData: data,
                    books: slice
                })

                let arr=[]
                for(let i=0;i<res.data.length;i++){
                    arr.push(res.data[i].Book)
                }
                for(let i=0;i<this.state.freeBooks.length;i++){
                    arr.push(this.state.freeBooks[i])
                }
                this.setState({ list: arr});
            }
        )
    }
    render() {
        return (
            <div>
                <Navbar list={this.state.list}/>
                <div className="dash-content">
                    {this.state.books.length > 0 ? 
                        <div className="row">
                            <div class="col-md-12">
                             <div class="card" style={{ backgroundColor: '#F3F3F4' }}>
                                <div class="card-headera card-headera-primary">
                                    <h4 class="card-title ">Private books</h4>
                                    <p className="card-category">You have acces permission to read these</p>

                                </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table className="table">
                                        <thead className="text">
                                        </thead>
                                        <tbody>
                                        {
                                            this.state.books.map(item =>

                                                   <tr>
                                            <div className="col-md-12">
                                                <img className="pimagine" src={item.Book.picture}></img>

                                                <div className="row">

                                                    <div className="col-md-8">

                                                        <div className="title">{item.Book.title}</div>
                                                        <div className="author">{item.Book.author}</div>
                                                        <div className="raiting">
                                                            <AiIcons.AiFillStar />4.3
                                                        </div>
                                                        {item.Book.availability ?

                                                        <div style={{maxWidth:'5em'}}id="public" className="uacces-badge allowed">Public</div>

                                                        : <div style={{maxWidth:'6em'}} className="uacces-badge forbidden">Private</div>}

                                                    </div>

                                                    <div className="col-md-4" >

                                                        <div className="row" style={{ marginTop: '3em' }}>

                                                            <div className="col-md-4"></div>
                                                            <div className="col-md-4"></div>

                                                            <div className="col-md-4">
                                                                <div id="details" onClick={() => {
                                                                    this.props.history.push({
                                                                        pathname: "/bookDetail",
                                                                        state: { item: item.Book }
                                                                    })
                                                                }} className="uacces-badge details">Details</div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            </tr>
                                            )
                                        }
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
                    
                    
                    : <div>
                       <div className="row">
                            <div className="col-md-8 mr-auto ml-auto">
                                    <div style={{marginTop:'-6em',width:'40em'}} className="anim">
                                        <Animation />
                                    </div>
                            </div>
                            <div className="col-md-8 mr-auto ml-auto">
                                <div>It's a little empty here...
                                </div>
                            </div>
                        </div>
                        
                    </div>}

                </div>
            </div>
        )
    }
}

