import React, { Component } from 'react'
import Navbar from '../Navbar/Navbar'
import './BookDetail.css'
import avatar from '../../assets/avatar.svg'
import * as BsIcons from "react-icons/bs";
import * as FaIcons from "react-icons/fa";
import Tabs from '../Tabs/Tabs'


export default class BookDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            book: {},
            fullDescription:false
        }

        this.state.book = this.props.location.state.item
        localStorage.setItem("bookId", JSON.stringify(this.state.book.id));
        localStorage.setItem("bookAvailability", JSON.stringify(this.state.book.availability));
    }
    render() {
        if(this.state.fullDescription){
            return (
                <div>
                    <Navbar />
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
                                                            <div className="col-md-10">10 Reads</div>
                                                        </div>
    
                                                    </div>
                                                    <div className="col-md-4">
    
                                                        <div className="row">
                                                            <div className="col-md-2"><BsIcons.BsStar/></div>
                                                            <div className="col-md-10">15 Votes</div>
                                                        </div>
                                                        
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="row">
                                                            <div className="col-md-2"> <FaIcons.FaRegComment/></div>
                                                            <div className="col-md-10">8 Comments</div>
                                                        </div>  
                                                    </div>
                                                </div>          
                                                <div className="sum" style={{marginTop:'1.5em'}}>
                                                    {this.state.book.description}...
                                                </div>
                                                <a href="#" onClick={()=>{this.setState({fullDescription:false})}} style={{float:'right',marginTop:'-0.5em',marginRight:'1em'}}>See less</a>
    
                                                <div className="bt-con">
                                                    <input type="button" className="read-btn" value="Start reading "/>
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
                                            <img className="img" src={avatar} />
                                        </a>
                                    </div>
                                    <div className="card-body">
                                        <h6 className="card-category text-gray">Super user</h6>
                                        <h4 className="card-title">Mariana Serban</h4>
                                        <p className="card-description">
                                            Cate carti a incarcat
                                         </p>
                                        <a href="javascript:;" className="btn btn-primary btn-round">See profile</a>
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
                    <Navbar />
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
                                                            <div className="col-md-10">10 Reads</div>
                                                        </div>
    
                                                    </div>
                                                    <div className="col-md-4">
    
                                                        <div className="row">
                                                            <div className="col-md-2"><BsIcons.BsStar/></div>
                                                            <div className="col-md-10">15 Votes</div>
                                                        </div>
                                                        
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="row">
                                                            <div className="col-md-2"> <FaIcons.FaRegComment/></div>
                                                            <div className="col-md-10">8 Comments</div>
                                                        </div>  
                                                    </div>
                                                </div>          
                                                <div className="sum" style={{marginTop:'1.5em'}}>
                                                    {this.state.book.description.substring(0,350)}...
                                                </div>
                                                <a href="#" onClick={()=>{this.setState({fullDescription:true})}} style={{float:'right',marginTop:'-0.5em',marginRight:'1em'}}>See more</a>
    
                                                <div className="bt-con">
                                                    <input type="button" className="read-btn" value="Start reading "/>
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
                                            <img className="img" src={avatar} />
                                        </a>
                                    </div>
                                    <div className="card-body">
                                        <h6 className="card-category text-gray">Super user</h6>
                                        <h4 className="card-title">Mariana Serban</h4>
                                        <p className="card-description">
                                            Cate carti a incarcat
                                         </p>
                                        <a href="javascript:;" className="btn btn-primary btn-round">See profile</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                          <Tabs/>
                    </div>
                </div>
            )
        }
       
    }
}
