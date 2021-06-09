import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Autocomplete from './AutoComplete'
import Axios from 'axios'
import { useHistory } from "react-router-dom";
import AuthService from "../../services/auth.service";
import "./AutoCompleteItem.css";
import CountriesList from './countries-list.json';
import { FaListAlt } from "react-icons/fa";

const API_URL = "http://localhost:8080/";

const AutocompletePage = (props) => {
    const list=props.list
    const [country, setcountry] = useState("");
    const [currentUser,setCurrentUser]=useState(AuthService.getCurrentUser())
    const [allBooks, setAllBooks]=useState([])
    const [freeBooks, setFreeBooks]=useState([])
    const [privateBooks, setPrivateBooks]=useState([])
    // useEffect(() => {
    //     Axios.get(API_URL + 'privateBooks/'+`${currentUser.id}`).then(
    //         res => {
    //           setPrivateBooks(res.data)
    //           //console.log('PRIVATE', privateBooks)
    //         }
    //     )
    //     Axios.get(API_URL + 'books').then(
    //         res => {
    //           setFreeBooks(res.data)
    //           console.log('Free', freeBooks)
    //         }
    //     )
    //     let all=privateBooks.concat(freeBooks)
    //     setAllBooks(all)
    //     console.log('FOR SEARCH', privateBooks)
    // });
    return (
        <>


            {/* <div className="row"> */}
                {/* <div className="col text-center"> */}
                    {/* <div className="d-flex justify-content-center mb-3"> */}
                        <div className="search-bar-container">
                            {/* <Autocomplete
                                data={CountriesList}
                                onSelect={country => setcountry(country)}
                            /> */}

                            <Autocomplete
                                data={list}
                                onSelect={country => setcountry(country)}
                            />
                        
                            {/* {country && (
                                 history.push({
                                    pathname: "/bookDetail",
                                    state: {item:country}
                                 })

                            )} */}
                            {/* <FontAwesomeIcon
                                icon="search"
                                className="search-bar-icon"
                                color='red'
                            /> */}
                        </div>
                    {/* </div> */}

                    {/* {country && (
                        <pre className="text-left">
                            {JSON.stringify(country, 0, 2)}
                        </pre>
                    )} */}
                {/* </div> */}
            {/* </div> */}
        </>
    );
};

export default AutocompletePage;
