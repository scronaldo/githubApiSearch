import React from 'react';
import '../App.css';
import '../bootstrap.css';

const Header = (props) => {
    return (
        <nav className="navbar col-sm-12 navbar-expand-sm bg-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link text-success" href="https://github.com/scronaldo/githubApiSearch">Git source</a>
          </li>
        </ul>
      </nav>

    )
}

export default Header;
