import React, { Component } from 'react'
import Axios from 'axios'
import avatar from '../../assets/avatar.svg'
import './Users.css';
import $ from 'jquery';

const API_URL = "http://localhost:8080/";

export default class Users extends Component {
    constructor(props){
        super(props)

        this.searchByUserName = this.searchByUserName.bind(this);


        this.state={
            allUsers:[],
            bookId: JSON.parse(localStorage.getItem('bookId')),
            target:[],    //target with acces
            source:[],  //source without acces
            users:[],
            search:''
        }
    }
    arr_diff(b1, b2){
        var res = b1.filter(item1 => 
            !b2.some(item2 => (item2.id === item1.id && item2.name === item1.name)))
            return res
    }
    checkExistence(vendors, obj){
        var found = false;
        for(var i = 0; i < vendors.length; i++) {
            if (vendors[i].id == obj.id) {
                found = true;
                break;
            }
        }
        return found
    }

    onChange = (event)=>{
        this.setState({
			source: event.source,
			target: event.target
		});
    }
    componentDidMount = () => {
        Axios.get(API_URL + 'users').then(
            res => {
                this.setState({ allUsers: res.data});
            }
        )
        Axios.get(API_URL + 'usersWithAcces/'+`${this.state.bookId}`).then(
            res => {
                this.setState({ target: res.data});
               // this.setState({source:this.arr_diff(this.state.allUsers,this.state.target)})
               this.state.allUsers.forEach(element => {
                   if(this.checkExistence(this.state.target,element)){
                       let user={
                           id:element.id,
                           userName:element.userName,
                           email:element.email,
                           role:element.role,
                           firstName:element.firstName,
                           lastName:element.lastName,
                           thumbnail:element.thumbnail,
                           availability:true
                       }
                       if(user.thumbnail==null){
                           user.thumbnail=avatar
                       }
                       this.state.users.push(user);
                   }else{
                    let user={
                        id:element.id,
                        userName:element.userName,
                        email:element.email,
                        role:element.role,
                        firstName:element.firstName,
                        lastName:element.lastName,
                        thumbnail:element.thumbnail,
                        availability:false
                    }
                        if(user.thumbnail==null){
                            user.thumbnail=avatar
                        }
                        this.state.users.push(user);
                   }
               });
            }
        )
        

        
    }
    searchByUserName=()=>{
            // Declare variables 
            var input, filter, table, tr, td, i;
            input = document.getElementById("searchUserName");
            filter = input.value.toUpperCase();
            table = document.getElementById("myTable");
            tr = table.getElementsByTagName("tr");

            // Loop through all table rows, and hide those who don't match the search query
            for (let i = 1; i < tr.length; i++) {
                td = tr[i].getElementsByTagName("td")
                for(let j=0 ; j<td.length ; j++)
                {
                let tdata = td[j] ;
                if (tdata) {
                    if (tdata.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                    break ; 
                    } else {
                    tr[i].style.display = "none";
                    }
                } 
                }
            }
    }

    searchByFirstName=()=>{
        var input, filter, table, tr, td, i;
        input = document.getElementById("searchFirstName");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
        for (let i = 1; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")
            for(let j=0 ; j<td.length ; j++)
            {
            let tdata = td[j] ;
            if (tdata) {
                if (tdata.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
                break ; 
                } else {
                tr[i].style.display = "none";
                }
            } 
            }
        }
    }

    searchByLastName=()=>{
        var input, filter, table, tr, td, i;
        input = document.getElementById("searchLastName");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
        for (let i = 1; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")
            for(let j=0 ; j<td.length ; j++)
            {
            let tdata = td[j] ;
            if (tdata) {
                if (tdata.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
                break ; 
                } else {
                tr[i].style.display = "none";
                }
            } 
            }
        }
    }

    render() {
        return (
            <div>               
                    <div class="row">
                    <div class="col-md-12">
                    <div class="card" style={{backgroundColor:'#F3F3F4'}}>
                        <div class="card-headera card-headera-primary">
                        <h4 class="card-title ">Choose who can acces your book</h4>
                        <p class="card-category"> 

                            

                        </p>
                        </div>
                        <div class="card-body">
                        <div class="table-responsive">
                            <table className="table" id="myTable">
                            <thead class=" text">
                                <th>
                                Thumbnail
                                </th>
                                <th>
                                Username
                                </th>
                                <th>
                                First name
                                </th>
                                <th>
                                Last name
                                </th>
                                <th>
                                Role
                                </th>
                                <th>
                                Availability
                                </th>
                            </thead>
                            <tbody>
                                 <tr>
                                    <td>

                                    </td>
                                    <td id="usersTable">
                                        <input type="search" onKeyUp={this.searchByUserName} id="searchUserName" name="searchLastName" className="search-text" placeholder="Search by username" autoComplete="off" />

                                    </td>
                                    <td>
                                        <input type="search"  onKeyUp={this.searchByFirstName} id="searchFirstName" name="searchLastName" className="search-text" placeholder="Search by first name" autoComplete="off" />

                                    </td>
                                    <td>
                                        <input type="search" onKeyUp={this.searchByLastName} id="searchLastName" name="searchLastName" className="search-text" placeholder="Search by last name" autoComplete="off" />
                                    </td>
                                    <td>

                                    </td>
                                    <td>

                                    </td>
                                </tr> 
                           

                            {this.state.users.map(item =>  

                                    <tr>

                                    <td style={{alignItems:'center'}}>
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
                                        {item.role}
                                    </td>
                               
                                     <td id="acces">

                                     {item.availability ? 
                                        <div style={{color:'green'}}>ALLOWED</div> 
                                        : <div style={{color:'red'}}>FORBIDDEN</div>}
                                       
                                    </td> 
                                    </tr>
                                 )}
                        
                            </tbody>
                            </table>
                        </div>
                        </div>
                    </div>
                    </div>
                    </div>
            </div>
        )
    }
}
