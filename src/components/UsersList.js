import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const User = props => (
    <tr>
      <td>{props.user.username}</td>
      <td>{props.user.caption}</td>
      <td><img style={{display:'flex',flexDirection:'row',height:'300px', width:'300px'}} src={props.user.url} alt =''/></td>
      <td>
        <Link to={"/edit/"+props.user._id}>edit</Link> | <a href="#" onClick={() => { props.deleteUser(props.user._id) }}>delete</a>
      </td>
    </tr>
  )


export class UsersList extends Component {

    constructor(props) {
        super(props);
    
        this.deleteUser = this.deleteUser.bind(this)
    
        this.state = {users: []};
    }
      
    componentDidMount() {
        axios.get('http://localhost:8081/memes/')
        .then(response => {
            this.setState({ users: response.data })
        })
        .catch((error) => {
            console.log(error);
        })
    }

    deleteUser(id) {
        axios.delete('http://localhost:8081/memes/'+id)
          .then(response => { console.log(response.data)});
    
        this.setState({
          users: this.state.users.filter(el => el._id !== id)
        })
    }

    userList() {
        const sortUser = this.state.users.sort((a,b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        console.log(sortUser)
        return sortUser.sort((a,b) => new Date(b.updatedAt) - new Date(a.updatedAt)).map(currentuser => {
          return <User user={currentuser} deleteUser={this.deleteUser} key={currentuser._id}/>;
        })
      }

    render() {
        return (
            <div>
                <h3>Logged Memes</h3>
                <table className="table">
                <thead className="thead-light">
                    <tr>
                    <th>Username</th>
                    <th>Caption</th>
                    <th>Meme</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { this.userList() }
                </tbody>
                </table>
            </div>
        )
    }
}

export default UsersList
/* 
<td>{props.user.username}</td>
      <td>{props.user.caption}</td>
      */