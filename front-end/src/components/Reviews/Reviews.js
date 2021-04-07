import React, { Component } from 'react'
import * as IoIcons from "react-icons/io";
import './Reviews.css'
import Animation from './Animation'

export default class Reviews extends Component {
    render() {
        return (
           // daca nu avem review-uri
            <div>
                <div className="row">
                    <div className="col-md-8 mr-auto ml-auto">
                            {/* <img className="img-rev" src={img}></img> */}
                            <div className="anim">
                                <Animation />
                            </div>
                    </div>
                    <div className="col-md-8 mr-auto ml-auto">
                        <div>It's a little empty here...
                            <button className="bt-rev" onClick={()=>{alert('a')}}>
                                     <IoIcons.IoIosAdd/> 
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            //daca avem
            // <div>
                
            // </div>
        )
    }
}
