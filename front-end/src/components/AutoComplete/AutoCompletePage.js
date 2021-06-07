import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Autocomplete from './AutoComplete'
import Axios from 'axios'
import AuthService from "../../services/auth.service";
import "./AutoCompleteItem.css";
import CountriesList from './countries-list.json';

const API_URL = "http://localhost:8080/";

const AutocompletePage = (data) => {
    const [country, setcountry] = useState("");
    const [currentUser,setCurrentUser]=useState(AuthService.getCurrentUser())
    const [allBooks, setAllBooks]=useState([])
    const [freeBooks, setFreeBooks]=useState([])
    const [privateBooks, setPrivateBooks]=useState([])
    // useEffect(() => {
    //     Axios.get(API_URL + 'privateBooks/'+`${currentUser.id}`).then(
    //         res => {
    //           setPrivateBooks(res.data)
    //         }
    //     )
    //     Axios.get(API_URL + 'books').then(
    //         res => {
    //           setFreeBooks(res.data)
    //         }
    //     )

    //     setAllBooks(privateBooks.concat(freeBooks))
    //     console.log('FOR SEARCH', privateBooks)
    // });
    return (
        <>


            {/* <div className="row"> */}
                {/* <div className="col text-center"> */}
                    {/* <div className="d-flex justify-content-center mb-3"> */}
                        <div className="search-bar-container">
                            <Autocomplete
                                data={CountriesList}
                                onSelect={country => setcountry(country)}
                            />

                            <FontAwesomeIcon
                                icon="search"
                                className="search-bar-icon"
                                color='red'
                            />
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
