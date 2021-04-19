import React, { Component } from 'react'
import Axios from 'axios'
import avatar from '../../assets/avatar.svg'
import './Users.css';
import $ from 'jquery';
import * as RiIcons from "react-icons/ri";
import * as GiIcons from "react-icons/gi";
import ReactPaginate from 'react-paginate';
import { toast } from "react-toastify";

const API_URL = "http://localhost:8080/";
toast.configure();

export default class Users extends Component {
  constructor(props) {
    super(props)

    this.onChangeSearchUsername = this.onChangeSearchUsername.bind(this);
    this.onChangeSearchFirstName = this.onChangeSearchFirstName.bind(this);
    this.onChangeSearchLastName = this.onChangeSearchLastName.bind(this);

    this.handlePageClick = this.handlePageClick.bind(this);

    this.state = {
      allUsers: [],
      bookId: JSON.parse(localStorage.getItem('bookId')),
      target: [],    //target with acces
      source: [],  //source without acces
      users: [],
      search: '',

      offset: 0,
      orgtableData: [],
      perPage: 5,
      currentPage: 0,

      isAllowed: true,
      isForbidden: true,

      filteredUsers:[],

      filter:false,

      searchUserName: '',
      searchFirstName: '',
      searchLastName: '',

      superUser:{}

    }
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
      users: slice
    })
  }

  arr_diff(b1, b2) {
    var res = b1.filter(item1 =>
      !b2.some(item2 => (item2.id === item1.id && item2.name === item1.name)))
    return res
  }

  checkExistence(vendors, obj) {
    var found = false;
    for (var i = 0; i < vendors.length; i++) {
      if (vendors[i].id == obj.id) {
        found = true;
        break;
      }
    }
    return found
  }

  onChange = (event) => {
    this.setState({
      source: event.source,
      target: event.target
    });
  }

  componentDidMount = () => {
    Axios.get(API_URL + 'superUser/'+`${this.state.bookId}`).then(
      res => {
        this.setState({ superUser: res.data });
        console.log(this.state.superUser)
      }
    )
    Axios.get(API_URL + 'users').then(
      res => {
        this.setState({ allUsers: res.data });
      }
    )
    Axios.get(API_URL + 'usersWithAcces/' + `${this.state.bookId}`).then(
      res => {
        this.setState({ target: res.data });
        this.state.allUsers.forEach(element => {
          if (this.checkExistence(this.state.target, element)) {
            let user = {
              id: element.id,
              userName: element.userName,
              email: element.email,
              role: element.role,
              firstName: element.firstName,
              lastName: element.lastName,
              thumbnail: element.thumbnail,
              availability: true
            }
            if (user.thumbnail == null) {
              user.thumbnail = avatar
            }
            if(user.id===this.state.superUser.id){
              
            }else{
              this.state.users.push(user);
            }
          } else {
            let user = {
              id: element.id,
              userName: element.userName,
              email: element.email,
              role: element.role,
              firstName: element.firstName,
              lastName: element.lastName,
              thumbnail: element.thumbnail,
              availability: false
            }
            if (user.thumbnail == null) {
              user.thumbnail = avatar
            }
            if(user.id===this.state.superUser.id){
              console.log('AM GASIT SUPER USER',user)

            }else{
              this.state.users.push(user);
            }
          }
        });

        var data = this.state.users
        var slice = this.state.users.slice(this.state.offset, this.state.offset + this.state.perPage)
        this.setState({
          pageCount: Math.ceil(this.state.users.length / this.state.perPage),
          orgtableData: res.data,
          orgtableData: data,
          users: slice
        })

      }
    )
  }

  render() {
 
    return (
      <div>
        <div class="row">
          <div class="col-md-12">
            <div class="card" style={{ backgroundColor: '#F3F3F4' }}>
              <div class="card-headera card-headera-primary">
                <h4 class="card-title ">Choose who can acces your book</h4>
                <p class="card-category">
                  {/* <input type="text"
                    onChange={this.onChangeSearch}
                    id="search" name="search" className="search-text"
                    placeholder="Search..." autoComplete="off" /> */}
                </p>
              </div>
              <div class="card-body">
                <div class="table-responsive">
                  <table className="table" id="myTable">
                    <thead class=" text">
                      <th>
                        THUMBNAIL
                                    </th>
                      <th>
                        USERNAME
                                    </th>
                      <th>
                        FIRST NAME
                                    </th>
                      <th>
                        LAST NAME
                                    </th>
                      <th>
                        ROLE
                                    </th>
                      <th>
                        ACCES
                                    </th>
                    </thead>
                    <tbody id="table-body">
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
                        
                        this.state.users.map(item =>
                        
                        <tr>

                          <td style={{ alignItems: 'center' }}>
                            <img className="imagine-user" src={item.thumbnail}></img>
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

                          <td id="acces">

                            {item.availability ?
                              <div className="acces-badge allowed"onClick={(e) => {
                                  e.preventDefault()
                                  Axios.delete(`${API_URL}removeAcces/${item.id}/${this.state.bookId}`)
                                        .then((res)=>{
                                          toast(`Acces for user ${item.userName} was removed succesfully!`)
                                        })

                                    let index = this.state.users.indexOf(item)
                                    let useri = [...this.state.users];
                                    let itemModif = { ...useri[index] };
                                    itemModif.availability = false;
                                    useri[index] = itemModif;
                                    this.setState({ users: useri });
        
                                    index = this.state.orgtableData.indexOf(item)
                                    useri = [...this.state.orgtableData]
                                    itemModif = { ...useri[index] }
                                    itemModif.availability = false;
                                    useri[index] = itemModif;
                                    this.setState({ orgtableData: useri });

                                
                              }}><GiIcons.GiCheckMark/>ALLOWED</div>
                              :

                              <div className="acces-badge forbidden"onClick={(e) => {
                                e.preventDefault();
                                Axios.post(`${API_URL}addAcces/${item.id}/${this.state.bookId}`,
                                  {
                                    headers: { "Content-Type": "application/json" }
                                  })
                                  .then((res) => {
                                    toast(`User ${item.userName} has acces on your book!`)

                                    return false;

                                  })
                                  .catch(error => {
                                    if (error.response !== undefined) {
                                    }
                                  });



                                let index = this.state.users.indexOf(item)
                                let useri = [...this.state.users];
                                let itemModif = { ...useri[index] };
                                itemModif.availability = true;
                                useri[index] = itemModif;
                                this.setState({ users: useri });

                                index = this.state.orgtableData.indexOf(item)
                                useri = [...this.state.orgtableData]
                                itemModif = { ...useri[index] }
                                itemModif.availability = true;
                                useri[index] = itemModif;
                                this.setState({ orgtableData: useri });



                              }}><RiIcons.RiForbid2Line/> FORBIDDEN</div>}
                          </td>

                        </tr>
                        )
                      : 
                    this.state.filteredUsers.map(item =>            
                              <tr>

                                <td style={{ alignItems: 'center' }}>
                                  <img className="imagine-user" src={item.thumbnail}></img>
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

                                <td id="acces">

                                  {item.availability ?
                                    <div className="acces-badge allowed" onClick={(e) => {

                                      e.preventDefault()
                                      Axios.delete(`${API_URL}removeAcces/${item.id}/${this.state.bookId}`)
                                        .then((res)=>{
                                          toast(`Acces for user ${item.userName} was removed succesfully!`)

                                        })


                                          let index = this.state.filteredUsers.indexOf(item)
                                          let useri = [...this.state.filteredUsers];
                                          let itemModif = { ...useri[index] };
                                          itemModif.availability = false;
                                          useri[index] = itemModif;
                                          this.setState({ filteredUsers: useri });
              
                                          index = this.state.orgtableData.indexOf(item)
                                          useri = [...this.state.orgtableData]
                                          itemModif = { ...useri[index] }
                                          itemModif.availability = false;
                                          useri[index] = itemModif;
                                          this.setState({ orgtableData: useri });


                                    }}><GiIcons.GiCheckMark/>ALLOWED</div>
                                    :

                                    <div className="acces-badge forbidden" onClick={(e) => {
                                      e.preventDefault();
                                      Axios.post(`${API_URL}addAcces/${item.id}/${this.state.bookId}`,
                                        {
                                          headers: { "Content-Type": "application/json" }
                                        })
                                        .then((res) => {
                                          toast(`User ${item.userName} has acces on your book!`)

                                          return false;
                                        })
                                        .catch(error => {
                                          if (error.response !== undefined) {
                                          }
                                        });

                                        let index = this.state.filteredUsers.indexOf(item)
                                        let useri = [...this.state.filteredUsers];
                                        let itemModif = { ...useri[index] };
                                        itemModif.availability = true;
                                        useri[index] = itemModif;
                                        this.setState({ filteredUsers: useri });
            
                                        index = this.state.orgtableData.indexOf(item)
                                        useri = [...this.state.orgtableData]
                                        itemModif = { ...useri[index] }
                                        itemModif.availability = true;
                                        useri[index] = itemModif;
                                        this.setState({ orgtableData: useri });



                                    }}><RiIcons.RiForbid2Line/>FORBIDDEN</div>}
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
    )
  }
}
