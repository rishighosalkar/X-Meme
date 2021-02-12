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
    axios.get('http://localhost:8081/memes/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            userList: response.data,
            users: response.data.map(user => user.username)
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }
  /*componentDidMount = () =>{
    this.getUserPost();
  }

  getUserPost = () => {
    axios.get('http://localhost:8081/memes/')
      .then((response) => {
        const data = response.data;
        this.setState({ users: data });
        console.log('Data has been received!!' + this.state.users[0]);
      })
      .catch(() => {
        alert('Error retrieving data!!!');
      });
  }*/
    
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeCaption(e) {
    this.setState({
      caption: e.target.value
    })
  }

  onChangeUrl(e) {
    this.setState({
      url: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    var i;
    const user = {
      username: this.state.username,
      caption: this.state.caption,
      url: this.state.url
    }
    try{
      for(i=0; i < this.state.userList.length; i++)
      {
        if(this.state.userList[i].url === this.state.url || this.state.userList[i].caption === this.state.caption)
        {
          let err = new Error("Meme already exists");
          err.status = 409;
          throw err;
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
    
    console.log(user);

    axios.post('http://localhost:8081/memes/add', user)
          .then(res => {console.log(res.data);});
          //.then(()=>{this.getUserPost();})
            
    this.setState({
      username: '',
      caption: '',
      url: ''
    })
    window.location = '/';
  }
/* Display user on same page
  displayUserPost = (posts) => {
    const style = {
      width: '50%',
      height: '200px'
    }

    if (!posts.length) return null;
        
    const post = posts.sort((a,b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    console.log(posts);
    return post.map((poste, index) => (
      //post.sort((a,b) => a.updatedAt - b.updatedAt);
      <div key={index} className="blog-post__display">
      <h4>{poste.username}</h4>
      <h4>{poste.caption}</h4>
      <img style ={style} src = {poste.url} alt = ''/>
      </div>
    ));
  };
*/

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
                    <input type="submit" value="Upload Meme" className="btn btn-primary" />
                </div>
                </form>
                <div className="blog-">
                    {/*this.displayUserPost(this.state.users)*/}
                </div>
            </div>
        )
    }
}

export default userComponent;
