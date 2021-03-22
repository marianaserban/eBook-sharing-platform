import React, { useState } from 'react'
import './Navbar.css'
import { IconContext } from 'react-icons';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as FiIcons from "react-icons/fi";
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { SidebarData } from '../Navbar/SlidebarData';
import AuthService from "../../services/auth.service";

function Navbar(){
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);
    
    let history = useHistory();
    const logOut=()=>{
      AuthService.logout();
      history.push('/')
    }

    return(
        <>
        <IconContext.Provider value={{color:'#333333'}}>
            <div className="navbar">

              <div className="column left">
                    <Link to="#" className="menu-bars">
                    < FaIcons.FaBars onClick={showSidebar} />
                    </Link>
              </div>

              <div className="column middle">
                   <form action="#" role="search">
                     <input type="submit" hidden className="search-submit" /> 
                     <input type="search" name="q" className="search-text" placeholder="Search..." autoComplete="off" />
                    </form>
              </div>

              <div className="column right">
                {/* <Link to="/" className="log-out menu-bars"> */}
                    <FiIcons.FiLogOut className="log-out menu-bars" onClick={logOut}/>
                {/* </Link>   */}
              </div>

              <div className="column right-after">
                {/* <Link to="/" className="log-out menu-bars"> */}
                    Logout
                {/* </Link>   */}
              </div>                
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose/>
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
            </nav>
        </IconContext.Provider>
        </>
    );
}
export default Navbar
