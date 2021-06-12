import React, { Component } from 'react'
import Navbar from '../Navbar/Navbar'
import './BookDetail.css'
import avatar from '../../assets/avatar.svg'
import * as BsIcons from "react-icons/bs";
import * as FaIcons from "react-icons/fa";
import Tabs from '../Tabs/Tabs'
import Axios from 'axios'
import $ from 'jquery';
import authService from '../../services/auth.service';
const API_URL = "http://localhost:8080/";
let pdf='../../../public/uploads/sample.pdf'

export default class BookDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser:authService.getCurrentUser(),
            book: {},
            fullDescription:false,
            superUser:{},
            reviewsLength:0,
            noOfComments:0,
            noOfUsers:0,
            freeBooks:[],
            list:[],

            fullDesc:false,
        }

        this.state.book = this.props.location.state.item
        localStorage.setItem("bookId", JSON.stringify(this.state.book.id));
        // localStorage.setItem("bookAvailability", JSON.stringify(this.state.book.availability));
        // localStorage.setItem("superUser", JSON.stringify(this.state.superUser));
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

        Axios.get(API_URL + 'superUser/'+`${this.state.book.id}`).then(
            res => {
              this.setState({superUser:res.data})
              console.log('SUPER', this.state.superUser)
            }
          )
          Axios.get(API_URL + 'reviews/'+`${this.state.book.id}`).then(
            res => {
              this.setState({ reviewsLength: res.data.length });
              let nr=0;
              res.data.forEach(element => {
                  if(element.content.length > 1){
                        nr++;
                  }
              });
              this.setState({noOfComments:nr})
            }
        )
        if(this.state.book.availability===true){
            Axios.get(API_URL + 'users').then(
                res => {
                  this.setState({ noOfUsers: res.data.length });
                }
              )
        }else{
            Axios.get(API_URL + 'usersWithAcces/' + `${this.state.book.id}`).then(
                res => {
                  this.setState({  noOfUsers: res.data.length });
                }
            )
        }
    }
    render() {
        if(this.state.fullDescription){
            return (
                <div>
                     <Navbar list={this.state.list} />
                    <div className="dash-content">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="card">
                                    <div className="card-header card-header-primary">
                                        <h4 className="card-title">Book detail</h4>
                                        <p className="card-category">Start reading your favourite book</p>
                                    </div>
                                    <div className="card-body">
    
                                        <div className="row">
                                            <div className="col-md-4">
                                            <img className="imagine-detail" src={this.state.book.picture}></img>
    
                                            </div>
    
                                            <div className="col-md-8">
    
                                                <div className="title">{this.state.book.title}</div>
                                                <div className="author">by {this.state.book.author}</div>
                                                
                                                {/* {descriere} */}
                                                <div className="row">
                                                    <div className="col-md-4">
    
                                                        <div className="row">
                                                            <div className="col-md-2"><BsIcons.BsEye/></div>
                                                            <div className="col-md-10">{this.state.noOfUsers} Reads</div>
                                                        </div>
    
                                                    </div>
                                                    <div className="col-md-4">
    
                                                        <div className="row">
                                                            <div className="col-md-2"><BsIcons.BsStar/></div>
                                                            <div className="col-md-10">{this.state.reviewsLength} Votes</div>
                                                        </div>
                                                        
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="row">
                                                            <div className="col-md-2"> <FaIcons.FaRegComment/></div>
                                                            <div className="col-md-10">{this.state.noOfComments} Comments</div>
                                                        </div>  
                                                    </div>
                                                </div>          
                                                <div className="sum" style={{marginTop:'1.5em'}}>
                                                    {this.state.book.description}...
                                                </div>
                                                {/* <a rel="no-refresh" href="" onClick={(e)=>{
                                                    e.preventDefault()
                                                    this.setState({fullDescription:false})}} 
                                                style={{float:'right',marginTop:'-0.5em',marginRight:'1em'}}>See less</a> */}
                                                <div className="bt-con">
                                                    <input  type="button" className="read-btn" 
                                                    value="Start reading "
                                                    onClick={()=>{
                                                        this.props.history.push({
                                                            pathname: "/pdf",
                                                            book: this.state.book,
                                                          })}
                                                    }
                                                    />
                                                </div>
                                            </div>
                                        
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card card-profile">
                                    <div className="card-avatar">
                                        <a href="javascript:;">
                                        {this.state.superUser.thumbnail?
                                                 <img className="img" src={this.state.superUser.thumbnail} />
                                            :
                                                <img className="img" src={avatar} />
                                        }
                                        </a>
                                    </div>
                                    <div className="card-body">
                                        <h6 className="card-category text-gray">
                                        <h4 className="card-title">{this.state.superUser.firstName} {this.state.superUser.lastName}</h4>

                                        {(this.state.superUser.role==="user"&&
                                            <div className="acces-badge user">user</div>)
                                                || (this.state.superUser.role==="superuser" &&
                                            <div className="acces-badge super-user">super-user</div>)
                                                 || (this.state.superUser.role==="admin" &&
                                            <div className="acces-badge admin">admin</div>)
                                         } 
                                            
                                        </h6>
                                        <p className="card-description">
                                            {this.state.superUser.email}
                                         </p>
                                     
                                    
                                         <button className="btn-login">See profile</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                          <Tabs/>
                    </div>
                </div>
            )
        }else{
            return (
                <div>
                    <Navbar list={this.state.list} />
                    <div className="dash-content">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="card">
                                    <div className="card-header card-header-primary">
                                        <h4 className="card-title">Book detail</h4>
                                        <p className="card-category">Start reading your favourite book</p>
                                    </div>
                                    <div className="card-body">
    
                                        <div className="row">
                                            <div className="col-md-4">
                                            <img className="imagine-detail" src={this.state.book.picture}></img>
    
                                            </div>
    
                                            <div className="col-md-8">
    
                                                <div className="title">{this.state.book.title}</div>
                                                <div className="author">by {this.state.book.author}</div>
                                                
                                                {/* {descriere} */}
                                                <div className="row">
                                                    <div className="col-md-4">
    
                                                        <div className="row">
                                                            <div className="col-md-2"><BsIcons.BsEye/></div>
                                                            <div className="col-md-10">{this.state.noOfUsers} Reads</div>
                                                        </div>
    
                                                    </div>
                                                    <div className="col-md-4">
    
                                                        <div className="row">
                                                            <div className="col-md-2"><BsIcons.BsStar/></div>
                                                            <div className="col-md-10">{this.state.reviewsLength} Votes</div>
                                                        </div>
                                                        
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="row">
                                                            <div className="col-md-2"> <FaIcons.FaRegComment/></div>
                                                            <div className="col-md-10">{this.state.noOfComments} Comments</div>
                                                        </div>  
                                                    </div>
                                                </div> 
                                                {
                                                    this.state.fullDesc ?

                                                    <div>
                                                        <div className="sum" style={{marginTop:'1.5em',textAlign:'justify'}}>
                                                            {this.state.book.description}
                                                        </div>

                                                        <div className="more" style={{float:'right',marginTop:'0.5em',marginRight:'1em',
                                                            color:'#999',cursor:'pointer'}} onClick={(e)=>{
                                                                e.preventDefault()
                                                                this.setState({fullDesc:false})
                                                            }}>See less</div>
                                                       
                                                    </div>
                                                       
                                                        :
                                                        <div>
                                                            <div className="sum" style={{marginTop:'1.5em',textAlign:'justify'}}>
                                                                {this.state.book.description.substring(0,350)}...
                                                            </div>

                                                            <div className="more" style={{float:'right',marginTop:'0.5em',marginRight:'1em',
                                                                color:'#999',cursor:'pointer'}} onClick={(e)=>{
                                                                    e.preventDefault()
                                                                    this.setState({fullDesc:true})
                                                                }}>See more</div>
                                                        </div>
                                                }         
                                                {/* // <div className="sum" style={{marginTop:'1.5em'}}>
                                                //     {this.state.book.description.substring(0,350)}...
                                                // </div> */}
                                                {/* <a  href="javascript:void(0)" onClick={(e)=>{
                                                    //alert('more')
                                                
                                                    e.preventDefault()
                                                    this.setState({fullDescription:true})}} 
                                                style={{float:'right',marginTop:'-0.5em',marginRight:'1em'}}>See more</a> */}


                                                    
    
                                                <div className="bt-con">
                                                    <input type="button" className="read-btn" 
                                                    value="Start reading "
                                                    onClick={()=>{

                                                        this.props.history.push({
                                                            pathname: "/pdf",
                                                            book: this.state.book,
                                                          })}

                                                    }
                                                    />
                                                </div>
                                            </div>
                                        
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card card-profile">
                                    <div className="card-avatar">
                                        <a href="javascript:;">
                                            {this.state.superUser.thumbnail?
                                                 <img className="img" src={this.state.superUser.thumbnail} />
                                            :
                                                <img className="img" src={avatar} />
                                            }
                                           
                                        </a>
                                    </div>
                                    <div className="card-body">
                                        <h4 className="card-title">{this.state.superUser.firstName} {this.state.superUser.lastName}</h4>
                                        <h6 className="card-category text-gray">
                                        {(this.state.superUser.role==="user"&&
                                            <div className="acces-badge user">user</div>)
                                                || (this.state.superUser.role==="superuser" &&
                                            <div className="acces-badge super-user">super-user</div>)
                                                 || (this.state.superUser.role==="admin" &&
                                            <div className="acces-badge admin">admin</div>)
                                         } 
                                        </h6>
                                    
                                        <p className="card-description">
                                            {this.state.superUser.email}
                                         </p>
                                  
                                        <button className="btn-login">See profile</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                          <Tabs book={this.state.book} superUser={this.state.superUser}/>
                    </div>
                </div>
            )
        }
       
    }
}
