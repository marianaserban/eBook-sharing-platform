import { useState } from "react";
import './Tabs.css'
import Reviews from '../Reviews/Reviews'
import AddReview from '../Reviews/AddReview'
import Users from "../Users/Users";
import * as MdIcons from "react-icons/md";
import * as GrIcons from "react-icons/gr";
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";


function Tabs() {
    const [toggleState, setToggleState] = useState(1);
    const toggleTab = (index) => {
      setToggleState(index);
    };

  
    return (
      <div className="row">
            <div className="card card-nav-tabs card-tab">
            <div className="card-header card-header-primary">
                <div className="nav-tabs-navigation">
                    <div className="nav-tabs-wrapper">
                        <ul className="nav nav-tabs" data-tabs="tabs">
                            <li className="nav-item">
                                <a className="nav-link" className={toggleState === 1 ? "tabs active-tabs" : "tabs"}onClick={() => toggleTab(1)}>
                                    <i className="material-icons"> <MdIcons.MdRateReview/></i> 
                                        Reviews
                                    <div className="ripple-container"></div>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link"  className={toggleState === 2 ? "tabs active-tabs" : "tabs"}onClick={() => toggleTab(2)}>
                                    <i className="material-icons"> <IoIcons.IoIosAddCircleOutline/></i> 
                                        Add review
                                    <div className="ripple-container"></div>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link"       className={toggleState === 3 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(3)} >
                                    <i className="material-icons"> <FaIcons.FaUsers/></i> 
                                        Available to
                                    <div className="ripple-container"></div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="card-body">      
                <div className="content-tabs">
                    <div
                        className={toggleState === 1 ? "content  active-content" : "content"}>
                        <Reviews/>
                    </div>
            
                    <div
                        className={toggleState === 2 ? "content  active-content" : "content"}>
                        <AddReview/>
                    </div>
            
                    <div
                        className={toggleState === 3 ? "content  active-content" : "content"}>
                        <Users/>
                    </div>
                </div>
            </div>
        </div>
    </div>

    );
  }
  
  export default Tabs;
  