import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from 'react-router-dom';

import UserComponent from './components/UserComponent';
import EditUserMeme from './components/EditUserMeme';
import Navbar from './components/NavbarComponent';
import UsersList from './components/UsersList';

function App() {
  return (
    //<UserComponent />
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={UsersList} />
      <Route path="/edit/:id" exact component={EditUserMeme} />
      <Route path="/user" exact component={UserComponent} />
      </div>
    </Router>
  );
}

export default App;