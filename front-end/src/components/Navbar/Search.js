import React, { Component } from 'react'
import Navbar from './Navbar'
import AutocompletePage from '../AutoComplete/AutoCompletePage'

export default class Search extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                <div className="dash-content">
                    i will display search
                    <AutocompletePage/>
                </div>
            </div>
        )
    }
}
