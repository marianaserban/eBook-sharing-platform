import React, { Component } from 'react'
import Axios from 'axios'
import avatar from '../../assets/avatar.svg'
// import 'primereact/resources/themes/md-light-indigo/theme.css';
// import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';
import { PickList } from 'primereact/picklist';
import './Users.css';

const API_URL = "http://localhost:8080/";

export default class Users extends Component {
    constructor(props){
        super(props)

        this.state={
            allUsers:[],
            bookId: JSON.parse(localStorage.getItem('bookId')),
            target:[],    //target with acces
            source:[],  //source without acces
        }
    }
    arr_diff(b1, b2){
        var res = b1.filter(item1 => 
            !b2.some(item2 => (item2.id === item1.id && item2.name === item1.name)))
            return res
    }

    onChange = (event)=>{
        this.setState({
			source: event.source,
			target: event.target
		});
    }

    itemTemplate=(item)=>{
        return (
            <div className="product-item">
                <div className="image-container">
                    <img src={`showcase/demo/images/product/${item.thumbnail}`} 
                    onError={(e) => e.target.src='/uploads/avatar.svg'} alt={item.name} />
                    {/* <img src={avatar}></img> */}
                </div>
                <div className="product-list-detail">
                    <h5 className="p-mb-2">{item.firstName} {item.lastName}</h5>
                    <i className="pi pi-user product-category-icon"></i>
                    <span className="product-category">{item.role}</span>
                </div>
                <div className="product-list-action">
                    <h6 className="p-mb-2">{item.ursername}</h6>
                    <span className={`product-badge status-${item.role.toLowerCase()}`}>{item.role}</span>
                </div>
            </div>
        );
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
                this.setState({source:this.arr_diff(this.state.allUsers,this.state.target)})
            }
        )
      
    }

    render() {
        return (
            <div>
                <div className="picklist-demo">
                    <div className="card" style={{padding:'2em'}}>
                        <PickList source={this.state.source} target={this.state.target} 
                            itemTemplate={this.itemTemplate}
                            sourceHeader="Forbidden" targetHeader="Allowed"
                            sourceStyle={{ height: '342px' }} targetStyle={{ height: '342px' }}
                            onChange={this.onChange}></PickList>
                    </div>
                </div>

            </div>
        )
    }
}
