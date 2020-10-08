import React, { useEffect, useState } from 'react';
import { Link, Route } from 'react-router-dom';

export function Main(props) {
    return (
        <div className="main">
            {props.children}
        </div>
    );
}

export function Sidebar(props) {
    return (
            <div className="sidebar">
                {props.children}
            </div>
    )
}

export function SidebarItem(props) {
    return (
        <Link
            to={`/gists/${props.gist.id}`}
        >
            <div title={props.gist.description} className="sidebar-item">{props.gist.description || "no description"}</div>
        </Link>
    );
}

export function GistComponent({ match, ...props }) {
    const { gist } = props;
    return (
        <div style={{ padding: "20px" }}>
            {gist && (
                <React.Fragment>
                    <h1>{gist.description || "No Description"}</h1>
                    <ul>
                        {Object.keys(gist.files).map((key, index) => (
                            <li key={gist.id+index}>
                                <b>{key}</b>
                                <Loadfile url={gist.files[key].raw_url}>
                                    {txt => <pre>{txt}</pre>}
                                </Loadfile>
                            </li>
                        ))}
                    </ul>
                </React.Fragment>
            )}
        </div>
    );
}

function Loadfile({ url, ...props }) {
    const [txtFile, setTextFile] = useState("");
    useEffect(() => {
        fetch(url)
        .then(res => res.text())
        .then(txt => setTextFile(txt));
    });
    return txtFile && props.children(txtFile);
    ;
}

export class GistsPage extends React.Component {
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
            <div className="app">
                <Sidebar>
                    {this.state.gists ? 
                        this.state.gists.map(gist => (
                            <SidebarItem key={gist.id+Date.now()} gist={gist} />
                        )) : <div>Loading...</div>
                    }
                </Sidebar>
                <Main>
                    <Route exact={true} path="/gists" render={() => (
                        <NavElem type="Welcome" />
                    )} />
                    {this.state.gists && (
                        <Route path="/gists/:gistId" render={({ match }) => 
                            <GistComponent gist={this.state.gists.find(g => g.id === match.params.gistId)} />} 
                        />
                    )}
                </Main>
            </div>
        );
    }
}

export const NavElem = ({ type }) => (
    <div style={{ padding: "20px" }}>
        <h1>{type}</h1>
    </div>
);