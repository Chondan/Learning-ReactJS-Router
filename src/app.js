import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { GistsPage, NavElem  } from './components/components';
import Blogs from './example/blog';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gists: null,
        }
    }
    componentDidMount() {
        fetch("https://api.github.com/gists")
        .then(res => res.json())
        .then(gists => this.setState({ gists: gists }));
    }
    render() {
        return (
            <Router>
                <NavLinks />
                <Route exact={true} path="/Learning-ReactJS-Router" render={() => <NavElem type="Home" />}/>
                <Route path="/Learning-ReactJS-Router/gists" component={GistsPage} />
                <Route path="/Learning-ReactJS-Router/about" render={() => <NavElem type="About" />} />
                <Route path="/Learning-ReactJS-Router/blogs" component={Blogs} />
            </Router>
        );
    }
}

function NavLinks() {
    return (
        <div className="nav-bar-container">
            <nav className="nav-bar" style={{ display: "flex" }}>
                <Link style={{ textDecoration: "none" }} to="/Learning-ReactJS-Router"><h3>Home</h3></Link>
                <Link style={{ textDecoration: "none" }} to="/Learning-ReactJS-Router/about"><h3>About</h3></Link>
                <Link style={{ textDecoration: "none" }} to="/Learning-ReactJS-Router/gists"><h3>gists</h3></Link>
                <Link style={{ textDecoration: "none" }} to="/Learning-ReactJS-Router/blogs"><h3>Blogs</h3></Link>
            </nav>
        </div>
    );
}

export default App;