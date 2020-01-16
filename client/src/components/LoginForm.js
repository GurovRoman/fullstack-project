import React from "react";

import {store} from "../index";
import {setJwtToken, setUsername} from "../actions";
import {Alert, Button, Form, FormControl, FormGroup, ToastBody} from "react-bootstrap";
import {connect} from "react-redux";

class _LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password:'',
            error:'',
            errorVisible: false
        }
    }

    onSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();

        this.setState({errorVisible: false});

        fetch("http://localhost:8080/api/login", {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({"username" : this.props.username, "password" : this.state.password})
            }
        ).then(
            (result) => {
                if (result.status === 401) {
                    this.setState({error:"Incorrect password or username already taken",
                                         errorVisible: true})
                }
                else if (result.status !== 200) {

                    this.setState({error:"Unknown error",
                        errorVisible: true})
                }
                else {
                    result.json().then((result) => {
                        console.log(result);
                        store.dispatch(setJwtToken(result));
                    });
                }
            }
        )
    };

    onClose = (event) => {
        this.setState({errorVisible:false})
    };

    render() {
        return (
            <div>
                <Form onSubmit={this.onSubmit}>
                    <FormGroup>
                        <FormControl
                            type="text"
                            required
                            minLength={3}
                            maxLength={12}
                            placeholder="Enter a username"
                            onChange={(event) => store.dispatch(setUsername(event.target.value))}
                            value={this.props.username}/>
                    </FormGroup>
                    <FormGroup>
                        <FormControl
                            type="password"
                            required
                            minLength={6}
                            maxLength={40}
                            placeholder="Enter password"
                            onChange = {(event) => this.setState({password:event.target.value})}
                            value={this.state.password}/>
                    </FormGroup>
                    <Button type="submit">Login/Register</Button>
                </Form>
                <div style={{
                        position: 'fixed',
                        bottom: 0,
                        right: 0,
                    }}>
                    <Alert
                           style={{margin: 16}}
                           variant="danger"
                           dismissible
                           onClose={this.onClose}
                           show={this.state.errorVisible}>
                        <Alert.Heading><h4>Authentication failed!</h4></Alert.Heading>
                        <ToastBody><>{this.state.error}</></ToastBody>
                    </Alert>
                </div>
            </div>
        );
    }
}


export const LoginForm = connect(
    store => ({
        username: store.username
    }))(_LoginForm);