import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route} from 'react-router-dom';


export class userComponent extends Component {
  constructor(props){
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeCaption = this.onChangeCaption.bind(this);
    this.onChangeUrl = this.onChangeUrl.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      caption: '',
      url: '',
      users: [],
      userList: []
    }
  }

  componentDidMount(){
    axios.get('https://xmeme-mern.herokuapp.com/memes/')
      .then(response => {
        if (response.data.length > 0) {
          console.log(response.data);
          this.setState({
            userList: response.data,
            users: response.data.map(user => user.username),
            username: response.data[0].username
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeCaption(e) {
    //alert(e.target.value);
    this.setState({
      caption: e.target.value
    })
    //console.log(this.state.caption);
  }

  onChangeUrl(e) {
    this.setState({
      url: e.target.value
    })
    console.log(this.state.url);
  }

  onSubmit(e) {
    e.preventDefault();
    var i;
    //alert(user.url);
    try{
      for(i=0; i < this.state.userList.length; i++)
      {
        if(this.state.userList[i].url === this.state.url)
        {
          let meme_err = new Error("Meme already exists");
          meme_err.status = 409;
          throw meme_err;
        }
        else if(this.state.userList[i].username === this.state.username)
        {
          let user_err = new Error("User already exists");
          user_err.status = 409;
          throw user_err;
        }
      }
    }
    
    catch(err){
      alert(err,err.status);
      console.log(err.status);
      return (
        <Router>
          <Route path="/user" exact component={userComponent} />
        </Router>)
    }

    const user = {
      username: this.state.username,
      caption: this.state.caption,
      url: this.state.url
    }
    //alert(user.url);

      axios.post('https://xmeme-mern.herokuapp.com/memes/', user)
            .then(res => alert(res.data))
            .catch(err => alert('Error: ' + err));
              
      this.setState({
        username: '',
        caption: '',
        url: ''
      })
      window.location = '/';
  }

    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                <div className="form-group"> 
                    <label>Username: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                    />
                </div>
                <div className="form-group">
                <label>Caption: </label>
                    <textarea  type="text"
                        required
                        className="form-control"
                        value={this.state.caption}
                        onChange={this.onChangeCaption}
                    />
                </div>
                <div className="form-group">
                <label>Url: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        value={this.state.url}
                        onChange={this.onChangeUrl}
                    />
                </div>
                <div className="form-group">
                    <input type="submit" value="Upload Meme" className="btn btn-primary"/>
                </div>
                </form>
            </div>
        )
    }
}

export default userComponent;
