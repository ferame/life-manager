import React from "react"
import { Navbar } from "react-bootstrap";

type Props = {

};

export const TopMenuBar: React.FC<Props> = props => {
    // const {} = props;
    // return <li>content</li>;
    return (
        <nav className="navbar navbar-light">
            <ul className="nav navbar-nav pull-xs-right">

            <li className="nav-item">
            <div className="nav-link">
                Home
            </div>
            </li>

            <li className="nav-item">
            <div className="nav-link">
                <i className="ion-compose"></i>&nbsp;New Post
            </div>
            </li>

            <li className="nav-item">
            <div className="nav-link">
                <i className="ion-gear-a"></i>&nbsp;Settings
            </div>
            </li>

            <li className="nav-item">
            <div
                className="nav-link">
                <i className="ion-gear-a"></i>&nbsp;User
            </div>
            </li>

            </ul>
        </nav>
        // <Navbar bg="dark" variant="dark">
        //     <Navbar.Brand>LifeManager</Navbar.Brand>
        // </Navbar>
    )
};
