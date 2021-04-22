import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    render() {
      return (
        <nav className="navbar navbar-dark bg-primary navbar-expand-lg">
          <Link to="/" className="navbar-brand">ROJAK</Link>
          <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
            <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="navbar-item">
            <Link to="/createrojak" className="nav-link">Create Rojak</Link>
            </li>
            <li className="navbar-item">
            <Link to="/corpus" className="nav-link">Corpus</Link>
            </li>
            <li className="navbar-item">
            <Link to="/addSauce" className="nav-link">Add Sauce</Link>
            </li>
            <li className="navbar-item">
            <Link to="/aboutUs" className="nav-link">About Us</Link>
            </li>
          </ul>
          </div>
        </nav>
      );
    }
  }