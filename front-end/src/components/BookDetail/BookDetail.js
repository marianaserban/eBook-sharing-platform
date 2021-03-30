import React, { Component } from 'react'
import Navbar from '../Navbar/Navbar'
import './BookDetail.css'
import avatar from '../../assets/avatar.svg'
import mariana from '../../assets/mariana.jpg'

export default class BookDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            book: {}
        }

        this.state.book = this.props.location.state.item
    }
    render() {
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

                                    {/* <div className="col-md-4"style={{backgroundColor: "red"}} > */}
                                        {/* <div className="imagine-detail"> */}
                                            <img className="imagine-detail" src={this.state.book.picture}></img>
                                        {/* </div> */}
                                    {/* </div> */}
                                    {/* <div className="col-md-4" style={{backgroundColor:"orange"}}> */}

                                    {/* </div> */}
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
                </div>
            </div>
        )
    }
}
