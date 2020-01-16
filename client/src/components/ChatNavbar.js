import React from "react";
import {Nav, Navbar} from "react-bootstrap";
import {LogoutForm} from "./LogoutForm";

export default function ChatNavbar(props) {
        return (
            <Navbar bg="dark" expand="lg">
                <Navbar.Brand href="#home">AsChat</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/chat">Chat</Nav.Link>
                        <Nav.Link href="/randchat">Random Chat</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <LogoutForm username={props.username}/>
            </Navbar>
        );
}

