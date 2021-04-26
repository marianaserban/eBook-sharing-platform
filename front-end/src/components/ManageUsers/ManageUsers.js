import React, { Component } from 'react'
import Axios from 'axios'
import AuthService from "../../services/auth.service";
import Navbar from '../Navbar/Navbar'
import './ManageUsers.css'
import ReactPaginate from 'react-paginate';
import avatar from '../../assets/avatar.svg'
import Dropdown from 'react-bootstrap/Dropdown'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'

const API_URL = "http://localhost:8080/";

export default class ManageUsers extends Component {
    constructor(props){

        super(props)

        this.onChangeSearchUsername = this.onChangeSearchUsername.bind(this);
        this.onChangeSearchFirstName = this.onChangeSearchFirstName.bind(this);
        this.onChangeSearchLastName = this.onChangeSearchLastName.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);

        this.state={
            allUsers:[],
            offset: 0,
            orgtableData: [],
            perPage: 5,
            currentPage: 0,
            filteredUsers:[],
            filter:false,
            searchUserName: '',
            searchFirstName: '',
            searchLastName: '',
        }
    }
    handlePageClick = (e) => {
      const selectedPage = e.selected;
      const offset = selectedPage * this.state.perPage;
  
      this.setState({
        currentPage: selectedPage,
        offset: offset
      }, () => {
        this.loadMoreData()
      });
  
    };
  
    loadMoreData() {
      const data = this.state.orgtableData;
      const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
      this.setState({
        pageCount: Math.ceil(data.length / this.state.perPage),
        allUsers: slice
      })
    }

    filterUserName=(name)=>{
      this.setState({
          filteredUsers:this.state.orgtableData.filter(user=>{
         return user.userName.toUpperCase().includes(name.toUpperCase())
          })
      })
    }
  
    filterFirstName=(name)=>{
      this.setState({
          filteredUsers:this.state.orgtableData.filter(user=>{
         return user.firstName.toUpperCase().includes(name.toUpperCase())
          })
      })
    }
  
    filterLastName=(name)=>{
      this.setState({
          filteredUsers:this.state.orgtableData.filter(user=>{
         return user.lastName.toUpperCase().includes(name.toUpperCase())
          })
      })
    } 
  
    onChangeSearchUsername(e) {
      this.filterUserName(e.target.value)
      this.setState({
        searchUserName: e.target.value,
        filter:true
      });
      if(e.target.value.length===0){
        this.setState({
          filter:false
        });
      }
    }
  
    onChangeSearchFirstName(e) {
      this.filterFirstName(e.target.value)
      this.setState({
        searchFirstName: e.target.value,
        filter:true
      });
      if(e.target.value.length===0){
        this.setState({
          filter:false
        });
      }
    }
  
    onChangeSearchLastName(e) {
      this.filterLastName(e.target.value)
      this.setState({
        searchLastName: e.target.value,
        filter:true
      });
      if(e.target.value.length===0){
        this.setState({
          filter:false
        });
      }
    }
    componentDidMount(){

        Axios.get(API_URL + 'users').then(
            res => {
              this.setState({ allUsers: res.data });
              var data = this.state.allUsers
              var slice = this.state.allUsers.slice(this.state.offset, this.state.offset + this.state.perPage)
              this.setState({
                pageCount: Math.ceil(this.state.allUsers.length / this.state.perPage),
                orgtableData: res.data,
                orgtableData: data,
                allUsers: slice
              })
            }
        )
    }
    render() {
        return (
            <div>
                <Navbar />
                <div className="dash-content">
                    <div className="row">
                      <div className="card">
                        <div className="col-md-12">
                          <div class="card-headera card-headera-primary">
                            <h4 class="card-title ">Manage users app</h4>
                            <p className="card-category"></p>
                          </div>
                          <div className="card-body">
                            <div className="table-responsive">
                              <table className="table">
                                <thead className="text">
                                  <th>THUMBNAIL</th>
                                  <th>USERNAME</th>
                                  <th>FIRST NAME</th>
                                  <th>LAST NAME</th>
                                  <th>ROLE</th>
                                  <th>ACTION</th>
                                </thead>
                                <tbody>
                                  <tr>
                                  <td>
                                  </td>
                                  <td id="usersTable">
                                    <input type="search" onChange={this.onChangeSearchUsername}name="searchUserName" className="search-text" placeholder="Search by username" autoComplete="off" />
                                  </td>
                                  <td>
                                    <input type="search" onChange={this.onChangeSearchFirstName} name="searchFirstName" className="search-text" placeholder="Search by first name" autoComplete="off" />
                                  </td>
                                  <td>
                                    <input type="search"  onChange={this.onChangeSearchLastName} name="searchLastName" className="search-text" placeholder="Search by last name" autoComplete="off" />
                                  </td>
                                  <td>
                                  </td>
                                  <td>
                                  </td>
                                </tr>
                                  {!this.state.filter ?

                                      this.state.allUsers.map(item=>
                                        <tr>
                                          <td style={{ alignItems: 'center' }}>
                                            {item.thumbnail ? <img className="imagine-user" src={item.thumbnail}></img> : <img className="imagine-user" src={avatar}></img>}
                                          </td>
                                          <td>
                                            <div>{item.userName}</div>
                                          </td>
                                          <td>
                                            {item.firstName}
                                          </td>
                                          <td>
                                            {item.lastName}
                                          </td>

                                          <td >
                                            {(item.role==="user"&&
                                                  <div className="acces-badge user">user</div>)
                                              || (item.role==="superuser" &&
                                                  <div className="acces-badge super-user">super-user</div>)
                                              || (item.role==="admin" &&
                                                  <div className="acces-badge admin">admin</div>)
                                            } 
                                          </td>
                                          
                                          <td>

                                          <Dropdown as={ButtonGroup}>
  <Button variant="success">Split Button</Button>

  <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

  <Dropdown.Menu>
    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
                                          
                                          </td>
                                        </tr>

                                      )
                                  
                                    :

                                    this.state.filteredUsers.map(item=>
                                      <tr>
                                      <td style={{ alignItems: 'center' }}>
                                        {item.thumbnail ? <img className="imagine-user" src={item.thumbnail}></img> : <img className="imagine-user" src={avatar}></img>}
                                      </td>
                                      <td>
                                        <div>{item.userName}</div>
                                      </td>
                                      <td>
                                        {item.firstName}
                                      </td>
                                      <td>
                                        {item.lastName}
                                      </td>
                                    
                                      <td>
                                        {(item.role==="user"&&
                                              <div className="acces-badge user">user</div>)
                                          || (item.role==="superuser" &&
                                              <div className="acces-badge super-user">super-user</div>)
                                          || (item.role==="admin" &&
                                              <div className="acces-badge admin">admin</div>)
                                        } 
                                      </td>
                                      <td>
                                     
                                      </td>
                                    </tr>
                                      )
                                    }
                                  
                                </tbody>
                              </table>
                              <ReactPaginate
                                previousLabel={"Prev"}
                                nextLabel={"Next"}
                                breakLabel={"..."}
                                breakClassName={"break-me"}
                                pageCount={this.state.pageCount}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={this.handlePageClick}
                                containerClassName={"pagination"}
                                subContainerClassName={"pages pagination"}
                                activeClassName={"active-pg"} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
        )
    }
}
