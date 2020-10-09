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
                <Route exact={true} path="/" render={() => <NavElem type="Home" />}/>
                <Route path="/gists" component={GistsPage} />
                <Route path="/about" render={() => <NavElem type="About" />} />
                <Route path="/blogs" component={Blogs} />
            </Router>
        );
    }
}

function NavLinks() {
    return (
        <div className="nav-bar-container">
            <nav className="nav-bar" style={{ display: "flex" }}>
                <Link style={{ textDecoration: "none" }} to="/"><h3>Home</h3></Link>
                <Link style={{ textDecoration: "none" }} to="/about"><h3>About</h3></Link>
                <Link style={{ textDecoration: "none" }} to="/gists"><h3>gists</h3></Link>
                <Link style={{ textDecoration: "none" }} to="/blogs"><h3>Blogs</h3></Link>
            </nav>
        </div>
    );
}

export default App;