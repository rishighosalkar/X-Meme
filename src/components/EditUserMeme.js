import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route} from 'react-router-dom';

export class EditUserMeme extends Component {

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
            prevUrl: '',
            users: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8081/memes/'+this.props.match.params.id)
          .then(response => {
            this.setState({
              username: response.data.username,
              Caption: response.data.caption,
              Url: response.data.url,
              prevUrl: response.data.url
            })   
          })
          .catch(function (error) {
            console.log(error);
          })

          axios.get('http://localhost:8081/memes/')
                .then(response => {
            if (response.data.length > 0) {
            this.setState({
                users: response.data.map(user => user.username),
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
        try{
            if(this.state.prevUrl === this.state.url)
            {
                let err = new Error("Duplicate Url");
                err.status = 409;
                throw err;
            }
            else{
                const user = {
                    //username: this.state.username,
                    caption: this.state.caption,
                    url: this.state.url
                }
                //alert(this.state.url);
                console.log(user);
                axios.patch('http://localhost:8081/memes/update/' + this.props.match.params.id, user)
                      .then(res => console.log(res.data));
          
                window.location = '/';  
            }
        }
        catch(err){
            alert(err,err.status);
            console.log(err.status)
            //window.location = '/edit/' + this.props.match.params.id;
            return (
            <Router>
                <Route path="/edit/:id" exact component={EditUserMeme} />
            </Router>)
        }
    }
    render() {
        return (
            <div>
                <h3>Edit Meme</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Username: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                            disabled>
                            {
                                this.state.users.map(function(user) {
                                return <option 
                                    key={user}
                                    value={user}>{user}
                                    </option>;
                                })
                            }
                        </select>
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
                        <input type="submit" value="Update Meme" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}

export default EditUserMeme
