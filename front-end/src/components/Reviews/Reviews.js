import React, { Component } from 'react'
import img from '../../assets/park.svg'
import './Reviews.css'


export default class Reviews extends Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-8 mr-auto ml-auto">
                            <img className="img-rev" src={img}></img>
                            <br/>
                    </div>
                    <div className="col-md-8 mr-auto ml-auto">
                        <div style={{marginTop:'-3em'}}>It's a little empty here...</div>
                    </div>
                </div>
            </div>
        )
    }
}
