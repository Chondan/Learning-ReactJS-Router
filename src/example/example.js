import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Blogs from './blog';
import { NavElem } from '../components/components';

function NavBar() {
    return (
        <ul className="nav-bar">
            <Link to="/"><li>Home</li></Link>
            <Link to="/blogs"><li>Blogs</li></Link>
        </ul>
    );
}

function Example() {
    return (
        <>
            <Router>
                <NavBar />
                <Route exact={true} path="/" render={() => <NavElem type="Home" />} />
                <Route path="/blogs" component={Blogs} />
            </Router>
        </>
    );
}

export default Example;