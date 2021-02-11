import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class NavbarComponent extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">XMemes</Link>
                    <div className="collpase navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                            <Link to="/user" className="nav-link">Upload Meme</Link>
                            </li>
                        </ul>
                    </div>
            </nav>
        )
    }
}

export default NavbarComponent
